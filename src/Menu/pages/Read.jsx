import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Read.css";
import ReadHeader from "../components/ReadHeader";
import { getToken } from "../../utils/tokenManager";
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
  const [reads, setReads] = useState([]);

  useEffect(() => {
    const fetchReadBooks = async () => {
      try {
        const token = getToken();
        if (!token) {
          navigate("/");
          return;
        }

        const response = await fetch("https://seoulshelf.duckdns.org/read-books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("읽은 책 목록을 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        setReads(data);
      } catch (error) {
        console.error("Error fetching read books:", error);
      }
    };

    fetchReadBooks();
  }, [navigate]);

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
        {reads.map((book) => (
          <RecBookCard key={book.book_id} book={book} onClick={() => handleBookClick(book.book_id)} />
        ))}
      </div>
    </div>
  );
};

export default Read;
