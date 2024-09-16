import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../styles/home.css'; // Import CSS for styling

export const Home = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const redirectToDashboard = () => {
    navigate('/dashboard'); // Redirect to /dashboard route
  };

  // State for form fields
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: '',
    location: '',
    address: '',
    website: '',
    numberOfKeys: '',
    contactPerson: '',
    mobileNumber: '',
    email: '',
    sustainabilityPrograms: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save formData to localStorage
    localStorage.setItem('ISN_Registration', JSON.stringify(formData));

    // Show success toast
    toast.success('Registered successfully!');

    // Clear form fields after submission
    setFormData({
      propertyName: '',
      propertyType: '',
      location: '',
      address: '',
      website: '',
      numberOfKeys: '',
      contactPerson: '',
      mobileNumber: '',
      email: '',
      sustainabilityPrograms: '',
    });
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Sustainability Dashboard</h1>
        <p>We are excited to introduce you to our new platform, designed to be your central hub for managing and tracking all aspects of sustainability within our organization. Here, you will find a wealth of resources, tools, and insights to help you achieve your sustainability goals more effectively.</p>
      </header>

      {/* Section for Categories Overview */}
      <section className="home-section">
        <h2>Categories</h2>
        <div className="categories">
          {/* Knowledge Portal */}
          <div className="category-card knowledge-portal" onClick={redirectToDashboard}>
            <h3>Knowledge Portal</h3>
            <p>Access a variety of resources to expand your knowledge on sustainability topics.</p>
          </div>
          {/* Paid Tools */}
          <div className="category-card paid-tools" onClick={redirectToDashboard}>
            <h3>Paid Tools</h3>
            <p>Utilize premium tools for detailed sustainability management.</p>
          </div>
          {/* Reports */}
          <div className="category-card reports" onClick={redirectToDashboard}>
            <h3>Reports</h3>
            <p>Generate and publish performance reports based on GRI standards.</p>
          </div>
          {/* Marketplace */}
          <div className="category-card marketplace" onClick={redirectToDashboard}>
            <h3>Marketplace</h3>
            <p>Find sustainable products and services to support your efforts.</p>
          </div>
        </div>
      </section>

      <div className="registerform">
        <h2>ISN Membership Registration Form</h2>
        <form className="membership-form" onSubmit={handleSubmit}>
          <label>Name of Your Property:</label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            placeholder="Enter property name"
            required
          />

          <label>Property Type:</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select property type</option>
            <option>Wildlife Lodge</option>
            <option>Boutique Resort</option>
            <option>Home Stay</option>
            <option>Experiential Travel</option>
          </select>

          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />

          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website URL"
          />

          <label>Number of Keys:</label>
          <input
            type="number"
            name="numberOfKeys"
            value={formData.numberOfKeys}
            onChange={handleChange}
            placeholder="Enter number of keys"
            required
          />

          <label>Contact Person:</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter contact person's name"
            required
          />

          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter mobile number"
            required
          />

          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />

          <label>Any Current Sustainability Programs:</label>
          <textarea
            name="sustainabilityPrograms"
            value={formData.sustainabilityPrograms}
            onChange={handleChange}
            placeholder="Describe your sustainability programs"
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Call to Action */}
      <section className="home-cta">
        <h2>Get Started with Your Sustainability Journey!</h2>
        <button className="cta-button" onClick={redirectToDashboard}>Explore the Dashboard</button>
      </section>
      <ToastContainer 
       position="top-center" // Center the toast notifications at the top
       autoClose={1000} 
       hideProgressBar 
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="colored"
       toastClassName="custom-toast" // Apply custom CSS class
      />

    </div>
  );
};
