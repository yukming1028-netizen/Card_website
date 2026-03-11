import React from 'react';

function GradingStandard() {
  return (
    <div className="hero" id="home">
      <div className="hero-content">
        <div className="hero-image">
          <img
            src="/assets/card3.jpg"
            alt="寶可夢卡牌"
            className="hero-pokemon"
          />
          <div className="hero-badge">
            <span className="badge-text">專業評級</span>
          </div>
        </div>
        <div className="hero-text">
          <h1>
            <span className="text-zh">評級準則</span>
            <span className="text-en">Grading Standard</span>
          </h1>
          <p className="hero-description">
            <span className="text-zh">
              我們提供專業的卡牌評級服務，讓每一張卡牌的稀有度與價值都能被準確呈現。
              透過嚴謹的檢測流程與標準化的評級系統，收藏者可以放心地展示與交易，
              確保卡牌的真實性與市場認可度。
            </span>
            <span className="text-en">
              We provide professional card grading, ensuring that the rarity and value of every card are accurately represented.
              Through a rigorous inspection process and a standardized grading system, collectors can confidently showcase and trade their cards,
              guaranteeing authenticity and market recognition.
            </span>
          </p>
      </div>
    </div>
    <div className="grading-details">
      <h2>評級標準 (Grading Standard)</h2>
    <table className="grading-table">
      <thead>
        <tr>
          <th>等級 (Grade)</th>
          <th>說明 (Description)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span className="zh">10</span><br /><span className="en">Pristine</span></td>
          <td><span className="zh">幾乎無瑕疵，居中度完美，獨特 Pristine 標籤。</span><br /><span className="en">Almost flawless, perfectly centered, with a unique Pristine label.</span></td>
        </tr>
        <tr>
          <td><span className="zh">10</span><br /><span className="en">Gem Mint</span></td>
          <td><span className="zh">總體為 10 分，但有一項未達 Pristine 標準。</span><br /><span className="en">Overall 10, but one aspect does not meet Pristine standards.</span></td>
        </tr>
        <tr>
          <td><span className="zh">9.5</span><br /><span className="en">Mint+</span></td>
          <td><span className="zh">超越 Mint 9，具備更佳居中度或色澤。</span><br /><span className="en">Exceeds Mint 9, with better centering or color.</span></td>
        </tr>
        <tr>
          <td><span className="zh">9</span><br /><span className="en">Mint</span></td>
          <td><span className="zh">四角完整，允許輕微瑕疵或污點。</span><br /><span className="en">Corners intact, allowing for minor flaws or spots.</span></td>
        </tr>
        <tr>
          <td><span className="zh">8.5</span><br /><span className="en">NM/Mint+</span></td>
          <td><span className="zh">邊緣輕微磨損，卡面保持色澤。</span><br /><span className="en">Slight edge wear, card face maintains color.</span></td>
        </tr>
        <tr>
          <td><span className="zh">8</span><br /><span className="en">NM/Mint</span></td>
          <td><span className="zh">四角完整但放大後有輕微瑕疵。</span><br /><span className="en">Corners intact but with minor flaws under magnification.</span></td>
        </tr>
        <tr>
          <td><span className="zh">7.5</span><br /><span className="en">Near Mint+</span></td>
          <td><span className="zh">兩至三角輕微磨損，背面可能有污漬。</span><br /><span className="en">Two to three corners slightly worn, back may have stains.</span></td>
        </tr>
        <tr>
          <td><span className="zh">7</span><br /><span className="en">Near Mint</span></td>
          <td><span className="zh">三至四角磨損，居中度 70/30。</span><br /><span className="en">Three to four corners worn, centering 70/30.</span></td>
        </tr>
        <tr>
          <td><span className="zh">6.5</span><br /><span className="en">Ex/NM+</span></td>
          <td><span className="zh">允許輕度菱形裁切與輕微污漬。</span><br /><span className="en">Allows for light diamond cutting and minor stains.</span></td>
        </tr>
        <tr>
          <td><span className="zh">6</span><br /><span className="en">Ex/NM</span></td>
          <td><span className="zh">一角損傷或兩種缺陷並存。</span><br /><span className="en">One corner damaged or two defects present.</span></td>
        </tr>
        <tr>
          <td><span className="zh">5.5</span><br /><span className="en">Excellent+</span></td>
          <td><span className="zh">邊框輕微褪色，卡面有明顯印刷缺陷。</span><br /><span className="en">Slight frame fading, card face has obvious printing defects.</span></td>
        </tr>
        <tr>
          <td><span className="zh">5</span><br /><span className="en">Excellent</span></td>
          <td><span className="zh">角有損傷，卡面可能有刮痕。</span><br /><span className="en">Corners damaged, card face may have scratches.</span></td>
        </tr>
        <tr>
          <td><span className="zh">4.5</span><br /><span className="en">VG/Ex+</span></td>
          <td><span className="zh">卡面有折痕或刮痕，居中度 85/15。</span><br /><span className="en">Card face has creases or scratches, centering 85/15.</span></td>
        </tr>
        <tr>
          <td><span className="zh">4</span><br /><span className="en">VG/Ex</span></td>
          <td><span className="zh">卡面有明顯瑕疵與裁切痕跡。</span><br /><span className="en">Card face has obvious flaws and cutting marks.</span></td>
        </tr>
        <tr>
          <td><span className="zh">3.5</span><br /><span className="en">Very Good+</span></td>
          <td><span className="zh">四角磨圓，卡面有中度折痕。</span><br /><span className="en">Corners rounded, card face has moderate creases.</span></td>
        </tr>
        <tr>
          <td><span className="zh">3</span><br /><span className="en">Very Good</span></td>
          <td><span className="zh">四角磨圓，卡面有中度折痕與污漬。</span><br /><span className="en">Corners rounded, card face has moderate creases and stains.</span></td>
        </tr>
        <tr>
          <td><span className="zh">2.5</span><br /><span className="en">Good+</span></td>
          <td><span className="zh">有嚴重裁切痕跡，背面可能有書寫。</span><br /><span className="en">Has severe cutting marks, back may have writing.</span></td>
        </tr>
        <tr>
          <td><span className="zh">2</span><br /><span className="en">Good</span></td>
          <td><span className="zh">折痕貫穿卡面，存在書寫痕跡。</span><br /><span className="en">Creases run through the card, with writing present.</span></td>
        </tr>
        <tr>
          <td><span className="zh">1.5</span><br /><span className="en">Fair</span></td>
          <td><span className="zh">有嚴重缺陷如釘孔或缺角。</span><br /><span className="en">Has serious defects such as staple holes or missing corners.</span></td>
        </tr>
        <tr>
          <td><span className="zh">1</span><br /><span className="en">Poor</span></td>
          <td><span className="zh">卡面嚴重破損或缺失。</span><br /><span className="en">Card face is severely damaged or missing.</span></td>
        </tr>
      </tbody>
    </table>


  <h2>標註與簽名評級 (Annotations and Signature Grading)</h2>
  <table className="grading-table">
    <thead>
      <tr>
        <th>類別 (Classification)</th>
        <th>說明 (Description)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span className="zh">真實 AU</span><br /><span className="en">Authentic AU</span></td>
        <td><span className="zh">卡牌真實但無法數值評級。</span><br /><span className="en">Card is authentic but cannot be numerically graded.</span></td>
      </tr>
      <tr>
        <td><span className="zh">真實且修改過 AA</span><br /><span className="en">Authentic Altered AA</span></td>
        <td><span className="zh">卡牌真實但經過修剪或重上色。</span><br /><span className="en">Card is authentic but has been trimmed or re-colored.</span></td>
      </tr>
      <tr>
        <td><span className="zh">簽名評級</span><br /><span className="en">Signature Grading</span></td>
        <td><span className="zh">5–10 分制，10 分代表完美簽名。</span><br /><span className="en">5–10 scale, with 10 representing a perfect signature.</span></td>
      </tr>
    </tbody>
  </table>

  <h2>停止使用的評級等級 (Grading Levels No Longer in Use)</h2>
  <table className="grading-table">
    <thead>
      <tr>
        <th>舊等級 (Old Level)</th>
        <th>新等級 (New Level)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span className="zh">CGC Trading Cards Gem Mint 9.5</span><br /><span className="en">CGC Trading Cards Gem Mint 9.5</span></td>
        <td><span className="zh">CGC Cards Gem Mint 10</span><br /><span className="en">CGC Cards Gem Mint 10</span></td>
      </tr>
      <tr>
        <td><span className="zh">CSG Gem Mint 9.5</span><br /><span className="en">CSG Gem Mint 9.5</span></td>
        <td><span className="zh">CGC Cards Gem Mint 10</span><br /><span className="en">CGC Cards Gem Mint 10</span></td>
      </tr>
      <tr>
        <td><span className="zh">Perfect 10</span><br /><span className="en">Perfect 10</span></td>
        <td><span className="zh">仍保留，但舊版本已停止使用</span><br /><span className="en">Still retained, but the old version is no longer in use</span></td>
      </tr>
    </tbody>
  </table>
</div>

  </div>
  );
}

export default GradingStandard;
