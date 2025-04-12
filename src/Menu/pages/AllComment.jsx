import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllComment.css";
import AllCommentHeader from "../components/AllCommentHeader";

const dummyPosts = [
  { id: 1, date: "03.29", title: "데미안을 읽어 봤는데요" },
  { id: 2, date: "03.29", title: "데미안을 읽어 봤는데요" },
  { id: 3, date: "03.29", title: "데미안을 읽어 봤는데요" },
  { id: 4, date: "03.29", title: "데미안을 읽어 봤는데요" },
  { id: 5, date: "03.29", title: "데미안을 읽어 봤는데요" },
  { id: 6, date: "03.29", title: "데미안을 읽어 봤는데요" },
  { id: 7, date: "03.29", title: "데미안을 읽어 봤는데요" },
  { id: 8, date: "03.29", title: "데미안을 읽어 봤노" },
];

const AllComment = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const [animatedIds, setAnimatedIds] = useState([]);

  const goToDetail = (id) => {
    navigate(`/book/${id}`);
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
    <div className="menu-container">
      <div className="post-wrapper">
        {visiblePosts.map((post, idx) => (
          <div key={post.id} className={`post-item ${idx === 1 ? "active" : ""} ${animatedIds.includes(post.id) ? "fade-in" : ""}`} onClick={() => goToDetail(post.id)}>
            <div className="post-date">{post.date}</div>
            <div className="post-title">{post.title}</div>
          </div>
        ))}
        {hasMore && (
          <div className="more-button" onClick={handleMoreClick}>
            더보기
          </div>
        )}
      </div>
      <AllCommentHeader />
    </div>
  );
};

export default AllComment;
