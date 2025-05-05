import axios from "axios";
import { IP_ADDRESS, PORT_API } from "@env";
import store from "../store"; // đường dẫn tới file store của bạn

const axiosClient = axios.create({
<<<<<<< HEAD
  baseURL: `http://192.168.102.8:8081`,
=======
  baseURL: `http://192.168.1.12:${PORT_API}`,
>>>>>>> b9612195a8047e3a803dab39a6b17206e03d2621
  headers: {
    "Content-Type": "application/json",
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
