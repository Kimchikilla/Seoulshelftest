import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import GoogleIcon from '../assets/google-icon.svg'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('로그인 시도:', formData);
  };

  const handleGoogleLogin = () => {
    // TODO: 실제 구글 로그인 로직 구현
    console.log('구글 로그인 시도');
    // 로그인 성공 후 메인 페이지로 이동
    navigate('/home');
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
            <a href="/forgot">ID / PW 찾기</a>
            <a href="/register">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 