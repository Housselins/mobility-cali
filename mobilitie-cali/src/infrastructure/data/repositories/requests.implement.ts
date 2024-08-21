import "reflect-metadata";
import { IRequestsRepository } from "@/domain/repositories/request.repository";
import { NETWORK_TYPES } from "../../ioc/containers/network/network.types";
import { isAxiosError, type AxiosInstance } from "axios";
import { inject, injectable } from "inversify";

@injectable()
export default class RequestsRepositoryImplement
  implements IRequestsRepository
{
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSusInstance) susAxiosInstance: AxiosInstance
  ) {
    this.axiosInstance = susAxiosInstance;
  }

  async findAll(
    accessToken: string,
    page?: number | undefined,
    pageSize?: number | undefined,
    filters?: undefined | undefined
  ): Promise<undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `/endpoint`;

      // Añade filtros existentes a la URL
      if (filters) {
        Object.keys(filters).forEach((key) => {
          const value = filters[key as keyof undefined];
          if (value !== undefined) {
            url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }
        });
      }
      // DEBUG URL
      // console.log(url);

      const resp = await this.axiosInstance.get(url, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/endpoint  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        // console.log(error);
        // handleAxiosError(error, "/endpoint");
      } else {
        throw error;
      }
    }
  }
}
