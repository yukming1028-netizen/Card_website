-- 卡牌資料表
CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    card_id VARCHAR(50) UNIQUE NOT NULL,          -- 卡牌編號
    card_name VARCHAR(255) NOT NULL,               -- 卡牌名字
    card_level VARCHAR(50),                        -- 卡牌等級
    card_score INTEGER NOT NULL,                   -- 卡牌分數
    card_quantity INTEGER DEFAULT 1,               -- 卡牌數量
    image_url TEXT,                                -- 卡牌圖片URL
    card_type VARCHAR(50),                         -- 卡牌類型（用於分類比較）
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 管理員資料表
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,         -- 管理員用戶名
    password_hash TEXT NOT NULL,                   -- 密碼哈希
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 預設管理員（密碼需要在首次登入時設置）
-- INSERT INTO admins (username, password_hash) VALUES ('admin', '');

-- 索引
CREATE INDEX idx_cards_card_id ON cards(card_id);
CREATE INDEX idx_cards_type ON cards(card_type);
CREATE INDEX idx_cards_score ON cards(card_score);
