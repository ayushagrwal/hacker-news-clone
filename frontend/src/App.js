/**
 * Main App component that defines all application routes
 * Handles public and private routing with authentication protection
 */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import User from './pages/User';
import ReplyComment from './pages/ReplyComment';
import EditComment from './pages/EditComment';
import DeleteComment from './pages/DeleteComment';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import Error429 from './pages/Error429';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes requiring authentication */}
        <Route element={<PrivateRoutes />}>
          <Route path="/submit" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/reply" element={<ReplyComment />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/edit-comment/:id" element={<EditComment />} />
          <Route path="/delete-comment/:id" element={<DeleteComment />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/delete-post/:id" element={<DeletePost />} />
          <Route path="/error-429" element={<Error429 />} />
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
