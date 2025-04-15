import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import MenuHeader from "../components/MenuHeader";
import { removeToken, getToken } from "../../utils/tokenManager";
import { jwtDecode } from "jwt-decode";

const RecBookCard = ({ book, onClick }) => (
  <div onClick={onClick}>
    <img src={book.image_url} alt={book.title} width="100" />
    <div className="wbook-title">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  </div>
);

const Menu = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const token = getToken();
    console.log("저장된 토큰:", localStorage.getItem("accessToken"));

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("디코딩된 토큰:", decoded);
        setNickname(decoded.name || decoded.given_name || "사용자");
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        // 읽은책 넣기
        const response = await fetch("https://seoulshelf.duckdns.org/spring-books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };

    fetchPopularBooks();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

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
              0 읽은 책
            </button>
          </div>
          <div>
            <button onClick={comment} className="info-button">
              0 코멘트
            </button>
          </div>
          <div>
            <button onClick={scrap} className="info-button">
              0 스크랩
            </button>
          </div>
        </div>
        <div className="wbook">
          <h4>읽고싶어요</h4>
          <div className="wbook-list">
            {books.map((book) => (
              <RecBookCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
            ))}
          </div>
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
