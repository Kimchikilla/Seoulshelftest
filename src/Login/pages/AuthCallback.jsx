import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken, getToken } from '../../utils/tokenManager';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('AuthCallback mounted');
    console.log('Current location:', location);
    console.log('Full URL:', window.location.href);
    
    // URL에서 토큰 파라미터 추출
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    console.log('Received token:', token);

    if (token) {
      try {
        // 토큰 저장
        setToken(token);
        
        // 저장된 토큰 확인
        const savedToken = getToken();
        console.log('Saved token:', savedToken);
        console.log('localStorage contents:', localStorage);
        
        // 홈 페이지로 리다이렉트
        navigate('/home');
      } catch (error) {
        console.error('Error handling token:', error);
        navigate('/');
      }
    } else {
      console.log('No token received');
      // 토큰이 없으면 로그인 페이지로
      navigate('/');
    }
  }, [navigate, location]);

  return <div>로그인 처리중...</div>;
};

export default AuthCallback;