import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";
import ReadHeader from "../components/ReadHeader";
import bookImage from "../../assets/Book/XL.jpg"; // 예시 이미지

const RecBookCard = ({ book, onClick }) => (
  <div onClick={onClick}>
    <img src={book.image_url} alt={book.title} width="100" />
    <div className="recbook-title">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  </div>
);

const Read = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

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

  return (
    <div className="menu-container">
      <ReadHeader />
      <div className="book-grid">
        {books.map((book) => (
          <RecBookCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
        ))}
      </div>
    </div>
  );
};

export default Read;
