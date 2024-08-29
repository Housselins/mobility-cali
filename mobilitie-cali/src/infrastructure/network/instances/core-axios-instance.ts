import axios from "axios";

const baseURL = process.env.coreApi;

const CoreAxiosInstance = axios.create({ baseURL });

export default CoreAxiosInstance;
