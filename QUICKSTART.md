# 快速開始指南

## 方式一：使用設置腳本（推薦）

```bash
cd card-inventory
./setup.sh
```

腳本會引導你完成：
1. 資料庫設置
2. 管理員賬號創建
3. 後端和前端依賴安裝
4. 環境變量配置

## 方式二：手動設置

### 1. 設置資料庫

```bash
# 創建資料庫
createdb card_inventory

# 初始化表結構
psql card_inventory -f database/schema.sql
```

### 2. 創建管理員賬號

```bash
# 生成密碼哈希（將 your_password 替換為你的密碼）
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"

# 複製輸出的哈希值，然後插入資料庫
psql card_inventory

# 在 psql 中執行：
INSERT INTO admins (username, password_hash) VALUES ('admin', '你的哈希值');

# 退出
\q
```

### 3. 設置後端

```bash
cd backend
npm install
cp .env.example .env
```

編輯 `.env`：
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=card_inventory
DB_USER=postgres
DB_PASSWORD=你的密碼
PORT=3000
STATIC_KEY=你的金輪（用於密碼重置）
```

### 4. 設置前端

```bash
cd frontend
npm install
```

創建 `.env`：
```
REACT_APP_API_URL=http://localhost:3000
```

### 5. 啟動應用

**終端 1 - 後端：**
```bash
cd backend
npm run dev
```

**終端 2 - 前端：**
```bash
cd frontend
npm start
```

訪問 http://localhost:3000

## 方式三：使用 Docker（最簡單）

```bash
# 設置金輪環境變量
export STATIC_KEY=your_secure_key_here

# 啟動所有服務
docker-compose up -d

# 初始化資料庫
docker-compose exec postgres psql -U postgres card_inventory -f /database/schema.sql

# 創建管理員（需要先進入 backend 容器）
docker-compose exec backend node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"

# 使用生成的哈希值創建管理員
docker-compose exec postgres psql -U postgres card_inventory -c "INSERT INTO admins (username, password_hash) VALUES ('admin', '你的哈希值');"
```

訪問：
- 前端：http://localhost:3001
- 後端 API：http://localhost:3000

## 測試

1. 打開瀏覽器訪問 http://localhost:3000（或 http://localhost:3001 用 Docker）
2. 你會看到首頁和搜索框
3. 點擊右上角「管理員登入」
4. 使用 admin 賬號登入
5. 添加一些測試卡牌
6. 返回首頁測試搜索功能

## 常見問題

### PostgreSQL 連接失敗

確保 PostgreSQL 正在運行：
```bash
# Linux
sudo service postgresql status

# macOS
brew services list
```

### 後端無法啟動

檢查 `.env` 文件配置是否正確，特別是資料庫連接信息。

### 前端無法連接後端

確保：
1. 後端正在運行
2. 前端的 `.env` 中 `REACT_APP_API_URL` 指向正確的後端地址

### 管理員登入失敗

檢查：
1. 資料庫中是否有 admin 用戶
2. 密碼是否正確
3. 密碼哈希是否正確生成

## 添加測試數據

```bash
psql card_inventory

INSERT INTO cards (card_id, card_name, card_level, card_score, card_quantity, card_type, image_url) VALUES
('001', '火焰龍', 'UR', 9, 1, '攻擊型', 'https://example.com/dragon.jpg'),
('002', '冰霜鳳凰', 'UR', 8, 2, '攻擊型', 'https://example.com/phoenix.jpg'),
('003', '聖騎士', 'SSR', 7, 3, '防禦型', 'https://example.com/knight.jpg'),
('004', '暗影刺客', 'SSR', 8, 1, '攻擊型', 'https://example.com/assassin.jpg'),
('005', '光明牧師', 'SR', 6, 5, '輔助型', 'https://example.com/priest.jpg');
```

## 停止服務

### 手動啟動
在終端按 Ctrl+C 停止

### Docker
```bash
docker-compose down
```
