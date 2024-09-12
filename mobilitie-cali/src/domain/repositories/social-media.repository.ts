import { SocialMediaInterface } from "../models";

export interface ISocialMediaRepository {
  createSocialMedia(
    data: SocialMediaInterface
  ): Promise<SocialMediaInterface | undefined>;
  findSocialMedias(): Promise<SocialMediaInterface[] | undefined>;
}
