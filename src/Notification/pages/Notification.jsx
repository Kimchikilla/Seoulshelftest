import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import NotiHeader from "../components/NotiHeader";

const NotiList = ({ noti, onClick, animate }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    return `${diffDay}일 전`;
  };

  return (
    <div onClick={onClick} className={`comments-item ${animate ? "comment-fade-in" : ""}`}>
      <div className="comments-title">
        <div className="post-item">
          <div>
            <p className="post-date">{formatDate(noti.created_at)}</p>
          </div>
          <h3 className="post-content">{noti.message}</h3>
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
    const fetchAllNoti = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("https://seoulshelf.duckdns.org/notifications", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching All Notification:", error);
      }
    };

    fetchAllNoti();
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
      <div className="Noti-read">모두 읽음</div>
      <div className="comments-wrapper">
        {visibleComments.map((noti, index) => (
          <NotiList
            key={noti.id}
            noti={noti}
            onClick={() => goToDetail(noti.content_id)}
            animate={index >= 5} // 5개 이후부터 애니메이션 적용 ,허허허허
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
