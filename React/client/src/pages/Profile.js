import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Footer from "../components/Footer";
import { FaUserCircle, FaEdit, FaShare, FaBookmark } from "react-icons/fa";
import {
  MdOutlineForum,
  MdOutlineThumbUp,
  MdOutlineEmojiEvents,
  MdOutlineStar,
} from "react-icons/md";
import {
  BsTrophy,
  BsLightningCharge,
  BsBookmarkStar,
  BsAward,
} from "react-icons/bs";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import "../styles/Profile.css";
import "../styles/FeedThemes.css";
import useSavedPosts from "../hooks/useSavedPosts";

export default function Profile({
  userCreatedThreads = [],
  userThreadResponses = [],
  currentUser,
  setCurrentUser,
}) {
  const [activeTab, setActiveTab] = useState("posts");
  const {
    savedPosts: allSavedPosts,
    toggleSavedPost,
    isPostSaved,
  } = useSavedPosts();

  const [profileData, setProfileData] = useState({
    threads: 31,
    responses: 125,
    followers: 32,
    bio: "Passionate about web technologies and open-source. I love sharing knowledge and collaborating on frontend innovations. Here to learn, connect, and contribute!",
    avatar: null,
    coverPhoto: null,
  });

  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(profileData.bio);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [tempProfileName, setTempProfileName] = useState(
    currentUser?.realName || ""
  );
  const [tempProfileUsername, setTempProfileUsername] = useState(
    currentUser?.username || ""
  );

  const badgesData = [
    { id: 1, icon: HiOutlineBadgeCheck, name: "Verified" },
    { id: 2, icon: BsLightningCharge, name: "Fast Responder" },
    { id: 3, icon: BsBookmarkStar, name: "Top Contributor" },
  ];

  const achievementsData = [
    {
      id: 1,
      icon: BsTrophy,
      title: "Thread Master",
      description: "Created 30+ popular threads",
    },
    {
      id: 2,
      icon: MdOutlineEmojiEvents,
      title: "Helpful Hero",
      description: "Received 100+ helpful votes",
    },
    {
      id: 3,
      icon: BsAward,
      title: "Community Star",
      description: "Active member for 1 year",
    },
  ];

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("profilePosts");
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    const initialPosts = [
      {
        id: 1,
        title: "The Future of Web Development: What's Next?",
        type: "post",
        category: "Technology",
        time: "2h ago",
      },
      {
        id: 2,
        title: "Building Scalable Applications with Microservices",
        type: "post",
        category: "Programming",
        time: "4h ago",
      },
    ];

    const userPosts = userCreatedThreads.map((thread) => ({
      id: thread.id,
      title: thread.title,
      type: "post",
      category: thread.tag,
      time: thread.time,
    }));

    return [...userPosts, ...initialPosts];
  });

  useEffect(() => {
    localStorage.setItem("profilePosts", JSON.stringify(posts));
  }, [posts]);

  const [responses, setResponses] = useState(() => {
    const savedResponses = localStorage.getItem("profileResponses");
    if (savedResponses) {
      return JSON.parse(savedResponses);
    }
    const initialResponses = [
      {
        id: 1,
        title: "Great point about WebAssembly!",
        type: "response",
        category: "Technology",
        time: "1h ago",
      },
      {
        id: 2,
        title: "I agree, microservices are key to scalability.",
        type: "response",
        category: "Programming",
        time: "3h ago",
      },
    ];

    return [...userThreadResponses, ...initialResponses];
  });

  useEffect(() => {
    localStorage.setItem("profileResponses", JSON.stringify(responses));
  }, [responses]);

  const handleEditBio = () => {
    setIsEditingBio(true);
    setTempBio(profileData.bio);
  };

  const handleSaveBio = () => {
    setProfileData({ ...profileData, bio: tempBio });
    setIsEditingBio(false);
  };

  const handleCancelEditBio = () => {
    setIsEditingBio(false);
    setTempBio(profileData.bio);
  };

  const handleEditProfileClick = () => {
    setShowEditProfileModal(true);
    setTempProfileName(currentUser?.realName || "");
    setTempProfileUsername(currentUser?.username || "");
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...currentUser,
      username: tempProfileUsername,
      realName: tempProfileName,
    };
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setShowEditProfileModal(false);
  };

  const handleCancelEditProfile = () => {
    setShowEditProfileModal(false);
  };

  const handleShareProfile = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl).then(() => {
      alert("Profile link copied to clipboard!");
    });
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({ ...prevData, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          coverPhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderActivityContent = () => {
    let contentToRender;
    if (activeTab === "posts") {
      contentToRender = posts;
    } else if (activeTab === "responses") {
      contentToRender = responses;
    } else if (activeTab === "saved") {
      contentToRender = allSavedPosts.map((post) => ({
        id: post.id,
        title: post.title,
        type: "saved",
        category: post.tag,
        time: post.time,
      }));
    }

    if (!contentToRender || contentToRender.length === 0) {
      return (
        <p className="no-activity-message">
          No activity to display for this tab.
        </p>
      );
    }

    return contentToRender.map((item) => (
      <div key={item.id} className="activity-item">
        <div className="activity-icon">
          {item.type === "post" && <MdOutlineForum />}
          {item.type === "response" && <MdOutlineThumbUp />}
          {item.type === "saved" && <FaBookmark />}
        </div>
        <div className="activity-content">
          <h5 className="activity-title">{item.title}</h5>
          <div className="activity-meta">
            <span>{item.category}</span>
            <span>•</span>
            <span>{item.time}</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div className="main-layout">
        <LeftSideBar />
        <div className="profile-wrapper">
          <div className="profile-container">
            {/* Main Content */}
            <div className="profile-main">
              {/* Profile Header */}
              <div className="profile-header">
                <div
                  className="profile-cover"
                  style={
                    profileData.coverPhoto
                      ? { backgroundImage: `url(${profileData.coverPhoto})` }
                      : {}
                  }
                >
                  <input
                    type="file"
                    id="coverPhotoUpload"
                    accept="image/*"
                    onChange={handleCoverPhotoUpload}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="coverPhotoUpload"
                    className="change-cover-btn"
                  >
                    <FaEdit /> Change Cover
                  </label>
                  <div className="profile-avatar-container">
                    <input
                      type="file"
                      id="avatarUpload"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="avatarUpload"
                      className="profile-avatar-label"
                    >
                      {profileData.avatar ? (
                        <img
                          src={profileData.avatar}
                          alt="Profile Avatar"
                          className="profile-avatar-img"
                        />
                      ) : (
                        <FaUserCircle className="profile-avatar" />
                      )}
                      <div className="change-avatar-overlay">
                        <FaEdit />
                      </div>
                    </label>
                    <div>
                      <h2 className="profile-name">
                        {currentUser?.realName || "Anonymous"}
                      </h2>
                      <p className="profile-username">
                        {currentUser?.username || "@anonymous"}
                      </p>
                    </div>
                  </div>
                  <div className="profile-actions">
                    <button
                      className="profile-action-btn"
                      onClick={handleEditProfileClick}
                    >
                      <FaEdit /> Edit Profile
                    </button>
                    <button
                      className="profile-action-btn"
                      onClick={handleShareProfile}
                    >
                      <FaShare /> Share
                    </button>
                  </div>
                </div>

                {/* Profile Stats */}
                <div className="profile-stats">
                  <div className="stat">
                    <MdOutlineForum className="stat-icon" />
                    <div className="stat-content">
                      <h3>{profileData.threads}</h3>
                      <p>Threads</p>
                    </div>
                  </div>
                  <div className="stat">
                    <MdOutlineThumbUp className="stat-icon" />
                    <div className="stat-content">
                      <h3>{profileData.responses}</h3>
                      <p>Responses</p>
                    </div>
                  </div>
                  <div className="stat">
                    <FaUserCircle className="stat-icon" />
                    <div className="stat-content">
                      <h3>{profileData.followers}</h3>
                      <p>Followers</p>
                    </div>
                  </div>
                </div>

                {/* Profile About */}
                <div className="profile-about">
                  <div className="section-header">
                    <h4>About</h4>
                    {!isEditingBio ? (
                      <button
                        className="edit-about-btn"
                        onClick={handleEditBio}
                      >
                        <FaEdit />
                      </button>
                    ) : (
                      <div className="edit-bio-actions">
                        <button
                          className="save-bio-btn"
                          onClick={handleSaveBio}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-bio-btn"
                          onClick={handleCancelEditBio}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  {!isEditingBio ? (
                    <p>{profileData.bio}</p>
                  ) : (
                    <textarea
                      className="bio-textarea"
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      rows="5"
                    ></textarea>
                  )}
                </div>

                {/* Profile Activity */}
                <div className="profile-activity">
                  <div className="activity-tabs">
                    <button
                      className={`activity-tab ${
                        activeTab === "posts" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("posts")}
                    >
                      Posts
                    </button>
                    <button
                      className={`activity-tab ${
                        activeTab === "responses" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("responses")}
                    >
                      Responses
                    </button>
                    <button
                      className={`activity-tab ${
                        activeTab === "saved" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("saved")}
                    >
                      Saved
                    </button>
                  </div>

                  <div className="activity-list">{renderActivityContent()}</div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="profile-sidebar">
              {/* Badges Section */}
              <div className="sidebar-section">
                <h4>Badges</h4>
                <div className="badge-list">
                  {badgesData.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div key={badge.id} className="badge">
                        <Icon className="badge-icon" />
                        {badge.name}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Achievements Section */}
              <div className="sidebar-section">
                <h4>Achievements</h4>
                <div className="achievement-list">
                  {achievementsData.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={achievement.id} className="achievement">
                        <div className="achievement-icon">
                          <Icon />
                        </div>
                        <div className="achievement-info">
                          <h5>{achievement.title}</h5>
                          <p>{achievement.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditProfileModal && (
        <div className="edit-profile-modal-overlay">
          <div className="edit-profile-modal">
            <h2>Edit Profile</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={tempProfileName}
                onChange={(e) => setTempProfileName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={tempProfileUsername}
                onChange={(e) => setTempProfileUsername(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveProfile}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancelEditProfile}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
