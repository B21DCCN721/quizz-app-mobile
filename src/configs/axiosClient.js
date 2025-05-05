import axios from "axios";
import { IP_ADDRESS, PORT_API } from "@env";
import store from "../store"; // đường dẫn tới file store của bạn

const axiosClient = axios.create({
  baseURL: `http://192.168.1.8:${PORT_API}`,
  headers: {
    "content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token
axiosClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
