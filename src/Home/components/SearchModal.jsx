import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchModal.css";
import bookImage from "../../assets/Book/XL.jpg";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const popularSearches = ["베스트셀러", "자기계발", "소설", "에세이", "인문학"];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(true);
      // 최근 검색어에 추가하고 localStorage에 저장
      if (!recentSearches.includes(searchTerm)) {
        const newRecentSearches = [searchTerm, ...recentSearches.slice(0, 4)];
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      }
    }
  };

  // 최근 검색어 삭제 함수
  const handleDeleteRecent = (indexToDelete) => {
    const newRecentSearches = recentSearches.filter((_, index) => index !== indexToDelete);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    setShowResults(true);
  };

  // 책 클릭 시 상세 페이지로 이동
  const handleBookClick = (bookId) => {
    onClose(); // 검색 모달 닫기
    navigate(`/book/${bookId}`);
  };

  return (
    <div className={`search-modal ${isOpen ? "open" : ""}`}>
      <div className="search-header">
        <div className="search-input-wrapper">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="도서를 검색해보세요" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <div className="header-buttons">
          <button className="search-button" onClick={handleSearch}>
            <span className="material-icons">search</span>
          </button>
          <button onClick={onClose} className="close-button">
            <span className="material-icons">arrow_back</span>
          </button>
        </div>
      </div>

      <div className="search-content">
        {showResults ? (
          <div className="search-results">
            <h3>검색 결과</h3>
            <div className="results-grid">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div 
                    key={index} 
                    className="book-result"
                    onClick={() => handleBookClick(index + 1)}
                  >
                    <img src={bookImage} alt="책 표지" />
                    <div className="book-info">
                      <h4>일하는 사람을 위한 철학</h4>
                      <p>에릭 몽 시게티</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <>
            <section className="recent-searches">
              <h3>최근 검색어</h3>
              <ul>
                {recentSearches.map((term, index) => (
                  <li key={index} onClick={() => handleRecentSearchClick(term)}>
                    <span className="material-icons">history</span>
                    {term}
                    <button 
                      className="delete-button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRecent(index);
                      }}
                    >
                      <span className="material-icons">close</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="popular-searches">
              <h3>인기 검색어</h3>
              <ul>
                {popularSearches.map((term, index) => (
                  <li key={index}>
                    <span className="rank">{index + 1}</span>
                    {term}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
