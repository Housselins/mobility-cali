import { ContainerModule, interfaces } from "inversify";
import { NETWORK_TYPES } from "./network.types";
import { AxiosInstance } from "axios";
import SusAxiosInstance from "@/infrastructure/network/instances/sus-axios-instance";
import NextAxiosInstance from "@/infrastructure/network/instances/next-axios-instance";

export const networkModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AxiosInstance>(NETWORK_TYPES._AxiosSusInstance).toConstantValue(
    SusAxiosInstance
  );
  bind<AxiosInstance>(NETWORK_TYPES._NextAxiosInstance).toConstantValue(
    NextAxiosInstance
  );
});
