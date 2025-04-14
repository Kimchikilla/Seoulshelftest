import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchModal.css";

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 state 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리할 state 추가

  // localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const popularSearches = ["베스트셀러", "자기계발", "소설", "에세이", "인문학"];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(true);
      setIsLoading(true);

      // 최근 검색어에 추가
      if (!recentSearches.includes(searchTerm)) {
        const newRecentSearches = [searchTerm, ...recentSearches.slice(0, 4)];
        setRecentSearches(newRecentSearches);
        localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      }

      try {
        const response = await fetch(`https://seoulshelf.duckdns.org/books/search?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error('검색에 실패했습니다');
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('검색 에러:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 최근 검색어 삭제 함수
  const handleDeleteRecent = (indexToDelete) => {
    const newRecentSearches = recentSearches.filter((_, index) => index !== indexToDelete);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  };

  const handleRecentSearchClick = async (term) => {
    setSearchTerm(term);
    setShowResults(true);
    setIsLoading(true);

    try {
      const response = await fetch(`https://seoulshelf.duckdns.org/books/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) throw new Error('검색에 실패했습니다');
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('검색 에러:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopularSearchClick = async (term) => {
    setSearchTerm(term);
    setShowResults(true);
    setIsLoading(true);

    try {
      const response = await fetch(`https://seoulshelf.duckdns.org/books/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) throw new Error('검색에 실패했습니다');
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('검색 에러:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearInput = () => {
    setSearchTerm("");
  };

  // 책 클릭 시 상세 페이지로 이동
  const handleBookClick = (bookId) => {
    onClose(); // 검색 모달 닫기
    navigate(`/book/${bookId}`);
  };

  const handleBackButton = () => {
    if (showResults) {
      // 검색 결과 화면에서는 초기 모달창으로 돌아가기
      setShowResults(false);
      setSearchTerm("");
    } else {
      // 초기 모달창에서는 모달 닫기
      onClose();
    }
  };

  return (
    <div className={`search-modal-container ${isOpen ? "modal-open" : ""}`}>
      <div className="search-modal-header">
        <div className="search-modal-input-wrapper">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="도서를 검색해보세요" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button type="button" className="search-modal-clear-button" onClick={handleClearInput}>
                <span className="material-icons">close</span>
              </button>
            )}
          </form>
        </div>
        <div className="search-modal-header-buttons">
          <button className="search-modal-search-button" onClick={handleSearch}>
            <span className="material-icons">search</span>
          </button>
          <button onClick={handleBackButton} className="search-modal-close-button">
            <span className="material-icons">arrow_back</span>
          </button>
        </div>
      </div>

      <div className="search-modal-content">
        {showResults ? (
          <div className="search-modal-results">
            <h3>검색 결과</h3>
            {isLoading ? (
              <div className="search-modal-loading">검색 중...</div>
            ) : (
              <div className="search-modal-results-grid">
                {searchResults.map((book) => (
                  <div 
                    key={book.id} 
                    className="search-modal-book-result"
                    onClick={() => handleBookClick(book.id)}
                  >
                    <div className="search-modal-book-image">
                      <img src={book.image_url} alt={book.title} />
                    </div>
                    <div className="search-modal-book-info">
                      <h4>{book.title}</h4>
                      <p className="search-modal-book-author">{book.author}</p>
                    </div>
                  </div>
                ))}
                {searchResults.length === 0 && !isLoading && (
                  <p className="search-modal-no-results">검색 결과가 없습니다</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <section className="search-modal-recent-searches">
              <h3>최근 검색어</h3>
              <ul>
                {recentSearches.map((term, index) => (
                  <li key={index} onClick={() => handleRecentSearchClick(term)}>
                    <span className="material-icons">history</span>
                    {term}
                    <button 
                      className="search-modal-delete-button" 
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

            <section className="search-modal-popular-searches">
              <h3>인기 검색어</h3>
              <ul>
                {popularSearches.map((term, index) => (
                  <li key={index} onClick={() => handlePopularSearchClick(term)}>
                    <span className="search-modal-rank">{index + 1}</span>
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