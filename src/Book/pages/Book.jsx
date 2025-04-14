import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Book.css";
import Header from "../../Home/components/Header";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCommentLikes = async (commentId) => {
    try {
      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/likes`);
      if (!response.ok) {
        throw new Error('좋아요 수 조회에 실패했습니다.');
      }
      const data = await response.json();
      console.log('Likes data for comment', commentId, ':', data);
      return Number(data.likeCount) || 0;
    } catch (error) {
      console.error('Error fetching likes for comment', commentId, ':', error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`https://seoulshelf.duckdns.org/books/${id}`);
        if (!response.ok) {
          throw new Error('책 정보를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        setBookData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching book data:', error);
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`https://seoulshelf.duckdns.org/books/${id}/comments`);
        if (!response.ok) {
          throw new Error('댓글을 불러오는데 실패했습니다.');
        }
        const data = await response.json();
        console.log('Comments data:', data);
        
        // 각 코멘트의 좋아요 수를 가져옴
        const commentsWithLikes = await Promise.all(data.map(async comment => {
          const likes = await fetchCommentLikes(comment.id);
          return {
            id: comment.id,
            author: comment.user_name || '익명',
            rating: Number(comment.rating) || 0,
            content: comment.content,
            created_at: comment.created_at,
            likes: likes,
            replies: 0 // 기본값
          };
        }));
        
        setComments(commentsWithLikes);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      }
    };

    fetchBookData();
    fetchComments();
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="book-detail-container">
        <Header />
        <div className="loading">로딩중...</div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="book-detail-container">
        <Header />
        <div className="error">책을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="book-detail-container">
      <Header />
      <div className="book-detail">
        <div className="book-info-section">
          <h1 className="book-detail-title">{bookData.title}</h1>
          <p className="book-detail-author">{bookData.author}</p>
        </div>

        <div className="book-cover-section">
          <img src={bookData.image_url} alt={bookData.title} className="book-detail-cover" />
        </div>

        <div className="book-rating-section">
          <div className="rating-container">
            <div className="rating-display">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`material-icons star ${
                    star <= bookData.average_rating
                      ? 'full'
                      : star - bookData.average_rating <= 0.5
                      ? 'half'
                      : 'empty'
                  }`}
                >
                  {star - bookData.average_rating <= 0.5 && star > bookData.average_rating
                    ? 'star_half'
                    : 'star'
                  }
                </span>
              ))}
            </div>
            <div className="rating-text-container">
              <span className="rating-label">평균평점</span>
              <span className="rating-value">{bookData.average_rating}</span>
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