// Aiven PostgreSQL 初始化脚本
// 使用 pg 庫連接到 Aiven PostgreSQL 並執行初始化

const { Pool } = require('pg');

// Aiven PostgreSQL 連接字符串
// 請替換為你的實際連接字符串
const connectionString = 'postgres://<用戶名>:<密碼>@<主機>:<端口>/<數據庫>?sslmode=require';

// 創建 pool 以便重用連接
// 對於 Aiven，需要設置 ssl.rejectUnauthorized = false 來接受自簽名證書
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false  // 接受自簽名證書
  }
});

async function initDatabase() {
  let client;
  try {
    console.log('🔗 開始連接到 Aiven PostgreSQL...');
    console.log('📍 連接字符串:', connectionString.replace(/:[^:@]+@/, ':****@')); // 隱藏密碼

    client = await pool.connect();
    console.log('✅ 連接成功！');

    // ============================================
    // 1. 創建表和索引
    // ============================================

    console.log('\n📋 1/6 創建 cards 表...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS cards (
        id SERIAL PRIMARY KEY,
        card_id VARCHAR(30) UNIQUE NOT NULL,
        card_name VARCHAR(2000) NOT NULL,
        card_level VARCHAR(50),
        card_score NUMERIC(4,1) NOT NULL,
        card_quantity INTEGER DEFAULT 1,
        image_url1 TEXT,
        image_url2 TEXT,
        image_url3 TEXT,
        card_type VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_cards_card_id ON cards(card_id);
      CREATE INDEX IF NOT EXISTS idx_cards_type ON cards(card_type);
      CREATE INDEX IF NOT EXISTS idx_cards_score ON cards(card_score);
    `);
    console.log('✅ cards 表和索引創建完成');

    console.log('\n📋 2/6 創建 admins 表...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ admins 表創建完成');

    // ============================================
    // 2. 創建統計視圖
    // ============================================

    console.log('\n📋 3/6 創建統計視圖...');
    await client.query(`
      CREATE OR REPLACE VIEW card_type_stats AS
      SELECT
        card_type,
        COUNT(*) as total_count,
        AVG(card_score) as avg_score,
        MAX(card_score) as max_score,
        MIN(card_score) as min_score
      FROM cards
      GROUP BY card_type;

      CREATE OR REPLACE VIEW card_level_stats AS
      SELECT
        card_level,
        COUNT(*) as total_count
      FROM cards
      GROUP BY card_level;
    `);
    console.log('✅ 統計視圖創建完成');

    // ============================================
    // 3. 插入預設管理員
    // ============================================

    console.log('\n📋 4/6 插入預設管理員...');
    await client.query(`
      INSERT INTO admins (username, password_hash)
      VALUES ('admin', '$2a$10$xw.zVJTGyUA.FKWmG9SNx.oWX9DCOonFoy4oRDvhNRkm60TANon7e')
      ON CONFLICT (username) DO NOTHING;
    `);
    console.log('✅ 管理員 admin 已插入（密碼: admin123）');

    // ============================================
    // 4. 插入測試數據
    // ============================================

    console.log('\n📋 5/6 插入測試卡牌數據...');

    const testCards = [
      // 皮卡丘系列（電系）
      ['001', '皮卡丘', 'UR', 9.8, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'],
      ['002', '皮卡丘', 'UR', 9.5, 2, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['003', '皮卡丘', 'UR', 9.3, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['004', '皮卡丘', 'SSR', 8.5, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['005', '皮卡丘', 'SSR', 8.0, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['006', '皮卡丘', 'SR', 7.5, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['007', '皮卡丘', 'SR', 7.0, 2, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['008', '皮卡丘', 'SR', 6.5, 3, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['009', '皮卡丘', 'SR', 6.0, 2, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],
      ['010', '皮卡丘', 'R', 5.5, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
       '', ''],

      // 噴火龍系列（火系）
      ['101', '噴火龍', 'UR', 8.8, 2, '火',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif',
       ''],
      ['102', '水箭龜', 'SSR', 7.5, 3, '水',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
       '', ''],
      ['103', '妙蛙種子', 'SSR', 6.8, 1, '草',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
       '', ''],

      // 超夢系列（超能力系）
      ['201', '超夢', 'UR', 9.9, 1, '超能力',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/150.gif',
       ''],

      // 耿鬼系列（幽靈系）
      ['301', '耿鬼', 'SSR', 8.2, 4, '幽靈',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
       '', ''],

      // 快龍系列（龍系）
      ['401', '快龍', 'SSR', 8.5, 2, '龍',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
       '', ''],

      // 雷系卡牌（其他）
      ['501', '雷丘', 'SR', 7.0, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
       '', ''],
      ['502', '皮卡西', 'SR', 7.5, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png',
       '', ''],
      ['503', '雷丘', 'SR', 8.0, 1, '電',
       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png',
       '', ''],
    ];

    let insertedCount = 0;
    for (const card of testCards) {
      const result = await client.query(`
        INSERT INTO cards (card_id, card_name, card_level, card_score, card_quantity, card_type, image_url1, image_url2, image_url3)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (card_id) DO NOTHING
      `, card);

      if (result.rowCount > 0) {
        insertedCount++;
      }
    }

    console.log(`✅ 已插入 ${insertedCount} 張卡牌`);

    // ============================================
    // 5. 顯示統計
    // ============================================

    console.log('\n📋 6/6 顯示統計數據...');

    const totalCardsResult = await client.query('SELECT COUNT(*) FROM cards');
    const totalCards = parseInt(totalCardsResult.rows[0].count);

    const typeStatsResult = await client.query('SELECT card_type, COUNT(*) FROM cards GROUP BY card_type ORDER BY card_type');

    console.log(`\n📊 總卡牌數量: ${totalCards}`);
    console.log('\n📊 按類型統計:');
    typeStatsResult.rows.forEach(row => {
      console.log(`   ${row.card_type}: ${row.count} 張`);
    });

    const levelStatsResult = await client.query('SELECT card_level, COUNT(*) FROM cards GROUP BY card_level ORDER BY card_level');

    console.log('\n📊 按等級統計:');
    levelStatsResult.rows.forEach(row => {
      console.log(`   ${row.card_level}: ${row.count} 張`);
    });

    // ============================================
    // 6. 配置權限
    // ============================================

    console.log('\n📋 7/7 配置權限...');
    await client.query(`
      GRANT SELECT, INSERT, UPDATE, DELETE ON cards TO postgres;
      GRANT SELECT, INSERT, UPDATE, DELETE ON admins TO postgres;
      GRANT SELECT ON card_type_stats TO postgres;
      GRANT SELECT ON card_level_stats TO postgres;
      GRANT USAGE ON SCHEMA public TO postgres;
    `);
    console.log('✅ 權限配置完成');

    // ============================================
    // 7. 顯示完成消息
    // ============================================

    console.log('\n' + '='.repeat(50));
    console.log('🎉 初始化完成！');
    console.log('='.repeat(50));
    console.log('\n📊 數據庫信息:');
    console.log(`   總卡牌數量: ${totalCards}`);
    console.log(`   管理員: admin (密碼: admin123)`);
    console.log('\n👑 登入憑證:');
    console.log(`   管理員用戶名: admin`);
    console.log(`   管理員密碼: admin123`);
    console.log('\n🧪 測試卡牌編號:');
    console.log(`   皮卡丘: 001-010`);
    console.log(`   噴火龍: 101`);
    console.log(`   水箭龜: 102`);
    console.log(`   妙蛙種子: 103`);
    console.log(`   超夢: 201`);
    console.log(`   耿鬼: 301`);
    console.log(`   快龍: 401`);
    console.log(`   雷系: 501-503`);
    console.log('\n💡 下一步: 更新後端環境變量');
    console.log('   DB_HOST=<你的數據庫主機>');
    console.log('   DB_PORT=22265');
    console.log('   DB_NAME=defaultdb');
    console.log('   DB_USER=<你的數據庫用戶名>');
    console.log('   DB_PASSWORD=<你的數據庫密碼>');
    console.log('   PORT=3000');
    console.log('   STATIC_KEY=<你的金輪>');
    console.log('\n' + '='.repeat(50));

  } catch (error) {
    console.error('❌ 初始化失敗:', error.message);
    console.error('錯誤詳情:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.release();
      console.log('\n🔌 數據庫連接已釋放');
    }
    await pool.end();
    console.log('\n🔌 連接池已關閉');
  }
}

// 執行初始化
initDatabase();
