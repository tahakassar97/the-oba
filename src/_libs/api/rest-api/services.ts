// /lib/dataSources/restService.ts

import { IGenericObject } from '@/_libs/types';

import { Crud, getAxiosInstance } from '../utils';

export function createRestService<T>(url: string): Crud<T & { id: string }> {
  return {
    list: async (params?: IGenericObject, headers?: object) => {
      const result = await getAxiosInstance().get(`/api/${url}`, { params, headers });
      if (result?.status === 200) return result.data as (T & { id: string })[];

      return [];
    },
    get: async (id, headers?: object) => {
      const result = await getAxiosInstance().get(`/api/${url}/${id}`, { headers });
      return result.data as T & { id: string };
    },
    create: async (item, headers?: object) => {
      const result = await getAxiosInstance().post(`/api/${url}`, item, { headers });
      return result.data as T & { id: string };
    },
    update: async (id, item, headers?: object) => {
      await getAxiosInstance().put(`/api/${url}${id ? `/${id}` : ''}`, item, { headers });
    },
    remove: async (id, headers?: object) => {
      await getAxiosInstance().delete(`/api/${url}/${id}`, { headers });
    },
  };
}
