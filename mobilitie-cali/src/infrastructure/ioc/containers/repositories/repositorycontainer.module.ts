import { ContainerModule, interfaces } from "inversify";
import { IRequestsRepository } from "@/domain/repositories/request.repository";
import RequestsRepositoryImplement from "@/infrastructure/data/repositories/requests.implement";
import { REPOSITORY_TYPES } from "./repoository.types";
import { IStatusRepository } from "@/domain/repositories/status.repository";
import StatusRepositoryImplement from "@/infrastructure/data/repositories/status.implement";

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IRequestsRepository>(REPOSITORY_TYPES._RequestsRepository).to(
    RequestsRepositoryImplement
  );

  bind<IStatusRepository>(REPOSITORY_TYPES._StatusRepository).to(
    StatusRepositoryImplement
  );
});
