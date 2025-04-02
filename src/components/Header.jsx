import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <button className="menu-button">
          <span className="material-icons">menu</span>
        </button>
        <h1 className="header-title">Seoulshelf</h1>
        <button className="search-button">
          <span className="material-icons">search</span>
        </button>
      </header>
    </div>
  );
};

export default Header; 