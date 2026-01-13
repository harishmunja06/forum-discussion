import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { ToastProvider } from "./contexts/ToastContext";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Profile from "./pages/Profile";
import Threads from "./pages/Threads";
import Saved from "./pages/Saved";
import Technology from "./pages/Technology";
import Programming from "./pages/Programming";
import Entertainment from "./pages/Entertainment";
import Hobbies from "./pages/Hobbies";
import Sports from "./pages/Sports";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Help from "./pages/Help";
import Response from "./pages/Response";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return {
      username: "Jathin", // Default username
      realName: "Jathin",
    };
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // Initialize threads from localStorage or use default value
  const [threads, setThreads] = useState(() => {
    const savedThreads = localStorage.getItem("threads");
    if (savedThreads) {
      return JSON.parse(savedThreads);
    }
    return [
      {
        id: 1,
        title: "AI and Machine Learning in Web Development",
        author: "Astronout",
        authorRealName: "Alex Smith",
        time: "6h ago",
        tag: "Front-end",
        content:
          "Artificial Intelligence is revolutionizing how we live, work, and interact. From smart homes to autonomous vehicles, AI is becoming an integral part of our daily lives.",
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
      {
        id: 2,
        title: "Cloud Computing and Serverless Architectures",
        author: "Astronout",
        authorRealName: "Alex Smith",
        time: "6h ago",
        tag: "Back-end",
        content:
          "Cloud computing and serverless architectures are becoming key components in modern web development. By using services like AWS, Azure, or Google Cloud, developers can scale apps quickly.",
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

  // Save threads to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("threads", JSON.stringify(threads));
  }, [threads]);

  const userCreatedThreads = threads.filter(
    (thread) => thread.isUserCreated && thread.author === currentUser.username
  );

  const userThreadResponses = threads.reduce((acc, thread) => {
    if (thread.isUserCreated && thread.author === currentUser.username) {
      return [
        ...acc,
        ...thread.comments.map((comment) => ({
          id: comment.id,
          title: `Re: ${thread.title}`,
          type: "response",
          category: thread.tag,
          time: comment.time,
          originalPostId: thread.id,
        })),
      ];
    }
    return acc;
  }, []);

  return (
    <SearchProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home currentUser={currentUser} />} />
            <Route
              path="/popular"
              element={<Popular currentUser={currentUser} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  userCreatedThreads={userCreatedThreads}
                  userThreadResponses={userThreadResponses}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/threads"
              element={
                <Threads
                  threads={threads}
                  setThreads={setThreads}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/saved"
              element={<Saved currentUser={currentUser} />}
            />
            <Route
              path="/technology"
              element={<Technology currentUser={currentUser} />}
            />
            <Route
              path="/programming"
              element={<Programming currentUser={currentUser} />}
            />
            <Route
              path="/entertainment"
              element={<Entertainment currentUser={currentUser} />}
            />
            <Route
              path="/hobbies"
              element={<Hobbies currentUser={currentUser} />}
            />
            <Route
              path="/sports"
              element={<Sports currentUser={currentUser} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route
              path="/response"
              element={<Response currentUser={currentUser} />}
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </SearchProvider>
  );
}

export default App;
