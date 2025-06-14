import React, { useState, useEffect } from 'react'; 
import { useAuth } from './AuthContex';
import '../styles/dashboard.css';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [data, setData] = useState([]); // State to hold fetched data
  const [showPaidToolsContent, setShowPaidToolsContent] = useState(false); // State to show paid tools content

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
    // setShowPaidToolsContent(category === 'Paid Tools'); // Show paid tools content when "Paid Tools" is selected


       // Redirect to the specified URL if the category is "Paid Tools"
       if (category === 'Paid Tools') {
        window.open('https://climescore.com/user/login', '_blank');
    }
    
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

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const subCategoryOrder = [
    'GHG Emissions',
    'Water Management',
    'Waste Management',
    'Biodiversity',
    'Carbon Credit Programs',
    'Emissions Measurement',
    'Glossary',  // Added "Glossary" here
    'Sustainable Sourcing',
    'Sustainable Services'
  ];

  const handleButtonClick = (subCategory) => {
    const baseTemplateURL = subCategory === 'GHG Emissions'
      ? 'https://docs.google.com/spreadsheets/d/1K05W_UAgZG04fLeoZ4p7H_bP5dJa-y1FT6Ai0D381F4/copy'
      : 'https://docs.google.com/spreadsheets/d/1pQ8FCO9J9gnuj8Max8eSAl3I618ytI0oIQArnKFBJ8k/copy';
    
    // Open the "Make a copy" link in a new tab
    window.open(baseTemplateURL, '_blank');
  };

  // Filter and sort subCategories based on the selected category and desired order
  const subCategories = Array.from(new Set(data
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .map(item => item.subCategory)
  )).sort((a, b) => {
    const indexA = subCategoryOrder.indexOf(a);
    const indexB = subCategoryOrder.indexOf(b);
    return indexA - indexB;
  });

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

  // Sort the groupedData keys according to the desired order
  const sortedGroupedDataKeys = Object.keys(groupedData).sort((a, b) => {
    const indexA = subCategoryOrder.indexOf(a);
    const indexB = subCategoryOrder.indexOf(b);
    return indexA - indexB;
  });

  const getSubCategoryDescription = (subCategory) => {
    switch (subCategory) {
      case 'GHG Emissions':
        return ['A detailed introduction about GHG emissions', 'and their various types.'];
      case 'Glossary':  // Description for "Glossary"
        return ['Explore various tools and resources.'];
      case 'Water Management':
        return ['Insights on effective water management and', 'conservation techniques.'];
      case 'Waste Management':
        return ['Best practices for managing waste including,', 'reduction, recycling, and reuse.'];
      case 'Biodiversity':
        return ['Strategies and case studies to support and', 'enhance biodiversity.'];
      case 'Carbon Credit Programs':
        return ['Overview and tools for participating in carbon', 'credit programs.'];
      case 'Emissions Measurement':
        return ['Tools and techniques for measuring', 'Scope 1, 2, and 3 emissions.'];
      case 'Sustainable Sourcing':
        return ['Guidelines for sourcing sustainable products', 'and services.'];
      default:
        return ['Explore various tools and resources related to', 'sustainability.'];
    }
  };

  return (
    <>
      <div className='seperatecategorydiv'>
        <div className='category-buttons' id='categorybuttons'>
          {/* <button className={`category-button ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryChange('All')}>All Categories</button> */}
          <button className={`category-button ${selectedCategory === 'Knowledge Portal' ? 'active' : ''}`} onClick={() => handleCategoryChange('Knowledge Portal')}>Knowledge Portal</button>
          <button className={`category-button ${selectedCategory === 'Paid Tools' ? 'active' : ''}`} onClick={() => handleCategoryChange('Paid Tools')}>Paid Tools</button>
          <button className={`category-button ${selectedCategory === 'Reports' ? 'active' : ''}`} onClick={() => handleCategoryChange('Reports')}>Reports</button>
          <button className={`category-button ${selectedCategory === 'Marketplace' ? 'active' : ''}`} onClick={() => handleCategoryChange('Marketplace')}>Marketplace</button>
          <button 
  className={`category-button community-button ${selectedCategory === 'Community' ? 'active' : ''}`} 
  onClick={() => handleCategoryChange('Community')}
>
  Community
</button>
        </div>
      </div>


      {/* Show hardcoded content for Paid Tools */}
      
      {showPaidToolsContent && (
        <> 
         <div className='horiimage'>
            <img src="Pathways_Image.png" alt="" />
          </div>
        {/* <div className="paid-tools-content">
         
          <div className="paid-tools-section">
            <h2>Measure, audit and verify your sustainability practices</h2>
            <a href="https://climescore.com/client/login" target="_blank" rel="noopener noreferrer">
              <img src="https://nettzero.world/wp-content/uploads/2024/02/cropped-ce2055_a34cf15bcb3c4c4b9851a279e2de0f4cmv2.webp" alt="Measure Sustainability" />
            </a>
          </div>
          <div className="paid-tools-section">
            <h2>Report your sustainability practices as per GRI standards</h2>
            <a href="https://www.impartcollective.com/" target="_blank" rel="noopener noreferrer">
              <img src="https://www.impartcollective.com/assets/images/website-logo-1-384x132.png" alt="Report Sustainability" />
            </a>
          </div>
        </div> */}
        </>
      )}

         {/* Only show "Coming Soon" for Marketplace */}
    {selectedCategory === 'Marketplace' && (
      <div className='coming-soon'>
        <h2>Marketplace</h2>
        <p>Coming Soon</p>
      </div>
    )}


{selectedCategory !== 'Marketplace' && !showPaidToolsContent && (
        <>
          {selectedCategory !== 'All' && (
          <div className='subcategory-buttons' id='subcategorybuttons'>
          {subCategories.map((subCategory, index) => (
            <button 
              key={index}
              className={`subcategory-button ${selectedSubCategory === subCategory ? 'active' : ''}`}
              onClick={() => {
                handleSubCategoryChange(subCategory);
                if (subCategory === 'Glossary') {
                  // Open the PDF in a new tab
                  window.open('/Glossary.pdf', '_blank');
                }
              }}
            >
              {subCategory || 'All'}
            </button>
          ))}
        </div>
        
          )}

          <div className='horiimage'>
            <img data-aos="zoom-out" src="Pathways_Image.png" alt="" />
          </div>

          {selectedCategory === 'Reports' && (
  <div className="reports-section">
    <h1>Download Reports</h1>
    <div className="report-links">
      <a href="/Impact Report - Chambal Safari Lodge.pdf" download className="report-link" target="_blank" rel="noopener noreferrer">
        <button className="download-button">Impact Report - Chambal Safari Lodge</button>
      </a>
      <a href="/NZ_RARE_Executive Summary 2024..pdf" download className="report-link" target="_blank" rel="noopener noreferrer">
        <button className="download-button">NZ RARE Executive Summary 2024</button>
      </a>
    </div>
  </div>
)}

{selectedCategory === 'Community' && (
  <div className='Community'>
    <p>Welcome to the community of ISN members. Please see our growing list of partners here:</p>
    <a href="https://www.chambalsafari.com/" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://www.chambalsafari.com/images/logo.png" 
        alt="ISN Partners Logo" 
      />
    </a>
  </div>
)}





<div className='categorydiv'>
  {sortedGroupedDataKeys.map((subCategory, index) => (
    <div key={index} className='category-section'>
      <div className='category-header'>
        <h2 className='subclass'>
          {subCategory}
          {(subCategory === 'GHG Emissions' || subCategory === 'Water Management') && (
            <div className='buttonsdiv'>
              <button 
                className="calculate-button" 
                onClick={() => handleButtonClick(subCategory)}
              >
                {subCategory === 'GHG Emissions' ? 'Build Your Carbon Balance Sheet' : 'Build Your Water Balance Sheet'}
              </button>
              <button 
                className="calculate-button" 
                onClick={() => window.open('/Carbon emissions cal.pdf', '_blank')}
              >
                How to Build Your Balance Sheet
              </button>
              <button 
                className="calculate-button"
                onClick={() => window.open('/illustrative.pdf', '_blank')}
              >
                An Illustrative Example
              </button>
            </div>
          )}
           {subCategory === 'Waste Management' && (
            <div className='buttonsdiv'>
              <button 
                className="calculate-button" 
               onClick={() => window.open('/Waste_management.pdf', '_blank')}
              >
                How to Manage Your Waste
              </button>
            </div>
          )}
        </h2>
                  <p className='subcategory-description'>
                    {getSubCategoryDescription(subCategory).map((line, idx) => (
                      <span key={idx} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </p>
                  <span>
                    <Link to={`/allitems/${encodeURIComponent(subCategory)}`} className="see-all-button">
                      See All
                    </Link>
                  </span>     
                </div>
                
                <div className='image-scroll'>
                  {groupedData[subCategory].map((item, idx) => {
                    const isExpanded = expandedDescriptions[idx];
                    const words = item.description.split(' ');
                    const shortDescription = words.slice(0, 14).join(' ');
                    const fullDescription = item.description;
                    const imageSrc = item.images && item.images.length > 0 ? item.images[0] : ''; // Use the first image

                    // Limit the title to one line with a maximum of 12 words
                    const titleWords = item.title.split('');
                    const truncatedTitle = titleWords.length > 22 ? titleWords.slice(0, 22).join('') + '...' : item.title;

                    return (
                      <div className='data-item' key={idx} data-aos="flip-right">
                        <h3 title={item.title}>{truncatedTitle}</h3>
                        <Link to={`/detail/${encodeURIComponent(item.title)}`}>
                          {imageSrc && <img src={`https://localitebackend.localite.services/${imageSrc}`} alt={`${item.title} image`} className='data-image' />}
                        </Link>
                        <p>
                          {isExpanded ? fullDescription : `${shortDescription}... `}
                          {words.length > 14 && (
                            <span onClick={() => handleToggleDescription(idx)} className="more-link">
                              {isExpanded ? 'Read less' : 'Read more'}
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
      )}
    </>
  );
};
