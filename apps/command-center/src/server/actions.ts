'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { MainAPI, WeightUnit } from '@next-orders/api-sdk';
import { COOKIES_ACCESS_TOKEN_KEY, COOKIES_LOCALE_KEY } from '../lib/helpers';
import { Locale } from '../dictionaries';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'no-api-url-env';

const api = new MainAPI(API_URL, ''); // Public access only

const apiWithAccess = () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || '';
  return new MainAPI(API_URL, accessToken);
};

export const SetLocale = (locale: Locale) => {
  cookies().set(COOKIES_LOCALE_KEY, locale);
};

export const SignInForm = async (prevState: unknown, formData: FormData) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = schema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const employee = await api.employee.signInByEmail(
    { email, password },
    { next: { revalidate: 0 } },
  );
  if (employee instanceof Error) {
    return { message: 'Data is not correct' };
  }

  // Valid data
  if (employee.result.access_token) {
    // Set Access Token in Cookie
    cookies().set(COOKIES_ACCESS_TOKEN_KEY, employee.result.access_token);
  }

  redirect('/dashboard');
};

export const SignOut = () => {
  cookies().delete(COOKIES_ACCESS_TOKEN_KEY);
  redirect('/auth/login');
};

export const GetEmployeeAccessPayload = async () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || '';
  const payload = await apiWithAccess().verifyToken(accessToken, {
    next: { revalidate: 60, tags: ['all', 'token'] },
  });
  if (payload instanceof Error) {
    if (payload.message.includes('400')) {
      throw new Error('Access Token is not valid');
    }
    throw new Error('Unknown');
  }

  return payload;
};

export const CreateShopForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  const schema = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const { name, description } = schema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  const create = await api.shop.create(
    { name, description },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return { message: 'Data is not correct' };
  }

  redirect('/dashboard');
};

export const CreateChannelForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  const schema = z.object({
    slug: z.string(),
    name: z.string(),
    description: z.string().optional(),
    currencyCode: z.string(),
    languageCode: z.string(),
    countryCode: z.string(),
  });

  const { slug, name, description, currencyCode, languageCode, countryCode } =
    schema.parse({
      slug: formData.get('slug'),
      name: formData.get('name'),
      description: formData.get('description'),
      currencyCode: formData.get('currencyCode'),
      languageCode: formData.get('languageCode'),
      countryCode: formData.get('countryCode'),
    });

  const create = await apiWithAccess().channel.create(
    { slug, name, description, currencyCode, languageCode, countryCode },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag('channels');

  return { message: 'OK' };
};

export const CreateMenuCategoryForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  const schema = z.object({
    slug: z.string(),
    name: z.string(),
    menuId: z.string(),
  });

  const { slug, name, menuId } = schema.parse({
    slug: formData.get('slug'),
    name: formData.get('name'),
    menuId: formData.get('menuId'),
  });

  const create = await apiWithAccess().menuCategory.create(
    { slug, name, menuId },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag('menus');

  return { message: 'OK' };
};

export const UpdateMenuCategoryForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  const schema = z.object({
    categoryId: z.string(),
    icon: z.string(),
    name: z.string().optional(),
    slug: z.string().optional(),
  });

  const { categoryId, icon, name, slug } = schema.parse({
    categoryId: formData.get('categoryId'),
    icon: formData.get('icon'),
    name: formData.get('name'),
    slug: formData.get('slug'),
  });

  const updated = await apiWithAccess().menuCategory.update(
    categoryId,
    { slug, name, icon },
    { next: { revalidate: 0 } },
  );
  if (updated instanceof Error) {
    return {
      message: updated.message,
    };
  }

  revalidateTag('menus');

  return { message: 'OK' };
};

export const CreateMediaForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  // alt, file
  const create = await apiWithAccess().media.upload(formData, {
    next: { revalidate: 0 },
  });
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag('media');

  return { message: 'OK' };
};

export const CreateProductVariantForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  const categoryId = (formData.get('categoryId') as string) || '';
  const productId = (formData.get('productId') as string) || '';
  const menuId = (formData.get('menuId') as string) || '';

  const slug = (formData.get('slug') as string) || ''; // hidden
  const name = (formData.get('name') as string) || '';
  const description = (formData.get('description') as string) || '';
  const weightUnit = (formData.get('weightUnit') as WeightUnit) || '';
  const weightValue = (formData.get('weightValue') as string) || '';
  const gross = (formData.get('gross') as string) || '';

  const sku = ''; // Don't ask on creating
  // const net = 0; // Don't ask on creating
  // const tax = 0; // Don't ask on creating

  const create = await apiWithAccess().productVariant.create(
    {
      slug,
      name,
      description,
      sku,
      weightUnit,
      weightValue: Number(weightValue),
      gross: Number(gross),
      // net: Number(net),
      // tax: Number(tax),
      categoryId,
      productId,
      menuId,
    },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag('products');

  return { message: 'OK' };
};

export const CreateProductionForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  const type = 'PRODUCTION';
  const name = (formData.get('name') as string) || '';
  const description = (formData.get('description') as string) || '';

  const create = await apiWithAccess().product.create(
    { type, name, description },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag('products');

  return { message: 'OK' };
};

export const AddProductVariantMediaForm = async (
  prevState: unknown,
  formData: FormData,
) => {
  const productVariantId = (formData.get('productVariantId') as string) || '';
  const mediaId = (formData.get('mediaId') as string) || '';

  const add = await apiWithAccess().productVariant.addMedia(
    productVariantId,
    mediaId,
    { next: { revalidate: 0 } },
  );
  if (add instanceof Error) {
    return {
      message: add.message,
    };
  }

  revalidateTag('products');

  return { message: 'OK' };
};
