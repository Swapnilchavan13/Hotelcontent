import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import '../styles/home.css'; // Import CSS for styling

export const Home = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle navigation
  const redirectToDashboard = () => {
    navigate('/dashboard'); // Redirect to /dashboard route
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

      {/* Featured Tools Section */}
      <section className="home-section">
        <h2>Featured Tools</h2>
        <div className="featured-tools">
          {/* Emissions Measurement Dashboard */}
          <div className="tool-card" onClick={redirectToDashboard}>
            <img src="https://www.salesforce.com/content/dam/web/en_us/www/images/industries/sustainability-cloud/sustainability-01-reduce%20emissions_LG.png" alt="Emissions Measurement" />
            <h3>Emissions Measurement Dashboard</h3>
            <p>Tool for inputting and tracking Scope 1, 2, and 3 emissions data.</p>
          </div>
          {/* Water Management Dashboard */}
          <div className="tool-card" onClick={redirectToDashboard}>
            <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/9dbc56c5-14f7-45a6-8f34-a26e780f1af1/2716687f-6e73-4477-8a43-44eaf17a81fd.png" alt="Water Management Dashboard" />
            <h3>Water Management Dashboard</h3>
            <p>Tool for inputting and tracking water usage and management data.</p>
          </div>
          {/* Waste Management Dashboard */}
          <div className="tool-card" onClick={redirectToDashboard}>
            <img src="https://i.pinimg.com/originals/af/b7/71/afb771769511edcd7d1cc881f81d114e.png" alt="Waste Management Dashboard" />
            <h3>Waste Management Dashboard</h3>
            <p>Tool for inputting and tracking waste management data.</p>
          </div>
          {/* Biodiversity Dashboard */}
          <div className="tool-card" onClick={redirectToDashboard}>
            <img src="https://www.michaelrobertdavis.com/images/bellybutton/MRD_Dashboard.png" alt="Biodiversity Dashboard" />
            <h3>Biodiversity Dashboard</h3>
            <p>Tool for inputting and tracking biodiversity enhancement efforts.</p>
          </div>
          {/* Carbon Credit Programs Dashboard */}
          <div className="tool-card" onClick={redirectToDashboard}>
            <img src="https://costmos.in/wp-content/uploads/2024/05/Carbon-Credit-Consulting.png" alt="Carbon Credit Programs Dashboard" />
            <h3>Carbon Credit Programs Dashboard</h3>
            <p>Tool for tracking participation and progress in carbon credit programs.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta">
        <h2>Get Started with Your Sustainability Journey!</h2>
        <button className="cta-button" onClick={redirectToDashboard}>Explore the Dashboard</button>
      </section>
    </div>
  );
};
