import React, { useState } from 'react';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    '일하는 사람을 위한 철학',
    '에릭 몽 시게티',
    '철학'
  ]);

  const popularSearches = [
    '베스트셀러',
    '자기계발',
    '소설',
    '에세이',
    '인문학'
  ];

  // 최근 검색어 삭제 함수
  const handleDeleteRecent = (indexToDelete) => {
    setRecentSearches(recentSearches.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className={`search-modal ${isOpen ? 'open' : ''}`}>
      <div className="search-header">
        <div className="search-input-wrapper">
          <span className="material-icons">search</span>
          <input
            type="text"
            placeholder="도서를 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={onClose} className="close-button">
          <span className="material-icons">close</span>
        </button>
      </div>

      <div className="search-content">
        <section className="recent-searches">
          <h3>최근 검색어</h3>
          <ul>
            {recentSearches.map((term, index) => (
              <li key={index}>
                <span className="material-icons">history</span>
                {term}
                <button 
                  className="delete-button"
                  onClick={() => handleDeleteRecent(index)}
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
      </div>
    </div>
  );
};

export default SearchModal;