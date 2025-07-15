package com.ecommerce.admin.service;

import com.ecommerce.admin.dto.RoleDto;
import com.ecommerce.admin.entity.Permission;
import com.ecommerce.admin.entity.Role;
import com.ecommerce.admin.repository.PermissionRepository;
import com.ecommerce.admin.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleService {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PermissionRepository permissionRepository;
    
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }
    
    public Role createRole(RoleDto roleDto) {
        Role role = new Role();
        role.setName(roleDto.getName());
        role.setDescription(roleDto.getDescription());
        
        if (roleDto.getPermissionIds() != null) {
            Set<Permission> permissions = roleDto.getPermissionIds().stream()
                .map(id -> permissionRepository.findById(id).orElse(null))
                .filter(permission -> permission != null)
                .collect(Collectors.toSet());
            role.setPermissions(permissions);
        }
        
        return roleRepository.save(role);
    }
    
    public Role updateRole(Long id, RoleDto roleDto) {
        Role role = roleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("角色不存在"));
        
        role.setName(roleDto.getName());
        role.setDescription(roleDto.getDescription());
        
        if (roleDto.getPermissionIds() != null) {
            Set<Permission> permissions = roleDto.getPermissionIds().stream()
                .map(permissionId -> permissionRepository.findById(permissionId).orElse(null))
                .filter(permission -> permission != null)
                .collect(Collectors.toSet());
            role.setPermissions(permissions);
        }
        
        return roleRepository.save(role);
    }
    
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
    
    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }
} 