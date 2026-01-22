import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

import { AuthStrategy } from '../types';

// Define the shape of our server-side storage
interface ServerStorage {
  data: Record<string, string | null>;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

// Create a temporary storage object for server-side
const serverStorage: ServerStorage = {
  data: {},
  getItem: (key: string) => serverStorage.data[key] ?? null,
  setItem: (key: string, value: string) => {
    serverStorage.data[key] = value;
  },
  removeItem: (key: string) => {
    serverStorage.data[key] = null;
  },
};

export const createCookiesStrategy = (name: string): AuthStrategy => {
  return {
    getToken: () => getCookie(name),
    setToken: (token: string) =>
      setCookie(name, token, {
        priority: 'high',
        sameSite: 'strict',
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 3), // 3 days
        maxAge: 60 * 60 * 24 * 3, // 3 days
      }),
    removeToken: () => deleteCookie(name),
  };
};
