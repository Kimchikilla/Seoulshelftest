import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import NotiHeader from "../components/NotiHeader";

const NotiList = ({ comment, onClick, animate }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div onClick={onClick} className={`comments-item ${animate ? "comment-fade-in" : ""}`}>
      <div className="comments-title">
        <div className="post-item">
          <div>
            <p className="post-date">{formatDate(comment.created_at)}</p>
            <p className="post-date">{comment.title}</p>
          </div>
          <h3 className="post-content">{comment.content}</h3>
        </div>
      </div>
    </div>
  );
};

const Notificaiton = () => {
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
      <NotiHeader />
      <div className="comments-wrapper">
        {visibleComments.map((comment, index) => (
          <NotiList
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
}; // 병합용 주석석

export default Notificaiton;
