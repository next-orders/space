import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { Permissions } from '../auth/auth.decorator';

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Permissions(['READ_CLIENTS'])
  @Get('list')
  async findAllClients() {
    const clients = await this.service.findAllClients();
    if (!clients) {
      throw new NotFoundException();
    }

    return clients;
  }

  @Permissions(['READ_CLIENTS'])
  @Get(':id')
  async findClientById(@Param('id') id: string) {
    const client = await this.service.findClientById(id);
    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }
}
