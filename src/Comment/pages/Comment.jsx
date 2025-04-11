import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Comment.css';

const Comment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // TODO: 코멘트 제출 로직 구현
    console.log('코멘트 제출:', comment);
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
    </div>
  );
};

export default Comment;