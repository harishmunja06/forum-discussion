import React, { useState } from "react";
import "../styles/LeftSideBar.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaFire,
  FaUserCircle,
  FaBookmark,
  FaApple,
  FaMusic,
} from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { PiStrategyBold } from "react-icons/pi";
import { FiMenu, FiX } from "react-icons/fi";
import ThreadsIcon from "../assets/Threads.svg";
import { MdSportsSoccer } from "react-icons/md";

const LeftSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="sidebar-toggle-btn"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <nav className={`left-sidebar ${isOpen ? "open" : "closed"}`}>
        <ul className="sidebar-menu">
          <Link to="/home">
            <li>
              <button>
                <FaHome className="icon" />
                <span>Home</span>
              </button>
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <button>
                <FaUserCircle className="icon profile-icon" />
                <span>Profile</span>
              </button>
            </li>
          </Link>

          <Link to="/Threads">
            <li>
              <button>
                <img
                  src={ThreadsIcon}
                  alt="Threads"
                  className="icon"
                  style={{ width: "20px", height: "20px" }}
                />
                <span>Threads</span>
              </button>
            </li>
          </Link>

          <Link to="/popular">
            <li>
              <button>
                <FaFire className="icon" />
                <span>Popular</span>
              </button>
            </li>
          </Link>

          <Link to="/saved">
            <li>
              <button>
                <FaBookmark className="icon" />
                <span>Saved</span>
              </button>
            </li>
          </Link>

          <li className="sidebar-section-title">Topics</li>

          <Link to="/technology">
            <li>
              <button>
                <FaApple className="icon" />
                <span>Technology</span>
              </button>
            </li>
          </Link>

          <Link to="/entertainment">
            <li>
              <button>
                <FaMusic className="icon" />
                <span>Entertainment</span>
              </button>
            </li>
          </Link>

          <Link to="/hobbies">
            <li>
              <button>
                <PiStrategyBold className="icon" />
                <span>Hobbies</span>
              </button>
            </li>
          </Link>

          <Link to="/programming">
            <li>
              <button>
                <BsCodeSlash className="icon" />
                <span>Programming</span>
              </button>
            </li>
          </Link>

          <Link to="/sports">
            <li>
              <button>
                <MdSportsSoccer className="icon" />
                <span>Sports</span>
              </button>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default LeftSideBar;
