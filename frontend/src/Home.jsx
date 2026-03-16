import React, { useState, useEffect} from 'react';
import Hero from './Hero';
import Features from './Features';
import Plugins from './Plugins';
import CardDetail from './CardDetail';
import axios from 'axios';

// 整合 Docker 使用相對路徑，獨立部署使用完整 URL
const API_URL = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

function Home() {
  useEffect(() => { const element = document.getElementById('home'); if (element) { element.scrollIntoView({ behavior: 'smooth' }); } }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setCardData(null);

    try {
      const response = await axios.get(`/api/cards.php?search=${searchQuery}`);
      setCardData(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('找不到該寶可夢卡牌');
      } else {
        setError('搜索失敗，請稍後再試');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="home" style={{scrollMarginTop: '90px'}}>
      <img src="/assets/home_banner.jpg" alt="Hero Background" className="hero-bg" style={{marginLeft:'1%',width:'98%',maxHeight:'500px'}}/>
      <div className="container">
        <Hero />
        <Features />
        <Plugins />
        <div className="search-section" id="search-section">
          <div className="search-box">
            <form onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="輸入寶可夢卡牌獨立編號(Input Pokémon Card No.)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                  🔍 搜索(Search)
                </button>
              </div>
            </form>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#1e3a8a' }}>
              搜索中(Searching)...
            </div>
          )}

          {error && (
            <div className="error-message" style={{ maxWidth: '600px', margin: '20px auto' }}>
              {error}
            </div>
          )}

          {cardData && <CardDetail card={cardData} />}
        </div>
      </div>
      <div className="divider" style={{display:'flex', marginLeft:'1%', width:'98%', maxHeight:'400px'}}>
        <div style={{flex:1}}>
          <img src="/assets/aboutus.jpg" alt="About Us" className="hero-bg" style={{width:'100%', height:'100%', objectFit:'cover'}} />
        </div>


        <div style={{flex:1, background:'#000', color:'#fff', alignItems:'center', justifyContent:'center'}}>
          <h1 style={{ marginTop:'8%'}}>關於我們(About Us)</h1><br />
          <p>我們是一家源自香港、面向全球的專業卡牌評級機構。與其他多元化的評級公司不同，我們是全球唯一「只為寶可夢（Pokémon）卡牌服務」的專屬評級中心。因為專一，所以極致；因為熱愛，所以專業。</p>
          <br />
           <button 
      style={{
        marginTop:'20px',
        padding:'10px 20px',
        background:'#000',
        color:'#fff',
        border:'2px solid #fff',
        borderRadius:'8px',
        cursor:'pointer',
        fontSize:'14px',
      }}
      onClick={() => window.location.href='/about_us'}
    >
      瞭解更多(More Information)
    </button>
        </div>
      </div>
      <br />
      <a href="/about_us">
        <img src="/assets/home_footer_banner.jpg" alt="Hero Background" className="hero-bg" style={{marginLeft:'1%',width:'98%',maxHeight:'350px'}}/>
      </a>
    </div>
  );
}

export default Home;
