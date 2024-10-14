import { Module } from '@nestjs/common';
import { EnteService } from './ente.service';
import { EnteController } from './ente.controller';
import { PrismaService } from 'src/shared';


@Module({
    imports: [],
    controllers: [EnteController],
    providers: [EnteService, PrismaService],
})

export class EnteModule {}