import { Test, TestingModule } from '@nestjs/testing';
import { InfoService } from './info.service';
import { PrismaService } from '../shared';

describe('PageService', () => {
  let service: InfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfoService, PrismaService],
    }).compile();

    service = module.get<InfoService>(InfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});