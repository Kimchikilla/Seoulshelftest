import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../components/Header";

const BookCard = ({ book, isCenter, onClick }) => (
  <div className={`book-card ${isCenter ? "center" : ""}`} onClick={onClick}>
    <img src={book.image_url} alt={book.title} className="book-cover" />
    <div className="book-info">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await fetch("https://seoulshelf.duckdns.org/popular-books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };

    fetchPopularBooks();
  }, []);

  useEffect(() => {
    if (scrollRef.current && books.length > 0) {
      const container = scrollRef.current;
      const containerWidth = container.offsetWidth;
      const itemWidth = containerWidth * 0.38 + 20; // item + gap
      const centerOffset = (containerWidth - itemWidth) / 2;
      container.scrollLeft = itemWidth * 3 + centerOffset;
    }
  }, [books]);

  const handleScroll = () => {
    if (!scrollRef.current || books.length === 0) return;

    const container = scrollRef.current;
    const containerWidth = container.offsetWidth;
    const itemWidth = containerWidth * 0.38 + 20;
    const totalItems = books.length;
    const scrollLeft = container.scrollLeft;
    const maxScroll = itemWidth * (totalItems + 3);

    if (scrollLeft <= itemWidth * 1.5) {
      container.scrollLeft = scrollLeft + itemWidth * totalItems;
    } else if (scrollLeft >= maxScroll - itemWidth * 1.5) {
      container.scrollLeft = scrollLeft - itemWidth * totalItems;
    }

    const centerOffset = (containerWidth - itemWidth) / 2;
    const newIndex = Math.round((scrollLeft - centerOffset - itemWidth * 3) / itemWidth);
    if (newIndex !== centerIndex && newIndex >= 0 && newIndex < books.length) {
      setCenterIndex(newIndex);
    }
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="book-section">
        <h2 className="section-title">지금 많이 읽고 있어요</h2>
        <div className="book-list" ref={scrollRef} onScroll={handleScroll}>
          {/* 앞쪽 복제 */}
          {books.slice(-3).map((book, index) => (
            <BookCard key={`head-${index}`} book={book} />
          ))}

          {/* 실제 목록 */}
          {books.map((book, index) => (
            <BookCard key={index} book={book} isCenter={index === centerIndex} onClick={() => handleBookClick(book.id)} />
          ))}

          {/* 뒤쪽 복제 */}
          {books.slice(0, 3).map((book, index) => (
            <BookCard key={`tail-${index}`} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
