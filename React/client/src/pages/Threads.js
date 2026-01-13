import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Footer from "../components/Footer";
import {
  FaRegBookmark,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaUserCircle,
  FaComment,
  FaShare,
  FaBookmark,
  FaThumbsUp,
  FaThumbsDown,
  FaEdit,
  FaTrash,
  FaEllipsisH,
  FaTag,
  FaImage,
  FaLink,
  FaCode,
} from "react-icons/fa";
import "../styles/Feed.css";
import "../styles/FeedThemes.css";
import useSavedPosts from "../hooks/useSavedPosts";
import { useToast } from "../contexts/ToastContext";

export default function Threads({ threads, setThreads, currentUser }) {
  const { toggleSavedPost, isPostSaved } = useSavedPosts();
  const { showToast } = useToast();

  // Load threads from localStorage on component mount
  useEffect(() => {
    const savedThreads = localStorage.getItem("threads");
    if (savedThreads && (!threads || threads.length === 0)) {
      setThreads(JSON.parse(savedThreads));
    }
  }, []);

  // Save threads to localStorage whenever they change
  useEffect(() => {
    if (threads && threads.length > 0) {
      localStorage.setItem("threads", JSON.stringify(threads));
    }
  }, [threads]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTag, setNewPostTag] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingThread, setEditingThread] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleCreatePost = () => {
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
      alert("Please fill in both title and content for your post.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      author: currentUser.username,
      authorRealName: currentUser.realName,
      time: "Just now",
      tag: newPostTag || "General",
      content: newPostContent,
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
      isUserCreated: true,
    };

    setThreads((prevThreads) => [newPost, ...prevThreads]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTag("");
    setShowCreateModal(false);
    showToast("Thread created successfully!", "success");
  };

  const handleEditThread = (threadId) => {
    const thread = threads.find((t) => t.id === threadId);
    setEditingThread(thread);
    setNewPostTitle(thread.title);
    setNewPostContent(thread.content);
    setNewPostTag(thread.tag);
    setShowCreateModal(true);
  };

  const handleUpdateThread = () => {
    if (!editingThread) return;

    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === editingThread.id
          ? {
              ...thread,
              title: newPostTitle,
              content: newPostContent,
              tag: newPostTag,
              isEditing: false,
            }
          : thread
      )
    );

    setEditingThread(null);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTag("");
    setShowCreateModal(false);
    showToast("Thread updated successfully!", "success");
  };

  const handleDeleteThread = (threadId) => {
    setThreads((prevThreads) =>
      prevThreads.filter((thread) => thread.id !== threadId)
    );
    setShowDeleteConfirm(null);
    showToast("Thread deleted successfully!", "success");
  };

  const handleToggleCommentInput = (threadId) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? { ...thread, showCommentInput: !thread.showCommentInput }
          : thread
      )
    );
  };

  const handleCommentChange = (threadId, value) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId ? { ...thread, newComment: value } : thread
      )
    );
  };

  const handleAddComment = (threadId) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId && thread.newComment.trim() !== ""
          ? {
              ...thread,
              comments: [
                ...thread.comments,
                {
                  id: Date.now(),
                  author: currentUser.username,
                  text: thread.newComment,
                  time: "Just now",
                },
              ],
              newComment: "",
              showCommentInput: false,
            }
          : thread
      )
    );
    showToast("Comment added!", "success");
  };

  const handleLike = (threadId) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              likes: thread.userLiked ? thread.likes - 1 : thread.likes + 1,
              dislikes: thread.userDisliked
                ? thread.dislikes - 1
                : thread.dislikes,
              userLiked: !thread.userLiked,
              userDisliked: false,
            }
          : thread
      )
    );
    showToast("Post liked!", "info");
  };

  const handleDislike = (threadId) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              dislikes: thread.userDisliked
                ? thread.dislikes - 1
                : thread.dislikes + 1,
              likes: thread.userLiked ? thread.likes - 1 : thread.likes,
              userDisliked: !thread.userDisliked,
              userLiked: false,
            }
          : thread
      )
    );
    showToast("Post disliked!", "info");
  };

  const handleSharePost = (threadId) => {
    const postUrl = `${window.location.origin}/threads/${threadId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      showToast("Thread link copied to clipboard!", "info");
    });
  };

  const toggleThreadOptions = (threadId) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? { ...thread, showOptions: !thread.showOptions }
          : thread
      )
    );
  };

  const handleDeleteComment = (threadId, commentId) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              comments: thread.comments.filter(
                (comment) => comment.id !== commentId
              ),
            }
          : thread
      )
    );
  };

  return (
    <>
      <Header />
      <div className="main-layout">
        <LeftSideBar />
        <div className="feed-wrapper threads-theme">
          <div className="feed-container">
            <div
              className="create-thread-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <FaUserCircle className="user-avatar" />
              <span>Start a new discussion...</span>
            </div>

            {showCreateModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>{editingThread ? "Edit Thread" : "Create New Thread"}</h2>
                  <div className="modal-form">
                    <input
                      type="text"
                      placeholder="Thread Title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="What's on your mind? Share your thoughts..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows="5"
                    ></textarea>
                    <div className="tag-input">
                      <FaTag />
                      <input
                        type="text"
                        placeholder="Add a tag (e.g., Technology, Programming)"
                        value={newPostTag}
                        onChange={(e) => setNewPostTag(e.target.value)}
                      />
                    </div>
                    <div className="modal-actions">
                      <button
                        className="cancel-btn"
                        onClick={() => {
                          setShowCreateModal(false);
                          setEditingThread(null);
                          setNewPostTitle("");
                          setNewPostContent("");
                          setNewPostTag("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="submit-btn"
                        onClick={
                          editingThread ? handleUpdateThread : handleCreatePost
                        }
                      >
                        {editingThread ? "Update Thread" : "Create Thread"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showDeleteConfirm && (
              <div className="modal-overlay">
                <div className="modal-content delete-confirm">
                  <h2>Delete Thread</h2>
                  <p>
                    Are you sure you want to delete this thread? This action
                    cannot be undone.
                  </p>
                  <div className="modal-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => setShowDeleteConfirm(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteThread(showDeleteConfirm)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {threads.map((thread) => (
              <div key={thread.id} className="feed-card">
                <div className="feed-header">
                  <h2 className="feed-title">{thread.title}</h2>
                  <div className="thread-options">
                    <button
                      className="options-btn"
                      onClick={() => toggleThreadOptions(thread.id)}
                    >
                      <FaEllipsisH />
                    </button>
                    {thread.isUserCreated &&
                      thread.author === currentUser.username &&
                      thread.showOptions && (
                        <div className="options-menu">
                          <button onClick={() => handleEditThread(thread.id)}>
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(thread.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                  </div>
                </div>

                <div className="feed-meta">
                  <div className="author">
                    <FaUserCircle className="feed-avatar" />
                    <span>
                      {thread.isUserCreated &&
                      thread.author === currentUser.username
                        ? thread.authorRealName
                        : thread.author}
                    </span>{" "}
                    • <span>{thread.time}</span>
                  </div>
                  <span className="feed-tag">{thread.tag}</span>
                </div>

                <p className="feed-content">{thread.content}</p>

                <div className="feed-footer">
                  <div className="feed-actions">
                    <span
                      className={`action-btn ${
                        thread.userLiked ? "active" : ""
                      } ${thread.userLiked ? "like-animation" : ""}`}
                      onClick={() => handleLike(thread.id)}
                    >
                      {thread.userLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}{" "}
                      {thread.likes}
                    </span>
                    <span
                      className={`action-btn ${
                        thread.userDisliked ? "active" : ""
                      } ${thread.userDisliked ? "dislike-animation" : ""}`}
                      onClick={() => handleDislike(thread.id)}
                    >
                      {thread.userDisliked ? (
                        <FaThumbsDown />
                      ) : (
                        <FaRegThumbsDown />
                      )}{" "}
                      {thread.dislikes}
                    </span>
                    <span
                      className="action-btn"
                      onClick={() => handleToggleCommentInput(thread.id)}
                    >
                      <FaComment />{" "}
                      {thread.comments.length > 0 && thread.comments.length}
                    </span>
                    <span
                      className="action-btn"
                      onClick={() => handleSharePost(thread.id)}
                    >
                      <FaShare /> {thread.shares}
                    </span>
                    <button
                      className={`action-btn ${
                        isPostSaved(thread.id) ? "saved" : ""
                      }`}
                      onClick={() => {
                        toggleSavedPost(thread);
                        showToast(
                          isPostSaved(thread.id)
                            ? "Post unsaved!"
                            : "Post saved!",
                          "info"
                        );
                      }}
                    >
                      {isPostSaved(thread.id) ? (
                        <FaBookmark />
                      ) : (
                        <FaRegBookmark />
                      )}
                    </button>
                  </div>
                </div>

                {thread.showCommentInput && (
                  <div className="comment-section">
                    <div className="comments-list">
                      {thread.comments.map((comment) => (
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
                                handleDeleteComment(thread.id, comment.id)
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
                        value={thread.newComment}
                        onChange={(e) =>
                          handleCommentChange(thread.id, e.target.value)
                        }
                        rows="2"
                      ></textarea>
                      <button
                        className="post-comment-btn"
                        onClick={() => handleAddComment(thread.id)}
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
