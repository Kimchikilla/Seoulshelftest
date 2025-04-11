import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Reply.css';

const Reply = () => {
  const navigate = useNavigate();
  const { id, commentId } = useParams();
  const [reply, setReply] = useState('');

  // 예시 댓글 데이터
  const comment = {
    id: commentId,
    author: "문재인",
    rating: 4,
    content: "손흥민이 어디갔어 손흥민이..",
    likes: 24,
    replies: 3
  };

  // 예시 답글 데이터
  const replies = [
    {
      id: 1,
      author: "일론머스크",
      content: "ㅌㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ ",
      likes: 5,
      createdAt: "2025-04-11"
    },
    {
      id: 2,
      author: "김정은",
      content: "저는 트럼프가 더 좋던데요.",
      likes: 3,
      createdAt: "2025-04-10"
    },
    {
        id: 3,
        author: "이재명",
        content: "이명박도 전과11범으로 대통령해먹었잖아~ 한잔해",
        likes: 24,
        createdAt: "2025-04-09"
    }
  ];

  const handleSubmit = () => {
    if (!reply.trim()) return;
    // TODO: 답글 제출 로직 구현
    console.log('답글 제출:', reply);
    navigate(`/book/${id}`);
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
    <div className="reply-container">
      <header className="reply-header">
        <button className="reply-header-button" onClick={handleSubmit}>
          작성
        </button>
        <h1 className="reply-header-title">답글 작성</h1>
        <button className="reply-header-button" onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
        </button>
      </header>
      
      <div className="reply-content">
        <div className="original-comment">
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
            <button className="comment-action">
              <span className="material-icons">chat_bubble_outline</span>
              <span>{comment.replies}</span>
            </button>
          </div>
        </div>

        <div className="replies-section">
          {replies.map((reply) => (
            <div key={reply.id} className="reply-item">
              <div className="reply-item-header">
                <div className="reply-author-section">
                  <span className="reply-label">답글</span>
                  <span className="reply-author">{reply.author}</span>
                </div>
                <span className="reply-date">{reply.createdAt}</span>
              </div>
              <p className="reply-item-content">{reply.content}</p>
              <div className="reply-item-footer">
                <button className="reply-action">
                  <span className="material-icons">favorite</span>
                  <span>{reply.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="reply-input-section">
          <textarea
            className="reply-textarea"
            placeholder="답글을 입력해주세요"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Reply;