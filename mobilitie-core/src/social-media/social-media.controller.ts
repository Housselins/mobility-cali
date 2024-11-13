import { Body, Controller, Get, Post } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  createSocialMedia(@Body() socialMediaDto) {
    return this.socialMediaService.createSocialMedia(socialMediaDto);
  }
  @Get()
  findAllSocialMedia() {
    return this.socialMediaService.getSocialMedia();
  }
}
