import axios from "axios";
import getEnv from "./env";

const axiosInstance = axios.create({
  baseURL: getEnv().NEXT_PUBLIC_API_URL,
});

export default axiosInstance;
