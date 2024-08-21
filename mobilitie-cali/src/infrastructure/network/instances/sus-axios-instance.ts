import axios, { AxiosError, AxiosHeaders } from "axios";

interface AxiosSusHeaders extends AxiosHeaders {
  _retry?: boolean;
  Authorization?: string;
}
const baseURL = process.env.coreApi;

const SusAxiosInstance = axios.create({ baseURL });

export default SusAxiosInstance;
