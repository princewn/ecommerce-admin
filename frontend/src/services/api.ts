import axios from 'axios';
import { LoginRequest, LoginResponse, Product, Role, Permission, DashboardData, PageResponse } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 认证相关API
export const authAPI = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    api.post('/auth/login', data).then(res => res.data),
};

// 数据看板相关API
export const dashboardAPI = {
  getDashboardData: (): Promise<DashboardData> =>
    api.get('/dashboard/data').then(res => res.data),
};

// 商品相关API
export const productAPI = {
  getProducts: (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  } = {}): Promise<PageResponse<Product>> =>
    api.get('/products', { params }).then(res => res.data),

  searchProducts: (name: string, params: {
    page?: number;
    size?: number;
  } = {}): Promise<PageResponse<Product>> =>
    api.get('/products/search', { params: { name, ...params } }).then(res => res.data),

  getProductsByCategory: (category: string, params: {
    page?: number;
    size?: number;
  } = {}): Promise<PageResponse<Product>> =>
    api.get(`/products/category/${category}`, { params }).then(res => res.data),

  getProduct: (id: number): Promise<Product> =>
    api.get(`/products/${id}`).then(res => res.data),

  createProduct: (data: Partial<Product>): Promise<Product> =>
    api.post('/products', data).then(res => res.data),

  updateProduct: (id: number, data: Partial<Product>): Promise<Product> =>
    api.put(`/products/${id}`, data).then(res => res.data),

  deleteProduct: (id: number): Promise<void> =>
    api.delete(`/products/${id}`).then(res => res.data),

  getCategoryStats: (): Promise<any[]> =>
    api.get('/products/stats/category').then(res => res.data),

  getTotalStock: (): Promise<number> =>
    api.get('/products/stats/stock').then(res => res.data),

  getActiveProductCount: (): Promise<number> =>
    api.get('/products/stats/active').then(res => res.data),
};

// 角色相关API
export const roleAPI = {
  getRoles: (): Promise<Role[]> =>
    api.get('/roles').then(res => res.data),

  getRole: (id: number): Promise<Role> =>
    api.get(`/roles/${id}`).then(res => res.data),

  createRole: (data: Partial<Role>): Promise<Role> =>
    api.post('/roles', data).then(res => res.data),

  updateRole: (id: number, data: Partial<Role>): Promise<Role> =>
    api.put(`/roles/${id}`, data).then(res => res.data),

  deleteRole: (id: number): Promise<void> =>
    api.delete(`/roles/${id}`).then(res => res.data),

  getPermissions: (): Promise<Permission[]> =>
    api.get('/roles/permissions').then(res => res.data),
};

export default api; 