import { Link } from "react-router-dom";
import "./NotiHeader.css";

const NotiHeader = () => {
  return (
    <header className="header">
      <h1 className="read-title">알림</h1>
      <button className="back-button">
        <Link to="/menu" className="header-title-link">
          <span className="material-icons">arrow_back</span>
        </Link>
      </button>
    </header>
  );
};

export default NotiHeader;
