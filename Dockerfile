# 單一 Dockerfile - 整合後端和前端
# 使用 Nginx 為統一入口點，前端和後端運行在同一容器中

# ==================== 階段 1：構建前端 ====================
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# 複製前端 package.json 和 package-lock.json
COPY frontend/package*.json ./

# 安裝前端依賴（使用 npm ci 更快）
RUN npm ci

# 複製前端源代碼
COPY frontend/ ./

# 構建 React 應用
RUN npm run build

# ==================== 階段 2：準備後端 ====================
FROM node:18-alpine AS backend-prep

WORKDIR /app

# 複製後端 package.json 和 package-lock.json
COPY backend/package*.json ./

# 安裝後端依賴（使用 npm ci 更快）
RUN npm ci --only=production

# 複製後端源代碼
COPY backend/ ./

# ==================== 最終階段：整合前端和後端 ====================
FROM node:18-alpine AS stage-2
WORKDIR /app

# 安裝必要套件
RUN apk add --no-cache dumb-init nginx gettext curl

# 複製前端與後端
COPY --from=frontend-builder /app/build /app/frontend/build
COPY --from=backend-prep /app /app

# 複製 nginx config（已正確格式）
COPY nginx-render.conf.template /etc/nginx/conf.d/default.conf

# 複製啟動腳本
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# 暴露端口（Nginx 端口）
EXPOSE 80

# 使用 dumb-init 來正確處理信號
ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
