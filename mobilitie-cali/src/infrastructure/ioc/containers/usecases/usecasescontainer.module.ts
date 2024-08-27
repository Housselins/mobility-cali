import { ContainerModule, interfaces } from "inversify";
import { USECASES_TYPES } from "./usecases.types";
import FindAllRequestsUseCase from "@/domain/usecases/request/findAllRequests.use.case";

import FindAllStatusUseCase from "@/domain/usecases/status/findAllStatus.use.case";

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<FindAllRequestsUseCase>(USECASES_TYPES._FindAllRequestsTypesUseCase).to(
    FindAllRequestsUseCase
  );

  bind<FindAllStatusUseCase>(USECASES_TYPES._FindAllStatusUseCase).to(
    FindAllStatusUseCase
  );
});
