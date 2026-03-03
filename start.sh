#!/bin/sh
set -e

# 替換 nginx 模板中的環境變量並輸出到主配置文件
envsubst '$PORT $API_PORT' < /etc/nginx/conf.template > /etc/nginx/nginx.conf

# 啟動 nginx
nginx -g 'daemon off;' &
NGINX_PID=$!

# 啟動後端
node /app/index.js &
NODE_PID=$!

# 等待任一進程退出
wait $NGINX_PID $NODE_PID
