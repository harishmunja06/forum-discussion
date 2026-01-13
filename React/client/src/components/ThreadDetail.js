import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ThreadDetail.css";

const ThreadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/threads/${id}`);
      setThread(response.data);
      setIsOwner(response.data.author._id === localStorage.getItem("userId"));
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch thread");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this thread?")) {
      return;
    }

    try {
      await axios.delete(`/api/threads/${id}`);
      navigate("/threads");
    } catch (err) {
      setError("Failed to delete thread");
    }
  };

  if (loading) return <div className="loading">Loading thread...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!thread) return <div className="error">Thread not found</div>;

  return (
    <div className="thread-detail-container">
      <div className="thread-header">
        <h1>{thread.title}</h1>
        <div className="thread-meta">
          <div className="thread-stats">
            <span>
              <i className="fas fa-eye"></i> {thread.views} views
            </span>
            <span>
              <i className="fas fa-heart"></i> {thread.likes} likes
            </span>
            <span>
              <i className="fas fa-comment"></i> {thread.commentCount || 0}{" "}
              comments
            </span>
          </div>
          <div className="thread-date">
            Posted on {new Date(thread.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="thread-tags">
        {thread.tags.map((tag) => (
          <span key={tag} className="thread-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="thread-content">{thread.content}</div>

      <div className="thread-author">
        <img
          src={thread.author.avatar || "/default-avatar.png"}
          alt={thread.author.username}
          className="author-avatar"
        />
        <div className="author-info">
          <span className="author-name">{thread.author.username}</span>
          <Link to={`/profile/${thread.author._id}`} className="view-profile">
            View Profile
          </Link>
        </div>
      </div>

      {isOwner && (
        <div className="thread-actions">
          <button
            className="edit-button"
            onClick={() => navigate(`/threads/${id}/edit`)}
          >
            Edit Thread
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Thread
          </button>
        </div>
      )}

      <div className="comments-section">
        <h2>Comments</h2>
        {/* Comments component will be added here */}
      </div>
    </div>
  );
};

export default ThreadDetail;
