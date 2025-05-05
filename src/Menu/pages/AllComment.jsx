import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllComment.css";
import AllCommentHeader from "../components/AllCommentHeader";
import { getToken } from "../../utils/tokenManager";

const CommentList = ({ comment, onClick, animate }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={`material-icons star ${star <= rating ? "full" : "empty"}`}>
        star
      </span>
    ));
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

  return (
    <div onClick={onClick} className={`comments-item ${animate ? "comment-fade-in" : ""}`}>
      <div className="comments-title">
        <div className="post-item">
          <div className="allcomment-star">
            <p className="post-title">{comment.title}</p>
            <div className="comment-rating">{renderStars(comment.rating)}</div>
          </div>
          <h3 className="post-content">{comment.content}</h3>
          <div className="post-del">
            <button className="comment-delete-button" onClick={() => handleDeleteComment(comment.comment_id)}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllComment = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAllComment = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("https://seoulshelf.duckdns.org/my/comments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching All Comment:", error);
      }
    };

    fetchAllComment();
  }, []);

  const goToDetail = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleMoreClick = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleComments = Comments.slice(0, visibleCount);
  const hasMore = visibleCount < Comments.length && Comments.length >= 5;

  return (
    <div className="comments-container">
      <AllCommentHeader />
      <div className="comments-wrapper">
        {visibleComments.map((comment, index) => (
          <CommentList
            key={comment.id}
            comment={comment}
            onClick={() => goToDetail(comment.book_id)}
            animate={index >= 5} // 5개 이후부터 애니메이션 적용
          />
        ))}
        {hasMore && (
          <div className="more-button" onClick={handleMoreClick}>
            더보기
          </div>
        )}
      </div>
    </div>
  );
};

export default AllComment;
