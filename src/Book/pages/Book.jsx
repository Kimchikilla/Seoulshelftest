import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Book.css";
import BookHeader from "../components/BookHeader";
import { getToken } from "../../utils/tokenManager";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [scrappedComments, setScrappedComments] = useState(new Set());

  const fetchCommentLikes = async (commentId) => {
    try {
      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/likes`);
      if (!response.ok) {
        throw new Error("좋아요 수 조회에 실패했습니다.");
      }
      const data = await response.json();
      console.log("Likes data for comment", commentId, ":", data);
      return Number(data.likeCount) || 0;
    } catch (error) {
      console.error("Error fetching likes for comment", commentId, ":", error);
      return 0;
    }
  };

  const fetchCommentReplies = async (commentId) => {
    try {
      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/replies`);
      if (!response.ok) {
        throw new Error("답글 수 조회에 실패했습니다.");
      }
      const data = await response.json();
      console.log("Replies data for comment", commentId, ":", data);
      return data.length;
    } catch (error) {
      console.error("Error fetching replies for comment", commentId, ":", error);
      return 0;
    }
  };

  const checkReadStatus = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch("https://seoulshelf.duckdns.org/read-books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const readBooks = await response.json();
        const isCurrentBookRead = readBooks.some((book) => book.book_id === Number(id));
        setIsRead(isCurrentBookRead);
      }
    } catch (error) {
      console.error("Error checking read status:", error);
    }
  };

  const checkBookmarkStatus = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch("https://seoulshelf.duckdns.org/want-to-read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const bookmarks = await response.json();
        const isCurrentBookBookmarked = bookmarks.some((book) => book.book_id === Number(id));
        setIsBookmarked(isCurrentBookBookmarked);
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const checkScrapStatus = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch("https://seoulshelf.duckdns.org/scraps", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const scraps = await response.json();
        const scrappedIds = new Set(scraps.map((scrap) => scrap.comment_id));
        setScrappedComments(scrappedIds);
      }
    } catch (error) {
      console.error("Error checking scrap status:", error);
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`https://seoulshelf.duckdns.org/books/${id}`);
        if (!response.ok) {
          throw new Error("책 정보를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setBookData(data);
        setIsLoading(false);

        // 책 정보를 가져온 후 읽었어요와 북마크, 스크랩 상태 확인
        checkReadStatus();
        checkBookmarkStatus();
        checkScrapStatus();
      } catch (error) {
        console.error("Error fetching book data:", error);
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`https://seoulshelf.duckdns.org/books/${id}/comments`);
        if (!response.ok) {
          throw new Error("댓글을 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        console.log("Comments data:", data);

        // 각 코멘트의 좋아요 수와 답글 수를 가져옴
        const commentsWithData = await Promise.all(
          data.map(async (comment) => {
            const [likes, replyCount] = await Promise.all([fetchCommentLikes(comment.id), fetchCommentReplies(comment.id)]);
            return {
              id: comment.id,
              author: comment.user_name || "익명",
              rating: Number(comment.rating) || 0,
              content: comment.content,
              created_at: comment.created_at,
              likes: likes,
              replies: replyCount,
            };
          })
        );

        setComments(commentsWithData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    fetchBookData();
    fetchComments();
  }, [id]);

  const handleBookmarkClick = async () => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      if (!isBookmarked) {
        // 읽고 싶어요 등록
        const response = await fetch("https://seoulshelf.duckdns.org/want-to-read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            book_id: Number(id),
          }),
        });

        if (response.ok) {
          setIsBookmarked(true);
        }
      } else {
        // 읽고 싶어요 취소
        const response = await fetch(`https://seoulshelf.duckdns.org/want-to-read/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsBookmarked(false);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark status:", error);
    }
  };

  const handleReadClick = async () => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      if (!isRead) {
        // 읽었어요 등록
        const response = await fetch("https://seoulshelf.duckdns.org/read-books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            book_id: Number(id),
          }),
        });

        if (response.ok) {
          setIsRead(true);
        }
      } else {
        // 읽었어요 취소
        const response = await fetch(`https://seoulshelf.duckdns.org/read-books/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsRead(false);
        }
      }
    } catch (error) {
      console.error("Error toggling read status:", error);
    }
  };

  const handleCommentClick = () => {
    navigate(`/book/${id}/comment`);
  };

  const handleReplyClick = (commentId) => {
    navigate(`/book/${id}/comment/${commentId}/reply`);
  };

  const handleLikeClick = async (commentId) => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/"); // 토큰이 없으면 로그인 페이지로 이동
        return;
      }

      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("좋아요 처리에 실패했습니다");
      }

      // 좋아요 수 갱신을 위해 댓글 목록 다시 불러오기
      const newComments = await Promise.all(
        comments.map(async (comment) => {
          if (comment.id === commentId) {
            const likesResponse = await fetchCommentLikes(commentId);
            return { ...comment, likes: likesResponse };
          }
          return comment;
        })
      );

      setComments(newComments);
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  const handleScrapClick = async (commentId) => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const isScrapped = scrappedComments.has(commentId);

      if (!isScrapped) {
        // 스크랩 추가
        const response = await fetch("https://seoulshelf.duckdns.org/scraps", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment_id: commentId,
          }),
        });

        if (response.ok) {
          setScrappedComments((prev) => new Set([...prev, commentId]));
        }
      } else {
        // 스크랩 삭제
        const response = await fetch(`https://seoulshelf.duckdns.org/scraps/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setScrappedComments((prev) => {
            const newSet = new Set(prev);
            newSet.delete(commentId);
            return newSet;
          });
        }
      }
    } catch (error) {
      console.error("Error toggling scrap status:", error);
    }
  };

  const handleEditClick = async (commentId) => {
    try {
      console.log("Edit click, commentId:", commentId);
      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("코멘트 정보를 불러오는데 실패했습니다");
      }

      const commentData = await response.json();
      setEditContent(commentData.content);
      setEditRating(commentData.rating);
      setEditingCommentId(commentId);
    } catch (error) {
      console.error("Error fetching comment:", error);
      alert("코멘트 정보를 불러오는데 실패했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
    setEditRating(0);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: editContent.trim(),
          rating: Number(editRating),
        }),
      });

      if (!response.ok) {
        throw new Error("코멘트 수정에 실패했습니다");
      }
 
      // 코멘트 목록 갱신
      const updatedComments = comments.map((comment) => (comment.id === commentId ? { ...comment, content: editContent.trim(), rating: Number(editRating) } : comment));

      setComments(updatedComments);
      setEditingCommentId(null);
      setEditContent("");
      setEditRating(0);
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("코멘트 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("코멘트를 삭제하시겠습니까?")) return;

    try {
      const token = getToken();
      if (!token) {
        navigate("/");
        return;
      }

      const response = await fetch(`https://seoulshelf.duckdns.org/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("코멘트 삭제에 실패했습니다");
      }

      // 코멘트 목록에서 삭제된 코멘트 제거
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("코멘트 삭제에 실패했습니다.");
    }
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={`material-icons star ${star <= rating ? "full" : "empty"}`}>
        star
      </span>
    ));
  };

  if (isLoading) {
    return (
      <div className="book-detail-container">
        <BookHeader />
        <div className="loading">로딩중...</div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="book-detail-container">
        <BookHeader />
        <div className="error">책을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="book-detail-container">
      <BookHeader />
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
                <span key={star} className={`material-icons star ${star <= bookData.average_rating ? "full" : star - bookData.average_rating <= 0.5 ? "half" : "empty"}`}>
                  {star - bookData.average_rating <= 0.5 && star > bookData.average_rating ? "star_half" : "star"}
                </span>
              ))}
            </div>
            <div className="rating-text-container">
              <span className="rating-label">평균평점</span>
              <span className="rating-value">{bookData.average_rating}</span>
            </div>
          </div>
        </div>

        <div className="action-icons">
          <button className={`action-button action-button-bookmark ${isBookmarked ? "active" : ""}`} onClick={handleBookmarkClick}>
            <span className="material-symbols-outlined" style={{ "--fill": isBookmarked ? 1 : 0 }}>
              bookmark
            </span>
            <span className="action-text">{isBookmarked ? "읽고 싶어요" : "읽고 싶어요"}</span>
          </button>

          <button className="action-button action-button-comment" onClick={handleCommentClick}>
            <span className="material-symbols-outlined">edit</span>
            <span className="action-text">코멘트</span>
          </button>

          <button className={`action-button action-button-read ${isRead ? "active" : ""}`} onClick={handleReadClick}>
            <span className="material-symbols-outlined">{isRead ? "check" : "add"}</span>
            <span className="action-text">읽었어요</span>
          </button>
        </div>

        <div className="comments-section">
          <h2 className="comments-title">코멘트</h2>
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  {editingCommentId === comment.id ? (
                    <div className="edit-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`material-icons star ${star <= (hoverRating || editRating) ? "full" : "empty"}`} onClick={() => setEditRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>
                          star
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="comment-rating">{renderStars(comment.rating)}</div>
                  )}
                </div>
                {editingCommentId === comment.id ? (
                  <div className="edit-section">
                    <textarea className="edit-textarea" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                    <div className="edit-buttons">
                      <button onClick={() => handleUpdateComment(comment.id)}>저장</button>
                      <button onClick={handleCancelEdit}>취소</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="comment-content">{comment.content}</p>
                    <div className="comment-footer">
                      <div className="comment-actions">
                        <button className="comment-action" onClick={() => handleLikeClick(comment.id)}>
                          <span className="material-icons">favorite</span>
                          <span>{comment.likes}</span>
                        </button>
                        <button className="comment-action" onClick={() => handleReplyClick(comment.id)}>
                          <span className="material-icons">chat_bubble_outline</span>
                          <span>{comment.replies}</span>
                        </button>
                        <button className={`comment-action ${scrappedComments.has(comment.id) ? "active" : ""}`} onClick={() => handleScrapClick(comment.id)}>
                          <span className="material-icons">bookmark</span>
                        </button>
                      </div>
                      <div className="comment-buttons">
                        <button className="comment-edit-button" onClick={() => handleEditClick(comment.id)}>
                          수정
                        </button>
                        <button className="comment-delete-button" onClick={() => handleDeleteComment(comment.id)}>
                          삭제
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
