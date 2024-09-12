import { SocialMediaInterface } from "@/domain/models";
import type { ISocialMediaRepository } from "@/domain/repositories/social-media.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "../../../infrastructure/ioc/containers/repositories/repoository.types";

@injectable()
export default class CreateSocialMediaUseCase {
  private socialMediaRepository: ISocialMediaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._SocialMedia)
    socialMediaRepository: ISocialMediaRepository
  ) {
    this.socialMediaRepository = socialMediaRepository;
  }

  async execute(
    name: string,
    url: string,
    image: string,
    id?: number,
    status?: boolean
  ): Promise<SocialMediaInterface | undefined> {
    const newData: SocialMediaInterface = {
      name,
      url,
      image,
      id,
      isEnabled: status,
    };
    const request = await this.socialMediaRepository
      .createSocialMedia(newData)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}
