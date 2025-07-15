# 电商管理后台系统

一个基于Spring Boot + React + Ant Design的现代化电商管理后台系统。

## 项目结构

```
ecommerce-admin/
├── backend/                 # Spring Boot后端
│   ├── src/main/java/
│   │   └── com/ecommerce/admin/
│   │       ├── controller/  # 控制器层
│   │       ├── service/     # 服务层
│   │       ├── repository/  # 数据访问层
│   │       ├── entity/      # 实体类
│   │       ├── dto/         # 数据传输对象
│   │       ├── config/      # 配置类
│   │       └── util/        # 工具类
│   └── src/main/resources/
│       └── application.yml  # 配置文件
└── frontend/                # React前端
    ├── src/
    │   ├── components/      # 组件
    │   ├── pages/          # 页面
    │   ├── services/       # API服务
    │   ├── types/          # TypeScript类型
    │   └── utils/          # 工具函数
    └── package.json
```

## 功能特性

### 核心模块

1. **数据看板**
   - 销售趋势折线图
   - 品类占比饼图
   - 关键指标统计
   - 响应式布局

2. **商品管理**
   - 商品列表展示
   - 分页、筛选、排序
   - 添加、编辑、删除商品
   - 图片上传支持
   - 批量操作

3. **权限管理**
   - 角色管理
   - 权限分配
   - 树形权限展示
   - 动态路由生成

### 技术栈

**后端**
- Spring Boot 2.7.0
- Spring Security + JWT
- Spring Data JPA
- MySQL 8.0
- Maven

**前端**
- React 18
- TypeScript
- Ant Design 5.x
- React Router 6
- Axios
- @ant-design/plots

## 快速开始

### 环境要求

- JDK 11+
- Node.js 16+
- MySQL 8.0+

### 后端启动

1. 创建数据库
```sql
CREATE DATABASE ecommerce_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 修改数据库配置
编辑 `backend/src/main/resources/application.yml`，修改数据库连接信息。

3. 启动后端服务
```bash
cd backend
mvn spring-boot:run
```

后端服务将在 `http://localhost:8080` 启动。

### 前端启动

1. 安装依赖
```bash
cd frontend
npm install
```

2. 启动开发服务器
```bash
npm start
```

前端应用将在 `http://localhost:3000` 启动。

### 默认账户

- 管理员：admin / admin123
- 商品管理员：product_manager / pm123

## API文档

### 认证相关

- `POST /api/auth/login` - 用户登录

### 数据看板

- `GET /api/dashboard/data` - 获取看板数据

### 商品管理

- `GET /api/products` - 获取商品列表
- `POST /api/products` - 创建商品
- `PUT /api/products/{id}` - 更新商品
- `DELETE /api/products/{id}` - 删除商品
- `GET /api/products/search` - 搜索商品
- `GET /api/products/category/{category}` - 按类别获取商品

### 权限管理

- `GET /api/roles` - 获取角色列表
- `POST /api/roles` - 创建角色
- `PUT /api/roles/{id}` - 更新角色
- `DELETE /api/roles/{id}` - 删除角色
- `GET /api/roles/permissions` - 获取权限列表

## 开发指南

### 后端开发

1. 实体类设计
   - 使用JPA注解
   - 实现审计功能
   - 添加验证注解

2. 服务层开发
   - 业务逻辑封装
   - 异常处理
   - 事务管理

3. 控制器开发
   - RESTful API设计
   - 参数验证
   - 统一响应格式

### 前端开发

1. 组件开发
   - 函数式组件
   - TypeScript类型定义
   - 响应式设计

2. 状态管理
   - React Hooks
   - 本地状态管理
   - API调用封装

3. 路由管理
   - 路由守卫
   - 权限控制
   - 懒加载

## 部署

### 后端部署

1. 打包
```bash
cd backend
mvn clean package
```

2. 运行
```bash
java -jar target/admin-backend-1.0.0.jar
```

### 前端部署

1. 构建
```bash
cd frontend
npm run build
```

2. 部署到Web服务器（如Nginx）

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或联系开发团队。 