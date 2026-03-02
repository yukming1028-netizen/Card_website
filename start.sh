#!/bin/sh
set -e

# 啟動後端 (Node.js)
echo "Starting backend..."
node server.js &

# 啟動 nginx
echo "Starting nginx..."
exec dumb-init nginx -g "daemon off;"