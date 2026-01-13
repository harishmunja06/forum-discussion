import { useState, useEffect } from "react";

const useSavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState(() => {
    try {
      const localData = localStorage.getItem("savedPosts");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse saved posts from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
    } catch (error) {
      console.error("Failed to save posts to localStorage", error);
    }
  }, [savedPosts]);

  const isPostSaved = (postId) => {
    if (!postId) return false;
    return savedPosts.some((post) => post.id === postId);
  };

  const toggleSavedPost = (post) => {
    if (!post || !post.id) {
      console.error("Invalid post object provided to toggleSavedPost");
      return;
    }

    setSavedPosts((prevSavedPosts) => {
      try {
        if (isPostSaved(post.id)) {
          return prevSavedPosts.filter((p) => p.id !== post.id);
        } else {
          // Preserve all original post data including interaction values
          const postToSave = {
            ...post,
            likes: post.likes || 0,
            dislikes: post.dislikes || 0,
            comments: post.comments || [],
            shares: post.shares || 0,
            userLiked: post.userLiked || false,
            userDisliked: post.userDisliked || false,
            showCommentInput: false,
            newComment: "",
          };
          return [...prevSavedPosts, postToSave];
        }
      } catch (error) {
        console.error("Error toggling saved post:", error);
        return prevSavedPosts;
      }
    });
  };

  return { savedPosts, setSavedPosts, toggleSavedPost, isPostSaved };
};

export default useSavedPosts;
