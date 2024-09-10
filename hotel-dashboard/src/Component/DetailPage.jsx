import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detail.css'; // Import your CSS file

export const DetailPage = () => {
  const { title } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch(`https://localitebackend.localite.services/getcmsdata?title=${encodeURIComponent(title)}`)
      .then((response) => response.json())
      .then((data) => {
        const item = data.find((item) => item.title === title);
        setSelectedItem(item);

        // Fetch related items by subCategory
        if (item) {
          const related = data.filter(
            (i) => i.subCategory === item.subCategory && i.title !== title
          );
          setRelatedItems(related);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [title]);

  if (loading) {
    return <div>
      <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="" />
      </div>;
  }

  if (!selectedItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className='detail-page'>
      {/* Main Category Details */}
      <div className='main-category'>
        <h2>{selectedItem.title}</h2>

        {/* Display multiple images */}
        {selectedItem.images && selectedItem.images.length > 0 && (
          <div className='images-container'>
            {selectedItem.images.map((image, index) => (
              <img
                key={index}
                src={`https://localitebackend.localite.services/${image}`}
                alt={`${selectedItem.title} image ${index + 1}`}
                className='detail-image'
              />
            ))}
          </div>
        )}

        <p>{selectedItem.description}</p>
        <div dangerouslySetInnerHTML={{ __html: selectedItem.detailedText }} />

        {/* Display multiple videos */}
        {selectedItem.videos && selectedItem.videos.length > 0 && (
          <div className='videos-container'>
            {selectedItem.videos.map((video, index) => (
              <div key={index} className='video-wrapper'>
                <iframe
                  width='100%'
                  height='315'
                  src={video.replace("youtu.be", "www.youtube.com/embed").replace("?si=", "?autoplay=0&")}
                  title={`Video ${index + 1}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}

        {/* Display files if present */}
        {selectedItem.files && selectedItem.files.length > 0 && (
          <div className='files-container'>
            {selectedItem.files.map((file, index) => (
              <a
                key={index}
                href={`https://localitebackend.localite.services/${file}`}
                download
                target='_blank'
                rel='noopener noreferrer'
                className='file-link'
              >
                Download File {index + 1}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Related Items */}
      <div className='related-items'>
        <h3>Related {selectedItem.subCategory} Items</h3>
        {relatedItems.map((item, index) => (
          <div key={index} className='related-item'>
            <h4>{item.title}</h4>
            <a href={`/detail/${encodeURIComponent(item.title)}`}>
              {item.images && item.images.length > 0 && (
                <img
                  src={`https://localitebackend.localite.services/${item.images[0]}`}
                  alt={`${item.title} image`}
                  className='related-image'
                />
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
