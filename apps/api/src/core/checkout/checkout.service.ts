import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import {
  Checkout,
  CheckoutAddOneToLineResponse,
  CheckoutChangeDeliveryMethodResponse,
  CheckoutCreateResponse,
  CheckoutLine,
  CheckoutRemoveOneFromLineResponse,
  ProductVariantAddToCheckoutResponse,
} from '@next-orders/api-sdk';
import {
  AddProductDto,
  ChangeDeliveryMethodDto,
  CreateCheckoutDto,
} from './dto';
import { PrismaService } from '../../db/prisma.service';
import { ProductVariantService } from '../product-variant/product-variant.service';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productVariant: ProductVariantService,
  ) {}

  async createCheckout(
    dto: CreateCheckoutDto,
  ): Promise<CheckoutCreateResponse> {
    Logger.log(
      `Creating new Checkout on Channel Id ${dto.channelId}`,
      'createCheckout',
    );

    const newCheckout = await this.prisma.checkout.create({
      data: {
        id: createId(),
        channelId: dto.channelId,
        deliveryMethod: dto.deliveryMethod,
      },
      include: {
        lines: {
          include: {
            productVariant: {
              include: {
                media: {
                  include: {
                    media: true,
                  },
                },
                category: true,
              },
            },
          },
        },
      },
    });

    return { ok: true, result: newCheckout as Checkout };
  }

  async changeCheckoutDeliveryMethod(
    id: string,
    dto: ChangeDeliveryMethodDto,
  ): Promise<CheckoutChangeDeliveryMethodResponse> {
    Logger.log(
      `Checkout ${id}: delivery method changing to ${dto.method}`,
      'changeCheckoutDeliveryMethod',
    );

    // Update data
    await this.prisma.checkout.update({
      where: { id },
      data: {
        deliveryMethod: dto.method,
      },
    });

    await this.recountTotal(id);

    // Get new data
    const checkout = await this.findCheckoutById(id);
    if (!checkout) {
      throw new BadRequestException();
    }

    return { ok: true, result: checkout };
  }

  async addProductToCheckout(
    id: string,
    dto: AddProductDto,
  ): Promise<ProductVariantAddToCheckoutResponse> {
    Logger.log(
      `Checkout ${id}: adding product Id ${dto.productVariantId}`,
      'addProductToCheckout',
    );

    // Limit lines
    const checkoutCheck = await this.findCheckoutById(id);
    if (checkoutCheck?.lines && checkoutCheck.lines.length >= 20) {
      throw new BadRequestException();
    }

    // Find ProductVariant
    const variant = await this.productVariant.findProductVariantById(
      dto.productVariantId,
    );
    if (!variant) {
      throw new BadRequestException();
    }

    const checkoutLine = await this.checkIfAlreadyInCheckout(id, variant.id);

    checkoutLine
      ? await this.addOneToCheckoutLineByLineId(checkoutLine.id)
      : await this.addNewLineToCheckout(id, variant.id);

    await this.recountTotal(id);

    // Get new data
    const checkout = await this.findCheckoutById(id);
    if (!checkout) {
      throw new BadRequestException();
    }

    return { ok: true, result: checkout };
  }

  async addOneToCheckoutLine(
    checkoutId: string,
    lineId: string,
  ): Promise<CheckoutAddOneToLineResponse> {
    Logger.log(
      `Checkout ${checkoutId}: adding one to line Id ${lineId}`,
      'addOneToCheckoutLine',
    );

    await this.addOneToCheckoutLineByLineId(lineId);
    await this.recountTotal(checkoutId);

    // Get new data
    const checkout = await this.findCheckoutById(checkoutId);
    if (!checkout) {
      throw new BadRequestException();
    }

    return { ok: true, result: checkout };
  }

  async removeOneFromCheckoutLine(
    checkoutId: string,
    lineId: string,
  ): Promise<CheckoutRemoveOneFromLineResponse> {
    Logger.log(
      `Checkout ${checkoutId}: removing one from line Id ${lineId}`,
      'removeOneFromCheckoutLine',
    );

    await this.removeOneFromCheckoutLineByLineId(lineId);
    await this.recountTotal(checkoutId);

    // Get new data
    const checkout = await this.findCheckoutById(checkoutId);
    if (!checkout) {
      throw new BadRequestException();
    }

    return { ok: true, result: checkout };
  }

  async findCheckoutById(id: string): Promise<Checkout | null> {
    const checkout = await this.prisma.checkout.findUnique({
      where: { id },
      include: {
        lines: {
          orderBy: { createdAt: 'asc' },
          include: {
            productVariant: {
              include: {
                media: {
                  include: {
                    media: true,
                  },
                },
                category: true,
              },
            },
          },
        },
      },
    });
    if (!checkout) {
      return null;
    }

    return checkout as Checkout;
  }

  async recountTotal(checkoutId: string): Promise<boolean> {
    const checkout = await this.findCheckoutById(checkoutId);
    if (!checkout) {
      return false;
    }

    let updatedShippingPrice = 0;
    let updatedTotal = Number(
      checkout.lines
        .reduce(
          (accumulator, line) =>
            accumulator + line.quantity * (line.productVariant.gross || 1),
          0,
        )
        .toFixed(2),
    );

    // Custom: recount cart with 10% discount
    if (checkout.deliveryMethod === 'WAREHOUSE') {
      updatedTotal = Number((updatedTotal * 0.9).toFixed(2));
    }

    // Custom: recount cart with +5$ for courier
    if (checkout.deliveryMethod === 'DELIVERY') {
      // Total less than 25$
      if (updatedTotal < 25) {
        updatedShippingPrice = 5;
        updatedTotal = Number((updatedTotal + 5).toFixed(2));
      }
    }

    // Update in DB
    await this.prisma.checkout.update({
      where: { id: checkoutId },
      data: {
        shippingPrice: updatedShippingPrice,
        totalPrice: updatedTotal,
      },
    });

    return true;
  }

  async checkIfAlreadyInCheckout(
    checkoutId: string,
    variantId: string,
  ): Promise<CheckoutLine | undefined> {
    const checkout = await this.findCheckoutById(checkoutId);
    if (!checkout) {
      return undefined;
    }

    return checkout.lines.find((line) => line.productVariant.id === variantId);
  }

  async addOneToCheckoutLineByLineId(id: string): Promise<boolean> {
    await this.prisma.checkoutLine.update({
      where: { id },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });

    return true;
  }

  async removeOneFromCheckoutLineByLineId(id: string): Promise<boolean> {
    const updated = await this.prisma.checkoutLine.update({
      where: { id },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    if (updated.quantity <= 0) {
      await this.prisma.checkoutLine.delete({ where: { id } });
    }

    return true;
  }

  async addNewLineToCheckout(
    checkoutId: string,
    productVariantId: string,
  ): Promise<boolean> {
    await this.prisma.checkoutLine.create({
      data: {
        id: createId(),
        quantity: 1,
        checkoutId,
        productVariantId,
      },
    });

    return true;
  }
}
