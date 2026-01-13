import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { PiStrategyBold } from "react-icons/pi";
import { FaApple, FaMusic } from "react-icons/fa";
import { MdSportsSoccer } from "react-icons/md";
import Discussion from "../assets/Discussion.jpg";
import "../styles/Home.css";
import { useToast } from "../contexts/ToastContext";

export default function Home({ currentUser }) {
  const { showToast } = useToast();

  // Initialize featuredPosts from localStorage or use default value
  const [featuredPosts, setFeaturedPosts] = useState(() => {
    const savedPosts = localStorage.getItem("featuredPosts");
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    return [
      {
        id: 1,
        title: "Welcome to Our Community Forum",
        author: "Admin",
        time: "Just now",
        tag: "Announcement",
        content:
          "Join our vibrant community to share insights, ask questions, and engage in meaningful discussions. We're excited to have you here!",
        likes: 0,
        dislikes: 0,
        comments: [],
        shares: 0,
        showCommentInput: false,
        newComment: "",
        userLiked: false,
        userDisliked: false,
        isUserCreated: false,
      },
      {
        id: 2,
        title: "Getting Started Guide",
        author: "Moderator",
        time: "1h ago",
        tag: "Guide",
        content:
          "New to the forum? Check out our comprehensive guide on how to make the most of your experience here.",
        likes: 0,
        dislikes: 0,
        comments: [],
        shares: 0,
        showCommentInput: false,
        newComment: "",
        userLiked: false,
        userDisliked: false,
        isEditing: false,
        showOptions: false,
        isUserCreated: false,
      },
    ];
  });

  // Save featuredPosts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("featuredPosts", JSON.stringify(featuredPosts));
  }, [featuredPosts]);

  const categories = [
    { name: "Technology", icon: <FaApple /> },
    { name: "Programming", icon: <BsCodeSlash /> },
    { name: "Entertainment", icon: <FaMusic /> },
    { name: "Hobbies", icon: <PiStrategyBold /> },
    { name: "Sports", icon: <MdSportsSoccer /> },
  ];

  const navigate = useNavigate();

  const handleToggleCommentInput = (postId) => {
    setFeaturedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showCommentInput: !post.showCommentInput }
          : post
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setFeaturedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, newComment: value } : post
      )
    );
  };

  const handleAddComment = (postId) => {
    setFeaturedPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId && post.newComment.trim() !== ""
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(), // Use Date.now() for unique ID
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
    showToast("Comment added!", "success");
  };

  const handleDeleteComment = (postId, commentId) => {
    setFeaturedPosts((prevPosts) =>
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
    showToast("Comment deleted successfully!", "success");
  };

  const handleLike = (postId) => {
    setFeaturedPosts((prevPosts) =>
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
    showToast("Post liked!", "info");
  };

  const handleDislike = (postId) => {
    setFeaturedPosts((prevPosts) =>
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
    showToast("Post disliked!", "info");
  };

  const handleSharePost = (postId) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      showToast("Post link copied to clipboard!", "info");
    });
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setFeaturedPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
      showToast("Post deleted successfully!", "success");
    }
  };

  const handleCreatePost = () => {
    navigate("/threads");
  };

  return (
    <>
      <Header />
      <div className="main-layout">
        <LeftSideBar />
        <div className="home-wrapper">
          <div className="home-main-column">
            {/* Welcome Card */}
            <div className="home-card welcome-card">
              <div className="welcome-left">
                <h2 className="home-title">Welcome to ForumFusion!</h2>
                <p className="home-content">
                  Join a vibrant community, share insights, and engage in
                  meaningful discussions.
                  <br />
                  <span className="home-tag">Let your ideas converge!</span>
                </p>
                <button className="get-started-btn" onClick={handleCreatePost}>
                  Create Post
                </button>
              </div>
              <div className="welcome-right">
                <img
                  src={Discussion}
                  alt="Discussion"
                  className="welcome-img"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="categories-section">
              <h3 className="section-title">Popular Categories</h3>
              <div className="categories-grid">
                {categories.map((cat, idx) => (
                  <Link to={`/${cat.name.toLowerCase()}`} key={cat.name}>
                    <div className="category-card">
                      <span className="category-icon">{cat.icon}</span>
                      <span className="category-name">{cat.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Posts */}
            <div className="featured-section">
              <h3 className="section-title">Featured Discussions</h3>
              <div className="featured-posts">
                {featuredPosts.map((post) => (
                  <div key={post.id} className="home-card">
                    <h2 className="home-title">{post.title}</h2>
                    <div className="home-meta">
                      <div className="author">
                        <FaUserCircle className="home-avatar" />
                        <span>{post.author}</span> • <span>{post.time}</span>
                      </div>
                      <span className="home-tag">{post.tag}</span>
                    </div>
                    <p className="home-content">{post.content}</p>
                    <div className="home-footer">
                      <button
                        className="respond-btn"
                        onClick={() => handleToggleCommentInput(post.id)}
                      >
                        Add response
                      </button>
                      <div className="reactions">
                        <span
                          className={`like ${post.userLiked ? "active" : ""} ${
                            post.userLiked ? "like-animation" : ""
                          }`}
                          onClick={() => handleLike(post.id)}
                        >
                          <FaThumbsUp /> {post.likes}
                        </span>
                        <span
                          className={`dislike ${
                            post.userDisliked ? "active" : ""
                          } ${post.userDisliked ? "dislike-animation" : ""}`}
                          onClick={() => handleDislike(post.id)}
                        >
                          <FaThumbsDown /> {post.dislikes}
                        </span>
                        <span
                          className="comment"
                          onClick={() => handleToggleCommentInput(post.id)}
                        >
                          <FaComment /> {post.comments.length}
                        </span>
                        <span
                          className="share"
                          onClick={() => handleSharePost(post.id)}
                        >
                          <FaShare /> {post.shares}
                        </span>
                        {post.isUserCreated && (
                          <span
                            className="delete"
                            onClick={() => handleDeletePost(post.id)}
                            title="Delete post"
                          >
                            <FaTrash />
                          </span>
                        )}
                      </div>
                    </div>
                    {post.showCommentInput && (
                      <div className="comment-section">
                        <div className="comments-list">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                              <span className="comment-author">
                                {comment.author}
                              </span>
                              <span className="comment-text">
                                {comment.text}
                              </span>
                              <span className="comment-time">
                                {comment.time}
                              </span>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
