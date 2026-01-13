import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Facebook.css";
import { FaFacebook } from "react-icons/fa";

function Facebook() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };

    // Load Facebook SDK
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {
          // Get user data
          FB.api("/me", { fields: "name,email" }, function (userData) {
            // Send data to your backend
            fetch("http://localhost:4000/auth/facebook", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                accessToken: response.authResponse.accessToken,
                userData: userData,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("userRole", data.role);
                  navigate("/home");
                } else {
                  alert("Facebook login failed: " + data.message);
                }
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred during Facebook login");
              });
          });
        } else {
          alert("Facebook login failed");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  return (
    <div className="facebook-login-container">
      <div className="login-box">
        <FaFacebook className="facebook-icon" />
        <h2>Log in with Facebook</h2>
        <p>Welcome back! Please log in with your Facebook account.</p>

        <button className="fb-login-btn" onClick={handleFacebookLogin}>
          <FaFacebook className="icon" />
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}

export default Facebook;
