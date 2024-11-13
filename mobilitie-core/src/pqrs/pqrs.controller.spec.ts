import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../shared';
import { PqrsService } from './pqrs.service';

describe('SocialMediaService', () => {
  let service: PqrsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PqrsService, PrismaService],
    }).compile();

    service = module.get<PqrsService>(PqrsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
