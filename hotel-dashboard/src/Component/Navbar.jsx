import React, { useState } from 'react';
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
        <Link to="/dashboard"><img src="isn.jpeg" alt="Logo" /></Link>
      </div>
      <ul className='navLinks'>
        {user ? (
          <li className='user-menu' 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}>
            {/* Display user property name or mobile number */}
            <span className='user-name'>Hi, {user.propertyName || user.mobileNumber}</span> 
            
            {/* Dropdown menu with more details */}
            {isDropdownOpen && (
              <div className='dropdown-menu'>
                <img src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg" alt="User Avatar" />
                <div className='user-details'>
                  <p><strong>Property:</strong> {user.propertyName}</p>
                  <p><strong>Location:</strong> {user.location}</p>
                  <p><strong>Contact Person:</strong> {user.contactPerson}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.mobileNumber}</p>
                </div>
                <button onClick={logout} className='logout-button'>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
  