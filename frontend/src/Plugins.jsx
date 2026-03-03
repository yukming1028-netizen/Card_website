import React from 'react';

function Plugins() {
  return (
    <div className="container">
      <div className="header">
        <h1>
          插件
          <span style={{ display: 'block', fontSize: '0.5em', fontWeight: 'normal', marginTop: '10px' }}>
            Plugins
          </span>
        </h1>
        <p>
          擴展功能與插件管理
          <br />
          <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
            Extensions and Plugin Management
          </span>
        </p>
      </div>

      <div className="card-detail">
        <div className="card-detail-header">
          <h2>可用插件</h2>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">系統插件</div>
          <div className="info-value">
            <p>本系統支援以下擴展功能：</p>
            <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>🎨 主題自定義 - 個性化介面風格</li>
              <li>📱 響應式設計 - 支援各種裝置尺寸</li>
              <li>⚡ 快速搜索 - 即時查詢卡牌資料</li>
              <li>🔐 安全認證 - 管理員登入系統</li>
            </ul>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">開發中插件</div>
          <div className="info-value">
            <p>我們正在開發以下新功能：</p>
            <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>🌐 多語言支持 - 即將支援英文和日文</li>
              <li>📦 卡牌收藏 - 個人收藏功能</li>
              <li>📊 高級分析 - 更深入的數據分析工具</li>
              <li>🔔 提醒通知 - 新卡牌上架通知</li>
            </ul>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">插件開發</div>
          <div className="info-value">
            <p>有興趣開發插件？歡迎貢獻！</p>
            <p>請聯繫我們了解更多開發資訊。</p>
          </div>
        </div>

        <div className="info-item" style={{ marginBottom: '15px' }}>
          <div className="info-label">版本資訊</div>
          <div className="info-value">
            <p>當前版本：v1.0.0</p>
            <p>最後更新：2026年3月</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plugins;
