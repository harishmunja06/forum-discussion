// src/components/Header.js

import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import { AiOutlineHome } from "react-icons/ai";
import { MdSnowboarding } from "react-icons/md";
import { FaThreads } from "react-icons/fa6";
import { IoIosHelpCircle } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import Globe from "../assets/Globe.png";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import SearchResults from "./SearchResults";

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchPosts,
    setIsSearching,
    isSearching,
  } = useSearch();
  const [allPosts, setAllPosts] = useState([]);
  const searchRef = useRef(null);

  // Collect posts from all pages
  useEffect(() => {
    const collectPosts = () => {
      const posts = [
        ...document.querySelectorAll(".feed-card"),
        ...document.querySelectorAll(".thread-card"),
      ]
        .map((card) => ({
          id: card.dataset.id,
          title: card.querySelector(".feed-title, .thread-title")?.textContent,
          content: card.querySelector(".feed-content, .thread-content")
            ?.textContent,
          author: card.querySelector(".author span")?.textContent,
          time: card.querySelector(".author span:nth-child(2)")?.textContent,
          tag: card.querySelector(".feed-tag, .thread-tag")?.textContent,
        }))
        .filter((post) => post.id && post.title);

      setAllPosts(posts);
    };

    collectPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchPosts(searchQuery, allPosts);
      setIsSearching(true);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      setIsSearching(false);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearching]);

  return (
    <>
      <header className="custom-header">
        <div className="left-section">
          <img src={Globe} alt="Globe" className="globe-icon" />
          <div className="brand-text">
            <h1>ForumFusion</h1>
            <p>Where Ideas Converge</p>
          </div>
        </div>

        <div className="search-section" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search posts, threads, and more..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button type="submit" className="search-button">
              <FaSearch className="search-icon" />
            </button>
          </form>
          <SearchResults />
        </div>

        <nav className="nav-section">
          <Link to="/home">
            <AiOutlineHome /> Home
          </Link>
          <Link to="/about">
            <MdSnowboarding /> About
          </Link>
          <Link to="/threads">
            <FaThreads /> Threads
          </Link>
          <Link to="/help">
            <IoIosHelpCircle /> Help
          </Link>
          <Link to="/login">
            <BiLogIn /> Sign out
          </Link>
        </nav>
      </header>
      {/* Sidebar will be rendered below the header in the main layout, not inside the header */}
    </>
  );
};

export default Header;
