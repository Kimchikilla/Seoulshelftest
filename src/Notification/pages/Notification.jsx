import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import NotiHeader from "../components/NotiHeader";

const NotiList = ({ noti, onClick, animate, isRead }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    return `${diffDay}일 전`;
  };

  return (
    <div onClick={onClick} className={`comments-item ${animate ? "comment-fade-in" : ""}`} style={{ backgroundColor: isRead ? "#f5f5f5" : "#ffffff", position: "relative" }}>
      {!isRead && <div className="red-dot" />}
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

  const unreadComments = Comments.filter((noti) => noti.read === 0);
  const visibleComments = unreadComments.slice(0, visibleCount);
  const hasMore = visibleCount < unreadComments.length && unreadComments.length >= 5;

  // ✅ 클릭 시 알림의 read 상태를 업데이트하는 PATCH 요청만 보냄
  const markAsRead = async (notiId) => {
    try {
      const token = localStorage.getItem("accessToken");

      // PATCH 요청 보내기
      const response = await fetch(`https://seoulshelf.duckdns.org/notifications/${notiId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: 1 }), // read 상태를 1로 변경
      });

      if (!response.ok) {
        console.error("Failed to update notification");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  // ✅ "모두 읽음" 버튼 클릭 시 모든 알림의 read 상태를 1로 변경하는 함수
  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      // "모두 읽음" 요청 보내기
      const response = await fetch("https://seoulshelf.duckdns.org/notifications/read-all", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // 성공적으로 읽은 상태로 업데이트되면 state 업데이트
        setComments((prevComments) => prevComments.map((noti) => ({ ...noti, read: 1 })));
      } else {
        console.error("Failed to mark all notifications as read");
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <div className="comments-container">
      <NotiHeader />

      {unreadComments.length > 0 && (
        <div className="Notiread-section">
          <button className="Noti-read" onClick={markAllAsRead}>
            모두 읽음
          </button>
        </div>
      )}

      <div className="comments-wrapper">
        {visibleComments.length > 0 ? (
          <>
            {visibleComments.map((noti, index) => (
              <NotiList
                key={noti.id}
                noti={noti}
                onClick={() => {
                  goToDetail(noti.content_id);
                  markAsRead(noti.id); // 클릭 시 PATCH 요청만 보냄
                }}
                animate={index >= 5}
              />
            ))}
            {hasMore && (
              <div className="more-button" onClick={handleMoreClick}>
                더보기
              </div>
            )}
          </>
        ) : (
          <div className="no-noti-message">알림이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default Notificaiton;
