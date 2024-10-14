import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { PrismaService } from 'src/shared';

@Module({
  providers: [PageService, PrismaService],
  controllers: [PageController],
})
export class PageModule {}
