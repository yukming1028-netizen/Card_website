# Render Docker 部署指南

本指南說明如何使用 Docker 鏡像將寶可夢卡牌查詢系統部署到 Render 平台。

## 📋 部署架構

```
                    ┌─────────────┐
                    │   Render    │
                    │   (Cloud)   │
                    └──────┬──────┘
                           │
                  ┌────────┴────────┐
                  │                 │
           ┌──────▼──────┐  ┌──────▼──────┐
           │  Frontend   │  │   Backend   │
           │   (Web)     │  │  (Service)  │
           │   :80/3000  │  │   :3000     │
           └─────────────┘  └──────┬──────┘
                                    │
                            ┌───────▼────────┐
                            │   PostgreSQL    │
                            │   (Aiven)      │
                            │   :22265       │
                            └────────────────┘
```

## 🚀 部署方式選擇

### 方式 1：分別部署（推薦）

分別為後端和前端創建 Render 服務。

### 方式 2：使用 Docker（適合專業用戶）

使用 Render 的 Docker 部署功能。

---

## 📦 Docker 鏡像說明

### 後端 Dockerfile（`Dockerfile.backend`）

**位置**：項目根目錄

**特點**：
- ✅ 使用 Node.js 18 Alpine（輕量級）
- ✅ 非 root 用戶運行（提高安全性）
- ✅ 正確的信号處理（使用 dumb-init）
- ✅ 生產環境優化

**鏡像大小**：約 150-200 MB

**端口**：3000

### 前端 Dockerfile（`Dockerfile.frontend`）

**位置**：項目根目錄

**特點**：
- ✅ 多階段構建（構建 + 生產）
- ✅ 使用 nginx（高性能靜態文件服務器）
- ✅ React Router 支持（SPA 路由）
- ✅ gzip 壓縮
- ✅ 靜態資源緩存
- ✅ 安全頭配置

**鏡像大小**：約 25-35 MB

**端口**：80

---

## 🔧 方式 1：直接部署（無需 Docker）

Render 支持直接從 GitHub 構建，無需 Docker。

### 部署後端

