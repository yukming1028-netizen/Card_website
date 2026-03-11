import React from 'react';

function ServiceFee() {
  return (
    <div className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            <span className="text-zh">服務和費用</span>
            <span className="text-en">Service and Fees</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              服務內容：提供專業的卡牌評級、真偽驗證和市場價值評估服務。<br />
              費用結構：根據卡牌的稀有度和評級要求，費用從$10起，具體價格請聯絡我們獲取報價。
            </span>
            <span className="text-en">
              Service Content: Professional card grading, authenticity verification, and market value assessment.<br />
              Fee Structure: Starting from $10, the exact price will be provided upon request.
            </span>
          </p>
        </div>
      </div>
      <div className="hero-content" style={{marginTop:'2%'}}>
        <div className="hero-text">
          <h1>
            <span className="text-zh">授權合作夥伴</span>
            <span className="text-en">Authorized Partners</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              CGC Cards
            </span>
            <span className="text-en">
              CGC Cards
            </span><br />
            <span className="text-zh">
              寶可夢經銷商
            </span>
            <span className="text-en">
              Pokemon Distributor
            </span>
          </p>
        </div>
      </div>
      <div className="hero-content" style={{marginTop:'2%'}}>
        <div className="hero-text">
          <h1>
            <span className="text-zh">地點</span>
            <span className="text-en">Location</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              旺角彌敦道100號ABC大廈10樓
            </span>
            <span className="text-en">
              10/F, ABC Building, 100 Nathan Road, Mong Kok
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceFee;
