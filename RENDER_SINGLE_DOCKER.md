# 單一 Docker Image 部署指南

本指南說明如何使用單一 Docker image 將寶可夢卡牌查詢系統部署到 Render 平台。

## 📋 架構說明

```
┌─────────────────────────────────────────┐
│         Docker Container               │
│                                      │
│  ┌──────────────┐  ┌─────────────┐  │
│  │  Frontend    │  │   Backend   │  │
│  │  (Nginx)    │  │  (Node.js)  │  │
│  │   Port: 80   │  │  Port: 3000 │  │
│  └──────┬───────┘  └──────┬──────┘  │
│         │                   │         │
│         └────────┬────────┘         │
│                  ↓                  │
│            ┌──────────┐            │
│            │   容器   │            │
│            │ Port 80  │            │
│            └────┬─────┘            │
└─────────────────┼──────────────────┘
                  │
            ┌─────▼─────────┐
            │    Render     │
            │   (Cloud)     │
            └───────────────┘
```

## 🚀 部署方式

### 在 Render 上部署（推薦）

#### 1. 創建單一 Web Service

在 [Render Dashboard](https://dashboard.render.com) 創建 **Web Service**：

**基本信息**：
```
Name: card-inventory
Region: Singapore（或其他）
Branch: main
Root Directory: .
Runtime: Docker
DockerfilePath: Dockerfile
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

#### 2. 設置端口

Render 會自動檢測 Dockerfile 中的 `EXPOSE` 端口（80）。

## 📦 Dockerfile 說明

### 多階段構建

**階段 1：構建前端**
- 使用 Node.js 18 Alpine
- 構建 React 應用

**階段 2：準備後端**
- 使用 Node.js 18 Alpine
- 安裝生產依賴

**最終階段：整合**
- 使用 Node.js 18 Alpine
- 同時運行 Nginx（前端）和 Node.js（後端）
- Nginx 提供靜態文件服務
- Nginx 代理 API 請求到後端

### 服務配置

- **前端端口**：80（Nginx）
- **後端端口**：3000（Node.js，內部）
- **統一入口**：80 端口

### Nginx 代理

所有 API 請求通過 Nginx 代理：
- `/api/*` → `http://127.0.0.1:3000`
- `/admin-api/*` → `http://127.0.0.1:3000`

## 🌐 訪問應用

部署完成後，通過以下 URL 訪問：

- **主頁**：`https://card-inventory.onrender.com`
- **管理面板**：`https://card-inventory.onrender.com/card_admin`
- **API**：`https://card-inventory.onrender.com/api`

## 🔑 管理員登入

- **URL**：`https://你的域名/card_admin`
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

## 🔧 優勢

### 單一 Docker Image 的好處

1. **簡化部署**
   - 只需要一個 Web Service
   - 一個 Dockerfile 管理所有服務
   - 一個環境變量配置

2. **降低成本**
   - 只需要一個 Render 實例
   - 更資源利用率

3. **簡化管理**
   - 統一的日誌和監控
   - 統一的生命週期
   - 簡化的 CI/CD

4. **更好的性能**
   - 前端和後端在同一網絡
   - 零延遲的 API 調用
   - 更少的網絡跳躍

## 🐛 常見問題

### 1. 構建失敗

**原因**：依賴錯誤或配置錯誤

**解決**：
1. 查看構建日誌
2. 檢查 `package.json`
3. 確認所有依賴正確安裝

### 2. 無法連接數據庫

**原因**：數據庫配置錯誤

**解決**：
1. 檢查環境變量
2. 確認數據庫密碼正確
3. 檢查 Aiven 數據庫是否運行

### 3. 前端無法訪問 API

**原因**：Nginx 代理配置錯誤

**解決**：
1. 檢查 `nginx-render.conf`
2. 確認後端服務正在運行
3. 查看 Nginx 日誌

### 4. 端口衝突

**原因**：多個服務嘗試使用同一端口

**解決**：
1. 確認後端使用 3000 端口
2. 確認 Nginx 使用 80 端口
3. 檢查容器內的端口映射

## 📝 注意事項

1. **環境變量**
   - 所有環境變量對後端和前端都可用
   - 前端使用 `REACT_APP_` 前綴的變量

2. **日誌**
   - 後端日誌和 Nginx 日誌都會輸出到容器日誌
   - 在 Render Dashboard 的 Logs 標籤查看

3. **資源限制**
   - 免費層級：512 MB RAM
   - 確保兩個服務都有足夠資源

4. **性能優化**
   - Nginx 已配置 gzip 壓縮
   - 靜態資源已配置緩存
   - 考慮使用 CDN 進一步優化

## 📂 文件說明

- **Dockerfile** - 單一整合的 Dockerfile
- **nginx-render.conf** - Nginx 配置（代理 API 請求）
- **Dockerfile.backend** - 後端專用 Dockerfile（可選）
- **Dockerfile.frontend** - 前端專用 Dockerfile（可選）

## 🚀 快速開始

1. **初始化數據庫**
   ```bash
   npm install
   NODE_TLS_REJECT_UNAUTHORIZED=0 node database/init-aven.js
   ```

2. **本地測試**
   ```bash
   docker build -t card-inventory .
   docker run -p 80:80 -e DB_HOST=... card-inventory
   ```

3. **部署到 Render**
   - 按照「部署方式」部分操作

---

**版本**：2.0
**更新時間**：2026-03-02
**文檔維護者**：代碼蝦 🦐
