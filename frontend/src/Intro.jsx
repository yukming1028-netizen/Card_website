import React from 'react';

function Intro() {
  return (
    <div className="container">
      <div className="header">
        <h1>
          簡介
          <span style={{ display: 'block', fontSize: '0.5em', fontWeight: 'normal', marginTop: '10px' }}>
            Introduction
          </span>
        </h1>
        <p>
          歡迎來到寶可夢卡牌查詢系統
          <br />
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
            Welcome to the Pokémon Card Query System
          </span>
        </p>
      </div>

      <div className="card-detail">
        <div className="card-detail-header">
          <h2>關於本系統</h2>
        </div>
        <div className="info-item" style={{ marginBottom: '20px' }}>
          <div className="info-value">
            <p>寶可夢卡牌查詢系統是一個專門為卡牌收藏家和玩家設計的在線查詢平台。</p>
            <br />
            <p>本系統提供以下功能：</p>
            <ul style={{ textAlign: 'left', marginTop: '10px', lineHeight: '1.8' }}>
              <li>🔍 快速卡牌搜索 - 輸入卡牌編號即可查詢</li>
              <li>📊 詳細評級資料 - 查看卡牌的詳細信息和評級</li>
              <li>🖼️ 卡牌圖片展示 - 高質量的卡牌圖片預覽</li>
              <li>📈 數據統計分析 - 全面的卡牌數據分析工具</li>
            </ul>
          </div>
        </div>

        <div className="extra-info-title">
          使用說明
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">如何使用：</div>
          <div className="info-value">
            <ol style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>在主頁輸入寶可夢卡牌的獨立編號</li>
              <li>點擊「搜索」按鈕進行查詢</li>
              <li>查看查詢結果中的卡牌詳細資料</li>
            </ol>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">卡牌編號格式：</div>
          <div className="info-value">
            請使用官方的寶可夢卡牌編號，例如：<br />
            <code style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
              001/001, 002/002, 003/003...
            </code>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">注意事項：</div>
          <div className="info-value">
            <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>請確保輸入正確的卡牌編號</li>
              <li>本系統僅提供查詢功能，不涉及任何交易</li>
              <li>資料庫定期更新，請關注最新消息</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
