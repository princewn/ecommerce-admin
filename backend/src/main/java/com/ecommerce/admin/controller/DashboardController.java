package com.ecommerce.admin.controller;

import com.ecommerce.admin.dto.DashboardData;
import com.ecommerce.admin.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
    
    @Autowired
    private DashboardService dashboardService;
    
    @GetMapping
    public ResponseEntity<DashboardData> getDashboardData() {
        DashboardData data = dashboardService.getDashboardData();
        return ResponseEntity.ok(data);
    }
    
    @GetMapping("/data")
    public ResponseEntity<DashboardData> getDashboardDataWithPath() {
        DashboardData data = dashboardService.getDashboardData();
        return ResponseEntity.ok(data);
    }
}
