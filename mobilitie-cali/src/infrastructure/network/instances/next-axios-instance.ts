import { GLOBAL_CONFIG } from "@/lib/config";
import axios, { AxiosError, AxiosHeaders } from "axios";

interface AxiosSusHeaders extends AxiosHeaders {
  _retry?: boolean;
  Authorization?: string;
}
const baseURL = GLOBAL_CONFIG.SITE_URL;

const NextAxiosInstance = axios.create({ baseURL });

export default NextAxiosInstance;
