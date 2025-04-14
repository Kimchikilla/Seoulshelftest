import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await fetch('https://seoulshelf.duckdns.org/popular-books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching popular books:', error);
      }
    };

    fetchPopularBooks();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const itemWidth = containerWidth * 0.38;
      const maxScroll = container.scrollWidth - containerWidth;
      const gap = 20;

      let newCenterIndex = Math.round(scrollPosition / (itemWidth + gap));

      const maxIndex = books.length - 1;
      if (scrollPosition >= maxScroll - itemWidth * 0.3) {
        newCenterIndex = maxIndex;
        container.scrollTo({
          left: maxScroll,
          behavior: "smooth",
        });
      }

      if (scrollPosition <= itemWidth * 0.3) {
        newCenterIndex = 0;
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }

      if (newCenterIndex !== centerIndex && newCenterIndex >= 0 && newCenterIndex <= maxIndex) {
        setCenterIndex(newCenterIndex);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const containerWidth = container.offsetWidth;
      const itemWidth = containerWidth * 0.38;
      const centerOffset = (containerWidth - itemWidth) / 2;
      const scrollPosition = itemWidth * centerIndex + centerOffset;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [centerIndex]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="book-section">
        <h2 className="section-title">지금 많이 읽고 있어요</h2>
        <div className="book-list" ref={scrollRef} onScroll={handleScroll}>
          {books.map((book, index) => (
            <div key={index} className={`book-card ${index === centerIndex ? "center" : ""}`} onClick={() => handleBookClick(book.id)}>
              <img src={book.image_url} alt={book.title} className="book-cover" />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
