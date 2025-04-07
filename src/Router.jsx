import { Route, Routes } from "react-router-dom";
import Login from "./Login/pages/Login.jsx";
import Home from "./Home/pages/Home.jsx";
import Menu from "./Menu/pages/Menu.jsx";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
      </Routes>
    </>
  );
}
