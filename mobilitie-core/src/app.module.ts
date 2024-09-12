import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { BannerModule } from './banner/banner.module';
import { SocialMediaModule } from './social-media/social-media.module';

@Module({
  imports: [SharedModule, AuthModule, NewsModule, BannerModule, SocialMediaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
