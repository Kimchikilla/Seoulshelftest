import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllComment.css";
import ScrapHeader from "../components/ScrapHeader";

const ScrapList = ({ scrap, onClick }) => (
  <div onClick={onClick}>
    <div className="scrap-title">
      <p>{scrap.date}</p>
      <h3>{scrap.title}</h3>
    </div>
  </div>
);

const Scrap = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const [animatedIds, setAnimatedIds] = useState([]);
  const [Scraps, setScrap] = useState([]);

  useEffect(() => {
    const fetchAllScrap = async () => {
      try {
        //// 스크랩 넣기
        const response = await fetch("https://seoulshelf.duckdns.org/my/scraps");
        const data = await response.json();
        setScrap(data);
      } catch (error) {
        console.error("Error fetching All Scrap:", error);
      }
    };

    fetchAllScrap();
  }, []);

  ////// 스크랩 링크 달아야함
  const goToDetail = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleMoreClick = () => {
    const nextCount = visibleCount + 3;
    const newIds = dummyPosts.slice(visibleCount, nextCount).map((post) => post.id);

    setVisibleCount(nextCount);
    setAnimatedIds((prev) => [...prev, ...newIds]);
  };

  const visiblePosts = dummyPosts.slice(0, visibleCount);
  const hasMore = visibleCount < dummyPosts.length;

  return (
    <div className="comment-container">
      <ScrapHeader />
      <div className="comment-wrapper">
        {Scraps.map((scrap) => (
          <ScrapList key={scrap.id} scrap={scrap} onClick={() => goToDetail(scrap.id)} />
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
