// Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContex'; // Import your authentication context
import '../styles/navbar.css'; // Import the CSS module

export const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout functions from context

  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to="/">Home</Link>
      </div>
      <ul className='navLinks'>
        {user && user.username ? ( // Ensure user and username are defined
          <>
            <li>
              <span>Welcome, {user.username}</span> {/* Display the username */}
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link> {/* Display the login link if not logged in */}
          </li>
        )}
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};
