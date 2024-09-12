import { INewsRepository } from "@/domain/repositories/new.repository";
import { ISocialMediaRepository } from "@/domain/repositories/social-media.repository";
import NewsRepositoryImplement from "@/infrastructure/data/repositories/new.implement";
import SocialMediaRepositoryImplement from "@/infrastructure/data/repositories/social-media.implement";
import { ContainerModule, interfaces } from "inversify";
import { REPOSITORY_TYPES } from "./repoository.types";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<INewsRepository>(REPOSITORY_TYPES._NewRepository).to(
    NewsRepositoryImplement
  );
  bind<ISocialMediaRepository>(REPOSITORY_TYPES._SocialMedia).to(
    SocialMediaRepositoryImplement
  );
});
