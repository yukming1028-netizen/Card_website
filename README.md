# 卡牌倉庫管理系統

一個用於管理卡牌收藏的全棧 Web 應用，包含搜索、統計和管理功能。

## 功能

### 前端
- 🏠 網站介紹頁面
- 🔍 卡牌搜索（按編號）
- 📊 卡牌詳細資料展示
  - 編號、名稱、等級、分數
  - 同類型卡牌統計（總數量、更高分數、相同分數）
  - 分數分佈圖表 (1-10)
  - 卡牌圖片展示

### 管理端
- 🔐 管理員登入系統
- 🔑 密碼管理（需要靜態金輪）
  - 修改密碼
  - 忘記密碼重置
- ✅ 卡牌 CRUD 操作
  - 添加卡牌
  - 編輯卡牌
  - 刪除卡牌
  - 查看所有卡牌

## 技術棧

- **前端**: ReactJS
- **後端**: Node.js + Express
- **資料庫**: PostgreSQL
- **圖表**: Recharts

## 資料庫結構

### cards 表
- id (SERIAL PRIMARY KEY)
- card_id (VARCHAR UNIQUE) - 卡牌編號
- card_name (VARCHAR) - 卡牌名稱
- card_level (VARCHAR) - 卡牌等級
- card_score (INTEGER) - 卡牌分數
- card_quantity (INTEGER) - 卡牌數量
- image_url (TEXT) - 圖片 URL
- card_type (VARCHAR) - 卡牌類型

### admins 表
- id (SERIAL PRIMARY KEY)
- username (VARCHAR UNIQUE) - 管理員用戶名
- password_hash (TEXT) - 密碼哈希

## 安裝步驟

### 1. 安裝 PostgreSQL

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# 啟動服務
sudo service postgresql start  # Linux
brew services start postgresql  # macOS
```

### 2. 創建資料庫

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE card_inventory;
CREATE USER your_db_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE card_inventory TO your_db_user;
\q
```

### 3. 初始化資料庫結構

```bash
cd database
psql -U your_db_user -d card_inventory -f schema.sql
```

### 4. 創建預設管理員

```bash
psql -U your_db_user -d card_inventory
```

```sql
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2a$10$your_hashed_password_here');
\q
```

生成密碼哈希：
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"
```

### 5. 設置後端

```bash
cd backend
npm install
cp .env.example .env
```

編輯 `.env` 文件：
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=card_inventory
DB_USER=your_db_user
DB_PASSWORD=your_password
PORT=3000
STATIC_KEY=your_secure_static_key_here
```

啟動後端：
```bash
npm run dev
```

### 6. 設置前端

```bash
cd frontend
npm install
```

創建 `.env` 文件：
```
REACT_APP_API_URL=http://localhost:3000
```

啟動前端：
```bash
npm start
```

## 環境變量說明

### 後端 (.env)
- `DB_HOST`: PostgreSQL 主機
- `DB_PORT`: PostgreSQL 端口
- `DB_NAME`: 資料庫名稱
- `DB_USER`: 資料庫用戶
- `DB_PASSWORD`: 資料庫密碼
- `PORT`: 後端服務器端口
- `STATIC_KEY`: 用於密碼修改/重置的金輪（必須保密）

### 前端 (.env)
- `REACT_APP_API_URL`: 後端 API 地址

## 使用說明

### 搜索卡牌
1. 在首頁輸入卡牌編號
2. 按下 Enter 或點擊搜索
3. 查看卡牌詳細資料和統計

### 管理員登入
1. 點擊右上角「管理員登入」
2. 輸入用戶名和密碼
3. 登入後可進入管理面板

### 添加卡牌
1. 在管理面板點擊「添加卡牌」
2. 填寫卡牌資料
3. 點擊保存

### 修改/重置密碼
1. 在登入頁面點擊「修改密碼」或「忘記密碼」
2. 輸入用戶名和新密碼
3. 輸入靜態金輪（STATIC_KEY）
4. 提交

## 安全注意事項

1. **STATIC_KEY 必須保密** - 這是修改密碼的唯一驗證
2. 在生產環境中使用 HTTPS
3. 定期更新資料庫密碼
4. 考慮添加 rate limiting 防止暴力破解
5. 使用強密碼哈希（bcrypt）

## 項目結構

```
card-inventory/
├── backend/
│   ├── index.js          # 主服務器文件
│   ├── db.js             # 資料庫連接
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/   # React 組件
│   │   ├── App.jsx       # 主應用
│   │   └── index.js
│   ├── public/
│   └── package.json
├── database/
│   └── schema.sql        # 資料庫結構
└── README.md
```

## API 端點

### 公開
- `GET /api/cards` - 獲取所有卡牌
- `GET /api/cards/search?card_id=xxx` - 搜索卡牌
- `GET /api/cards/distribution?card_id=xxx` - 獲取分數分佈

### 管理
- `POST /api/admin/login` - 管理員登入
- `POST /api/admin/change-password` - 修改密碼（需要金輪）
- `POST /api/admin/reset-password` - 重置密碼（需要金輪）
- `POST /api/admin/cards` - 添加卡牌
- `PUT /api/admin/cards/:id` - 更新卡牌
- `DELETE /api/admin/cards/:id` - 刪除卡牌

## 開發建議

- 添加單元測試
- 實現分頁功能
- 添加上傳卡牌圖片功能
- 實現卡牌導出功能
- 添加操作日誌
- 實現批量操作
