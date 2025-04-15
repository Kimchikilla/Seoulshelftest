import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import MenuHeader from "../components/MenuHeader";
import bookImage from "../../assets/Book/XL.jpg";
import { removeToken, getToken } from "../../utils/tokenManager";
import { jwtDecode } from "jwt-decode"; // ✅ 수정된 부분

const Menu = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const token = getToken();
    console.log("저장된 토큰:", localStorage.getItem("accessToken"));

    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ 여기서도 수정
        console.log("디코딩된 토큰:", decoded);
        setNickname(decoded.name || decoded.given_name || "사용자");
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }
  }, []);

  const handleLogout = () => {
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
    navigate("/book/1");
  };

  return (
    <div className="menu-container">
      <MenuHeader />
      <div className="user-info">
        <div className="nickname">
          <h3>{nickname ? `${nickname} 님` : "닉네임 로드 실패"}</h3>
        </div>
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
