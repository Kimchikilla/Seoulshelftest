import { Link, useNavigate } from "react-router-dom";
import "./MenuHeader.css";

const MenuHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button className="notification-button">
        <span className="material-icons">notifications</span>
      </button>
      <Link to="/home" className="header-title-link">
        <h1 className="header-title">Seoulshelf</h1>
      </Link>
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="material-icons">arrow_back</span>
      </button>
    </header>
  );
};

export default MenuHeader;
