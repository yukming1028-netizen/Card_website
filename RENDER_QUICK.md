# 快速部署到 Render

使用 Docker 鏡像快速部署寶可夢卡牌查詢系統到 Render 平台。

## 🚀 一鍵部署

### 前置條件

1. ✅ Aiven PostgreSQL 已初始化
2. ✅ GitHub 倉庫已創建
3. ✅ Dockerfile 已準備

### 部署步驟

#### 1. 後端部署

在 [Render Dashboard](https://dashboard.render.com) 創建 **Web Service**：

**基本信息**：
```
Name: card-inventory-backend
Region: Singapore（或最接近你的區域）
Branch: main
Root Directory: backend
```

**構建配置**：
```
Runtime: Docker
DockerfilePath: Dockerfile.render
```

**環境變量**：
```bash
DB_HOST=<你的數據庫主機>
DB_PORT=22265
DB_NAME=defaultdb
DB_USER=<你的數據庫用戶名>
DB_PASSWORD=<你的數據庫密碼>
PORT=3000
STATIC_KEY=<你的金輪>
```

#### 2. 前端部署

在 Render 創建 **Web Service**：

**基本信息**：
```
Name: card-inventory-frontend
Region: Singapore（與後端相同）
Branch: main
Root Directory: frontend
```

**構建配置**：
```
Runtime: Docker
DockerfilePath: Dockerfile.render
```

**環境變量**（可選）：
```bash
REACT_APP_API_URL=https://card-inventory-backend.onrender.com/api
```

## 📦 Docker 鏡像說明

### 後端（backend/Dockerfile.render）

- **基礎鏡像**：Node.js 18 Alpine
- **鏡像大小**：~150-200 MB
- **端口**：3000
- **特點**：
  - 非 root 用戶運行
  - 正確的信号處理
  - 生產環境優化

### 前端（frontend/Dockerfile.render）

- **基礎鏡像**：Nginx Alpine
- **鏡像大小**：~25-35 MB
- **端口**：80
- **特點**：
  - 多階段構建
  - 靜態資源優化
  - React Router 支持
  - gzip 壓縮

## 🌐 訪問應用

部署完成後，你可以通過以下 URL 訪問：

- **前端**：`https://card-inventory-frontend.onrender.com`
- **後端 API**：`https://card-inventory-backend.onrender.com/api`
- **管理面板**：`https://card-inventory-frontend.onrender.com/card_admin`

## 🔑 管理員登入

- **URL**：`https://你的前端域名/card_admin`
- **用戶名**：`admin`
- **密碼**：`admin123`

⚠️ **首次登入後請立即修改密碼！**

## 🧪 測試卡牌

使用以下卡牌編號測試：

- 皮卡丘：001-010
- 噴火龍：101
- 水箭龜：102
- 妙蛙種子：103
- 超夢：201
- 耿鬼：301
- 快龍：401
- 雷丘：501-503

## 🔄 更新部署

推送代碼到 GitHub 後，Render 會自動部署：

```bash
git add .
git commit -m "Update application"
git push origin main
```

## 📊 監控

在 Render Dashboard 中：
- 查看 **Logs**（構建和運行時日誌）
- 查看 **Metrics**（CPU、記憶體、請求）
- 設置 **Alerts**（警報通知）

## 🐛 常見問題

### 構建失敗

1. 檢查環境變量是否正確
2. 查看構建日誌
3. 確認 Dockerfile 路徑正確

### 無法連接數據庫

1. 檢查數據庫環境變量
2. 確認 Aiven 數據庫正在運行
3. 檢查數據庫密碼

### 前端無法訪問後端

1. 確認後端服務正在運行
2. 檢查 API URL 配置
3. 查看 CORS 設置

## 📖 詳細文檔

- **完整部署指南**：`RENDER_DOCKER.md`
- **項目文檔**：`README.md`
- **GitHub 設置**：`GITHUB_SETUP.md`

## 💰 免費層級限制

Render 免費層級：
- **Web Service**：512 MB RAM，自動休眠
- **Static Site**：無限流量，無休眠

**推薦配置**：
- 後端：Web Service（Docker）
- 前端：Static Site（更快速）

---

**祝部署順利！** 🦐
