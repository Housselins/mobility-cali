import { SocialMediaInterface } from "@/domain/models";
import type { ISocialMediaRepository } from "@/domain/repositories/social-media.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "../../../infrastructure/ioc/containers/repositories/repoository.types";

@injectable()
export default class GetSocialMediaUseCase {
  private socialMediaRepository: ISocialMediaRepository;

  constructor(
    @inject(REPOSITORY_TYPES._SocialMedia)
    socialMediaRepository: ISocialMediaRepository
  ) {
    this.socialMediaRepository = socialMediaRepository;
  }

  async execute(): Promise<SocialMediaInterface[] | undefined> {
    const request = await this.socialMediaRepository
      .findSocialMedias()
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}
