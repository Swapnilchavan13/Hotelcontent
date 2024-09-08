import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detail.css'; // Import your CSS file

export const DetailPage = () => {
  const { title } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch(`https://localitebackend.localite.services/getcmsdata?title=${encodeURIComponent(title)}`)
      .then(response => response.json())
      .then(data => {
        const item = data.find((item) => item.title === title);
        setSelectedItem(item);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className='detail-page'>
      <h2>{selectedItem.title}</h2>
      {selectedItem.images && selectedItem.images.length > 0 && (
        <img
          src={`https://localitebackend.localite.services/${selectedItem.images[0]}`}
          alt={`${selectedItem.title} image`}
          className='detail-image'
        />
      )}
         <p>{selectedItem.description}</p>
         <p>{selectedItem.detailedText}</p>
      {selectedItem.videos && selectedItem.videos.length > 0 && (
        <div className='video-container'>
          <iframe
            width="560"
            height="315"
            src={selectedItem.videos[0]}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
