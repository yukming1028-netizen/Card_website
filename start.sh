#!/bin/sh
# 設置錯誤處理
set -e

# 啟動後端服務在後台（監聽 3000 端口）
echo "Starting backend server on port 3000..."
node index.js &
BACKEND_PID=$!

# 啟動 nginx（監聽 80 端口）
echo "Starting nginx on port 80..."
nginx -g "daemon off;" &
NGINX_PID=$!

# 等待任一進程退出
wait -n $BACKEND_PID $NGINX_PID || true

# 如果其中一個進程退出，終止所有進程
echo "One of processes exited. Terminating..."
kill $BACKEND_PID $NGINX_PID 2>/dev/null || true
