package com.ecommerce.admin.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class DashboardData {
    
    private BigDecimal totalSales;
    private Long totalOrders;
    private BigDecimal growthRate;
    private BigDecimal conversionRate;
    
    private List<SalesTrend> salesTrends;
    private List<CategoryData> categoryData;
    private List<OrderStatusData> orderStatusData;
    
    public static class SalesTrend {
        private String date;
        private BigDecimal amount;
        
        // Constructors
        public SalesTrend() {}
        
        public SalesTrend(String date, BigDecimal amount) {
            this.date = date;
            this.amount = amount;
        }
        
        // Getters and Setters
        public String getDate() {
            return date;
        }
        
        public void setDate(String date) {
            this.date = date;
        }
        
        public BigDecimal getAmount() {
            return amount;
        }
        
        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }
    }
    
    public static class CategoryData {
        private String category;
        private Long count;
        private BigDecimal percentage;
        
        // Constructors
        public CategoryData() {}
        
        public CategoryData(String category, Long count, BigDecimal percentage) {
            this.category = category;
            this.count = count;
            this.percentage = percentage;
        }
        
        // Getters and Setters
        public String getCategory() {
            return category;
        }
        
        public void setCategory(String category) {
            this.category = category;
        }
        
        public Long getCount() {
            return count;
        }
        
        public void setCount(Long count) {
            this.count = count;
        }
        
        public BigDecimal getPercentage() {
            return percentage;
        }
        
        public void setPercentage(BigDecimal percentage) {
            this.percentage = percentage;
        }
    }
    
    public static class OrderStatusData {
        private String status;
        private Long count;
        
        // Constructors
        public OrderStatusData() {}
        
        public OrderStatusData(String status, Long count) {
            this.status = status;
            this.count = count;
        }
        
        // Getters and Setters
        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
        
        public Long getCount() {
            return count;
        }
        
        public void setCount(Long count) {
            this.count = count;
        }
    }
    
    // Constructors
    public DashboardData() {}
    
    public DashboardData(BigDecimal totalSales, Long totalOrders, BigDecimal growthRate, BigDecimal conversionRate, List<SalesTrend> salesTrends, List<CategoryData> categoryData, List<OrderStatusData> orderStatusData) {
        this.totalSales = totalSales;
        this.totalOrders = totalOrders;
        this.growthRate = growthRate;
        this.conversionRate = conversionRate;
        this.salesTrends = salesTrends;
        this.categoryData = categoryData;
        this.orderStatusData = orderStatusData;
    }
    
    // Getters and Setters
    public BigDecimal getTotalSales() {
        return totalSales;
    }
    
    public void setTotalSales(BigDecimal totalSales) {
        this.totalSales = totalSales;
    }
    
    public Long getTotalOrders() {
        return totalOrders;
    }
    
    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }
    
    public BigDecimal getGrowthRate() {
        return growthRate;
    }
    
    public void setGrowthRate(BigDecimal growthRate) {
        this.growthRate = growthRate;
    }
    
    public BigDecimal getConversionRate() {
        return conversionRate;
    }
    
    public void setConversionRate(BigDecimal conversionRate) {
        this.conversionRate = conversionRate;
    }
    
    public List<SalesTrend> getSalesTrends() {
        return salesTrends;
    }
    
    public void setSalesTrends(List<SalesTrend> salesTrends) {
        this.salesTrends = salesTrends;
    }
    
    public List<CategoryData> getCategoryData() {
        return categoryData;
    }
    
    public void setCategoryData(List<CategoryData> categoryData) {
        this.categoryData = categoryData;
    }
    
    public List<OrderStatusData> getOrderStatusData() {
        return orderStatusData;
    }
    
    public void setOrderStatusData(List<OrderStatusData> orderStatusData) {
        this.orderStatusData = orderStatusData;
    }
} 