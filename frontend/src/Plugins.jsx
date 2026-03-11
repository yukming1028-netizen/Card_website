import React from 'react';

function Plugins() {
  return (
    <div className="search_plugin" id="search">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
              <span className="text-zh">一鍵查詢，真偽盡在掌握</span>
              <span className="text-en">One-click lookup, authenticity at your fingertips</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              輸入卡牌名稱或編號，即可快速獲得卡牌的評級。
            </span>
            <span className="text-en">
              Enter a card name or number to quickly search for grading and market value.
            </span>
          </p>
        </div>
        <div className="hero-image">
          <img
            src="/assets/card2.jpg"
            alt="樣本(Sample Card)"
            className="hero-pokemon"
          />
          <div className="hero-badge">
            <span className="badge-text">專業查分</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plugins;
