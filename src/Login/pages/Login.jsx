import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import GoogleIcon from "../../assets/google-icon.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Google OAuth 인증 서버로 리다이렉트
    window.location.href = "http://15.164.214.242:5001/auth/google";
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-top">
          <h1 className="logo">Seoulshelf</h1>
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
