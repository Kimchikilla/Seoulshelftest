import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import bookImage from '../assets/XL.jpg';

const Home = () => {
  // 초기 centerIndex를 0으로 변경 (첫 번째 아이템을 위해)
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef(null);

  const books = [
    { id: 1, title: "일하는 사람을 위한 철학", author: "에릭 몽 시게티", image: bookImage },
    { id: 2, title: "일하는 사람을 위한 철학", author: "에릭 몽 시게티", image: bookImage },
    { id: 3, title: "일하는 사람을 위한 철학", author: "에릭 몽 시게티", image: bookImage },
    { id: 4, title: "일하는 사람을 위한 철학", author: "에릭 몽 ,시게티", image: bookImage },
    { id: 5, title: "일하는 사람을 위한 철학", author: "에릭 몽 시게티", image: bookImage }

    // 더 많은 책 추가 가능
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const itemWidth = containerWidth * 0.38;
      const maxScroll = container.scrollWidth - containerWidth;
      const gap = 20;

      // 스크롤 위치에 따른 인덱스 계산 수정
      let newCenterIndex = Math.round(scrollPosition / (itemWidth + gap));
      
      // 끝부분에서의 인덱스 제한
      const maxIndex = books.length - 1;
      if (scrollPosition >= maxScroll - itemWidth * 0.3) { // 마지막 아이템 근처
        newCenterIndex = maxIndex;
        container.scrollTo({
          left: maxScroll,
          behavior: 'smooth'
        });
      }
      
      // 시작 부분에서의 인덱스 제한
      if (scrollPosition <= itemWidth * 0.3) { // 첫 아이템 근처
        newCenterIndex = 0;
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      }

      if (newCenterIndex !== centerIndex && newCenterIndex >= 0 && newCenterIndex <= maxIndex) {
        setCenterIndex(newCenterIndex);
      }
    }
  };

  // 초기 스크롤 위치 설정을 위한 useEffect 추가
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.offsetWidth * 0.38;
      container.scrollTo({
        left: 0,  // 처음에는 맨 왼쪽으로 스크롤
        behavior: 'smooth'
      });
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const containerWidth = container.offsetWidth;
      const itemWidth = containerWidth * 0.38;
      const centerOffset = (containerWidth - itemWidth) / 2;
      const scrollPosition = itemWidth * centerIndex + centerOffset;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [centerIndex]);

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