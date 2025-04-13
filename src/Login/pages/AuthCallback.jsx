import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/tokenManager';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 파라미터 추출
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // 토큰 저장
      setToken(token);
      // 홈 페이지로 리다이렉트
      navigate('/home');
    } else {
      // 토큰이 없으면 로그인 페이지로
      navigate('/');
    }
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default AuthCallback;