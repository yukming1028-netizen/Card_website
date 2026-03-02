#!/bin/sh
set -e

# 替換 nginx 配置中的 PORT 環境變量
envsubst "\$PORT" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# 啟動後端服務在後台（監聽 3000 端口）
echo "Starting backend server on port 3000..."
node index.js &
BACKEND_PID=$!

# 等待後端服務啟動
sleep 3

# 檢查後端是否運行
if ! kill -0 $BACKEND_PID 2>/dev/null; then
  echo "Backend failed to start. Exiting..."
  exit 1
fi

# 啟動 nginx（監聽 $PORT 端口）在前台
echo "Starting nginx on port ${PORT:-80}..."
exec nginx -g "daemon off;"