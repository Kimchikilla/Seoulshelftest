import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import GoogleIcon from "../../assets/google-icon.svg";
import BookIcon from "../../assets/mainlogo.svg";
import headerTitle from "../../assets/header_title.svg";
import { getToken } from "../../utils/tokenManager";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoading(true);
      // 토큰이 있으면 홈으로 이동하기 전에 로딩 상태를 활성화
      setTimeout(() => {
        navigate("/home");
      }, 1000); // 1초 후 홈 페이지로 이동
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    // 로딩 상태 활성화
    setIsLoading(true);
    
    // 1.5초 동안 로딩 화면을 표시한 후 리다이렉트
    // Google OAuth 인증 서버로 리다이렉트
    window.location.href = "https://seoulshelf.duckdns.org/auth/google";
    setTimeout(() => {
    }, 1000);
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">로딩 중...</p>
        </div>
      ) : (
        <div className="login-box">
          <div className="login-top">
            <img src={BookIcon} alt="book" />
            <img src={headerTitle} alt="서울책장" className="logo" />
            <h4 className="login-comment">책과 우리의 공간</h4>
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
      )}
    </div>
  );
};

export default Login;
