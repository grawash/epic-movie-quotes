import axios from "axios";
import { getJwtToken } from "@/helpers/jwtToken/index.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: "Bearer " + getJwtToken(),
  },
});

export default axiosInstance;
