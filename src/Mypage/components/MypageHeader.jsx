import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 100;
  height: 64px;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #00a896;
  letter-spacing: -0.5px;
  margin: 0;
`;

const NotificationButton = styled(IconButton)`
  position: relative;
`;

const NotificationBadge = styled.span`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
`;

const MenuHeader = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <NotificationButton>
        <span className="material-icons">notifications</span>
        <NotificationBadge />
      </NotificationButton>

      <TitleLink to="/home">
        <Title>Seoulshelf</Title>
      </TitleLink>

      <IconButton onClick={() => navigate(-1)}>
        <span className="material-icons">arrow_back</span>
      </IconButton>
    </Container>
  );
};

export default MenuHeader;
