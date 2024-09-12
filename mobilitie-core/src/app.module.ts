import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { BannerModule } from './banner/banner.module';
<<<<<<< HEAD
import { InfoModule } from './info-central/info.module';

@Module({
  imports: [SharedModule, AuthModule, NewsModule, BannerModule, InfoModule],
=======
import { SocialMediaModule } from './social-media/social-media.module';

@Module({
  imports: [SharedModule, AuthModule, NewsModule, BannerModule, SocialMediaModule],
>>>>>>> origin/social-managment
  controllers: [],
  providers: [],
})
export class AppModule {}
