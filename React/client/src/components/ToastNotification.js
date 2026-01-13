import React from "react";
import "../styles/ToastNotification.css";

const ToastNotification = ({ message, type }) => {
  if (!message) return null;

  return <div className={`toast-notification toast-${type}`}>{message}</div>;
};

export default ToastNotification;
