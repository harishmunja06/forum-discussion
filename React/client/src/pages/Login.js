import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Globe from "../assets/Globe.png"; // Ensure path is correct

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFacebookLogin = () => {
    navigate("/facebook");
  };

  const handleGoogleLogin = () => {
    navigate("/google");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        alert("Logged in successfully!");
        navigate("/home");
      } else {
        alert(`Login failed: ${data.message || data.error}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h2>
          <span>ForumFusion</span> - Where Ideas
          <br />
          Spark and Conversations Thrive!
        </h2>
        <p>
          Join a vibrant community, share insights, and
          <br />
          engage in meaningful discussions. Log in now
          <br />
          and be part of the conversation!
        </p>
      </div>

      <div className="right-section">
        <div className="login-box">
          <img src={Globe} alt="Globe" className="globe-icon" />
          <h2>Log in</h2>
          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <button className="social-btn fb-btn" onClick={handleFacebookLogin}>
            <FaFacebook />
            Log in with Facebook
          </button>

          <button className="social-btn google-btn" onClick={handleGoogleLogin}>
            <FcGoogle />
            Log in with Google
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <label htmlFor="email">Your email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Your password</label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Link to="/forgot-password" className="forgot-password">
            Forgot your password?
          </Link>

          <button type="submit" className="login-submit" onClick={handleLogin}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
