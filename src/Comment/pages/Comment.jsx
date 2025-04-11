import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css';

const Comment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    setShowRatingPopup(true);
  };

  const handleRatingSubmit = () => {
    if (rating === 0) return; // 별점을 선택하지 않은 경우 제출 불가
    // TODO: 코멘트와 별점 제출 로직 구현
    console.log('코멘트 제출:', comment, '별점:', rating);
    navigate(`/book/${id}`);
  };

  return (
    <div className="comment-container">
      <header className="comment-header">
        <button className="comment-header-button" onClick={handleSubmit}>
          작성
        </button>
        <h1 className="comment-header-title">일하는 사람을 위한 철학</h1>
        <button className="comment-header-button" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
        </button>
      </header>
      
      <div className="comment-content">
        <textarea
          className="comment-textarea"
          placeholder="이 책에 대한 생각을 자유롭게 작성해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {showRatingPopup && (
        <div className="rating-popup">
          <div className="rating-popup-content">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="rating-buttons">
              <button onClick={handleRatingSubmit} disabled={rating === 0}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;