import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../shared';
import { FuncionarioService } from './funcionario.service';

describe('PageService', () => {
  let service: FuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionarioService, PrismaService],
    }).compile();

    service = module.get<FuncionarioService>(FuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});