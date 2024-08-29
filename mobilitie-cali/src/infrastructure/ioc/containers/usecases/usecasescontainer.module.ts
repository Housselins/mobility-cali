import { ContainerModule, interfaces } from "inversify";
import { USECASES_TYPES } from "./usecases.types";
import CreateNewUseCase from "@/domain/usecases/request/create-new.use.case";

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CreateNewUseCase>(USECASES_TYPES._CreateNewUseCase).to(CreateNewUseCase);
});
