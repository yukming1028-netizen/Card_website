# 單一 Dockerfile - 整合後端和前端
# 使用 Nginx 為統一入口點

# ==================== 階段 1：構建前端 ====================
FROM node:18-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build

# ==================== 階段 2：準備後端 ====================
FROM node:18-alpine AS backend-prep

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --only=production

COPY backend/ ./

# ==================== 最終階段：整合前端和後端 ====================
FROM node:18-alpine

RUN apk add --no-cache dumb-init nginx

WORKDIR /app

ENV NODE_ENV=production

# 複製後端
COPY --from=backend-prep /app /app/

# 複製前端構建文件
COPY --from=frontend-builder /app/build /app/build/

# 配置 Nginx
RUN echo 'server {\n\
    listen 80;\n\
    server_name _;\n\
    \n\
    root /app/build;\n\
    index index.html index.htm;\n\
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
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    error_page 404 /index.html;\n\
}' > /etc/nginx/conf.d/default.conf

# 啟動腳本
RUN echo '#!/bin/sh\n\
set -e\n\
node /app/index.js &\n\
nginx -g "daemon off;" &\n\
wait -n $(jobs -p) || true\n\
' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 80

ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
