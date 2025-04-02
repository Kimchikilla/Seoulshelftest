import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* 추후 다른 라우트들이 여기에 추가될 예정입니다 */}
        <Route path="/" element={<Login />} /> {/* 임시로 메인 페이지를 로그인으로 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
