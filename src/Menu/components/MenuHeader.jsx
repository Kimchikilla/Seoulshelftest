import { Link } from "react-router-dom";
import "./MenuHeader.css";
import headerTitle from "../../assets/header_title.svg";

const MenuHeader = () => {
  return (
    <header className="header">
      <button className="notification-button">
        <Link to="/notification" className="header-title-link">
          <span className="material-icons">notifications</span>
        </Link>
      </button>
      <Link to="/home" className="header-title-link">
        <img src={headerTitle} alt="서울책장" className="header-title" />
      </Link>
      <button className="back-button">
        <Link to="/home" className="header-title-link">
          <span className="material-icons">arrow_back</span>
        </Link>
      </button>
    </header>
  );
};

export default MenuHeader;
