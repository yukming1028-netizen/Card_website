import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: 'Hero 區', nameEn: 'Hero', path: '/#hero-section' },
    { name: '功能介紹', nameEn: 'Features', path: '/#features-section' },
    { name: '搜索區', nameEn: 'Search', path: '/#search-section' },
    { name: '簡介頁', nameEn: 'Intro', path: '/intro' },
    { name: '插件頁', nameEn: 'Plugins', path: '/plugins' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">寶可夢卡牌查詢</span>
        </Link>
        <div className="navbar-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-item ${location.pathname === item.path || (item.path.startsWith('/#') && location.pathname === '/') ? 'active' : ''}`}
            >
              <span className="nav-text-zh">{item.name}</span>
              <span className="nav-text-en">{item.nameEn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
