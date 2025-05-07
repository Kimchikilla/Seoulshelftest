import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import Header from "../components/Header";
import RecBook from "../components/Recommend";
import { setToken } from "../../utils/tokenManager";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BookCard = ({ book, isCenter, onClick }) => (
  <div className={`book-card ${isCenter ? "center" : ""}`} onClick={onClick}>
    <img src={book.image_url} alt={book.title} className="book-cover" />
    <div className="book-info">
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
    </div>
  </div>
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로딩 시 로딩 상태 활성화
    setIsLoading(true);
    
    // 2초 후에 로딩 상태 비활성화
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      console.log("토큰 저장 완료:", token);
      // URL 깔끔하게 정리 (옵션)
      window.history.replaceState({}, document.title, "/home");
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const [centerIndex, setCenterIndex] = useState(0);
  const scrollRef = useRef(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // URL에서 토큰과 이름 파라미터 처리
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      console.log("Token received in Home:", token);
      setToken(token);
      // 토큰 저장 후 URL 파라미터 제거
      navigate("/home", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await fetch("https://seoulshelf.duckdns.org/popular-books");
        const data = await response.json();

        const booksWithoutId1 = data.filter((book) => book.id !== 1);
        const booksWithId1 = data.filter((book) => book.id === 1);

        const sortedData = [...booksWithoutId1.sort((a, b) => a.id - b.id), ...booksWithId1];
        setBooks(sortedData);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };

    fetchPopularBooks();
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "80px",
    slidesToShow: 3,
    speed: 300,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "90px",
        },
      },
    ],
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">로딩 중...</p>
        </div>
      ) : (
        <>
          <Header />
          <div className="book-section">
            <h2 className="section-title">지금 많이 읽고 있어요</h2>
            <Slider {...settings}>
              {books.map((book) => (
                <div key={book.id} className="book-card">
                  <img src={book.image_url} alt={book.title} className="book-cover" onClick={() => handleBookClick(book.id)} />
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <RecBook />
        </>
      )}
    </div>
  );
};

export default Home;
