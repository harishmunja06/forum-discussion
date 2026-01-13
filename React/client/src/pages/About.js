import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/About.css"; // Assuming you'll create an About.css for styling

function About() {
  const navigate = useNavigate();

  const handleJoinCommunity = () => {
    navigate("/home"); // Navigate to home page
  };

  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="fade-in">About ForumFusion</h2>
        <p className="fade-in delay-1">
          Welcome to ForumFusion, your ultimate destination for vibrant
          discussions and community engagement! Our platform is designed to
          connect individuals who are passionate about sharing ideas, insights,
          and engaging in meaningful conversations across a multitude of topics.
        </p>
        <p className="fade-in delay-2">
          At ForumFusion, we believe in the power of collective knowledge.
          Whether you're looking to dive deep into technology, explore the
          latest in entertainment, delve into programming challenges, discover
          new hobbies, or discuss the world of sports, you'll find a welcoming
          space here.
        </p>
        <p className="fade-in delay-3">
          Our mission is to foster a dynamic environment where diverse
          perspectives are valued, and every voice can contribute to a richer
          understanding of the world. Join us, spark new ideas, and become part
          of a thriving community!
        </p>
        <h3 className="fade-in delay-4">Our Vision</h3>
        <p className="fade-in delay-5">
          Empower communities to connect through structured, engaging, and
          secure conversations—where users can create threads, share insights,
          and build meaningful relationships.
        </p>
        <h3 className="fade-in delay-6">Our Goals</h3>
        <ul className="fade-in delay-7">
          <li>
            Launch a stable MVP that supports thread creation, posting,
            commenting, and user interaction.
          </li>
          <li>Attain 1,000 active weekly users by Month 3 post-launch.</li>
          <li>
            Foster a positive community with an average net sentiment score ≥
            80%.
          </li>
        </ul>
        <h3 className="fade-in delay-8">Target Users</h3>
        <ul className="fade-in delay-9">
          <li>
            <strong>Community Members</strong> – looking for a space to ask
            questions, share experiences, and network.
          </li>
          <li>
            <strong>Moderators / Admins</strong> – manage content quality and
            enforce community guidelines.
          </li>
          <li>
            <strong>Guest Visitors</strong> – browse existing threads without
            needing to sign up.
          </li>
        </ul>
        <h3 className="fade-in delay-10">Contact Us</h3>
        <p className="fade-in delay-11">
          Have questions or feedback? Feel free to reach out to our support team
          at support@forumfusion.com.
        </p>
        <button
          className="join-community-btn fade-in delay-12"
          onClick={handleJoinCommunity}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default About;
