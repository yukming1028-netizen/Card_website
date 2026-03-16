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
              透過我們的專業評級標準，極大化您的收藏潛力——這是判斷卡牌品相、稀有度及長期價值的信賴指南。
            </span>
            <span className="text-en">
              Maximize the potential of your collection with our professional grading scale—a trusted guide for determining the condition, rarity, and long-term value of your cards.
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
          <td><span className="zh">10⭐️⭐️⭐</span><br /><span className="en">HKG Cards</span></td>
          <td><span className="zh">
            * 此等級卡牌沒有任何肉眼可見的瑕疵。置中度（Centering）表現為完美的 50/50，且具備無暇的色澤與精準的校準。所有獲評為 ABC Cards 10 ⭐️⭐️⭐️ 等級的卡牌，均會獲得專屬的 ABC Cards 10 ⭐️⭐️⭐️特殊標籤。全球僅限三張：三星評級 (3-Star) 代表住無懈可擊嘅完美。我哋對每一張寶可夢卡進行極限審核，確保同款卡牌喺全球範圍內，最多只會有三張獲得呢份榮耀。極致稀有，定義收藏新高度。
          </span><br />
          <span className="en">
            * 10 ⭐️⭐️⭐️: Perfect. Features 50/50 centering, flawless color, and zero visible defects. Earns a unique "10 ⭐️⭐️⭐️" label.Limited to 3 Worldwide: The 10 ⭐️⭐️⭐️ Grade represents flawless perfection. We apply extreme scrutiny to every Pokémon card, ensuring this honor is reserved for only three copies of the same card globally. Your collection, redefined by ultimate scarcity.
          </span></td>
        </tr>
        <tr>
          <td><span className="zh">10 ⭐️⭐</span><br /><span className="en">HKG Cards</span></td>
          <td><span className="zh">
            * 全球僅限十張：10 ⭐️⭐️此等級卡牌沒有任何肉眼可見的瑕疵。置中度（Centering）表現為完美的 50/50，且具備無暇的色澤與精準的校準。所有獲評為  ABC Cards 10 ⭐️⭐️ 等級的卡牌，均會獲得專屬的  ABC Cards 10 ⭐️⭐️ 特殊標籤。
          </span><br />
          <span className="en">
            * 10 ⭐️⭐️: Virtually perfect. Features 50/50 centering, flawless color, and zero visible defects. Earns a unique "10 ⭐️ ⭐️" label.
          </span></td>
        </tr>
        <tr>
          <td><span className="zh">10A+</span><br /><span className="en">Gem Mint</span></td>
          <td><span className="zh">
            此等級卡牌的總體評分達 10A+，但在單項評選標準中未達 ABC Cards 10 ⭐️⭐️的極致要求。Gem Mint 10 代表卡牌的極致狀態，近乎完美無瑕。具備四個極其銳利的邊角、清晰的印刷焦距以及完整的原始光澤。卡面不可有任何污漬，僅在不影響整體美感的前提下，允許極輕微的印刷瑕疵。居中比例要求：正面約 55/45 以內，背面約 75/25 以
          </span><br />
          <span className="en">
            An overall 10A+ that narrowly misses ABC Cards 10 ⭐️⭐️ status in one category. A ABC Gem Mint 10 card represents the pinnacle of quality—a virtually pristine specimen. It features four razor-sharp corners, flawless focus, and its full original gloss. While free of any staining, a minute printing imperfection is permissible only if it does not detract from the card's overall aesthetic. Centering must be within approximately 55/45 on the front and 75/25 on the reverse.
          </span></td>
        </tr>
        <tr>
          <td><span className="zh">9</span><br /><span className="en">NM/Mint</span></td>
          <td><span className="zh">
            卡牌的邊緣應相對平整，僅容許輕微磨損。卡面須保有原始光澤，但准許存在少量印刷缺陷或輕微裁切痕跡。
          </span><br />
          <span className="en">
            Slightly more handling defects on TCG cards. Edges mostly sharp, with only minor wear or print flaws.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">8</span><br /><span className="en">Near Mint+</span></td>
          <td><span className="zh">
            卡牌的兩至三個邊角容許有些微磨損，或邊緣出現輕微毛邊。圖案可能有些微位移。背面可接受輕微污漬。
          </span><br />
          <span className="en">
            Shows light wear on a few corners or slightly rough edges. Might have minor registration issues or very light staining on the back.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">7</span><br /><span className="en">Near Mint</span></td>
          <td><span className="zh">
            三至四個邊角容許有些微磨損，或邊緣有輕微毛邊。圖案可能有些微位移。背面可接受極輕微污漬。
          </span><br />
          <span className="en">
            Noticeable wear on three or more corners. May show moderate cutting marks and slight back stains.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">6</span><br /><span className="en">Ex/NM</span></td>
          <td><span className="zh">
            容許單個角損傷，或最多兩項下列瑕疵：2-3 個角磨損、邊緣輕微毛邊、明顯印刷缺陷。正面可有污漬。
          </span><br />
          <span className="en">
            Similar to 7, but allows one dinged corner. Moderate cutting marks and possible front stains.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">5</span><br /><span className="en">Excellent</span></td>
          <td><span className="zh">
            邊角磨損並呈極微圓角化，或 2-3 個角損傷。邊框輕微變色。卡面有明顯印刷缺陷或刮痕。
          </span><br />
          <span className="en">
            Features fuzzy corners and up to three dings. Surface may have visible scratches or focus issues.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">4</span><br /><span className="en">VG/Ex</span></td>
          <td><span className="zh">
            邊角呈輕微圓角。卡面有明顯磨痕、刮痕及輕度折痕。邊框泛白並有輕微污漬。
          </span><br />
          <span className="en">
            Shows heavier surface wear, including multiple light creases and an obvious diamond cut.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">3</span><br /><span className="en">Good</span></td>
          <td><span className="zh">
            四角磨圓。卡面有中度或多條輕度折痕，正背面皆有較嚴重污漬。
          </span><br />
          <span className="en">
            Corners rounded, with moderate creases and heavier staining on both sides. Original gloss mostly gone.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">2</span><br /><span className="en">Fair</span></td>
          <td><span className="zh">
            卡面有嚴重折痕且可能貫穿全卡。正背面可能有書寫痕跡。裁切極度嚴重，近乎錯切。
          </span><br />
          <span className="en">
            Heavier creasing may run edge to edge. May have writing on the front and often nearly miscut.
          </span></td>
        </tr>

        <tr>
          <td><span className="zh">1</span><br /><span className="en">Poor</span></td>
          <td><span className="zh">
            卡面嚴重受損，包含破損折痕、缺角或結構性撕裂。
          </span><br />
          <span className="en">
            The lowest grade. Expect extreme damage: deep creases, missing corners, or structural tears.
          </span></td>
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
