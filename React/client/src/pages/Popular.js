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

export default function Popular({ currentUser }) {
  const { toggleSavedPost, isPostSaved } = useSavedPosts();

  // Initialize popularPosts from localStorage or use default value
  const [popularPosts, setPopularPosts] = useState(() => {
    const savedPosts = localStorage.getItem("popularPosts");
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return [
      {
        id: 1,
        title: "The Future of Web Development: What's Next?",
        author: "WebGuru",
        time: "2h ago",
        tag: "Technology",
        content:
          "From WebAssembly to Edge Computing, explore the cutting-edge technologies that are shaping the future of web development.",
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
        title: "Building Scalable Applications with Microservices",
        author: "ArchitectPro",
        time: "4h ago",
        tag: "Programming",
        content:
          "Learn how microservices architecture can help you build more maintainable and scalable applications. Real-world examples and best practices included.",
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
        id: 3,
        title: "The Impact of AI on Creative Industries",
        author: "CreativeMind",
        time: "6h ago",
        tag: "Entertainment",
        content:
          "How artificial intelligence is revolutionizing art, music, and design. From AI-generated art to algorithmic composition, discover the future of creativity.",
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

  // Save popularPosts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("popularPosts", JSON.stringify(popularPosts));
  }, [popularPosts]);

  const handleToggleCommentInput = (postId) => {
    setPopularPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showCommentInput: !post.showCommentInput } // Toggle only the specific post
          : post
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setPopularPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, newComment: value } : post
      )
    );
  };

  const handleAddComment = (postId) => {
    setPopularPosts((prevPosts) =>
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
    setPopularPosts((prevPosts) =>
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
    setPopularPosts((prevPosts) =>
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
    setPopularPosts((prevPosts) =>
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
    const postUrl = `${window.location.origin}/popular/${postId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      alert("Post link copied to clipboard!");
    });
  };

  return (
    <>
      <Header />
      <div className="main-layout">
        <LeftSideBar />
        <div className="feed-wrapper popular-theme">
          <div className="feed-container">
            {popularPosts.map((post) => (
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
