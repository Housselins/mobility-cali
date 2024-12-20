import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { BannerModule } from './banner/banner.module';
import { InfoModule } from './info-central/info.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { DenunciaModule } from './denuncia/denuncia.module';
import { PqrsModule } from './pqrs/pqrs.module';
import { FooterModule } from './footer/footer.module';
import { PageModule } from './page/page.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnteModule } from './ente/ente.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    NewsModule,
    BannerModule,
    InfoModule,
    SocialMediaModule,
    DenunciaModule,
    PqrsModule,
    FooterModule,
    PageModule,
    EnteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
