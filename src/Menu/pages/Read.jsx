import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";
import ReadHeader from "../components/ReadHeader";
import bookImage from "../../assets/Book/XL.jpg"; // 예시 이미지

const Read = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  // 초기 9개 로딩
  useEffect(() => {
    loadMoreBooks();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreBooks();
    }
  };

  // 3개씩 추가
  const loadMoreBooks = () => {
    const newBooks = Array.from({ length: 3 }, (_, i) => ({
      id: books.length + i + 1,
      image: bookImage,
    }));
    setBooks((prev) => [...prev, ...newBooks]);
  };

  const bookinfo = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="menu-container">
      <ReadHeader />
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-item" onClick={() => bookinfo(book.id)}>
            <img src={book.image} alt="book" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
