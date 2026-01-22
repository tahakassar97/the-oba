'use client';

import { useContext } from 'react';

import { AuthContext } from '../context/context';
import { createCookiesStrategy } from '../strategy/cookies';

import { AuthContextType, AuthStrategy } from '../types';

export const createAuthStrategy = (strategy: AuthStrategy): AuthContextType => ({
  getToken: strategy.getToken,
  setToken: strategy.setToken,
  removeToken: strategy.removeToken,
});

const strategy = createCookiesStrategy('accessToken');
export const auth = createAuthStrategy(strategy);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
