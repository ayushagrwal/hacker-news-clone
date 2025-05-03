import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import User from './pages/User';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protect the entire Layout under PrivateRoutes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/submit" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user/:id" element={<User />} />
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
