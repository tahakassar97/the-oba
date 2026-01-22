export interface AuthStrategy {
  getToken(): string | null | undefined;
  setToken(token: string): void;
  removeToken(): void;
}

export interface AuthContextType {
  getToken: () => string | null | undefined;
  setToken: (token: string) => void;
  removeToken: () => void;
}
