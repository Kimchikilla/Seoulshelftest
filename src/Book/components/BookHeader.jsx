import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Home/components/Header";
import SearchModal from "../../Home/components/SearchModal";
import headerTitle from "../../assets/header_title.svg";

const Header = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="header-wrapper">
      <header className="header">
        <button className="back-button" onClick={handleBackClick}>
          <span className="material-icons">arrow_back</span>
        </button>
        <Link to="/home" className="header-title-link">
          <img src={headerTitle} alt="서울책장" className="header-title" />
        </Link>
        <button className="search-button" onClick={() => setIsSearchOpen(true)}>
          <span className="material-icons">search</span>
        </button>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default Header;
