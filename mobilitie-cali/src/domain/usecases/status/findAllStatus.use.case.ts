import { type IStatusRepository } from "@/domain/repositories/status.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "@/infrastructure/ioc/containers/repositories/repoository.types";

@injectable()
export default class FindAllStatusUseCase {
  private statusRepository: IStatusRepository;

  constructor(
    @inject(REPOSITORY_TYPES._StatusRepository)
    statusRepository: IStatusRepository
  ) {
    this.statusRepository = statusRepository;
  }

  async execute(token?: string): Promise<undefined> {
    if (!token) return;
    const request = await this.statusRepository
      .findAll(token)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}
