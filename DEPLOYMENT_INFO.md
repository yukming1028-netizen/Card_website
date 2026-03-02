# 卡牌倉庫管理系統 - 部署信息

## 🎉 部署完成！

所有服務已成功啟動並運行。

## 📊 服務狀態

| 服務 | 狀態 | 端口 |
|------|------|------|
| PostgreSQL | ✅ 運行中 | 5432 |
| 後端 API | ✅ 運行中 | 3000 |
| 前端網頁 | ✅ 運行中 | 3001 |

## 🌐 訪問地址

- **前端網頁**: http://localhost:3001
- **後端 API**: http://localhost:3000
- **資料庫**: localhost:5432

## 🔑 登入憑證

### 管理員賬號
- **用戶名**: `admin`
- **密碼**: `admin123`

### 金輪 (STATIC_KEY)
- 用於修改密碼和重置密碼
- 值: `admin1`

⚠️ **重要**: 請妥善保管金輪，這是修改密碼的唯一驗證方式！

## 📝 初始設置

建議首次登入後：
1. 使用「修改密碼」功能修改管理員密碼
2. 使用「忘記密碼」功能測試金輪是否正常工作
3. 添加一些測試卡牌

## 🛠️ 管理命令

```bash
# 查看所有容器狀態
cd card-inventory
sudo docker compose ps

# 查看日誌
sudo docker compose logs -f          # 所有服務
sudo docker compose logs -f backend  # 後端
sudo docker compose logs -f frontend # 前端
sudo docker compose logs -f postgres # 資料庫

# 重啟服務
sudo docker compose restart          # 所有服務
sudo docker compose restart backend   # 僅後端
sudo docker compose restart frontend  # 僅前端

# 停止服務
sudo docker compose down

# 停止並刪除數據（注意：會刪除所有數據！）
sudo docker compose down -v
```

## 💾 資料庫操作

```bash
# 進入資料庫
sudo docker compose exec postgres psql -U postgres card_inventory

# 備份資料庫
sudo docker compose exec postgres pg_dump -U postgres card_inventory > backup.sql

# 還原資料庫
sudo docker compose exec -T postgres psql -U postgres card_inventory < backup.sql

# 查看表
\dt

# 退出資料庫
\q
```

## 📁 添加測試數據

```bash
sudo docker compose exec postgres psql -U postgres card_inventory
```

```sql
INSERT INTO cards (card_id, card_name, card_level, card_score, card_quantity, card_type, image_url) VALUES
('001', '火焰龍', 'UR', 9, 1, '攻擊型', 'https://via.placeholder.com/300x400/ff6b6b/ffffff?text=Fire+Dragon'),
('002', '冰霜鳳凰', 'UR', 8, 2, '攻擊型', 'https://via.placeholder.com/300x400/4ecdc4/ffffff?text=Frost+Phoenix'),
('003', '聖騎士', 'SSR', 7, 3, '防禦型', 'https://via.placeholder.com/300x400/ffe66d/ffffff?text=Holy+Knight'),
('004', '暗影刺客', 'SSR', 8, 1, '攻擊型', 'https://via.placeholder.com/300x400/2d3436/ffffff?text=Shadow+Assassin'),
('005', '光明牧師', 'SR', 6, 5, '輔助型', 'https://via.placeholder.com/300x400/fdc500/ffffff?text=Light+Priest'),
('006', '狂戰士', 'SR', 5, 4, '攻擊型', 'https://via.placeholder.com/300x400/e74c3c/ffffff?text=Berserker'),
('007', '法師塔', 'SSR', 7, 2, '輔助型', 'https://via.placeholder.com/300x400/9b59b6/ffffff?text=Mage+Tower');
```

## 🔧 故障排除

### 前端無法訪問
檢查容器是否運行：
```bash
sudo docker compose ps
```

### 後端 API 錯誤
查看後端日誌：
```bash
sudo docker compose logs backend
```

### 資料庫連接失敗
檢查 PostgreSQL 容器：
```bash
sudo docker compose logs postgres
```

### 端口被占用
修改 docker-compose.yml 中的端口映射：
```yaml
ports:
  - "新端口:容器端口"
```

然後重新啟動：
```bash
sudo docker compose down
sudo docker compose up -d
```

## 📊 監控資源使用

```bash
# 查看容器資源使用
sudo docker stats

# 查看磁盤使用
sudo docker system df
```

## 🚀 生產環境建議

1. 修改所有默認密碼（管理員和資料庫）
2. 使用強密碼作為 STATIC_KEY
3. 配置 HTTPS（使用 Nginx 反向代理）
4. 設置定期備份
5. 限制資料庫和 API 的網絡訪問
6. 配置防火牆規則
7. 啟用日誌記錄和監控

## 📞 技術支持

如有問題，請查看：
- README.md - 完整文檔
- QUICKSTART.md - 快速開始指南
- 日誌: `sudo docker compose logs`

---

部署時間: 2026-03-02
部署方式: Docker Compose
