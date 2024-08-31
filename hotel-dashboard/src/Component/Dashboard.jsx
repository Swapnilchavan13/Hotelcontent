import React, { useState } from 'react';
import { useAuth } from './AuthContex';
import '../styles/dashboard.css'; // Import a CSS file for styling

// Sample Data
const data = [
  { category: 'Knowledge Portal', subCategory: 'GHG Emissions', title: 'Introduction', description: 'Overview of GHG emissions and their impact' },
  { category: 'Knowledge Portal', subCategory: 'GHG Emissions', title: 'Measurement Toolkit', description: 'Videos, text manuals, and presentations on measuring Scope 1 and Scope 2 emissions' },
  { category: 'Knowledge Portal', subCategory: 'GHG Emissions', title: 'Mitigation Strategies', description: 'Best practices and case studies for reducing GHG emissions' },
  { category: 'Knowledge Portal', subCategory: 'Water Management', title: 'Introduction', description: 'Overview of water management and harvesting techniques' },
  { category: 'Knowledge Portal', subCategory: 'Water Management', title: 'Water Budgets', description: 'Guidelines and examples for creating water budgets' },
  { category: 'Knowledge Portal', subCategory: 'Water Management', title: 'Best Practices', description: 'Case studies and strategies for effective water management' },
  { category: 'Knowledge Portal', subCategory: 'Waste Management', title: 'Introduction', description: 'Overview of waste management principles' },
  { category: 'Knowledge Portal', subCategory: 'Waste Management', title: 'Reduction Techniques', description: 'Videos, text manuals, and presentations on waste reduction methods' },
  { category: 'Knowledge Portal', subCategory: 'Waste Management', title: 'Recycling and Reuse', description: 'Best practices for recycling and reusing waste materials' },
  { category: 'Knowledge Portal', subCategory: 'Biodiversity', title: 'Introduction', description: 'Importance of biodiversity and conservation methods' },
  { category: 'Knowledge Portal', subCategory: 'Biodiversity', title: 'Enhancement Strategies', description: 'Strategies and case studies for enhancing biodiversity' },
  { category: 'Knowledge Portal', subCategory: 'Carbon Credit Programs', title: 'Introduction', description: 'Overview of carbon credit development programs' },
  { category: 'Paid Tools', subCategory: 'Emissions Measurement', title: 'Dashboard', description: 'Tool for inputting and tracking Scope 1, 2, and 3 emissions data' },
  { category: 'Paid Tools', subCategory: 'Water Management', title: 'Dashboard', description: 'Tool for inputting and tracking water usage and management data' },
  { category: 'Paid Tools', subCategory: 'Waste Management', title: 'Dashboard', description: 'Tool for inputting and tracking waste management data' },
  { category: 'Paid Tools', subCategory: 'Biodiversity', title: 'Dashboard', description: 'Tool for inputting and tracking biodiversity enhancement efforts' },
  { category: 'Paid Tools', subCategory: 'Carbon Credit Programs', title: 'Dashboard', description: 'Tool for tracking participation and progress in carbon credit programs' },
  { category: 'Reports', subCategory: '', title: '', description: 'Generation and publication of performance reports as per GRI standards' },
  { category: 'Marketplace', subCategory: 'Sustainable Sourcing', title: 'Products', description: 'Listings of sustainable products available for purchase' },
  { category: 'Marketplace', subCategory: 'Sustainable Services', title: 'Services', description: 'Listings of services that help WLs become more sustainable' },
];

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(''); // Reset subcategory on category change
  };

  // Function to handle subcategory selection
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  // Get unique subcategories based on selected category
  const subCategories = Array.from(new Set(data
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .map(item => item.subCategory)
  ));

  // Filter data based on the selected category and subcategory
  const filteredData = data.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedSubCategory && item.subCategory !== selectedSubCategory) return false;
    return true;
  });

  return (
    <>
      <h1>Welcome to Dashboard, {user ? user.name : 'Guest'}</h1>

      {/* Category Selection Buttons */}
      <div className='category-buttons'>
        <button className={`category-button ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryChange('All')}>All Categories</button>
        <button className={`category-button ${selectedCategory === 'Knowledge Portal' ? 'active' : ''}`} onClick={() => handleCategoryChange('Knowledge Portal')}>Knowledge Portal</button>
        <button className={`category-button ${selectedCategory === 'Paid Tools' ? 'active' : ''}`} onClick={() => handleCategoryChange('Paid Tools')}>Paid Tools</button>
        <button className={`category-button ${selectedCategory === 'Reports' ? 'active' : ''}`} onClick={() => handleCategoryChange('Reports')}>Reports</button>
        <button className={`category-button ${selectedCategory === 'Marketplace' ? 'active' : ''}`} onClick={() => handleCategoryChange('Marketplace')}>Marketplace</button>
      </div>

      {/* Subcategory Selection Buttons */}
      {selectedCategory !== 'All' && (
        <div className='subcategory-buttons'>
          {subCategories.map((subCategory, index) => (
            <button key={index}
                    className={`subcategory-button ${selectedSubCategory === subCategory ? 'active' : ''}`}
                    onClick={() => handleSubCategoryChange(subCategory)}>
              {subCategory || 'All'}
            </button>
          ))}
        </div>
      )}

      {/* Display Filtered Data */}
      <div className='data-list'>
        {filteredData.map((item, index) => (
          <div key={index} className='data-item'>
            <h3>{item.subCategory} - {item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div className='dashboard-header'>
        <button className='logout-button' onClick={logout}>Logout</button>
      </div>
    </>
  );
};
