import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { BannerModule } from './banner/banner.module';
import { InfoModule } from './info-central/info.module';

@Module({
  imports: [SharedModule, AuthModule, NewsModule, BannerModule, InfoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
