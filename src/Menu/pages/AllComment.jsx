import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Read.css";
import AllCommentHeader from "../components/AllCommentHeader";

const AllComment = () => {
  const navigate = useNavigate();

  const bookinfo = () => {
    navigate("/book/:id");
  };

  return (
    <div className="menu-container">
      <AllCommentHeader />
    </div>
  );
};

export default AllComment;
