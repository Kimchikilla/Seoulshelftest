import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Recommend.css";

const RecBookCard = ({ book, onClick }) => (
  <div onClick={onClick}>
    <img src={book.image_url} alt={book.title} width="100" />
    <div className="recbook-title">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  </div>
);

const Recommend = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
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

  return (
    <div className="rec-container">
      <div className="rec">
        <h4>봄에 읽기 좋은 책</h4>
      </div>
      <div className="Recbook-list">
        {books.map((book) => (
          <RecBookCard key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
        ))}
      </div>
    </div>
  );
};

export default Recommend;
