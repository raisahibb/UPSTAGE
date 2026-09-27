// Ye file Navbar component hai jo site ke top par dikhta hai.
// Ab isme AuthContext connect kar diya gaya hai jisse user ki state real-time me update hoti hai.

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';
import { History, TrendingUp, LogOut, CircleUser } from 'lucide-react';
import upstageLogo from '../../img/02_upstage_horizontal_logo.png';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // User ke naam ka pehla akshar nikalna avatar ke liye
  const getInitials = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U'; // Default User
  };

  return (
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          
          {/* Logo Area */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              {/* Navbar mein logo ko thoda bada rakha hai taaki branding clearly dikhe. */}
              <img src={upstageLogo} alt="UPSTAGE logo" className="w-[130px] sm:w-[155px] h-auto object-contain" />
            </Link>
          </div>

          {/* Navigation Links Placeholder */}
          <div className="hidden md:flex space-x-8 absolute left-1/2 -translate-x-1/2">
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'admin' ? "/admin" : "/dashboard"} className={`text-sm font-medium px-1 py-5 ${
                  location.pathname === '/dashboard' || location.pathname === '/admin' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)]'
                }`}>
                  Dashboard
                </Link>
                {user?.role !== 'admin' && (
                  <>
                    <Link to="/history" className={`flex items-center gap-1.5 text-sm font-medium px-1 py-5 ${
                      location.pathname === '/history' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)]'
                    }`}>
                      <History size={16} />
                      History
                    </Link>
                    <Link to="/progress" className={`flex items-center gap-1.5 text-sm font-medium px-1 py-5 ${
                      location.pathname === '/progress' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)]'
                    }`}>
                      <TrendingUp size={16} />
                      Progress
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/" className="text-sm font-medium text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] px-1 py-5">
                  Features
                </Link>
                <Link to="/" className="text-sm font-medium text-[var(--color-secondary-text)] hover:text-[var(--color-primary-text)] px-1 py-5">
                  About
                </Link>
              </>
            )}
          </div>

          {/* Action Area (Login/Signup ya User Menu) */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[var(--color-primary-text)] hidden sm:block">
                  Hi, {user?.name}
                </span>
                
                {/* User avatar */}
                <div className="h-8 w-8 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                  {/* Ye icon user profile ko represent kar raha hai */}
                  <CircleUser size={18} />
                </div>
                
                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-secondary-text)] hover:text-red-500 transition-colors ml-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

        </div>
        
        {/* Mobile Navigation Row */}
        {isAuthenticated && user?.role !== 'admin' && (
          <div className="flex md:hidden justify-around py-2 border-t border-[var(--color-border)]">
            <Link to="/dashboard" className={`text-xs font-medium flex flex-col items-center gap-1 ${
              location.pathname === '/dashboard' ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary-text)]'
            }`}>
              <span>Dashboard</span>
            </Link>
            <Link to="/history" className={`text-xs font-medium flex flex-col items-center gap-1 ${
              location.pathname === '/history' ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary-text)]'
            }`}>
              <span>History</span>
            </Link>
            <Link to="/progress" className={`text-xs font-medium flex flex-col items-center gap-1 ${
              location.pathname === '/progress' ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary-text)]'
            }`}>
              <span>Progress</span>
            </Link>
          </div>
        )}
        {isAuthenticated && user?.role === 'admin' && (
          <div className="flex md:hidden justify-around py-2 border-t border-[var(--color-border)]">
            <Link to="/admin" className={`text-xs font-medium flex flex-col items-center gap-1 ${
              location.pathname === '/admin' ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary-text)]'
            }`}>
              <span>Dashboard</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
