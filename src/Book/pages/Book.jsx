import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Book.css";
import Header from "../../Home/components/Header";
import bookImage from "../../assets/Book/XL.jpg";

const Book = () => {
  const { id } = useParams();
  const [isWantToRead, setIsWantToRead] = useState(false);
  const [comment, setComment] = useState('');
  
  const bookData = {
    title: "일하는 사람을 위한 철학",
    author: "에릭 몽 시게티",
    image: bookImage,
    averageRating: 4.5,
    totalRatings: 128
  };

  return (
    <div className="book-detail-container">
      <Header />
      <div className="book-detail">
        {/* 제목과 저자 정보 */}
        <div className="book-info-section">
          <h1 className="book-detail-title">{bookData.title}</h1>
          <p className="book-detail-author">{bookData.author}</p>
        </div>

        {/* 책 표지 이미지 */}
        <div className="book-cover-section">
          <img src={bookData.image} alt={bookData.title} className="book-detail-cover" />
        </div>

        {/* 평균 별점 */}
        <div className="book-rating-section">
          <div className="rating-display">
            <span className="material-icons star">star</span>
            <span className="rating-text">
              {bookData.averageRating} ({bookData.totalRatings}명)
            </span>
          </div>
        </div>

        {/* 읽고싶어요 버튼과 코멘트 섹션 */}
        <div className="interaction-section">
          <button 
            className={`want-to-read-button ${isWantToRead ? 'active' : ''}`}
            onClick={() => setIsWantToRead(!isWantToRead)}
          >
            <span className="material-icons">
              {isWantToRead ? 'favorite' : 'favorite_border'}
            </span>
            읽고 싶어요
          </button>

          <div className="comment-section">
            <textarea
              className="comment-input"
              placeholder="이 책에 대한 생각을 자유롭게 남겨주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;