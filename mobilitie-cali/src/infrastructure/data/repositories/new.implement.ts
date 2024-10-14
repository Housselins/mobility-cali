import {
  CreateNewInterface,
  CreateOrUpdatePage,
  NewInterface,
  Page,
} from "@/domain/models";
import { type INewsRepository } from "@/domain/repositories/new.repository";
import { IFindNews } from "@/lib/interfaces";
import { isAxiosError, type AxiosInstance } from "axios";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { NETWORK_TYPES } from "../../ioc/containers/network/network.types";
import { error } from "console";

@injectable()
export default class NewsRepositoryImplement implements INewsRepository {
  private axiosInstance: AxiosInstance;

  constructor(
    @inject(NETWORK_TYPES._CoreAxiosInstance) susAxiosInstance: AxiosInstance
  ) {
    this.axiosInstance = susAxiosInstance;
  }

  async createNew(
    accessToken: string,
    newData: CreateNewInterface
  ): Promise<NewInterface | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `/news`;

      const resp = await this.axiosInstance.post(url, newData, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("/news  message: Respuesta no exitosa del servidor");
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
  async findNews(
    accessToken: string,
    filter?: IFindNews
  ): Promise<NewInterface[] | undefined> {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      let url = `/news?attached=${Boolean(filter?.attached)}`;

      const resp = await this.axiosInstance.get(url, config);
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("/news  message: Respuesta no exitosa del servidor");
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

  async findPageStadistics(title: string): Promise<Page[] | undefined> {
    try {
      const url = `/page/${title}`;
      const resp = await this.axiosInstance.get(url);
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("/page  message: Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }
  async createOrUpdate(page: CreateOrUpdatePage): Promise<Page | undefined> {
    try {
      const url = `/page`;

      const resp = await this.axiosInstance.post(url, page).catch((error) => {
        console.log(error);
      });
      // Verifica si la respuesta es exitosa y devuelve los datos
      // console.log(resp);

      if (resp && resp.status >= 200 && resp.status < 299) {
        return resp.data;
      } else {
        // Si la respuesta no es exitosa, lanza un error general
        throw new Error("/page  message: Respuesta no exitosa del servidor");
      }
    } catch (error) {
      throw error;
    }
  }
}
