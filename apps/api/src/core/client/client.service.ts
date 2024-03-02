import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { Client } from '@next-orders/api-sdk';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllClients(): Promise<Client[] | null> {
    const all = await this.prisma.client.findMany({
      include: {
        traits: true,
      },
    });
    if (!all) {
      return null;
    }

    return all as Client[];
  }

  async findClientById(id: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        traits: true,
      },
    });
    if (!client) {
      return null;
    }

    return client as Client;
  }
}
