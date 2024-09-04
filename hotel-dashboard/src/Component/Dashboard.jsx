import React, { useState } from 'react';
import { useAuth } from './AuthContex';
import '../styles/dashboard.css'; // Import a CSS file for styling
import { Link } from 'react-router-dom';

// Sample Data
const data = [
  { category: 'Knowledge Portal', subCategory: 'GHG Emissions', title: 'Introduction', description: 'Overview of GHG emissions and their impact', image: 'https://www.epa.gov/system/files/styles/large/private/images/2024-04/gases-by-fluorinated-2024.png?itok=8SHsTr-2' },
  { category: 'Knowledge Portal', subCategory: 'GHG Emissions', title: 'Measurement Toolkit', description: 'Videos, text manuals, and presentations on measuring Scope 1 and Scope 2 emissions', image:'https://www.measurement-toolkit.org/images/logos/main-logo.png' },
  { category: 'Knowledge Portal', subCategory: 'GHG Emissions', title: 'Mitigation Strategies', description: 'Best practices and case studies for reducing GHG emissions', image:'https://media.licdn.com/dms/image/D4D12AQF4Ddxm2FvBTg/article-cover_image-shrink_600_2000/0/1676622136261?e=2147483647&v=beta&t=a4-rINRixggoN5iEa9DuPJV1gtEOnTsE_ggZ4temkOM' },
  { category: 'Knowledge Portal', subCategory: 'GHG Emissions', title: 'Mitigation Strategies', description: 'Best practices and case studies for reducing GHG emissions', image:'https://media.licdn.com/dms/image/D4D12AQF4Ddxm2FvBTg/article-cover_image-shrink_600_2000/0/1676622136261?e=2147483647&v=beta&t=a4-rINRixggoN5iEa9DuPJV1gtEOnTsE_ggZ4temkOM' },
  { category: 'Knowledge Portal', subCategory: 'Water Management', title: 'Introduction', description: 'Overview of water management and harvesting techniques', image: 'https://www.civilengineer9.com/wp-content/uploads/2019/04/Sustainable-Water-conservation-1024x673.jpg' },
  { category: 'Knowledge Portal', subCategory: 'Water Management', title: 'Water Budgets', description: 'Guidelines and examples for creating water budgets', image:'https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-3-031-51083-0_17/MediaObjects/326208_1_En_17_Fig3_HTML.png' },
  { category: 'Knowledge Portal', subCategory: 'Water Management', title: 'Best Practices', description: 'Case studies and strategies for effective water management', image:'https://social-innovation.hitachi/-/media/Project/Hitachi/SIB/en-IN/knowledge-hub/collaborate/power-of-efficient-water-management/images/wt-img4.png' },
  { category: 'Knowledge Portal', subCategory: 'Waste Management', title: 'Introduction', description: 'Overview of waste management principles', image:'https://static.prepp.in/public/image/581a590d0aa6d6925f2351e157be0d97.png?tr=w-512,h-479,c-force' },
  { category: 'Knowledge Portal', subCategory: 'Waste Management', title: 'Reduction Techniques', description: 'Videos, text manuals, and presentations on waste reduction methods', image:'https://nursesrevisionuganda.com/wp-content/uploads/2023/07/Waste-management-hierarchy.png' },
  { category: 'Knowledge Portal', subCategory: 'Waste Management', title: 'Recycling and Reuse', description: 'Best practices for recycling and reusing waste materials', image:'https://i.pinimg.com/736x/b5/0d/a5/b50da550594c7b40f0f985e8c7138777.jpg' },
  { category: 'Knowledge Portal', subCategory: 'Biodiversity', title: 'Introduction', description: 'Importance of biodiversity and conservation methods', image:'https://rukminim2.flixcart.com/image/850/1000/book/8/4/5/biodiversity-original-imadxzh8rfagqeda.jpeg?q=90&crop=false' },
  { category: 'Knowledge Portal', subCategory: 'Biodiversity', title: 'Enhancement Strategies', description: 'Strategies and case studies for enhancing biodiversity', image:'https://www.euroschoolindia.com/wp-content/uploads/2023/09/benefits-of-biodiversity.jpg' },
  { category: 'Knowledge Portal', subCategory: 'Carbon Credit Programs', title: 'Introduction', description: 'Overview of carbon credit development programs', image:'https://thumbs.dreamstime.com/b/carbon-credit-practice-cycle-greenhouse-gas-control-outline-diagram-carbon-credit-practice-cycle-greenhouse-gas-control-262837259.jpg' },
  { category: 'Paid Tools', subCategory: 'Emissions Measurement', title: 'Dashboard', description: 'Tool for inputting and tracking Scope 1, 2, and 3 emissions data', image:'https://www.salesforce.com/content/dam/web/en_us/www/images/industries/sustainability-cloud/sustainability-01-reduce%20emissions_LG.png' },
  { category: 'Paid Tools', subCategory: 'Water Management', title: 'Dashboard', description: 'Tool for inputting and tracking water usage and management data' , image:'https://www.slideteam.net/media/catalog/product/cache/1280x720/w/a/water_management_kpi_dashboard_showing_water_quality_test_results_m879_ppt_powerpoint_presentation_ideas_slide01.jpg' },
  { category: 'Paid Tools', subCategory: 'Waste Management', title: 'Dashboard', description: 'Tool for inputting and tracking waste management data', image:'https://www.shutterstock.com/shutterstock/videos/1103934459/thumb/1.jpg?ip=x480' },
  { category: 'Paid Tools', subCategory: 'Biodiversity', title: 'Dashboard', description: 'Tool for inputting and tracking biodiversity enhancement efforts',image:'https://media.licdn.com/dms/image/sync/C5627AQH7dt4iYCMlRQ/articleshare-shrink_800/0/1712214624692?e=2147483647&v=beta&t=FyvKJWb6wAtD4bC9YiWoO9lA_XKPRS6ut8ym9aKJ4eI' },
  { category: 'Paid Tools', subCategory: 'Carbon Credit Programs', title: 'Dashboard', description: 'Tool for tracking participation and progress in carbon credit programs', image:'https://repository-images.githubusercontent.com/507142361/4ef9a7d9-7c79-4dbf-98c4-0f80e0889751' },
  { category: 'Reports', subCategory: '', title: '', description: 'Generation and publication of performance reports as per GRI standards' },
  { category: 'Marketplace', subCategory: 'Sustainable Sourcing', title: 'Products', description: 'Listings of sustainable products available for purchase', image:'https://tracextech.com/wp-content/uploads/2023/05/sustainable-sourcing.jpeg'},
  { category: 'Marketplace', subCategory: 'Sustainable Services', title: 'Services', description: 'Listings of services that help WLs become more sustainable', image:'https://cdnmedia.eurofins.com/corporate-eurofins/media/12159262/sustainability_services_seal.png?width=319&height=319' },
];

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
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

  return (
    <>
      <div className='dashboardmain'>
        <h1>Welcome to Sustainability Management Dashboard</h1>
        <h3>We are excited to introduce you to our new platform, designed to be your central hub for managing and tracking all aspects of sustainability within our organization. Here, you will find a wealth of resources, tools, and insights to help you achieve your sustainability goals more effectively.</h3>
      </div>

      <div className='category-buttons' id='categorybuttons'>
        {/* Category Selection Buttons */}
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

      {Object.keys(groupedData).map((subCategory, index) => (
        <div key={index} className='category-section'>
          <h2>{subCategory}</h2>
          <div className='image-scroll'>
            {groupedData[subCategory].map((item, idx) => (
              <Link to={`/detail/${encodeURIComponent(item.title)}`} key={idx} className='data-item'>
                {/* Wrap the item with Link to redirect to DetailPage */}
                <h3>{item.title}</h3>
                {item.image && <img src={item.image} alt={`${item.title} image`} className='data-image' />}
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className='dashboard-header'>
        <button className='logout-button' onClick={logout}>Logout</button>
      </div>
    </>
  );
};