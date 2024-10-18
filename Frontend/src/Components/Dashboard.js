import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to HealthMate</h1>
      <div className="dashboard-links">
        <Link to="/chat">Chat with HealthMate</Link>
        <Link to="/profile">View Profile</Link>
        <Link to="/report">View Health Reports</Link>
      </div>
    </div>
  );
};

export default Dashboard;
