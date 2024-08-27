import type { IRequestsRepository } from "@/domain/repositories/request.repository";
import { REPOSITORY_TYPES } from "../../../infrastructure/ioc/containers/repositories/repoository.types";
import { inject, injectable } from "inversify";

@injectable()
export default class FindAllRequestsUseCase {
  private requestsRepository: IRequestsRepository;

  constructor(
    @inject(REPOSITORY_TYPES._RequestsRepository)
    requestsRepository: IRequestsRepository
  ) {
    this.requestsRepository = requestsRepository;
  }

  async execute(
    token?: string,
    page?: number,
    pageSize?: number,
    filters?: undefined
  ): Promise<undefined> {
    if (!token) return;
    const request = await this.requestsRepository
      .findAll(token, page, pageSize, filters)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}
