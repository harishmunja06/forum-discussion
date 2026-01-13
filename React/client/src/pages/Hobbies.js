import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import "../styles/Feed.css";
import "../styles/FeedThemes.css";
import useSavedPosts from "../hooks/useSavedPosts";

export default function Hobbies({ currentUser }) {
  const { toggleSavedPost, isPostSaved } = useSavedPosts();

  // Initialize hobbyPosts from localStorage or use default value
  const [hobbyPosts, setHobbyPosts] = useState(() => {
    const savedPosts = localStorage.getItem("hobbyPosts");
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return [
      {
        id: 1,
        title: "The Art of Photography: Capturing Moments",
        author: "LensMaster",
        time: "3h ago",
        tag: "Hobbies",
        content:
          "Discover the secrets of composition, lighting, and storytelling through photography. Tips and techniques for both beginners and enthusiasts.",
        likes: 0,
        dislikes: 0,
        comments: [],
        shares: 0,
        showCommentInput: false,
        newComment: "",
        userLiked: false,
        userDisliked: false,
      },
      {
        id: 2,
        title: "Gardening: A Therapeutic Journey",
        author: "GreenThumb",
        time: "5h ago",
        tag: "Hobbies",
        content:
          "How gardening can improve mental health and create a sustainable lifestyle. From indoor plants to outdoor gardens, find your green sanctuary.",
        likes: 0,
        dislikes: 0,
        comments: [],
        shares: 0,
        showCommentInput: false,
        newComment: "",
        userLiked: false,
        userDisliked: false,
      },
    ];
  });

  // Save hobbyPosts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("hobbyPosts", JSON.stringify(hobbyPosts));
  }, [hobbyPosts]);

  const handleToggleCommentInput = (postId) => {
    setHobbyPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showCommentInput: !post.showCommentInput }
          : post
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setHobbyPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, newComment: value } : post
      )
    );
  };

  const handleAddComment = (postId) => {
    setHobbyPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId && post.newComment.trim() !== ""
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: currentUser.username,
                  text: post.newComment,
                  time: "Just now",
                },
              ],
              newComment: "",
              showCommentInput: false,
            }
          : post
      )
    );
  };

  const handleDeleteComment = (postId, commentId) => {
    setHobbyPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== commentId
              ),
            }
          : post
      )
    );
  };

  const handleLike = (postId) => {
    setHobbyPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.userLiked ? post.likes - 1 : post.likes + 1,
              dislikes: post.userDisliked ? post.dislikes - 1 : post.dislikes,
              userLiked: !post.userLiked,
              userDisliked: false,
            }
          : post
      )
    );
  };

  const handleDislike = (postId) => {
    setHobbyPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              dislikes: post.userDisliked
                ? post.dislikes - 1
                : post.dislikes + 1,
              likes: post.userLiked ? post.likes - 1 : post.likes,
              userDisliked: !post.userDisliked,
              userLiked: false,
            }
          : post
      )
    );
  };

  const handleSharePost = (postId) => {
    const postUrl = `${window.location.origin}/hobbies/${postId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      alert("Post link copied to clipboard!");
    });
  };

  return (
    <>
      <Header />
      <div className="main-layout">
        <LeftSideBar />
        <div className="feed-wrapper hobbies-theme">
          <div className="feed-container">
            {hobbyPosts.map((post) => (
              <div key={post.id} className="feed-card">
                <h2 className="feed-title">{post.title}</h2>
                <div className="feed-meta">
                  <div className="author">
                    <FaUserCircle className="feed-avatar" />
                    <span>{post.author}</span> • <span>{post.time}</span>
                  </div>
                  <span className="feed-tag">{post.tag}</span>
                </div>
                <p className="feed-content">{post.content}</p>
                <div className="feed-footer">
                  <div className="feed-actions">
                    <span
                      className={`action-btn ${post.userLiked ? "active" : ""}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <FaThumbsUp /> {post.likes}
                    </span>
                    <span
                      className={`action-btn ${
                        post.userDisliked ? "active" : ""
                      }`}
                      onClick={() => handleDislike(post.id)}
                    >
                      <FaThumbsDown /> {post.dislikes}
                    </span>
                    <span
                      className="action-btn"
                      onClick={() => handleToggleCommentInput(post.id)}
                    >
                      <FaComment /> {post.comments.length}
                    </span>
                    <span
                      className="action-btn"
                      onClick={() => handleSharePost(post.id)}
                    >
                      <FaShare /> {post.shares}
                    </span>
                    <button
                      className={`action-btn ${
                        isPostSaved(post.id) ? "saved" : ""
                      }`}
                      onClick={() => toggleSavedPost(post)}
                    >
                      <FaBookmark />
                    </button>
                  </div>
                  <button className="view-thread-btn">View Thread</button>
                </div>
                {post.showCommentInput && (
                  <div className="comment-section">
                    <div className="comments-list">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                          <span className="comment-author">
                            {comment.author}
                          </span>
                          <span className="comment-text">{comment.text}</span>
                          <span className="comment-time">{comment.time}</span>
                          {comment.author === currentUser.username && (
                            <button
                              className="delete-comment-btn"
                              onClick={() =>
                                handleDeleteComment(post.id, comment.id)
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="add-comment">
                      <textarea
                        placeholder="Write your response..."
                        value={post.newComment}
                        onChange={(e) =>
                          handleCommentChange(post.id, e.target.value)
                        }
                        rows="2"
                      ></textarea>
                      <button
                        className="post-comment-btn"
                        onClick={() => handleAddComment(post.id)}
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
