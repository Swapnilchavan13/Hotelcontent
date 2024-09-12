import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/allitems.css'; // Import your CSS file

export const AllItems = () => {
  const { subCategory } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localitebackend.localite.services/getcmsdata');
        const result = await response.json();
        const filteredItems = result.filter(item => item.subCategory === subCategory);
        setData(filteredItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [subCategory]);

  // Function to truncate the title to 13 words
  const truncateTitle = (title) => {
    const words = title.split(' ');
    return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : title;
  };

  if (loading) {
    return (
      <div className='loader'>
        <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />
      </div>
    ); // Display loader while fetching
  }

  return (
    <div className='all-items-container'>
      <h2>{subCategory}</h2>
      <div className='items-grid'>
        {data.length === 0 ? (
          <p>No items found in this category.</p> // Display message if no items are found
        ) : (
          data.map((item, index) => (
            <div key={index} className='item-card'>
              <h3 className='item-title'>{truncateTitle(item.title)}</h3>
              {item.images && item.images.length > 0 && (
                <img
                  src={`https://localitebackend.localite.services/${item.images[0]}`}
                  alt={`${item.title} image`}
                  className='item-image'
                />
              )}
              <p>{item.description.slice(0, 50)}...</p>
              <Link to={`/detail/${encodeURIComponent(item.title)}`} className='item-link'>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
