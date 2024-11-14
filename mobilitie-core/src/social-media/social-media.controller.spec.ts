import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaService } from './social-media.service';
import { PrismaService } from '../shared';

describe('SocialMediaService', () => {
  let service: SocialMediaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialMediaService,
        {
          provide: PrismaService,
          useValue: {
            socialMedia: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SocialMediaService>(SocialMediaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //Prueba unitaria método getSocialMedia
  describe('getSocialMedia', () => {
    it('should return a list of social media entries', async () => {
      const mockSocialMedia = [
        {
          id: 1,
          name: 'Facebook',
          url: 'https://facebook.com',
          image: null,
          isEnabled: true,
          createdAt: new Date(),
          updateddAt: new Date(),
        },
        {
          id: 2,
          name: 'Twitter',
          url: 'https://twitter.com',
          image: null,
          isEnabled: true,
          createdAt: new Date(),
          updateddAt: new Date(),
        },
      ];

      jest.spyOn(prismaService.socialMedia, 'findMany').mockResolvedValue(mockSocialMedia);

      const result = await service.getSocialMedia();
      expect(result).toEqual(mockSocialMedia);
    });

    it('should throw an error if no social media entries are found', async () => {
      jest.spyOn(prismaService.socialMedia, 'findMany').mockResolvedValue(null);

      await expect(service.getSocialMedia()).rejects.toThrow('Social Media Could not found');
    });
  });
});