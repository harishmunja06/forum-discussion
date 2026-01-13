import React from "react";
import { useSearch } from "../contexts/SearchContext";
import { FaUserCircle } from "react-icons/fa";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const { searchResults, isSearching, clearSearch } = useSearch();

  if (!isSearching) return null;

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h3>Search Results</h3>
        <button onClick={clearSearch} className="close-search">
          ×
        </button>
      </div>
      <div className="search-results-list">
        {searchResults.length === 0 ? (
          <p className="no-results">No results found</p>
        ) : (
          searchResults.map((post) => (
            <div key={post.id} className="search-result-item">
              <div className="search-result-header">
                <div className="author">
                  <FaUserCircle className="feed-avatar" />
                  <span>{post.author}</span> • <span>{post.time}</span>
                </div>
                <span className="feed-tag">{post.tag}</span>
              </div>
              <h4 className="search-result-title">{post.title}</h4>
              <p className="search-result-content">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
