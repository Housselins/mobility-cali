import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';

@Module({
  providers: [SocialMediaService, PrismaService],
  controllers: [SocialMediaController],
})
export class SocialMediaModule {}
