import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import HealthReport from './Components/HealthReport';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import ChatBot from './Components/ChatBot';
import Home from './Components/Home';
import Getstarted from './Components/Getstarted';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
  }, []);

  const handleLogin = (email, password) => {
    // Mock login logic (replace with actual authentication)
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false'); // Update authentication status
  };

  return (
    <>
      <Navbar onLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Home route accessible to everyone */}
        <Route path="/home" element={<Home />} />

        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/report" element={<HealthReport />} />
            <Route path="/getstarted" element={<Getstarted />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
