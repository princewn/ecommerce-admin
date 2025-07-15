package com.ecommerce.admin.dto;

public class LoginResponse {
    
    private String token;
    private String username;
    private String fullName;
    private String email;
    private String[] roles;
    
    // Constructors
    public LoginResponse() {}
    
    public LoginResponse(String token, String username, String fullName, String email, String[] roles) {
        this.token = token;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.roles = roles;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String[] getRoles() {
        return roles;
    }
    
    public void setRoles(String[] roles) {
        this.roles = roles;
    }
} 