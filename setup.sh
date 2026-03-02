#!/bin/bash

echo "🃏 卡牌倉庫管理系統 - 設置腳本"
echo "================================"

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安裝，請先安裝 Node.js"
    exit 1
fi

echo "✅ Node.js 已安裝"

# 檢查 PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL 未安裝"
    echo "請先安裝 PostgreSQL:"
    echo "  Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo "  macOS: brew install postgresql"
    exit 1
fi

echo "✅ PostgreSQL 已安裝"

# 詢問資料庫設置
read -p "請輸入資料庫用戶名 (默認: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "請輸入資料庫密碼: " DB_PASSWORD
echo ""

read -p "請輸入靜態金輪 (用於密碼重置): " STATIC_KEY

# 創建資料庫
echo ""
echo "📦 創建資料庫..."
createdb -U $DB_USER card_inventory 2>/dev/null || echo "資料庫可能已存在"

# 初始化資料庫結構
echo "📋 初始化資料庫結構..."
psql -U $DB_USER -d card_inventory -f database/schema.sql

# 詢問管理員密碼
read -sp "請輸入管理員密碼: " ADMIN_PASSWORD
echo ""

# 生成密碼哈希
echo "🔐 生成密碼哈希..."
PASSWORD_HASH=$(node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('$ADMIN_PASSWORD', 10));")

# 創建管理員
psql -U $DB_USER -d card_inventory -c "INSERT INTO admins (username, password_hash) VALUES ('admin', '$PASSWORD_HASH') ON CONFLICT (username) DO NOTHING;"

# 設置後端
echo ""
echo "⚙️  設置後端..."
cd backend

# 安裝依賴
echo "📦 安裝後端依賴..."
npm install

# 創建 .env
cat > .env <<EOF
DB_HOST=localhost
DB_PORT=5432
DB_NAME=card_inventory
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
PORT=3000
STATIC_KEY=$STATIC_KEY
EOF

echo "✅ 後端設置完成"

# 設置前端
echo ""
echo "⚙️  設置前端..."
cd ../frontend

# 安裝依賴
echo "📦 安裝前端依賴..."
npm install

# 創建 .env
cat > .env <<EOF
REACT_APP_API_URL=http://localhost:3000
EOF

echo "✅ 前端設置完成"

cd ..

echo ""
echo "🎉 設置完成！"
echo ""
echo "啟動方式："
echo "1. 啟動後端: cd backend && npm run dev"
echo "2. 啟動前端: cd frontend && npm start"
echo ""
echo "管理員賬號：admin"
echo "請妥善保管您的密碼和金輪！"
