import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";
import MenuHeader from "../components/MenuHeader";
import bookImage from "../../assets/Book/XL.jpg";
import { removeToken } from "../../utils/tokenManager";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리: 토큰 제거 및 로그인 페이지로 이동
    removeToken();
    navigate("/");
  };

  const read = () => {
    navigate("/read");
  };

  const comment = () => {
    navigate("/allcomment");
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
            <button onClick={read} className="info-button">
              읽은 책
            </button>
          </div>
          <div>
            <button onClick={comment} className="info-button">
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
        <div className="wbook-list">
          {[1, 2, 3].map((item) => (
            <div key={item} className="book-image" onClick={bookinfo}>
              <img src={bookImage} alt="book" />
            </div>
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
