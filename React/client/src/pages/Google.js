import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Google.css";
import { FcGoogle } from "react-icons/fc";

function Google() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Sign-In API
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "email profile",
        callback: async (response) => {
          if (response.access_token) {
            // Get user info using the access token
            const userInfo = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: { Authorization: `Bearer ${response.access_token}` },
              }
            ).then((res) => res.json());

            // Send data to your backend
            const backendResponse = await fetch(
              "http://localhost:4000/auth/google",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  accessToken: response.access_token,
                  userData: userInfo,
                }),
              }
            );

            const data = await backendResponse.json();
            if (data.success) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("userRole", data.role);
              navigate("/home");
            } else {
              alert("Google login failed: " + data.message);
            }
          }
        },
      });

      client.requestAccessToken();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during Google login");
    }
  };

  return (
    <div className="google-login-container">
      <div className="login-box">
        <FcGoogle className="google-icon" />
        <h2>Log in with Google</h2>
        <p>Welcome back! Please log in with your Google account.</p>

        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <FcGoogle className="icon" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Google;
