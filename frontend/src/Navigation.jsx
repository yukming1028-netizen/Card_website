import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: '主頁', nameEn: 'Home', path: '#home', type: 'hash'},
    { name: '關於我們', nameEn: 'About Us', path: '/about_us', type: 'link'},
    { name: '核實認證', nameEn: 'Certificate Verification', path: '#search', type: 'hash'},
    { name: '評級準則', nameEn: 'Grading Standards', path: '/grading_standard', type: 'link'},
    { name: '封套和標籤', nameEn: 'Card Holder & Label', path: '/card_holder', type: 'link'},
    { name: '服務和費用', nameEn: 'Services and Fees', path: '/service_fee', type: 'link'},
  ];

  return (
    <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            className="hamburger" 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ marginRight: '8px' }}
          >
            ☰
          </button>
          <a href="/">
            <img 
              src="/assets/logo.png" 
              alt="Hero Background" 
              className="hero-bg" 
              style={{ maxWidth: '90px', maxHeight: '50px', marginTop: '15px',marginLeft: '1%' }}
            />
          </a>
        </div>

      <div className="navbar-container" style={{marginTop: '5px'}}>
        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) =>
            item.type === 'hash' ? (
              <HashLink
                key={item.path}
                smooth
                to={`/${item.path}`}
                className={`navbar-item ${location.hash === item.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)} 
              >
                <span className="nav-text-zh">{item.name}</span><br />
                <span className="nav-text-en">{item.nameEn}</span>
              </HashLink>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)} 
              >
                <span className="nav-text-zh">{item.name}</span><br />
                <span className="nav-text-en">{item.nameEn}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
