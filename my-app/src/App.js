import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; 
import "./App.css";
import BlogPosts from "./components/Blog/Blogpost";
import AdminLogin from "./components/Admin/AdminLogin";
import Post from "./components/Blog/Post";
import Register from "./components/User/Register";
import EmailVerification from "./components/User/EmailVerification";
import UserLogin from "./components/User/UserLogin";
import ResetPassword from "./components/User/ResetPassword";
import SetPassword from "./components/User/SetPassword";
import AdminContainer from "./components/Admin/AdminContainer";
import UserContainer from "./components/User/UserContainer";
import BlogContainer from "./components/Blog/BlogContainer";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<BlogContainer/>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/blog" element={<Post />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emailVerification" element={<EmailVerification />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/reset-password" element={<SetPassword />} />
          {token ? (
            <Route path="/admin/dashboard" element={<AdminContainer />} />
          ) : (
            <Route path="/" element={<BlogPosts />} />
          )}
          {token ? (
            <Route path="/user/dashboard" element={<UserContainer />} />
          ) : (
            <Route path="/" element={<BlogPosts />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
