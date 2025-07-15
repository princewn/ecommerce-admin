package com.ecommerce.admin.service;

import com.ecommerce.admin.dto.DashboardData;
import com.ecommerce.admin.repository.OrderRepository;
import com.ecommerce.admin.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    
    public DashboardData getDashboardData() {
        DashboardData dashboardData = new DashboardData();
        
        // 获取总销售额
        BigDecimal totalSales = orderRepository.getTotalSales();
        dashboardData.setTotalSales(totalSales != null ? totalSales : BigDecimal.ZERO);
        
        // 获取总订单数
        Long totalOrders = orderRepository.getTotalOrders();
        dashboardData.setTotalOrders(totalOrders != null ? totalOrders : 0L);
        
        // 计算同比增长（模拟数据）
        dashboardData.setGrowthRate(new BigDecimal("15.5"));
        
        // 计算转化率（模拟数据）
        dashboardData.setConversionRate(new BigDecimal("3.2"));
        
        // 获取销售趋势数据
        dashboardData.setSalesTrends(getSalesTrends());
        
        // 获取品类数据
        dashboardData.setCategoryData(getCategoryData());
        
        // 获取订单状态数据
        dashboardData.setOrderStatusData(getOrderStatusData());
        
        return dashboardData;
    }
    
    private List<DashboardData.SalesTrend> getSalesTrends() {
        List<DashboardData.SalesTrend> trends = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        
        // 模拟最近7天的销售数据
        for (int i = 6; i >= 0; i--) {
            LocalDateTime date = LocalDateTime.now().minusDays(i);
            DashboardData.SalesTrend trend = new DashboardData.SalesTrend();
            trend.setDate(date.format(formatter));
            trend.setAmount(new BigDecimal(1000 + Math.random() * 2000).setScale(2, RoundingMode.HALF_UP));
            trends.add(trend);
        }
        
        return trends;
    }
    
    private List<DashboardData.CategoryData> getCategoryData() {
        List<DashboardData.CategoryData> categoryData = new ArrayList<>();
        
        // 获取品类统计数据
        List<Object[]> categoryStats = productRepository.countByCategory();
        Long totalProducts = productRepository.count();
        
        for (Object[] stat : categoryStats) {
            DashboardData.CategoryData data = new DashboardData.CategoryData();
            data.setCategory(stat[0].toString());
            data.setCount((Long) stat[1]);
            
            if (totalProducts > 0) {
                BigDecimal percentage = new BigDecimal(data.getCount())
                    .divide(new BigDecimal(totalProducts), 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"));
                data.setPercentage(percentage);
            } else {
                data.setPercentage(BigDecimal.ZERO);
            }
            
            categoryData.add(data);
        }
        
        return categoryData;
    }
    
    private List<DashboardData.OrderStatusData> getOrderStatusData() {
        List<DashboardData.OrderStatusData> statusData = new ArrayList<>();
        
        // 获取订单状态统计数据
        List<Object[]> statusStats = orderRepository.countByStatus();
        
        for (Object[] stat : statusStats) {
            DashboardData.OrderStatusData data = new DashboardData.OrderStatusData();
            data.setStatus(stat[0].toString());
            data.setCount((Long) stat[1]);
            statusData.add(data);
        }
        
        return statusData;
    }
} 