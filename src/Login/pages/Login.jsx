import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import GoogleIcon from "../../assets/google-icon.svg";
import BookIcon from "../../assets/mainlogo.svg";
import headerTitle from "../../assets/header_title.svg";
import { getToken } from "../../utils/tokenManager";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    // Google OAuth 인증 서버로 리다이렉 트
    window.location.href = "https://seoulshelf.duckdns.org/auth/google";
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-top">
          <img src={BookIcon} alt="book" />
          <h4 className="login-comment">책과 우리의 공간</h4>
          <img src={headerTitle} alt="서울책장" className="logo" />
        </div>
        <div className="login-bottom">
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img src={GoogleIcon} alt="Google" className="google-icon" />
            구글로 시작하기
          </button>
          <div className="login-footer">
            <a href="https://accounts.google.com/signin/v2/recoveryidentifier" target="_blank" rel="noopener noreferrer">
              ID / PW 찾기
            </a>
            <a href="https://accounts.google.com/signup" target="_blank" rel="noopener noreferrer">
              회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
