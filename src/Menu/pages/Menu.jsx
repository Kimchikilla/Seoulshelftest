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
  const [reads, setReads] = useState([]);
  const [comments, setComments] = useState([]);
  const [scraps, setScraps] = useState([]);

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

  // 1. 읽고 싶은 책 가져오기
  useEffect(() => {
    const fetchWantToReadBooks = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await fetch("https://seoulshelf.duckdns.org/want-to-read", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("읽고 싶은 책 목록을 가져오는데 실패했습니다");
        }

        const data = await response.json();
        console.log("읽고 싶은 책 목록:", data);
        setBooks(data);
      } catch (error) {
        console.error("읽고 싶은 책 가져오기 실패:", error);
      }
    };

    fetchWantToReadBooks();
  }, []);

  // 2. 읽은 책 가져오기
  useEffect(() => {
    const fetchReadBooks = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await fetch("https://seoulshelf.duckdns.org/read-books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setReads(data);
      } catch (error) {
        console.error("읽은 책 가져오기 실패:", error);
      }
    };

    fetchReadBooks();
  }, []);

  // 3. 코멘트 가져오기
  useEffect(() => {
    const fetchAllComment = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("https://seoulshelf.duckdns.org/my/comments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching All Comment:", error);
      }
    };

    fetchAllComment();
  }, []);

  // 4. 스크랩 가져오기
  useEffect(() => {
    const fetchScraps = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("https://seoulshelf.duckdns.org/scraps", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setScraps(data);
      } catch (error) {
        console.error("Error fetching All scraps:", error);
      }
    };

    fetchScraps();
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
              <p className="number-p">{reads.length} </p>
              <p className="buttom-p">읽은 책</p>
            </button>
          </div>
          <div>
            <button onClick={comment} className="info-button">
              <p className="number-p">{comments.length} </p>
              <p className="buttom-p">코멘트</p>
            </button>
          </div>
          <div>
            <button onClick={scrap} className="info-button">
              <p className="number-p">{scraps.length} </p>
              <p className="buttom-p">스크랩</p>
            </button>
          </div>
        </div>
        <div className="wbook">
          <h4>읽고싶어요</h4>
          <div className="wbook-list">
            {books.map((book) => (
              <RecBookCard key={book.book_id} book={book} onClick={() => handleBookClick(book.book_id)} />
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
