import { Module } from '@nestjs/common';
import { DenunciaController } from './denuncia.controller';
import { PrismaService } from 'src/shared';
import { DenunciaService } from './denuncia.service';

@Module({
    providers: [DenunciaService, PrismaService],
    controllers: [DenunciaController],
})
export class DenunciaModule {}
