import { SocialMediaInterface } from "@/domain/models";
import { ISocialMediaRepository } from "@/domain/repositories/social-media.repository";
import { isAxiosError, type AxiosInstance } from "axios";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { NETWORK_TYPES } from "../../ioc/containers/network/network.types";

@injectable()
export default class SocialMediaRepositoryImplement
  implements ISocialMediaRepository
{
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._CoreAxiosInstance) susAxiosInstance: AxiosInstance
  ) {
    this.axiosInstance = susAxiosInstance;
  }

  async createSocialMedia(
    newData: SocialMediaInterface
  ): Promise<SocialMediaInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer ",
        },
      };
      let url = `/social-media`;

      const resp = await this.axiosInstance.post(url, newData, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/social-media  message: Respuesta no exitosa del servidor"
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
  async findSocialMedias(): Promise<SocialMediaInterface[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer ",
        },
      };
      let url = `/social-media`;

      const resp = await this.axiosInstance.get(url, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error(
          "/social-media  message: Respuesta no exitosa del servidor"
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
