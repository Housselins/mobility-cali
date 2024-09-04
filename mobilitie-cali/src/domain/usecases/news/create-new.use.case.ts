import { CreateNewInterface, NewInterface } from "@/domain/models";
import type { INewsRepository } from "@/domain/repositories/new.repository";
import { inject, injectable } from "inversify";
import { REPOSITORY_TYPES } from "../../../infrastructure/ioc/containers/repositories/repoository.types";

@injectable()
export default class CreateNewUseCase {
  private newRepository: INewsRepository;

  constructor(
    @inject(REPOSITORY_TYPES._NewRepository)
    newRepository: INewsRepository
  ) {
    this.newRepository = newRepository;
  }

  async execute(
    title: string,
    token?: string,
    content?: Record<string, any>,
    image?: string,
    id?: number,
    status?: boolean
  ): Promise<NewInterface | undefined> {
    if (!token) return;

    const newData: CreateNewInterface = {
      title,
      content,
      image,
      id,
      isEnabled: status,
    };
    const request = await this.newRepository
      .createNew(token, newData)
      .catch((error) => error);
    if (request instanceof Error) {
      return;
    }

    return request;
  }
}
