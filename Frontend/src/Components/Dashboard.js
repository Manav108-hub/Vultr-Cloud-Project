import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to HealthMate</h1>
      <div className="space-y-4">
        <Link to="/chat" className="block px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100">
          Chat with HealthMate
        </Link>
        <Link to="/profile" className="block px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100">
          View Profile
        </Link>
        <Link to="/report" className="block px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100">
          View Health Reports
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
