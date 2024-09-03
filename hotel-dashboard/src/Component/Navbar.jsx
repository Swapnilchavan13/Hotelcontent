import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContex'; // Import your authentication context
import '../styles/navbar.css'; // Import the CSS module

export const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout functions from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const handleMouseEnter = () => setIsDropdownOpen(true); // Show dropdown
  const handleMouseLeave = () => setIsDropdownOpen(false); // Hide dropdown

  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to="/">Home</Link>
      </div>
      <ul className='navLinks'>
        {user && user.username ? (
          <li className='user-menu' 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}>
            <span className='user-name'>Welcome, {user.username}</span>
            {isDropdownOpen && (
              <div className='dropdown-menu'>
                <img src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg" alt="" />
                <button onClick={logout} className='logout-button'>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};
