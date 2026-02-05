import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

import { AuthStrategy, UserRolesTitles } from '../types';

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
    setToken: (token: string, role?: string) => {
      setCookie(name, token, {
        priority: 'high',
        sameSite: 'strict',
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 24), // 1 day
        maxAge: 60 * 60 * 24,
      });

      // Set user role cookie if provided
      if (role) {
        setCookie('userRole', role, {
          priority: 'high',
          sameSite: 'strict',
          secure: true,
          expires: new Date(Date.now() + 60 * 60 * 24), // 1 day
          maxAge: 60 * 60 * 24
        });
      }
    },
    removeToken: () => {
      deleteCookie(name);
      deleteCookie('userRole');
    },

    isAuthenticated: () => {
      const token = getCookie(name);
      return !!token;
    },

    role: {
      title: getCookie('userRole') as UserRolesTitles || '',
      routes: [],
    },
  };
};
