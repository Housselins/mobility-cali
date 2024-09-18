import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared';

@Injectable()
export class SocialMediaService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSocialMedia(socialMediaDataDto) {
    try {
      if (socialMediaDataDto.id) {
        const find = await this.prismaService.socialMedia.findUnique({
          where: { id: socialMediaDataDto.id },
        });
        if (!find) {
          throw new Error('Social Media Could not be updated');
        }
        const result = await this.prismaService.socialMedia.update({
          where: { id: socialMediaDataDto.id },
          data: {
            name: socialMediaDataDto.name,
            url: socialMediaDataDto.url,
            image: socialMediaDataDto.image,
            isEnabled: socialMediaDataDto.isEnabled,
            updateddAt: new Date(),
          },
        });
        if (!result) {
          throw new Error('Social Media Could not be updated');
        }
        await this.prismaService.socialMediaAudit.create({
          data: {
            socialMediaId: result.id,
            name: `${find.name} -> ${result.name}`,
            url: `${find.url} -> ${result.url}`,
            image: `${find.image} -> ${result.image}`,
            isEnabled: `${find.isEnabled} -> ${result.isEnabled}`,
          },
        });
        return result;
      } else {
        const result = await this.prismaService.socialMedia.create({
          data: {
            name: socialMediaDataDto.name,
            url: socialMediaDataDto.url,
            image: socialMediaDataDto.image,
          },
        });
        if (!result) {
          throw new Error('Social Media Could not be created');
        }
        this.prismaService.socialMediaAudit.create({
          data: {
            socialMediaId: result.id,
            name: `${socialMediaDataDto.name} -> ${result.name}`,
            url: `${socialMediaDataDto.url} -> ${result.url}`,
            image: `${socialMediaDataDto.image} -> ${result.image}`,
            isEnabled: `${socialMediaDataDto.isEnabled} -> ${result.isEnabled}`,
          },
        });
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSocialMedia() {
    try {
      const result = await this.prismaService.socialMedia.findMany({
        where: { isEnabled: true },
      });
      if (!result) {
        throw new Error('Social Media Could not found');
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
