-- 遷移腳本：更新卡牌表結構

-- 1. 刪除舊的 image_url 列
ALTER TABLE cards DROP COLUMN IF EXISTS image_url;

-- 2. 添加三個圖片URL列
ALTER TABLE cards ADD COLUMN IF NOT EXISTS image_url1 TEXT;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS image_url2 TEXT;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS image_url3 TEXT;

-- 3. 修改 card_score 支持小數
ALTER TABLE cards ALTER COLUMN card_score TYPE NUMERIC(4,1);

-- 4. 修改 card_id 支持30位數字
ALTER TABLE cards ALTER COLUMN card_id TYPE VARCHAR(30);

-- 5. 修改 card_name 支持2000字符
ALTER TABLE cards ALTER COLUMN card_name TYPE VARCHAR(2000);

-- 6. 修改 card_type 為選填（放在名稱下方）
ALTER TABLE cards ALTER COLUMN card_type DROP NOT NULL;

-- 更新舊數據的圖片（如果有）
UPDATE cards SET image_url1 = image_url WHERE image_url IS NOT NULL;
