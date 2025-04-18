import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP_ADDRESS, PORT_API } from "@env";

const axiosClient = axios.create({
  baseURL: `http://${IP_ADDRESS}:${PORT_API}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token
// axiosClient.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Lỗi khi lấy token từ AsyncStorage:", error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
