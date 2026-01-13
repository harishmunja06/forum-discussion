import React, { useState, useEffect } from "react";
import "../styles/Response.css";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShare,
  FaBookmark,
  FaUserCircle,
  FaTrash,
} from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";

export default function Response({ currentUser }) {
  const [response, setResponse] = useState("");
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("responseComments");
    return savedComments ? JSON.parse(savedComments) : [];
  });

  useEffect(() => {
    localStorage.setItem("responseComments", JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (response.trim()) {
      const newComment = {
        id: Date.now(),
        author: currentUser.username,
        text: response,
        time: "Just now",
      };
      setComments((prevComments) => [...prevComments, newComment]);
      setResponse(""); // Clear the textarea after submission
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <div className="response-wrapper">
      <div className="response-box">
        <h2>Front-end Development And Backend Developer</h2>
        <div className="author-row">
          <FaUserCircle className="avatar" />
          <span className="author">Astronout</span>
          <span className="time">6h ago</span>
          <span className="tag">Front-end</span>
        </div>
        <p>
          The three main languages you need to know well are HTML, CSS, and
          JavaScript. From there you can focus on frameworks, libraries, and
          other useful tools...
        </p>

        {/* Dynamically render comments */}
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="response-comment">
              <FaUserCircle className="avatar small" />
              <div>
                <div className="comment-meta">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-time">{comment.time}</span>
                  {comment.author === currentUser.username && (
                    <button
                      className="delete-comment-btn"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="action-row">
          <FaThumbsUp className="icon" />
          <FaThumbsDown className="icon" />
          <MdOutlineReplay className="icon" />
          <FaShare className="icon" />
          <FaBookmark className="icon" />
        </div>

        <form className="response-form" onSubmit={handleSubmit}>
          <div className="response-input-container">
            <FaUserCircle className="avatar small" />
            <textarea
              className="response-textarea"
              placeholder="Write your response..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows="3"
            />
          </div>
          <button type="submit" className="submit-response-btn">
            Post Response
          </button>
        </form>
      </div>
    </div>
  );
}
