import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="book-section">
        <h2 className="section-title">지금 많이 읽고 있어요</h2>
        <div className="book-list">
          <div className="book-card">
            <img src="/book-cover.jpg" alt="일하는 사람을 위한 철학" className="book-cover" />
            <div className="book-info">
              <h3 className="book-title">일하는 사람을 위한 철학</h3>
              <p className="book-author">에릭 몽 시게티</p>
              <div className="book-rating">
                <span className="stars">★★★★☆</span>
                <span className="likes">5</span>
              </div>
            </div>
          </div>
          {/* 추가 책 카드들 */}
        </div>
      </div>
    </div>
  );
};

export default Home; 