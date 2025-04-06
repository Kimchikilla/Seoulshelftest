import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { title: '회원정보', path: '/profile' },
    { title: '인기글', path: '/popular' },
    { title: '홈', path: '/home' },
    { title: '내가 쓴 글', path: '/my-posts' },
    { title: '스크랩', path: '/scrap' },
  ];

  const handleLogout = () => {
    // 로그아웃 처리 로직
    navigate('/login');
  };

  return (
    <div className="menu-container">
      <nav className="menu-nav">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="menu-item">
            {item.title}
          </Link>
        ))}
        <button onClick={handleLogout} className="logout-button">
          로그아웃
        </button>
      </nav>
    </div>
  );
};

export default Menu;