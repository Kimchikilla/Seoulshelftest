import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Reply.css';
import { getToken } from '../../utils/tokenManager';

const Reply = () => {
  const navigate = useNavigate();
  const { id, commentId } = useParams();
  const [reply, setReply] = useState('');
  const [comment, setComment] = useState(null);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 원본 코멘트 가져오기
        const commentsResponse = await fetch(`https://seoulshelf.duckdns.org/books/${id}/comments`);
        if (!commentsResponse.ok) {
          throw new Error('코멘트를 불러오는데 실패했습니다.');
        }
        const commentsData = await commentsResponse.json();
        const originalComment = commentsData.find(c => c.id === Number(commentId));
        
        if (originalComment) {
          // 코멘트의 좋아요 수 가져오기
          const likesResponse = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/likes`);
          const likesData = await likesResponse.json();
          
          setComment({
            id: originalComment.id,
            author: originalComment.user_name,
            content: originalComment.content,
            rating: Number(originalComment.rating),
            created_at: originalComment.created_at,
            likes: Number(likesData.likeCount) || 0
          });
        }

        // 답글 목록 가져오기
        const repliesResponse = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/replies`);
        if (!repliesResponse.ok) {
          throw new Error('답글을 불러오는데 실패했습니다.');
        }
        const repliesData = await repliesResponse.json();
        setReplies(repliesData.map(reply => ({
          id: reply.id,
          author: reply.name,
          content: reply.content,
          createdAt: new Date(reply.created_at).toLocaleDateString(),
          likes: 0
        })));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setReplies([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, commentId]);

  const handleSubmit = async () => {
    if (!reply.trim()) return;

    try {
      const token = getToken();
      if (!token) {
        navigate('/'); // 토큰이 없으면 로그인 페이지로 이동
        return;
      }

      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: reply
        })
      });

      if (!response.ok) {
        throw new Error('답글 작성에 실패했습니다');
      }

      // 응답 데이터 받기
      const newReplyData = await response.json();
      
      // 새 답글을 목록에 추가
      const newReply = {
        id: newReplyData.id,
        author: newReplyData.name || '익명',
        content: newReplyData.content,
        createdAt: new Date().toLocaleDateString(),
        likes: 0
      };
      
      setReplies(prevReplies => [...prevReplies, newReply]);
      
      // 입력 필드 초기화
      setReply('');

    } catch (error) {
      console.error('Error posting reply:', error);
      alert('답글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleEditClick = (replyId, content) => {
    setEditingReplyId(replyId);
    setEditContent(content);
  };

  const handleCancelEdit = () => {
    setEditingReplyId(null);
    setEditContent('');
  };

  const handleUpdateReply = async (replyId) => {
    if (!editContent.trim()) return;

    try {
      const token = getToken();
      if (!token) {
        navigate('/');
        return;
      }

      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/replies/${replyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: editContent
        })
      });

      if (!response.ok) {
        throw new Error('답글 수정에 실패했습니다');
      }

      // 답글 목록 업데이트
      setReplies(replies.map(reply => 
        reply.id === replyId 
          ? { ...reply, content: editContent }
          : reply
      ));
      setEditingReplyId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating reply:', error);
      alert('답글 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm('답글을 삭제하시겠습니까?')) return;

    try {
      const token = getToken();
      if (!token) {
        navigate('/');
        return;
      }

      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/replies/${replyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('답글 삭제에 실패했습니다');
      }

      // 답글 목록에서 삭제된 답글 제거
      setReplies(replies.filter(reply => reply.id !== replyId));
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('답글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
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
            <span className="comment-author">{comment?.author}</span>
            <div className="comment-rating">
              {renderStars(comment?.rating || 0)}
            </div>
          </div>
          <p className="comment-content">{comment?.content}</p>
          <div className="comment-footer">
            <button className="comment-action">
              <span className="material-icons">favorite</span>
              <span>{comment?.likes || 0}</span>
            </button>
            <button className="comment-action">
              <span className="material-icons">chat_bubble_outline</span>
              <span>{replies.length}</span>
            </button>
          </div>
        </div>

        <div className="replies-section">
          {isLoading ? (
            <div className="loading">답글을 불러오는 중...</div>
          ) : (
            replies.map((reply) => (
              <div key={reply.id} className="reply-item">
                <div className="reply-item-header">
                  <span className="reply-author">{reply.author}</span>
                  <span className="reply-date">{reply.createdAt}</span>
                </div>
                {editingReplyId === reply.id ? (
                  <div className="reply-edit-section">
                    <textarea
                      className="reply-edit-textarea"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="reply-edit-buttons">
                      <button onClick={() => handleUpdateReply(reply.id)}>
                        저장
                      </button>
                      <button onClick={handleCancelEdit}>
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="reply-item-content">{reply.content}</p>
                    <div className="reply-item-footer">
                      <button className="reply-action">
                      </button>
                      <div className="reply-buttons">
                        <button 
                          className="reply-edit-button"
                          onClick={() => handleEditClick(reply.id, reply.content)}
                        >
                          수정
                        </button>
                        <button 
                          className="reply-delete-button"
                          onClick={() => handleDeleteReply(reply.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
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