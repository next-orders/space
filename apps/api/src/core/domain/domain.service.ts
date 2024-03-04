import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { Domain } from '@next-orders/api-sdk';

@Injectable()
export class DomainService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllDomains(): Promise<Domain[] | null> {
    return this.prisma.domain.findMany();
  }
}
