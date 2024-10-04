import { Page } from "@/domain/models";
import type { INewsRepository } from "@/domain/repositories/new.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "../../../infrastructure/ioc/containers/repositories/repoository.types";

@injectable()
export default class FindStadisticsUseCase {
  private newRepository: INewsRepository;

  constructor(
    @inject(REPOSITORY_TYPES._NewRepository)
    newRepository: INewsRepository
  ) {
    this.newRepository = newRepository;
  }

  async execute(title: string): Promise<Page | undefined> {
    const request = await this.newRepository
      .findPageStadistics(title)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }

    return request;
  }
}
