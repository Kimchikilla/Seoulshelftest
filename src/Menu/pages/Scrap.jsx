import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllComment.css";
import ScrapHeader from "../components/ScrapHeader";

const Scrapist = ({ scrap, onClick, animate }) => {
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
            <p className="post-date">{formatDate(scrap.scrap_time)}</p>
            <p className="post-date">{scrap.title}</p>
          </div>
          <h3 className="post-content">{scrap.content}</h3>
        </div>
      </div>
    </div>
  );
};

const Scrap = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);
  const [Scraps, setScraps] = useState([]);

  useEffect(() => {
    const fetchAllComment = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch("https://seoulshelf.duckdns.org/scraps", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setScraps(data);
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

  const visibleComments = Scraps.slice(0, visibleCount);
  const hasMore = visibleCount < Scraps.length && Scraps.length >= 5;

  return (
    <div className="comments-container">
      <ScrapHeader />
      <div className="comments-wrapper">
        {visibleComments.map((scrap, index) => (
          <Scrapist
            key={scrap.id}
            scrap={scrap}
            onClick={() => goToDetail(scrap.book_id)}
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

export default Scrap;
