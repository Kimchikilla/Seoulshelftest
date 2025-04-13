// 토큰 관리를 위한 유틸리티 함수들
export const setToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};