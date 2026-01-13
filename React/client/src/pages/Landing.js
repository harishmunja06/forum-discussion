import "../styles/Landing.css";
import landingImage from "../assets/Landing.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div
      className="home-ww"
      style={{
        backgroundImage: `url(${landingImage})`,
      }}
    >
      <br />
      <div className="main-content">
        <div className="title-box">
          <h1 className="main-title">FORUMFUSION</h1>
          <p className="tagline">WHERE IDEAS CONVERGE</p>
        </div>
        <p className="description">
          A community-driven platform where <br />
          ideas thrive, discussions grow, and <br />
          connections are made.
        </p>
        <Link to="/login">
          <button className="cta-button">Get started</button>
        </Link>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
          <a href="#">Languages</a>
          <a href="#">ForumFusion, Inc. © 2025. All rights reserved.</a>
        </div>
      </footer>
    </div>
  );
}
