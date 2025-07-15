package com.ecommerce.admin.config;

import com.ecommerce.admin.entity.*;
import com.ecommerce.admin.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // 初始化权限
        if (permissionRepository.count() == 0) {
            Permission userRead = new Permission();
            userRead.setName("USER_READ");
            userRead.setDescription("查看用户");
            userRead.setType(Permission.PermissionType.API);
            userRead.setResource("USER");
            userRead.setAction("READ");
            permissionRepository.save(userRead);
            
            Permission userWrite = new Permission();
            userWrite.setName("USER_WRITE");
            userWrite.setDescription("管理用户");
            userWrite.setType(Permission.PermissionType.API);
            userWrite.setResource("USER");
            userWrite.setAction("WRITE");
            permissionRepository.save(userWrite);
            
            Permission productRead = new Permission();
            productRead.setName("PRODUCT_READ");
            productRead.setDescription("查看商品");
            productRead.setType(Permission.PermissionType.API);
            productRead.setResource("PRODUCT");
            productRead.setAction("READ");
            permissionRepository.save(productRead);
            
            Permission productWrite = new Permission();
            productWrite.setName("PRODUCT_WRITE");
            productWrite.setDescription("管理商品");
            productWrite.setType(Permission.PermissionType.API);
            productWrite.setResource("PRODUCT");
            productWrite.setAction("WRITE");
            permissionRepository.save(productWrite);
            
            Permission orderRead = new Permission();
            orderRead.setName("ORDER_READ");
            orderRead.setDescription("查看订单");
            orderRead.setType(Permission.PermissionType.API);
            orderRead.setResource("ORDER");
            orderRead.setAction("READ");
            permissionRepository.save(orderRead);
            
            Permission orderWrite = new Permission();
            orderWrite.setName("ORDER_WRITE");
            orderWrite.setDescription("管理订单");
            orderWrite.setType(Permission.PermissionType.API);
            orderWrite.setResource("ORDER");
            orderWrite.setAction("WRITE");
            permissionRepository.save(orderWrite);
        }
        
        // 初始化角色
        if (roleRepository.count() == 0) {
            Role adminRole = new Role();
            adminRole.setName("ADMIN");
            adminRole.setDescription("管理员");
            adminRole.setPermissions(new HashSet<>(permissionRepository.findAll()));
            roleRepository.save(adminRole);
            
            Role userRole = new Role();
            userRole.setName("USER");
            userRole.setDescription("普通用户");
            userRole.setPermissions(new HashSet<>(Arrays.asList(
                permissionRepository.findByName("PRODUCT_READ").orElse(null),
                permissionRepository.findByName("ORDER_READ").orElse(null)
            )));
            roleRepository.save(userRole);
        }
        
        // 初始化用户
        if (userRepository.count() == 0) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setEmail("admin@example.com");
            adminUser.setFullName("管理员");
            adminUser.setStatus(User.UserStatus.ACTIVE);
            adminUser.setRoles(new HashSet<>(Arrays.asList(
                roleRepository.findByName("ADMIN").orElse(null)
            )));
            userRepository.save(adminUser);
            
            User normalUser = new User();
            normalUser.setUsername("user");
            normalUser.setPassword(passwordEncoder.encode("user123"));
            normalUser.setEmail("user@example.com");
            normalUser.setFullName("普通用户");
            normalUser.setStatus(User.UserStatus.ACTIVE);
            normalUser.setRoles(new HashSet<>(Arrays.asList(
                roleRepository.findByName("USER").orElse(null)
            )));
            userRepository.save(normalUser);
        }
        
        // 初始化商品
        if (productRepository.count() == 0) {
            Product product1 = new Product();
            product1.setName("iPhone 15");
            product1.setDescription("最新款iPhone");
            product1.setPrice(new BigDecimal("7999.00"));
            product1.setStock(100);
            product1.setCategory(Product.ProductCategory.ELECTRONICS);
            product1.setStatus(Product.ProductStatus.ACTIVE);
            product1.setImageUrl("https://example.com/iphone15.jpg");
            productRepository.save(product1);
            
            Product product2 = new Product();
            product2.setName("MacBook Pro");
            product2.setDescription("专业级笔记本电脑");
            product2.setPrice(new BigDecimal("12999.00"));
            product2.setStock(50);
            product2.setCategory(Product.ProductCategory.ELECTRONICS);
            product2.setStatus(Product.ProductStatus.ACTIVE);
            product2.setImageUrl("https://example.com/macbook.jpg");
            productRepository.save(product2);
            
            Product product3 = new Product();
            product3.setName("Nike运动鞋");
            product3.setDescription("舒适的运动鞋");
            product3.setPrice(new BigDecimal("599.00"));
            product3.setStock(200);
            product3.setCategory(Product.ProductCategory.CLOTHING);
            product3.setStatus(Product.ProductStatus.ACTIVE);
            product3.setImageUrl("https://example.com/nike.jpg");
            productRepository.save(product3);
        }
    }
}
