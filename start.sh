#!/bin/sh
set -e

# Render 免費層優化：0.1 CPU, 512MB RAM
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=384"
export WEB_CONCURRENCY=1

echo "Starting application with Render free tier optimizations..."
echo "Available memory: 512MB, Setting Node.js heap limit to 384MB"
echo "CPU: 0.1 core, Setting WEB_CONCURRENCY=1"

# 替換 nginx 配置中的 PORT 環境變量
envsubst "\$PORT" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# 優化 nginx 配置 for low memory
echo "worker_processes 1;" >> /etc/nginx/nginx.conf
echo "events { worker_connections 512; }" >> /etc/nginx/nginx.conf

# 啟動後端服務在後台（監聽 3000 端口）
echo "Starting backend server on port 3000..."
node index.js &
BACKEND_PID=$!

# 等待後端服務啟動
echo "Waiting for backend to start..."
sleep 5

# 檢查後端是否運行
if ! kill -0 $BACKEND_PID 2>/dev/null; then
  echo "ERROR: Backend failed to start. Checking logs..."
  # 嘗試獲取後端進程的錯誤輸出
  wait $BACKEND_PID || true
  echo "Backend process exited. Application cannot start."
  exit 1
fi

# 檢查後端是否響應
echo "Checking backend health..."
if curl -s -f http://127.0.0.1:3000/api/health > /dev/null; then
  echo "✓ Backend health check passed"
else
  echo "✗ Backend health check failed"
  echo "Stopping backend..."
  kill $BACKEND_PID 2>/dev/null || true
  exit 1
fi

# 啟動 nginx（監聽 $PORT 端口）在前台
echo "Starting nginx on port ${PORT:-80}..."
exec nginx -g "daemon off;"