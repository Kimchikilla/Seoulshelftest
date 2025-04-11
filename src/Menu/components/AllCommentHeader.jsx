import { Link, useNavigate } from "react-router-dom";
import "./ReadHeader.css";

const MenuHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="read-title">내가 쓴 코멘트</h1>
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="material-icons">arrow_back</span>
      </button>
    </header>
  );
};

export default MenuHeader;
