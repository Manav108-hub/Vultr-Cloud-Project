import { Activity, Home, LineChart, MessageSquare, User } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function NavBar({ isAuthenticated, onLogout }) {
    const handleLogout = () => {
        onLogout();
        navigate('/login');
      };
    return (
        <nav className="bg-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">HealthMate</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <NavLink to="/home" icon={<Home className="h-5 w-5" />} text="Home" />
            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" icon={<LineChart className="h-5 w-5" />} text="Dashboard" />
                <NavLink to="/chatbot" icon={<MessageSquare className="h-5 w-5" />} text="Chat" />
                <NavLink to="/profile" icon={<User className="h-5 w-5" />} text="Profile" />
              </>
            )}
          </div>

          {/* Conditional Buttons */}
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"  // Login route
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"  // Change to Register route
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    )
}

function NavLink({ to, icon, text }) {
    return (
      <Link
        to={to}
        className="flex items-center space-x-1 px-3 py-2 rounded-md transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      >
        {icon}
        <span>{text}</span>
      </Link>
    );
  }
