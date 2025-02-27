# 环信动态令牌生成器演示

基于 Node.js Express 的动态令牌生成服务，用于生成环信即时通讯普通用户登录所需的身份验证令牌。

## ✨ 功能特性

- 提供 REST API 接口生成动态令牌
- 使用 SHA-256 加密算法保证签名安全
- 支持自定义 Token 有效期（默认 10 分钟）
- 符合环信官方生成规范

## 🚀 快速开始

### 前置要求

- Node.js 14+
- npm 6+

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/Easemob-Community/easemob-dynamic-token-generator-demo.git

# 安装依赖
npm install

# 启动服务
node src/index.js or npm start
```
