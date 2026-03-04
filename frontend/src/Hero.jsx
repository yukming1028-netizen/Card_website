import React from 'react';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-image">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/generation-i/black-white.png"
            alt="寶可夢卡牌"
            className="hero-pokemon"
          />
          <div className="hero-badge">
            <span className="badge-text">專業評級</span>
          </div>
        </div>
        <div className="hero-text">
          <h1>
            <span className="text-zh">專業卡牌評級，保障收藏價值</span>
            <span className="text-en">Professional Card Grading, Protecting Collection Value</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              我們提供專業的卡牌評級與收藏服務，讓每一張卡牌的稀有度與價值都能被準確呈現。
              透過嚴謹的檢測流程與標準化的評級系統，收藏者可以放心地展示與交易，
              確保卡牌的真實性與市場認可度。
            </span>
            <span className="text-en">
              We provide professional card grading and collection services, ensuring that the rarity and value
              of each card are accurately represented. Through rigorous inspection processes and
              standardized grading systems, collectors can confidently showcase and trade their cards,
              with authenticity and market recognition guaranteed.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
