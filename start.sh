#!/bin/sh
set -e

echo "Starting backend..."

# 自動偵測後端入口檔案
if [ -f "/app/server.js" ]; then
node /app/server.js &
elif [ -f "/app/index.js" ]; then
node /app/index.js &
elif [ -f "/app/app.js" ]; then
node /app/app.js &
else
echo "Error: No backend entry file found (server.js / index.js / app.js)"
exit 1
fi

echo "Starting nginx..."
exec dumb-init nginx -g "daemon off;"