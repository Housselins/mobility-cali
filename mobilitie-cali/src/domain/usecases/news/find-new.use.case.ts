import { NewInterface } from "@/domain/models";
import type { INewsRepository } from "@/domain/repositories/new.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "../../../infrastructure/ioc/containers/repositories/repoository.types";

@injectable()
export default class FindNewUseCase {
  private newRepository: INewsRepository;

  constructor(
    @inject(REPOSITORY_TYPES._NewRepository)
    newRepository: INewsRepository
  ) {
    this.newRepository = newRepository;
  }

  async execute(token?: string): Promise<NewInterface[] | undefined> {
    if (!token) return;

    const request = await this.newRepository
      .findNews(token)
      .catch((error) => error);

    if (request instanceof Error) {
      return;
    }

    return request;
  }
}