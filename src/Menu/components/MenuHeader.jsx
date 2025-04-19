import { Link } from "react-router-dom";
import "./MenuHeader.css";

const MenuHeader = () => {
  return (
    <header className="header">
      <button className="notification-button">
        <Link to="/notification" className="header-title-link">
          <span className="material-icons">notifications</span>
        </Link>
      </button>
      <Link to="/home" className="header-title-link">
        <h1 className="header-title">Seoulshelf</h1>
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
