import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [SharedModule, AuthModule, NewsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
