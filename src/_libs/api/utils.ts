import axios from 'axios';

import { IGenericObject } from '../types';
import { auth } from '../auth';

export interface Crud<T> {
  list: (params?: IGenericObject, headers?: object) => Promise<T[]>;
  get: (id: string, headers?: object) => Promise<T>;
  create: (item: Omit<T, 'id'>, headers?: object) => Promise<T>;
  update: (id: string, item: Partial<T>, headers?: object) => Promise<void>;
  remove: (id: string, headers?: object) => Promise<void>;
}

export const commonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAxiosInstance = (url?: string, headers?: object) => {
  const axiosInstance = axios.create({
    baseURL: url || baseUrl,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err?.response?.status === 401) {
        auth.removeToken();
        window.location.replace('/');
      }

      throw err;
    },
  );

  axiosInstance.interceptors.request.use((request) => {
    return request;
  });

  return axiosInstance;
};
