import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";
import MenuHeader from "../components/MenuHeader";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리 로직
    navigate("/");
  };

  const readed = () => {
    navigate("/readed");
  };

  const commant = () => {
    navigate("/commant");
  };

  const scrap = () => {
    navigate("/scrap");
  };

  const bookinfo = () => {
    navigate("/book/:id");
  };

  return (
    <div className="menu-container">
      <MenuHeader />
      <div className="user-info">
        <h3>닉네임 필드</h3>
        <div className="user-stats">
          <div>
            <button onClick={readed} className="info-button">
              읽은 책
            </button>
          </div>
          <div>
            <button onClick={commant} className="info-button">
              코멘트
            </button>
          </div>
          <div>
            <button onClick={scrap} className="info-button">
              스크랩
            </button>
          </div>
        </div>
        <h4>읽고싶어요</h4>
        <div className="book-list">
          {[1, 2, 3].map((item) => (
            <button onClick={bookinfo} className="book-button">
              <img
                key={item}
                src="src\assets\Book\XL.jpg" // 책 이미지 경로
                alt="book"
                className="book-image"
              />
            </button>
          ))}
        </div>
        <div className="logOut">
          <button onClick={handleLogout} className="logout-button">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
