import { Route, Routes } from "react-router-dom";
import Login from "./Login/pages/Login.jsx";
import Home from "./Home/pages/Home.jsx";
import Menu from "./Menu/pages/Menu.jsx";
import Book from "./Book/pages/Book";
import Comment from "./Comment/pages/Comment";
import Reply from "./Comment/pages/Reply";
import Mypage from "./Mypage/pages/Mypage.jsx";

export default function Router() {
  return (
    <> 
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/book/:id" element={<Book />} />
        <Route path="/book/:id/comment" element={<Comment />} />
        <Route path="/book/:id/comment/:commentId/reply" element={<Reply />} />
      </Routes>
    </>
  );
}
