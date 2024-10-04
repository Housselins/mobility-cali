import { IFindNews } from "@/lib/interfaces";
import {
  CreateNewInterface,
  CreateOrUpdatePage,
  NewInterface,
  Page,
} from "../models";

export interface INewsRepository {
  createNew(
    accessToken: string,
    newData: CreateNewInterface
  ): Promise<NewInterface | undefined>;
  findNews(
    accessToken: string,
    filter?: IFindNews
  ): Promise<NewInterface[] | undefined>;
  findPageStadistics(title: string): Promise<Page[] | undefined>;
  createOrUpdate(page: CreateOrUpdatePage): Promise<Page | undefined>;
}
