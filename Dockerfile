# 單一 Dockerfile - 整合後端和前端
# 使用 Nginx 為統一入口點

# ==================== 階段 1：構建前端 ====================
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# 複製前端 package.json 和 package-lock.json
COPY frontend/package*.json ./

# 安裝前端依賴
RUN npm ci

# 複製前端源代碼
COPY frontend/ ./

# 構建 React 應用
RUN npm run build

# 列出構建輸出
RUN echo "=== Frontend build output ===" && \
    ls -la /app/build && \
    echo "=== Checking index.html ===" && \
    test -f /app/build/index.html && echo "index.html EXISTS" || echo "index.html MISSING"

# ==================== 階段 2：準備後端 ====================
FROM node:18-alpine AS backend-prep

WORKDIR /app

# 複製後端 package.json 和 package-lock.json
COPY backend/package*.json ./

# 安裝後端依賴
RUN npm ci --only=production

# 複製後端源代碼
COPY backend/ ./

# 驗證後端文件
RUN echo "=== Backend files ===" && \
    ls -la /app && \
    test -f /app/index.js && echo "index.js EXISTS" || echo "index.js MISSING"

# ==================== 最終階段 ====================
FROM node:18-alpine

WORKDIR /app

# 安裝必要套件
RUN apk add --no-cache dumb-init nginx

# 設置 NODE_ENV 為 production
ENV NODE_ENV=production

# 複製後端文件
COPY --from=backend-prep /app /app

# 驗證後端文件
RUN ls -la /app && test -f /app/index.js && echo "✓ Backend copied"

# 複製前端構建文件
COPY --from=frontend-builder /app/build /app/build

# 驗證前端文件
RUN echo "=== Final frontend files ===" && \
    ls -la /app/build && \
    test -f /app/build/index.html && echo "✓ Frontend copied" || echo "✗ Frontend copy FAILED" && exit 1

# 設置正確的 nginx 配置
RUN echo 'events {\n\
    worker_connections 1024;\n\
}\n\
\n\
http {\n\
    include /etc/nginx/mime.types;\n\
    default_type application/octet-stream;\n\
    sendfile on;\n\
    keepalive_timeout 65;\n\
    \n\
    server {\n\
        listen 80;\n\
        server_name _;\n\
        \n\
        root /app/build;\n\
        index index.html index.htm;\n\
        \n\
        location / {\n\
            try_files $uri $uri/ /index.html;\n\
        }\n\
        \n\
        location /api {\n\
            proxy_pass http://127.0.0.1:3000;\n\
            proxy_http_version 1.1;\n\
            proxy_set_header Upgrade $http_upgrade;\n\
            proxy_set_header Connection "upgrade";\n\
            proxy_set_header Host $host;\n\
            proxy_cache_bypass $http_upgrade;\n\
            proxy_set_header X-Real-IP $remote_addr;\n\
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
            proxy_set_header X-Forwarded-Proto $scheme;\n\
        }\n\
        \n\
        location /admin-api {\n\
            proxy_pass http://127.0.0.1:3000;\n\
            proxy_http_version 1.1;\n\
            proxy_set_header Upgrade $http_upgrade;\n\
            proxy_set_header Connection "upgrade";\n\
            proxy_set_header Host $host;\n\
            proxy_cache_bypass $http_upgrade;\n\
            proxy_set_header X-Real-IP $remote_addr;\n\
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
            proxy_set_header X-Forwarded-Proto $scheme;\n\
        }\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf && \
    cat /etc/nginx/conf.d/default.conf && \
    nginx -t

# 創建啟動腳本
RUN echo '#!/bin/sh\n\
set -e\n\
\n\
echo "=== Starting Card Inventory Application ==="\n\
echo ""\n\
echo "Files in /app/build:"\n\
ls -la /app/build/\n\
echo ""\n\
echo "Checking index.html..."\n\
test -f /app/build/index.html && echo "✓ index.html found" || (echo "✗ index.html NOT FOUND" && ls -la /app/ && exit 1)\n\
echo ""\n\
# 啟動後端\n\
echo "Starting backend server on port 3000..."\n\
node /app/index.js &\n\
BACKEND_PID=$!\n\
echo "Backend PID: $BACKEND_PID"\n\
sleep 2\n\
\n\
# 檢查後端\n\
if ps -p $BACKEND_PID > /dev/null; then\n\
    echo "✓ Backend started"\n\
else\n\
    echo "✗ Backend failed to start"\n\
    exit 1\n\
fi\n\
echo ""\n\
# 啟動 nginx\n\
echo "Starting nginx on port 80..."\n\
nginx -g "daemon off;" &\n\
NGINX_PID=$!\n\
echo "Nginx PID: $NGINX_PID"\n\
sleep 1\n\
\n\
# 檢查 nginx\n\
if ps -p $NGINX_PID > /dev/null; then\n\
    echo "✓ Nginx started"\n\
else\n\
    echo "✗ Nginx failed to start"\n\
    exit 1\n\
fi\n\
echo ""\n\
echo "=== Services Ready ==="\n\
echo "Frontend: http://0.0.0.0:80"\n\
echo "Backend: http://0.0.0.0:3000"\n\
echo ""\n\
# 等待進程\n\
wait -n $BACKEND_PID $NGINX_PID || true\n\
\n\
echo ""\n\
echo "=== One process exited ==="\n\
kill $BACKEND_PID $NGINX_PID 2>/dev/null || true\n\
' > /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 80

ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
