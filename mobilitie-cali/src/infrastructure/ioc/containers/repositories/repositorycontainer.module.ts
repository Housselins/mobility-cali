import { ContainerModule, interfaces } from "inversify";
import { REPOSITORY_TYPES } from "./repoository.types";
import { INewsRepository } from "@/domain/repositories/new.repository";
import NewsRepositoryImplement from "@/infrastructure/data/repositories/new.implement";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<INewsRepository>(REPOSITORY_TYPES._NewRepository).to(
    NewsRepositoryImplement
  );
});
