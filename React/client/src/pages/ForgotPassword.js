import React from "react";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot your password?</h2>
        <p>Please enter your email address to reset your password.</p>

        <form>
          <label>Email address</label>
          <input type="email" placeholder="Enter your email" />
          <button type="submit" className="reset-submit">
            Reset Password
          </button>
        </form>

        <p className="back-login">
          Remembered your password? <a href="#">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
