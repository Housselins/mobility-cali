import { CreateNewInterface, NewInterface } from "../models";

export interface INewsRepository {
  createNew(
    accessToken: string,
    newData: CreateNewInterface
  ): Promise<NewInterface | undefined>;
  findNews(accessToken: string): Promise<NewInterface[] | undefined>;
}