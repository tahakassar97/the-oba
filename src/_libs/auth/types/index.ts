export interface AuthStrategy {
  getToken(): string | null | undefined;
  setToken(token: string, role?: string): void;
  removeToken(): void;
  isAuthenticated(): boolean;

  role: UserRole;
}

export interface AuthContextType {
  getToken: () => string | null | undefined;
  setToken(token: string, role?: string): void;
  removeToken: () => void;
  isAuthenticated(): boolean;

  role: UserRole;
}

export enum UserRolesTitles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  CHEF = 'chef',
  WAITER = 'waiter',
}

interface UserRole {
  title: UserRolesTitles;
  routes: string[];
  permissions?: string[] | 'full-access';
}

export const adminRole: UserRole = {
  title: UserRolesTitles.ADMIN,
  routes: ['/admin/users', '/admin/orders', '/admin/meals', '/admin/categories', '/admin/dashboard', '/admin/tables', '/admin/settings'],
  permissions: ['full-access'],
};

export const customerRole: UserRole = {
  title: UserRolesTitles.CUSTOMER,
  routes: ['/customer/online-menu', '/customer/menu'],
};

export const chefRole: UserRole = {
  title: UserRolesTitles.CHEF,
  routes: ['/admin/orders', '/customer/online-menu', '/customer/menu', '/admin/meals'],
  permissions: ['update-meal-status'],
};

export const waiterRole: UserRole = {
  title: UserRolesTitles.WAITER,
  routes: ['/admin/orders', '/customer/online-menu', '/customer/menu', '/admin/meals'],
  permissions: ['update-meal-status'],
};

export const roles = {
  admin: adminRole,
  customer: customerRole,
  chef: chefRole,
  waiter: waiterRole,
};