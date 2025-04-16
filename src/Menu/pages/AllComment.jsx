import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllComment.css";
import AllCommentHeader from "../components/AllCommentHeader";

const CommentList = ({ comment, onClick }) => (
  <div onClick={onClick}>
    <div className="comment-title">
      <p>{comment.date}</p>
      <h3>{comment.title}</h3>
    </div>
  </div>
);

const AllComment = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const [animatedIds, setAnimatedIds] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAllComment = async () => {
      try {
        // 코멘드 넣기
        const response = await fetch("https://seoulshelf.duckdns.org/my/comment");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching All Comment:", error);
      }
    };

    fetchAllComment();
  }, []);

  ////// 코멘드 링크 달아야함  피터틸 : 나이제 LLM 에 관심 없음 
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
      <AllCommentHeader />
      <div className="comment-wrapper">
        {Comments.map((comment) => (
          <CommentList key={comment.id} comment={comment} onClick={() => goToDetail(comment.id)} />
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
