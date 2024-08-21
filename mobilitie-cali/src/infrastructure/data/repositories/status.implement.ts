import "reflect-metadata";
import { NETWORK_TYPES } from "../../ioc/containers/network/network.types";
import { isAxiosError, type AxiosInstance } from "axios";
import { inject, injectable } from "inversify";
import { IStatusRepository } from "@/domain/repositories/status.repository";
import { Status } from "@/domain/models";

@injectable()
export default class StatusRepositoryImplement implements IStatusRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._AxiosSusInstance) susAxiosInstance: AxiosInstance
  ) {
    this.axiosInstance = susAxiosInstance;
  }

  async findAll(accessToken: string): Promise<Status[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `/endpoint`;

      const resp = await this.axiosInstance.get(url, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "endpoint/  message: Respuesta no exitosa del servidor"
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      } else {
        throw error;
      }
    }
  }
}
