/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IGenericObject {
  [key: string]: any;
}

export interface IMeal {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const ORDER_STATUSES = ['pending', 'processing', 'completed', 'cancelled'];