import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchModal from "./SearchModal";
import headerTitle from "../../assets/header_title.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isMenuPage = location.pathname === "/menu";

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
              <img src={headerTitle} alt="서울책장" className="header-title" />
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
              <img src={headerTitle} alt="서울책장" className="header-title" />
            </Link>
            <button className="search-button" onClick={() => setIsSearchOpen(true)}>
              <span className="material-icons">search</span>
            </button>
          </>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Header;
