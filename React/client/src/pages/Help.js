import React from "react";
import Header from "../components/Header";
import LeftSideBar from "../components/LeftSideBar";
import Footer from "../components/Footer";
import {
  FaQuestionCircle,
  FaUserCircle,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight,
  FaBook,
  FaSearch,
  FaTag,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaCog,
  FaLock,
  FaHistory,
  FaExclamationTriangle,
  FaDiscord,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import "../styles/Help.css";

export default function Help() {
  return (
    <>
      <Header />
      <div className="main-layout">
        <LeftSideBar />
        <main className="help-main">
          <div className="help-container">
            <div className="help-header">
              <FaQuestionCircle className="help-icon" />
              <h1>Help Center</h1>
              <p className="help-subtitle">
                Find answers to your questions and learn how to make the most of
                ForumFusion
              </p>
            </div>

            <section className="help-section">
              <div className="section-header">
                <FaBook className="section-icon" />
                <h2>Getting Started</h2>
              </div>
              <div className="help-content">
                <div className="content-card">
                  <h3>How to Create a Post</h3>
                  <div className="step-list">
                    <div className="step-item">
                      <span className="step-number">1</span>
                      <p>Click on the "Create Post" button on the home page</p>
                    </div>
                    <div className="step-item">
                      <span className="step-number">2</span>
                      <p>Choose a relevant category for your post</p>
                    </div>
                    <div className="step-item">
                      <span className="step-number">3</span>
                      <p>Write your post title and content</p>
                    </div>
                    <div className="step-item">
                      <span className="step-number">4</span>
                      <p>Add any relevant tags</p>
                    </div>
                    <div className="step-item">
                      <span className="step-number">5</span>
                      <p>Click "Submit" to publish your post</p>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <h3>Navigating the Forum</h3>
                  <div className="feature-grid">
                    <div className="feature-item">
                      <FaSearch className="feature-icon" />
                      <p>Use the search bar to find specific posts</p>
                    </div>
                    <div className="feature-item">
                      <FaTag className="feature-icon" />
                      <p>Click on tags to filter posts by topic</p>
                    </div>
                    <div className="feature-item">
                      <FaArrowRight className="feature-icon" />
                      <p>Use the navigation menu to switch between pages</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="help-section">
              <div className="section-header">
                <FaShieldAlt className="section-icon" />
                <h2>Community Guidelines</h2>
              </div>
              <div className="help-content">
                <div className="content-card">
                  <h3>Posting Rules</h3>
                  <div className="guideline-list">
                    <div className="guideline-item">
                      <FaThumbsUp className="guideline-icon" />
                      <p>Be respectful and constructive in your comments</p>
                    </div>
                    <div className="guideline-item">
                      <FaTag className="guideline-icon" />
                      <p>Stay on topic and use appropriate tags</p>
                    </div>
                    <div className="guideline-item">
                      <FaExclamationTriangle className="guideline-icon" />
                      <p>Avoid spam and self-promotion</p>
                    </div>
                    <div className="guideline-item">
                      <FaShieldAlt className="guideline-icon" />
                      <p>Report inappropriate content</p>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <h3>Interaction Guidelines</h3>
                  <div className="guideline-list">
                    <div className="guideline-item">
                      <FaThumbsUp className="guideline-icon" />
                      <p>Use likes and dislikes appropriately</p>
                    </div>
                    <div className="guideline-item">
                      <FaComment className="guideline-icon" />
                      <p>Keep comments relevant and helpful</p>
                    </div>
                    <div className="guideline-item">
                      <FaShare className="guideline-icon" />
                      <p>Share content responsibly</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="help-section">
              <div className="section-header">
                <FaUserCircle className="section-icon" />
                <h2>Account Management</h2>
              </div>
              <div className="help-content">
                <div className="content-card">
                  <h3>Profile Settings</h3>
                  <div className="feature-grid">
                    <div className="feature-item">
                      <FaUserCircle className="feature-icon" />
                      <p>Update your profile information</p>
                    </div>
                    <div className="feature-item">
                      <FaBook className="feature-icon" />
                      <p>Manage your saved posts</p>
                    </div>
                    <div className="feature-item">
                      <FaCog className="feature-icon" />
                      <p>Customize your notification preferences</p>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <h3>Privacy & Security</h3>
                  <div className="feature-grid">
                    <div className="feature-item">
                      <FaLock className="feature-icon" />
                      <p>Control your privacy settings</p>
                    </div>
                    <div className="feature-item">
                      <FaShieldAlt className="feature-icon" />
                      <p>Manage your account security</p>
                    </div>
                    <div className="feature-item">
                      <FaHistory className="feature-icon" />
                      <p>Review your activity history</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="help-section">
              <div className="section-header">
                <FaHeadset className="section-icon" />
                <h2>Need More Help?</h2>
              </div>
              <div className="help-content">
                <div className="contact-grid">
                  <div className="contact-item">
                    <FaBook className="contact-icon" />
                    <p>Check our FAQ section</p>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <p>Contact our support team</p>
                  </div>
                  <div className="contact-item">
                    <FaDiscord className="contact-icon" />
                    <p>Join our community Discord</p>
                  </div>
                  <div className="contact-item">
                    <FaTwitter className="contact-icon" />
                    <p>Follow our social media for updates</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