1. 登入 [Render Dashboard](https://dashboard.render.com)
2. 點擊 **New +** → **Web Service**
3. 連接 GitHub 倉庫：`solutioinquick852-art/Card_website`
4. 配置：

   ```
   Name: card-inventory-backend
   Region: Singapore（或其他）
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: node index.js
   ```

5. 設置環境變量：

   ```
   DB_HOST=<你的數據庫主機>
   DB_PORT=22265
   DB_NAME=defaultdb
   DB_USER=<你的數據庫用戶名>
   DB_PASSWORD=<你的數據庫密碼>
   PORT=3000
   STATIC_KEY=<你的金輪>
   ```

6. 點擊 **Create Web Service**

### 部署前端

1. 點擊 **New +** → **Web Service** 或 **Static Site**
2. 連接 GitHub 倉庫：`solutioinquick852-art/Card_website`
3. 配置：

   **如果使用 Web Service：**
   ```
   Name: card-inventory-frontend
   Region: Singapore（或其他）
   Branch: main
   Root Directory: frontend
   Runtime: Node
   Build Command: npm run build
   Start Command: npm install -g serve && serve -s build -l 3000
   ```

   **如果使用 Static Site（推薦）：**
   ```
   Name: card-inventory-frontend
   Region: Singapore（或其他）
   Branch: main
   Root Directory: frontend
   Build Command: npm run build
   Publish Directory: build
   ```

4. 點擊 **Create Web Service**

---

## 🐳 方式 2：Docker 部署（推薦）

### 部署後端（Docker）

1. 在 Render 創建 **New Web Service**
2. 連接 GitHub 倉庫
3. 配置：

   ```
   Name: card-inventory-backend
   Region: Singapore
   Branch: main
   Root Directory: .
   Runtime: Docker
   DockerfilePath: Dockerfile.backend
   ```

4. 設置環境變量（同方式 1）
5. 點擊 **Create Web Service**

### 部署前端（Docker）

1. 在 Render 創建 **New Web Service**
2. 連接 GitHub 倉庫
3. 配置：

   ```
   Name: card-inventory-frontend
   Region: Singapore
   Branch: main
   Root Directory: .
   Runtime: Docker
   DockerfilePath: Dockerfile.frontend
   ```

4. 點擊 **Create Web Service**

---

## 🔑 環境變量說明

### 後端必需的環境變量

```bash
# 數據庫配置
DB_HOST=<你的數據庫主機>
DB_PORT=22265
DB_NAME=defaultdb
DB_USER=<你的數據庫用戶名>
DB_PASSWORD=<你的數據庫密碼>

# 服務配置
PORT=3000
STATIC_KEY=<你的金輪>
```

### 前端配置

前端需要通過環境變量或直接在代碼中配置後端 API URL。

在 `frontend/src/App.jsx` 中修改：

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://你的後端域名.onrender.com/api';
```

在 Render 前端服務中設置：

```bash
REACT_APP_API_URL=https://card-inventory-backend.onrender.com/api
```

---

## 🌐 獲取 Render 域名

部署後，Render 會自動分配域名：

- **後端**：`https://card-inventory-backend.onrender.com`
- **前端**：`https://card-inventory-frontend.onrender.com`

你可以：
1. 在 Dashboard 中查看
2. 在 `Events` 標籤中查看構建日誌
3. 設置自定義域名（需驗證 DNS）

---

## 🧪 測試部署

### 1. 測試後端 API

```bash
curl https://你的後端域名.onrender.com/api/cards

curl https://你的後端域名.onrender.com/api/cards/001

curl https://你的後端域名.onrender.com/api/stats
```

### 2. 測試前端

打開瀏覽器訪問：
```
https://你的前端域名.onrender.com
```

### 3. 測試管理面板

訪問：
```
https://你的前端域名.onrender.com/card_admin
```

登入：
- 用戶名：`admin`
- 密碼：`admin123`

---

## 🔄 更新部署

### 自動部署

Render 會自動檢測 Git push 並重新部署：

```bash
git add .
git commit -m "Update application"
git push origin main
```

### 手動觸發

在 Render Dashboard 中：
1. 選擇你的服務
2. 點擊 **Manual Deploy**
3. 選擇分支
4. 點擊 **Deploy**

---

## 📊 監控和日誌

### 查看日誌

1. 在 Render Dashboard 中選擇服務
2. 點擊 **Logs** 標籤
3. 選擇日誌類型：
   - **Build logs**：構建日誌
   - **Service logs**：運行時日誌

### 監控指標

- **CPU 使用率**
- **記憶體使用率**
- **請求數量**
- **響應時間**

### 設置警報

在 Dashboard 中可以設置：
- CPU 超過 80%
- 記憶體超過 80%
- 錯誤率超過 5%

---

## 💰 免費層級限制

Render 免費層級限制：

- **Web Service**：
  - 512 MB RAM
  - 0.1 CPU
  - 750 小時/月（約 1 月）
  - 自動休眠（15 分鐘無活動）
  - 冷啟動需要幾秒鐘

- **Static Site**：
  - 無限制流量
  - 無限制帶寬
  - 快速部署
  - 無休眠

---

## 🐛 常見問題

### 1. 後端連接不上數據庫

**原因**：數據庫配置錯誤

**解決**：
1. 檢查環境變量
2. 確認數據庫密碼正確
3. 檢查 Aiven 數據庫是否運行

### 2. 前端無法訪問後端 API

**原因**：CORS 錯誤或 API URL 配置錯誤

**解決**：
1. 確認後端 CORS 配置
2. 檢查前端 API URL 配置
3. 確認後端服務正在運行

### 3. 構建失敗

**原因**：依賴錯誤或配置錯誤

**解決**：
1. 查看構建日誌
2. 檢查 `package.json`
3. 確認所有依賴正確安裝

### 4. Docker 鏡像太大

**原因**：Dockerfile 沒有優化

**解決**：
1. 使用 Alpine 鏡像
2. 多階段構建
3. 清理不必要的文件

### 5. 自動休眠導致響應慢

**原因**：免費層級自動休眠

**解決**：
1. 使用 Cron Job 保持喚醒
2. 升級到付費層級
3. 使用 Static Site（無休眠）

---

## 📝 總結

### 推薦部署方式

**生產環境**：
- 後端：Docker 部署（Web Service）
- 前端：Docker 部署（Web Service）

**開發/測試**：
- 後端：直接部署（Web Service）
- 前端：直接部署（Web Service 或 Static Site）

### 關鍵點

1. ✅ 正確配置環境變量
2. ✅ 使用優化的 Dockerfile
3. ✅ 設置適當的端口和路徑
4. ✅ 測試 API 和前端功能
5. ✅ 監控日誌和指標

### 下一步

1. 完成部署
2. 測試所有功能
3. 設置自定義域名（可選）
4. 配置監控和警報
5. 備份數據庫（定期）

---

## 📂 Dockerfile 位置

- **後端 Dockerfile**：`Dockerfile.backend`（根目錄）
- **前端 Dockerfile**：`frontend/Dockerfile`（可選，已棄用）
- **後端 Dockerfile**：`backend/Dockerfile`（可選，已棄用）

**推薦使用根目錄的 Dockerfile**：
- `Dockerfile.backend` - 用於後端部署
- `Dockerfile.frontend` - 用於前端部署

---

**版本**：1.1
**更新時間**：2026-03-02
**文檔維護者**：代碼蝦 🦐
