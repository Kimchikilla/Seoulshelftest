import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Read.css";
import ScrapHeader from "../components/ScrapHeader";

const Scrap = () => {
  const navigate = useNavigate();

  const bookinfo = () => {
    navigate("/book/:id");
  };

  return (
    <div className="menu-container">
      <ScrapHeader />
    </div>
  );
};

export default Scrap;
