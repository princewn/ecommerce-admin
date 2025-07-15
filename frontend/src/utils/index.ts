// 格式化金额
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount);
};

// 格式化日期
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('zh-CN');
};

// 格式化日期时间
export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('zh-CN');
};

// 获取商品类别显示名称
export const getCategoryDisplayName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    ELECTRONICS: '电子产品',
    CLOTHING: '服装',
    BOOKS: '图书',
    FOOD: '食品',
    OTHER: '其他',
  };
  return categoryMap[category] || category;
};

// 获取商品状态显示名称
export const getProductStatusDisplayName = (status: string): string => {
  const statusMap: Record<string, string> = {
    ACTIVE: '上架',
    INACTIVE: '下架',
    OUT_OF_STOCK: '缺货',
  };
  return statusMap[status] || status;
};

// 获取订单状态显示名称
export const getOrderStatusDisplayName = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: '待确认',
    CONFIRMED: '已确认',
    SHIPPED: '已发货',
    DELIVERED: '已送达',
    CANCELLED: '已取消',
  };
  return statusMap[status] || status;
};

// 获取状态标签颜色
export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    ACTIVE: 'green',
    INACTIVE: 'red',
    OUT_OF_STOCK: 'orange',
    PENDING: 'blue',
    CONFIRMED: 'cyan',
    SHIPPED: 'purple',
    DELIVERED: 'green',
    CANCELLED: 'red',
  };
  return colorMap[status] || 'default';
};

// 验证邮箱格式
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证手机号格式
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// 生成随机ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
}; 