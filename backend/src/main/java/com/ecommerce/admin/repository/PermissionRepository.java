package com.ecommerce.admin.repository;

import com.ecommerce.admin.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    
    Optional<Permission> findByName(String name);
    
    List<Permission> findByType(Permission.PermissionType type);
    
    boolean existsByName(String name);
} 