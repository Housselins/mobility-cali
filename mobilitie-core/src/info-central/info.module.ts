import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { PrismaService } from 'src/shared';

@Module({
<<<<<<< HEAD
    imports: [],
=======
>>>>>>> origin/nuevos_camnbios
    controllers: [InfoController],
    providers: [InfoService, PrismaService],
})
export class InfoModule {}