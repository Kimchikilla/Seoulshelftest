import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/tokenManager";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰 파라미터와 이름 파라미터 추출
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");

    if (token) {
      try {
        // 토큰 유효성 검사 (예시)
        // isValidToken(token) 등을 사용해서 토큰 검증 가능

        // 토큰 저장
        setToken(token);

        // 필요한 경우 'name'도 상태에 저장하거나 로컬스토리지에 저장
        localStorage.setItem("userName", name);

        // 홈 페이지로 리다이렉트
        navigate("/home");
      } catch (error) {
        console.error("토큰 저장 실패:", error);
        navigate("/"); // 오류가 발생하면 로그인 페이지로 리다이렉트
      }
    } else {
      // 토큰이 없으면 로그인 페이지로
      navigate("/");
    }
  }, [navigate]);

  return <div>로그인 처리중...</div>;
};

export default AuthCallback;
