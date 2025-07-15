package com.ecommerce.admin.service;

import com.ecommerce.admin.dto.ProductDto;
import com.ecommerce.admin.entity.Product;
import com.ecommerce.admin.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> searchProducts(String name, Pageable pageable) {
        return productRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    public Page<Product> getProductsByCategory(Product.ProductCategory category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setCategory(Product.ProductCategory.valueOf(productDto.getCategory().toUpperCase()));
        product.setStatus(Product.ProductStatus.valueOf(productDto.getStatus().toUpperCase()));
        product.setImageUrl(productDto.getImageUrl());
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("商品未找到"));
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setCategory(Product.ProductCategory.valueOf(productDto.getCategory().toUpperCase()));
        product.setStatus(Product.ProductStatus.valueOf(productDto.getStatus().toUpperCase()));
        product.setImageUrl(productDto.getImageUrl());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Object[]> getCategoryStats() {
        return productRepository.countByCategory();
    }

    public Long getTotalStock() {
        return productRepository.getTotalStock();
    }

    public Long getActiveProductCount() {
        return productRepository.getActiveProductCount();
    }
}
