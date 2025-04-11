import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Book.css";
import Header from "../../Home/components/Header";
import bookImage from "../../assets/Book/XL.jpg";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const bookData = {
    title: "일하는 사람을 위한 철학",
    author: "에릭 몽 시게티",
    image: bookImage,
    averageRating: 4.5,
    totalRatings: 128
  };

  const handleCommentClick = () => {
    navigate(`/book/${id}/comment`);
  };

  return (
    <div className="book-detail-container">
      <Header />
      <div className="book-detail">
        <div className="book-info-section">
          <h1 className="book-detail-title">{bookData.title}</h1>
          <p className="book-detail-author">{bookData.author}</p>
        </div>

        <div className="book-cover-section">
          <img src={bookData.image} alt={bookData.title} className="book-detail-cover" />
        </div>

        <div className="book-rating-section">
          <div className="rating-container">
            <div className="rating-display">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`material-icons star ${
                    star <= bookData.averageRating
                      ? 'full'
                      : star - bookData.averageRating <= 0.5
                      ? 'half'
                      : 'empty'
                  }`}
                >
                  {star - bookData.averageRating <= 0.5 && star > bookData.averageRating
                    ? 'star_half'
                    : 'star'
                  }
                </span>
              ))}
            </div>
            <div className="rating-text-container">
              <span className="rating-label">평균평점</span>
              <span className="rating-value">{bookData.averageRating}</span>
            </div>
            <div className="action-icons">
              <button className="action-button">
                <span className="material-icons">add</span>
                <span className="action-text">읽고싶어요</span>
              </button>
              <button className="action-button">
                <span className="material-icons">check</span>
                <span className="action-text">읽었어요</span>
              </button>
              <button className="action-button" onClick={handleCommentClick}>
                <span className="material-icons">edit</span>
                <span className="action-text">코멘트</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;