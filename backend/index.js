const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 靜態金輪驗證
const verifyStaticKey = (req, res, next) => {
  const { static_key } = req.body;
  if (static_key !== process.env.STATIC_KEY) {
    return res.status(403).json({ error: '無效的金輪' });
  }
  next();
};

// 管理員登入
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: '用戶名或密碼錯誤' });
    }

    const admin = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: '用戶名或密碼錯誤' });
    }

    res.json({ success: true, username: admin.username });
  } catch (error) {
    console.error('登入錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 修改密碼（需要金輪）
app.post('/api/admin/change-password', verifyStaticKey, async (req, res) => {
  const { username, old_password, new_password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '用戶不存在' });
    }

    const admin = result.rows[0];
    const isValidPassword = await bcrypt.compare(old_password, admin.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: '舊密碼錯誤' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await pool.query(
      'UPDATE admins SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2',
      [hashedPassword, username]
    );

    res.json({ success: true, message: '密碼修改成功' });
  } catch (error) {
    console.error('修改密碼錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 忘記密碼（需要金輪）
app.post('/api/admin/reset-password', verifyStaticKey, async (req, res) => {
  const { username, new_password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM admins WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '用戶不存在' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await pool.query(
      'UPDATE admins SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE username = $2',
      [hashedPassword, username]
    );

    res.json({ success: true, message: '密碼重置成功' });
  } catch (error) {
    console.error('重置密碼錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 獲取所有卡牌
app.get('/api/cards', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM cards ORDER BY card_id'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('獲取卡牌錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 根據卡牌編號搜索
app.get('/api/cards/search', async (req, res) => {
  const { card_id } = req.query;

  if (!card_id) {
    return res.status(400).json({ error: '請提供卡牌編號' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM cards WHERE card_id = $1',
      [card_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '卡牌不存在' });
    }

    const card = result.rows[0];

    // 獲取同類型卡牌的統計資料
    const stats = await pool.query(
      `SELECT
        COUNT(*) as total_count,
        COUNT(CASE WHEN card_score > $1 THEN 1 END) as higher_count,
        COUNT(CASE WHEN card_score = $1 THEN 1 END) as same_count
       FROM cards WHERE card_type = $2`,
      [card.card_score, card.card_type]
    );

    const statsData = stats.rows[0];
    const cardWithStats = {
      ...card,
      statistics: {
        total_same_type: parseInt(statsData.total_count),
        higher_score_count: parseInt(statsData.higher_count),
        same_score_count: parseInt(statsData.same_count)
      }
    };

    res.json(cardWithStats);
  } catch (error) {
    console.error('搜索卡牌錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 獲取同類型卡牌的分數分佈（支持小數）
app.get('/api/cards/distribution', async (req, res) => {
  const { card_id } = req.query;

  if (!card_id) {
    return res.status(400).json({ error: '請提供卡牌編號' });
  }

  try {
    const cardResult = await pool.query(
      'SELECT card_type FROM cards WHERE card_id = $1',
      [card_id]
    );

    if (cardResult.rows.length === 0) {
      return res.status(404).json({ error: '卡牌不存在' });
    }

    const cardType = cardResult.rows[0].card_type;

    const result = await pool.query(
      `SELECT ROUND(card_score::numeric, 1) as card_score, COUNT(*) as count
       FROM cards
       WHERE card_type = $1
       GROUP BY ROUND(card_score::numeric, 1)
       ORDER BY card_score DESC`,
      [cardType]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('獲取分數分佈錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 添加卡牌（管理員）
app.post('/api/admin/cards', async (req, res) => {
  const { card_id, card_name, card_level, card_score, card_quantity, image_url1, image_url2, image_url3, card_type } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO cards (card_id, card_name, card_level, card_score, card_quantity, image_url1, image_url2, image_url3, card_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [card_id, card_name, card_level, card_score, card_quantity, image_url1, image_url2, image_url3, card_type]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: '卡牌編號已存在' });
    }
    console.error('添加卡牌錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 更新卡牌（管理員）
app.put('/api/admin/cards/:id', async (req, res) => {
  const { id } = req.params;
  const { card_id, card_name, card_level, card_score, card_quantity, image_url1, image_url2, image_url3, card_type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE cards
       SET card_id = $1, card_name = $2, card_level = $3, card_score = $4,
           card_quantity = $5, image_url1 = $6, image_url2 = $7, image_url3 = $8, card_type = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [card_id, card_name, card_level, card_score, card_quantity, image_url1, image_url2, image_url3, card_type, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '卡牌不存在' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: '卡牌編號已存在' });
    }
    console.error('更新卡牌錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

// 刪除卡牌（管理員）
app.delete('/api/admin/cards/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM cards WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: '卡牌不存在' });
    }

    res.json({ success: true, message: '卡牌刪除成功' });
  } catch (error) {
    console.error('刪除卡牌錯誤:', error);
    res.status(500).json({ error: '服務器錯誤' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服務器運行在 http://localhost:${PORT}`);
});
