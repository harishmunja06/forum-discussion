import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchPosts = (query, posts) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const results = posts.filter((post) => {
      const searchableContent = [
        post.title,
        post.content,
        post.author,
        post.tag,
      ].map((str) => str.toLowerCase());

      return searchableContent.some((content) => content.includes(searchTerm));
    });

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        isSearching,
        searchQuery,
        setSearchQuery,
        setIsSearching,
        searchPosts,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
