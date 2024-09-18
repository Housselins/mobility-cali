import { ContainerModule, interfaces } from "inversify";
import { USECASES_TYPES } from "./usecases.types";
import CreateNewUseCase from "@/domain/usecases/news/create-new.use.case";
import FindNewUseCase from "@/domain/usecases/news/find-new.use.case";
import CreateSocialMediaUseCase from "@/domain/usecases/social-media/create-social-media.use.case";
import GetSocialMediaUseCase from "@/domain/usecases/social-media/get-social-media.use.case";

export const usecasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CreateNewUseCase>(USECASES_TYPES._CreateNewUseCase).to(CreateNewUseCase);
  bind<FindNewUseCase>(USECASES_TYPES._FindNewUseCase).to(FindNewUseCase);

  bind<CreateSocialMediaUseCase>(USECASES_TYPES._CreateSocialMediaUseCase).to(
    CreateSocialMediaUseCase
  );
  bind<GetSocialMediaUseCase>(USECASES_TYPES._GetSocialMediaUseCase).to(
    GetSocialMediaUseCase
  );
});
