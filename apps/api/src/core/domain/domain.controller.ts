import { Controller, Get, NotFoundException } from '@nestjs/common';
import { DomainService } from './domain.service';
import { Public } from '../auth/auth.decorator';

@Controller('domain')
export class DomainController {
  constructor(private readonly service: DomainService) {}

  @Public()
  @Get('list')
  async findAllDomains() {
    const domains = await this.service.findAllDomains();
    if (!domains) {
      throw new NotFoundException();
    }

    return domains;
  }
}
