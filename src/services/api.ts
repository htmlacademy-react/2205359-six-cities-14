import axios, {AxiosInstance} from 'axios';
import { getToken } from './token';
const BASE_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;


// создание экземпляра Axios
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });
    // Настройка перехватчика - обработка запроса - передача токена
  api.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};
