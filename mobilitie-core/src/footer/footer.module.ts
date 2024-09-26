import { Module } from '@nestjs/common';
import { FooterController } from './footer.controller';
import { PrismaService } from 'src/shared';
import { FooterService } from './footer.service';

@Module({
    providers: [FooterService, PrismaService],
  controllers: [FooterController],
})
export class FooterModule {} 