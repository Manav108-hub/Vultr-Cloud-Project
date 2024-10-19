import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import HealthReport from './Components/HealthReport';
import Navbar from './Components/Navbar';
import Register from './Components/Register'; // Ensure this is the correct path

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set initial authentication state

  useEffect(() => {
    // Check for authentication in local storage
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
  }, []);

  const handleLogin = (email, password, navigate) => {
    // Mock login logic (replace with actual authentication)
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false'); // Update authentication status
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} /> {/* Pass logout handler to Navbar */}
      <Routes>
        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/report" element={<HealthReport />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            {/* Unauthenticated Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} /> {/* Register route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
