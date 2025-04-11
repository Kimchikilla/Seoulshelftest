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

  const comments = [
    {
      id: 1,
      author: "이재명",
      rating: 4,
      content: "형수님이 추천해주셔서 읽어봤습니다. 정말 좋네요.",
      likes: 24,
      replies: 3
    },
    {
      id: 2,
      author: "홍준표",
      rating: 5,
      content: "대구에서 유유자적하면서 읽었습니다. 정말 좋네요.",
      likes: 15,
      replies: 1
    }
  ];

  const handleCommentClick = () => {
    navigate(`/book/${id}/comment`);
  };

  const handleReplyClick = (commentId) => {
    navigate(`/book/${id}/comment/${commentId}/reply`);
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span 
        key={star} 
        className={`material-icons star ${star <= rating ? 'full' : 'empty'}`}
      >
        star
      </span>
    ));
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

        <div className="comments-section">
          <h2 className="comments-title">코멘트</h2>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <div className="comment-rating">
                    {renderStars(comment.rating)}
                  </div>
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="comment-footer">
                  <button className="comment-action">
                    <span className="material-icons">favorite</span>
                    <span>{comment.likes}</span>
                  </button>
                  <button 
                    className="comment-action"
                    onClick={() => handleReplyClick(comment.id)}
                  >
                    <span className="material-icons">chat_bubble_outline</span>
                    <span>{comment.replies}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;