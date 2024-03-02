import { Test, TestingModule } from '@nestjs/testing';
import { Provider } from '@nestjs/common';
import { ChannelService } from '@/core/channel/channel.service';
import { ChannelRepository } from '@/core/channel/channel.repository';
import { CreateChannelDto } from '@/core/channel/dto/create-channel.dto';
import { ChannelMapper, ModelChannel } from '@/core/channel/channel.mapper';

describe('ChannelService', () => {
  let service: ChannelService;
  let repo: jest.Mocked<ChannelRepository>;

  const testChannelInDB: ModelChannel = {
    id: '1',
    name: 'Channel1',
    slug: 'test',
    description: 'test',
    currencyCode: 'USD',
    languageCode: 'EN',
    countryCode: 'US',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    accentTextColor: '',
    accentButtonColor: '',
    accentGradientFrom: '',
    accentGradientTo: '',
    domainId: '',
  };
  const testChannelEntity = new ChannelMapper().toEntity(testChannelInDB);
  const testChannelEntities = [testChannelEntity];

  const testCreateChannelDto: CreateChannelDto = {
    slug: 'test-channel',
    name: 'Test Channel',
    description: 'This is a test channel',
    currencyCode: 'USD',
    languageCode: 'EN',
    countryCode: 'US',
  };

  beforeEach(async () => {
    const ChannelRepositoryProvider: Provider = {
      provide: ChannelRepository,
      useClass: jest.fn(() => ({
        findAll: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
      })),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [ChannelService, ChannelRepositoryProvider],
    }).compile();

    service = moduleRef.get(ChannelService);
    repo = moduleRef.get(ChannelRepository);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findAllChannels', () => {
    it('Should return all channels', async () => {
      repo.findAll.mockResolvedValue(testChannelEntities);

      const result = await service.findAllChannels();
      expect(result).toEqual(testChannelEntities);
    });

    it('Should return empty array if no channels are found', async () => {
      repo.findAll.mockResolvedValue([]);

      const result = await service.findAllChannels();
      expect(result).toEqual([]);
    });
  });

  describe('#findChannelById', () => {
    it('Should return null if no Channel is found', async () => {
      repo.findById.mockResolvedValue(null);

      const result = await service.findChannelById('test-id');
      expect(result).toBeNull();
    });

    it('Should return a Channel if found', async () => {
      repo.findById.mockResolvedValue(testChannelEntity);

      const result = await service.findChannelById('test-id');
      expect(result).toEqual(testChannelEntity);
    });
  });

  describe('#createChannel', () => {
    it('Should create a new channel', async () => {
      repo.create.mockResolvedValueOnce(testChannelEntity);

      const result = await service.createChannel(testCreateChannelDto);
      expect(result).toMatchObject(testChannelEntity);
    });
  });
});
