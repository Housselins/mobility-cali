export interface IRequestsRepository {
  findAll(
    accessToken: string,
    page?: number,
    pageSize?: number,
    filters?: undefined
  ): Promise<undefined>;
}
