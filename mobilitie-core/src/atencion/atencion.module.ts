import { Module } from '@nestjs/common';
import { HorariosDireccionesAtencionController } from './atencion.controller';
import { PrismaService } from 'src/shared';
import { HorariosDireccionesAtencionService } from './atencion.service';

@Module({
    providers: [HorariosDireccionesAtencionService, PrismaService],
  controllers: [HorariosDireccionesAtencionController],
})
export class HorariosDireccionesAtencionModule {} 