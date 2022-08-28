import axios from "axios";
import { DEFAULT_OPTIONS } from "../utils/config";

const axiosInstance = () => {
  const token = localStorage.getItem("token");
  const instance = axios.create(DEFAULT_OPTIONS);
  if (token) {
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
  return instance;
};

export default axiosInstance;
