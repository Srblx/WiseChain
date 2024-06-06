// Helpers
import axios from 'axios';

// Utils
import { WEB_URL } from './constante.utils';

const ApiAxios = axios.create({ baseURL: WEB_URL });

ApiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiAxios;
