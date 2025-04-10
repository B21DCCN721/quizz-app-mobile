import axios from "axios";
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API_URL = `http://192.168.1.14:5000`

const axiosClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Lỗi khi lấy token từ AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
