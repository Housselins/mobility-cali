import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { BannerModule } from './banner/banner.module';
import { InfoModule } from './info-central/info.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { DenunciaModule } from './denuncia/denuncia.module';
import { FooterModule } from './footer/footer.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    NewsModule,
    BannerModule,
    InfoModule,
    SocialMediaModule,
    DenunciaModule,
    FooterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
