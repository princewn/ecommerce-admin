package com.ecommerce.admin.service;

import com.ecommerce.admin.dto.LoginRequest;
import com.ecommerce.admin.dto.LoginResponse;
import com.ecommerce.admin.entity.User;
import com.ecommerce.admin.repository.UserRepository;
import com.ecommerce.admin.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

@Service
public class AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;
    
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), 
                loginRequest.getPassword()
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userRepository.findByUsername(loginRequest.getUsername())
            .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        String token = jwtUtil.generateToken(user.getUsername());
        
        String[] roles = user.getRoles().stream()
            .map(role -> role.getName())
            .toArray(String[]::new);
        
        return new LoginResponse(
            token,
            user.getUsername(),
            user.getFullName(),
            user.getEmail(),
            roles
        );
    }
} 