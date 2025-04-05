import React, { useState, useRef } from 'react';
import './Home.css';
import bookImage from '../assets/XL.jpg';

const Home = () => {
  const [centerIndex, setCenterIndex] = useState(1);
  const scrollRef = useRef(null);

  const books = [
    {
      id: 1,
      title: "일하는 사람을 위한 철학",
      author: "에릭 몽 시게티",
      image: bookImage
    },
    {
      id: 2,
      title: "일하는 사람을 위한 철학",
      author: "에릭 몽 시게티",
      image: bookImage
    },
    {
      id: 3,
      title: "일하는 사람을 위한 철학",
      author: "에릭 몽 시게티",
      image: bookImage
    },
    // 더 많은 책 추가 가능
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const itemWidth = containerWidth * 0.4; // 책 카드의 너비 조정
      const newCenterIndex = Math.round(scrollPosition / itemWidth);
      setCenterIndex(newCenterIndex);
    }
  };

  return (
    <div className="home-container">
      <div className="book-section">
        <h2 className="section-title">지금 많이 읽고 있어요</h2>
        <div 
          className="book-list"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {books.map((book, index) => (
            <div 
              key={book.id} 
              className={`book-card ${index === centerIndex ? 'center' : ''}`}
            >
              <img src={book.image} alt={book.title} className="book-cover" />
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