import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { PrismaService } from 'src/shared';
import { BannerService } from './banner.service';

@Module({
    providers: [BannerService, PrismaService],
  controllers: [BannerController],
})
export class BannerModule {} 