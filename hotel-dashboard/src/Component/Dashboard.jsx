import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContex';
import '../styles/dashboard.css';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [data, setData] = useState([]); // State to hold fetched data

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('https://localitebackend.localite.services/getcmsdata');
        const result = await response.json();
        setData(result); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleToggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const subCategories = Array.from(new Set(data
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .map(item => item.subCategory)
  ));

  const filteredData = data.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedSubCategory && item.subCategory !== selectedSubCategory) return false;
    return true;
  });

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.subCategory]) {
      acc[item.subCategory] = [];
    }
    acc[item.subCategory].push(item);
    return acc;
  }, {});

  const getSubCategoryDescription = (subCategory) => {
    switch (subCategory) {
      case 'GHG Emissions':
        return 'A detailed introduction about GHG emissions and their various types.';
      case 'Water Management':
        return 'Insights on effective water management and conservation techniques.';
      case 'Waste Management':
        return 'Best practices for managing waste sustainably, including reduction, recycling, and reuse.';
      case 'Biodiversity':
        return 'Strategies and case studies to support and enhance biodiversity.';
      case 'Carbon Credit Programs':
        return 'Overview and tools for participating in carbon credit programs.';
      case 'Emissions Measurement':
        return 'Tools and techniques for measuring Scope 1, 2, and 3 emissions.';
      case 'Sustainable Sourcing':
        return 'Guidelines for sourcing sustainable products and services.';
      default:
        return 'Explore various tools and resources related to sustainability.';
    }
  };

  return (
    <>
    
      <div className='category-buttons' id='categorybuttons'>
        <button className={`category-button ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryChange('All')}>All Categories</button>
        <button className={`category-button ${selectedCategory === 'Knowledge Portal' ? 'active' : ''}`} onClick={() => handleCategoryChange('Knowledge Portal')}>Knowledge Portal</button>
        <button className={`category-button ${selectedCategory === 'Paid Tools' ? 'active' : ''}`} onClick={() => handleCategoryChange('Paid Tools')}>Paid Tools</button>
        <button className={`category-button ${selectedCategory === 'Reports' ? 'active' : ''}`} onClick={() => handleCategoryChange('Reports')}>Reports</button>
        <button className={`category-button ${selectedCategory === 'Marketplace' ? 'active' : ''}`} onClick={() => handleCategoryChange('Marketplace')}>Marketplace</button>
      </div>

      {selectedCategory !== 'All' && (
        <div className='subcategory-buttons' id='subcategorybuttons'>
          {subCategories.map((subCategory, index) => (
            <button key={index}
              className={`subcategory-button ${selectedSubCategory === subCategory ? 'active' : ''}`}
              onClick={() => handleSubCategoryChange(subCategory)}>
              {subCategory || 'All'}
            </button>
          ))}
        </div>
      )}

<div className='categorydiv'>

      {Object.keys(groupedData).map((subCategory, index) => (
        <div key={index} className='category-section'>
          <h2>{subCategory}</h2>
          <p className='subcategory-description'>{getSubCategoryDescription(subCategory)}</p>
          <div className='image-scroll'>
            {groupedData[subCategory].map((item, idx) => {
              const isExpanded = expandedDescriptions[idx];
              const words = item.description.split(' ');
              const shortDescription = words.slice(0, 15).join(' ');
              const fullDescription = item.description;
              const imageSrc = item.images && item.images.length > 0 ? item.images[0] : ''; // Use the first image
              
              return (
                <div className='data-item' key={idx}>
                  <h3>{item.title}</h3>
                  <Link to={`/detail/${encodeURIComponent(item.title)}`}>
                    {imageSrc && <img src={`https://localitebackend.localite.services/${imageSrc}`} alt={`${item.title} image`} className='data-image' />}
                  </Link>
                  <p>
                    {isExpanded ? fullDescription : `${shortDescription}... `}
                    {words.length > 15 && (
                      <span onClick={() => handleToggleDescription(idx)} className="more-link">
                        {isExpanded ? ' Show less' : 'More'}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </div>

      <div className='dashboard-header'>
        <button className='logout-button' onClick={logout}>Logout</button>
      </div>
    </>
  );
};
