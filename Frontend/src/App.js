import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import HealthReport from './Components/HealthReport';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = (email, password, navigate) => {
    // Mock login (replace with actual authentication logic)
    setIsAuthenticated(true);
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<HealthReport />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
