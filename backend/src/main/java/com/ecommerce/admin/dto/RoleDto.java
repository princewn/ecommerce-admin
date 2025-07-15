package com.ecommerce.admin.dto;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class RoleDto {
    
    private Long id;
    
    @NotBlank(message = "角色名称不能为空")
    private String name;
    
    private String description;
    
    private List<Long> permissionIds;
    
    // Constructors
    public RoleDto() {}
    
    public RoleDto(Long id, String name, String description, List<Long> permissionIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.permissionIds = permissionIds;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public List<Long> getPermissionIds() {
        return permissionIds;
    }
    
    public void setPermissionIds(List<Long> permissionIds) {
        this.permissionIds = permissionIds;
    }
} 