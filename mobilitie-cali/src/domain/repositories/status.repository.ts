import { Status } from "../models";

export interface IStatusRepository {
  findAll(accessToken: string): Promise<Status[] | undefined>;
}
