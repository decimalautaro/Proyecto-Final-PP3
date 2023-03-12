import axios, { AxiosRequestConfig } from 'axios';

export const initAuthService = () => {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers!['Authorization'] = `Bearer ${localStorage.getItem(
        'token'
      )}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
