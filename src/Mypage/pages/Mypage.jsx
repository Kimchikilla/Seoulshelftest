import MypageHeader from "../components/MypageHeader";

function Mypage() {
  return (
    <div style={{ padding: "20px" }}>
      <MypageHeader />
      <h3 style={{ margin: "20px 0" }}>읽고싶어요</h3>
      <button style={{ marginTop: "40px", color: "gray" }}>로그아웃</button>
    </div>
  );
}

export default Mypage;
