import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isMenuPage = location.pathname === '/menu';
  
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        {isMenuPage ? (
          <>
            <button className="notification-button">
              <span className="material-icons">notifications</span>
            </button>
            <Link to="/home" className="header-title-link">
              <h1 className="header-title">Seoulshelf</h1>
            </Link>
            <button className="back-button" onClick={handleBackClick}>
              <span className="material-icons">arrow_back</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/menu" className="menu-button">
              <span className="material-icons">menu</span>
            </Link>
            <Link to="/home" className="header-title-link">
              <h1 className="header-title">Seoulshelf</h1>
            </Link>
            <button className="search-button">
              <span className="material-icons">search</span>
            </button>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;