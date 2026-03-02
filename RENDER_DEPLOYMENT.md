# Render 部署指南

本指南介紹如何將寶可夢卡牌查詢系統部署到 Render 平台。

## 📋 前置準備

在開始之前，確保你已經：

- ✅ 準備好代碼（使用我們的 card-inventory 項目）
- ✅ 創建了 GitHub 帳戶（免費）
- ✅ 安裝了 Git 客戶端
- ✅ 項目已推送到 GitHub

## 🚀 部署步驟

### 第一步：推送到 GitHub

```bash
cd card-inventory
git init
git add .
git commit -m "Initial commit"

# 創建 GitHub repository 後
git remote add origin https://github.com/YOUR_USERNAME/card-inventory.git
git branch -M main
git push -u origin main
```

### 第二步：部署後端（Backend）

1. 登入 [Render Dashboard](https://dashboard.render.com)

2. 點擊 **New +**

3. 選擇 **Web Service**

4. 配置以下信息：

**Connect to：**
- Repository：`your-username/card-inventory`
- Branch：`main`
- Root Directory：`backend`

**Environment：**
- Name：`card-inventory-backend`（或你喜歡的名字）
- Region：`Singapore`（或離你最近的）
- Plan：`Free`

**Build & Deploy：**
- Runtime：`Node`
- Build Command：`npm install`
- Start Command：`node index.js`
- Instance Type：`Free`

**Environment Variables**（重要）：
```
DB_HOST=<你的PostgreSQL主機>
DB_PORT=5432
DB_NAME=card_inventory
DB_USER=<你的PostgreSQL用戶名>
DB_PASSWORD=<你的PostgreSQL密碼>
PORT=3000
STATIC_KEY=admin1
```

5. 點擊 **Create Web Service**

6. 等待部署完成（約 2-3 分鐘）

7. 記錄後端 URL，格式類似：`https://card-inventory-backend.onrender.com`

### 第三步：部署資料庫（PostgreSQL）

1. 點擊 **New +**

2. 選擇 **PostgreSQL**

3. 配置以下信息：

**Database Config：**
- Name：`card-inventory-db`
- Database：`card_inventory`
- User：`admin`（或自定義）
- Region：與後端相同

4. 點擊 **Create Database**

5. 等待數據庫創建完成

6. 記錄以下信息（很重要！）：
   - **Internal Database URL**：例如 `postgresql://admin:xxxxx@databases.apprender.com/card-inventory-db`
   - **External Database URL**：例如 `postgresql://admin:xxxxx@card-inventory-db.postgres.database.azure.com:5432/card_inventory`
   - **Database User**：`admin`
   - **Database Password**：`xxxxx`（只顯示一次！）

7. **重要：保存數據庫密碼！** 這是唯一機會看到。

### 第四步：更新後端環境變量

回到後端服務設置頁面：

1. 更新 **Environment Variables**：

```
DB_HOST=你的數據庫主機（從 External Database URL 解析）
DB_PORT=5432
DB_NAME=card_inventory
DB_USER=你的數據庫用戶名
DB_PASSWORD=你的數據庫密碼
PORT=3000
STATIC_KEY=admin1
```

2. 點擊 **Save Changes**
3. 後端會自動重新部署（等待 1-2 分鐘）

### 第五步：初始化資料庫

部署完成後，需要初始化資料庫表結構。

1. 打開後端服務的 **Logs** 標籤

2. 找到數據庫連接日誌

3. 在終端執行以下命令（或者使用 PostgreSQL 客戶端）：

```sql
CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    card_id VARCHAR(30) UNIQUE NOT NULL,
    card_name VARCHAR(2000) NOT NULL,
    card_level VARCHAR(50),
    card_score NUMERIC(4,1) NOT NULL,
    card_quantity INTEGER DEFAULT 1,
    image_url1 TEXT,
    image_url2 TEXT,
    image_url3 TEXT,
    card_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cards_card_id ON cards(card_id);
CREATE INDEX IF NOT EXISTS idx_cards_type ON cards(card_type);
CREATE INDEX IF NOT EXISTS idx_cards_score ON cards(card_score);

-- 插入預設管理員
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2a$10$xw.zVJTGyUA.FKWmG9SNx.oWX9DCOonFoy4oRDvhNRkm60TANon7e');
```

**注意：** 上面的密碼哈希是 `admin123`

4. 驗證表已創建：查看數據庫工具中的表列表

### 第六步：部署前端（Frontend）

1. 點擊 **New +**

2. 選擇 **Static Site**

3. 配置以下信息：

**Connect to：**
- Repository：`your-username/card-inventory`
- Branch：`main`
- Root Directory：`frontend/build`

**Environment：**
- Name：`card-inventory-frontend`
- Region：與後端相同
- Plan：`Free`

**Build Settings：**
- Build Command：`npm run build`
- Publish Directory：`build`

**Environment Variables**：
```
REACT_APP_API_URL=https://card-inventory-backend.onrender.com
```

4. 點擊 **Create Static Site**

5. 等待部署完成（約 1-2 分鐘）

6. 記錄前端 URL，格式類似：`https://card-inventory-frontend.onrender.com`

### 第七步：測試部署

1. 訪問前端 URL：`https://card-inventory-frontend.onrender.com`

2. 測試搜索功能（使用卡牌編號：001）

3. 點擊右上角「管理員登入」

4. 使用以下憑證登入：
   - 用戶名：`admin`
   - 密碼：`admin123`

5. 測試添加/編輯/刪除卡牌

## 🔧 調整配置

### 修改後端 API 地址

如果前端需要訪問後端，可能需要配置 CORS：

在 `backend/index.js` 中確保：

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://card-inventory-frontend.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
```

### 更新前端 API 地址

如果後端或前端 URL 改變，更新 `frontend/.env`：

```
REACT_APP_API_URL=https://你的後端URL
```

然後推送更新並觸發重新部署。

## 📊 監控日誌

### 查看後端日誌

1. 在 Render Dashboard 點擊後端服務
2. 點擊 **Logs** 標籤
3. 查看實時日誌

### 查看前端日誌

1. 點擊前端服務
2. 點擊 **Logs** 標籤

### 常見錯誤

**數據庫連接失敗：**
- 檢查環境變量是否正確
- 確保數據庫已初始化
- 查看數據庫日誌

**前端無法訪問後端：**
- 檢查 CORS 配置
- 確認 REACT_APP_API_URL 正確
- 查看後端日誌

**部署失敗：**
- 檢查 Build Command 和 Start Command
- 查看構建日誌
- 確保 package.json 依賴完整

## 💰 費用方案

### Render 免費計劃限制

- **512 MB RAM**
- **512 MB 磁盤空間**
- **0.1 CPU**
- **每月 750 小時運行時間**
- **10 GB 流量**

對於個人項目來說足夠了。

### 免費 PostgreSQL 限制

- **90 天數據保留**
- **1 GB 存儲空間**
- **90 天備份保留**
- **100 連接/小時**

### 優化建議

1. 使用 CDN 加速資源
2. 壓縮圖片
3. 實現數據分頁
4. 使用 Redis 緩存熱門數據
5. 考慮使用 Supabase 等替代方案

## 📝 部署檢查清單

部署前確認：

- [ ] 代碼已推送到 GitHub
- [ ] 前端生成了 build 文件夾
- [ ] 數據庫環境變量已記錄
- [ ] 後端環境變量已配置
- [ ] 前端環境變量已配置
- [ ] 數據庫表已初始化
- [ ] 管理員密碼已記錄

## 🚨 重要提醒

1. **密碼安全**
   - 不要將數據庫密碼提交到 Git
   - 使用 Render 的 Environment Variables
   - 定期更換密碼

2. **數據庫備份**
   - Render 自動備份數據庫
   - 定期導出本地備份
   - 測試恢復流程

3. **成本監控**
   - 免費計劃有限制
   - 監控流量使用
   - 超出時考慮升級

4. **域名自定義**
   - 免費計劃使用 render.com 子域名
   - 可綁定自定義域名（需付費）
   - 或使用 Cloudflare 免費域名

## 🎉 完成！

部署成功後，你將擁有：

- ✅ 公開訪問的卡牌查詢網站
- ✅ 管理員後台
- ✅ PostgreSQL 數據庫
- ✅ 自動 HTTPS（SSL）
- ✅ 自動部署（Git push 觸發）

## 📞 支持資源

- [Render 文檔](https://render.com/docs)
- [React 部署指南](https://render.com/docs/deploy-node-express)
- [PostgreSQL 部署指南](https://render.com/docs/deploy-postgresql)
- [Static Site 部署指南](https://render.com/docs/deploy-static-sites)

## 🔄 更新部署

```bash
# 修改後端代碼後
git add backend/
git commit -m "Update backend"
git push

# 修改前端代碼後
git add frontend/
git commit -m "Update frontend"
git push
```

Render 會自動檢測到 Git push 並重新部署相應服務。

---

**祝你部署順利！** 🚀

如有問題，檢查 Render Dashboard 的 Logs 標籤。
