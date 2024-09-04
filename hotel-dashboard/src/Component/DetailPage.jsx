import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detail.css'; // Create a CSS file for styling this component

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

export const DetailPage = () => {
  const { title } = useParams();
  const selectedItem = data.find(item => item.title === decodeURIComponent(title));

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className='detail-page'>
      <h2>{selectedItem.title}</h2>
      {selectedItem.image && <img src={selectedItem.image} alt={`${selectedItem.title} image`} className='detail-image' />}
      <p>{selectedItem.description}</p>
    </div>
  );
};
