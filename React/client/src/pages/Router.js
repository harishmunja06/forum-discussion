import React from "react";
import "./index.css";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Popular from "./pages/Popular";
import Profile from "./pages/Profile";
import Threads from "./pages/Threads";
import Saved from "./pages/Saved";
import Technology from "./pages/Technology";
import Programming from "./pages/Programming";
import Entertainment from "./pages/Entertainment";
import Hobbies from "./pages/Hobbies";
import Sports from "./pages/Sports";
import Facebook from "./pages/Facebook";
import Google from "./pages/Google";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/google" element={<Google />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Threads" element={<Threads />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/sports" element={<Sports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
