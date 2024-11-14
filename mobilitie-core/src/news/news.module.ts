import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
<<<<<<< HEAD
import { PrismaService } from 'src/shared';
=======
import { PrismaService } from '../shared';
>>>>>>> origin/nuevos_camnbios

@Module({
  providers: [NewsService, PrismaService],
  controllers: [NewsController],
})
export class NewsModule {}
