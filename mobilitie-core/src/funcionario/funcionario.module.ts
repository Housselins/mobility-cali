import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { PrismaService } from 'src/shared';

@Module({
    controllers: [FuncionarioController],
    providers: [FuncionarioService, PrismaService],
})
export class FuncionarioModule {}