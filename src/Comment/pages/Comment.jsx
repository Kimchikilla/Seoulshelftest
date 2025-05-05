import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css';
import { getToken } from '../../utils/tokenManager';

const Comment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [bookTitle, setBookTitle] = useState('');

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`https://seoulshelf.duckdns.org/books/${id}`);
        if (!response.ok) {
          throw new Error('책 정보를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setBookTitle(data.title);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [id]);

  const handleSubmit = () => {
    setShowRatingPopup(true);
  };

  const handleRatingSubmit = async () => {
    if (rating === 0) return; // 별점을 선택하지 않은 경우 제출 불가
    
    try {
      const token = getToken();
      if (!token) {
        navigate('/'); // 토큰이 없으면 로그인 페이지로 이동
        return;
      }

      const response = await fetch('https://seoulshelf.duckdns.org/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          book_id: Number(id),
          content: comment,
          rating: Math.floor(rating)  // 별점을 정수형으로 변환
        })
      });

      if (!response.ok) {
        throw new Error('코멘트 작성에 실패했습니다.');
      }

      // 성공적으로 작성된 경우 책 상세 페이지로 이동
      navigate(`/book/${id}`);
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('코멘트 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="comment-container">
      <header className="comment-header">
        <button className="comment-header-button" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="comment-header-title">{bookTitle}</h1>
        <button className="comment-header-button" onClick={handleSubmit}>
          작성
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
            <p className="rating-popup-description">별점을 선택해주세요</p>
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
              <button onClick={() => setShowRatingPopup(false)}>취소</button>
              <button onClick={handleRatingSubmit} disabled={rating === 0}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;