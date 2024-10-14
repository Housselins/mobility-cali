import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { PqrsController } from './pqrs.controller';
import { PqrsService } from './pqrs.service';

@Module({
    controllers: [PqrsController],
    providers: [PqrsService, PrismaService],
})
export class PqrsModule {}