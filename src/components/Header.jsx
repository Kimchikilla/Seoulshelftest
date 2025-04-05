import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <button className="menu-button">
          <span className="material-icons">menu</span>
        </button>
        <Link to="/home" className="header-title-link">
          <h1 className="header-title">Seoulshelf</h1>
        </Link>
        <button className="search-button">
          <span className="material-icons">search</span>
        </button>
      </header>
    </div>
  );
};

export default Header;