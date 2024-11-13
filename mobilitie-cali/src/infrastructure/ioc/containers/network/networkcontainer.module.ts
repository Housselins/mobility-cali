import { ContainerModule, interfaces } from "inversify";
import { NETWORK_TYPES } from "./network.types";
import { AxiosInstance } from "axios";
import NextAxiosInstance from "@/infrastructure/network/instances/next-axios-instance";
import CoreAxiosInstance from "@/infrastructure/network/instances/core-axios-instance";

export const networkModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<AxiosInstance>(NETWORK_TYPES._CoreAxiosInstance).toConstantValue(
    CoreAxiosInstance
  );
  bind<AxiosInstance>(NETWORK_TYPES._NextAxiosInstance).toConstantValue(
    NextAxiosInstance
  );
});
