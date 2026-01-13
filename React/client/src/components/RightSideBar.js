import React from "react";
import "../styles/RightSideBar.css";

const trendingTopics = [
  "TATA IPL 2025",
  "AI & Automation",
  "Social Media Trends",
  "Cybersecurity Threats",
  "Sustainable Agriculture",
  "Cryptocurrency and Blockchain",
];

const whatsHappening = [
  { tag: "# liam dawson", detail: "20hrs" },
  { tag: "# bakrid mubarak", detail: "22hrs" },
  { tag: "# norway vs italy", detail: "19hrs" },
  { tag: "# gibraltar vs croatia", detail: "19hrs" },
];

const handleClick = (label) => alert(`Clicked: ${label}`);

export default function RightSidebar() {
  return (
    <nav className="right-sidebar">
      <div className="trending-box">
        <div className="section-title">
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          Trending Topics
        </div>
        <ul className="topic-list">
          {trendingTopics.map((topic, idx) => (
            <li key={topic}>
              <button
                className="sidebar-btn"
                onClick={() => handleClick(topic)}
              >
                {topic}
              </button>
            </li>
          ))}
        </ul>
        <div className="see-more">
          <button
            className="sidebar-btn"
            onClick={() => handleClick("See more")}
          >
            See more...
          </button>
        </div>
      </div>
      <div className="happening-box">
        <div className="section-title">
          <span role="img" aria-label="lightning">
            ⚡
          </span>{" "}
          What's Happening?
        </div>
        <ul className="hashtag-list">
          {whatsHappening.map((item, idx) => (
            <li key={item.tag}>
              <button
                className="sidebar-btn"
                onClick={() => handleClick(item.tag)}
              >
                <span className="tag">{item.tag}</span> –{" "}
                <span className="detail">{item.detail}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
