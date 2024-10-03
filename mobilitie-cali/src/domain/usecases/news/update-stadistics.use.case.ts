import { CreateOrUpdatePage, Page } from "@/domain/models";
import type { INewsRepository } from "@/domain/repositories/new.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "../../../infrastructure/ioc/containers/repositories/repoository.types";

@injectable()
export default class UpdateStadisticsUseCase {
  private newRepository: INewsRepository;

  constructor(
    @inject(REPOSITORY_TYPES._NewRepository)
    newRepository: INewsRepository
  ) {
    this.newRepository = newRepository;
  }

  async execute(page: CreateOrUpdatePage): Promise<Page | undefined> {
    const request = await this.newRepository
      .createOrUpdate(page)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }

    return request;
  }
}
