// 用户相关类型
export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

// 角色相关类型
export interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

// 权限相关类型
export interface Permission {
  id: number;
  name: string;
  description?: string;
  type: 'MENU' | 'BUTTON' | 'API';
  resource?: string;
  action?: string;
  createdAt: string;
  updatedAt: string;
}

// 商品相关类型
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: 'ELECTRONICS' | 'CLOTHING' | 'BOOKS' | 'FOOD' | 'OTHER';
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// 订单相关类型
export interface Order {
  id: number;
  orderNumber: string;
  user: User;
  orderItems: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress?: string;
  contactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

// 订单项类型
export interface OrderItem {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// 认证相关类型
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  fullName: string;
  email: string;
  roles: string[];
}

// 数据看板相关类型
export interface DashboardData {
  totalSales: number;
  totalOrders: number;
  growthRate: number;
  conversionRate: number;
  salesTrends: SalesTrend[];
  categoryData: CategoryData[];
  orderStatusData: OrderStatusData[];
}

export interface SalesTrend {
  date: string;
  amount: number;
}

export interface CategoryData {
  category: string;
  count: number;
  percentage: number;
}

export interface OrderStatusData {
  status: string;
  count: number;
}

// API响应类型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
} 