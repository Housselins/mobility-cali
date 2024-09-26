import { IFindNews } from "@/lib/interfaces";
import { CreateNewInterface, NewInterface } from "../models";

export interface INewsRepository {
  createNew(
    accessToken: string,
    newData: CreateNewInterface
  ): Promise<NewInterface | undefined>;
  findNews(
    accessToken: string,
    filter?: IFindNews
  ): Promise<NewInterface[] | undefined>;
}
