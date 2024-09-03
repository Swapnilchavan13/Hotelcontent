import React, { useState, useEffect } from 'react';
import '../styles/cms.css';

export const CMSDashboard = () => {
  const [categories] = useState(['Knowledge Portal', 'Paid Tools', 'Reports', 'Marketplace']);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Knowledge Portal');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [], // Updated to store multiple images as files
    videos: '', // New field to store video URLs
    subCategory: ''
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // Fetch existing data
    fetchData();
    // Set subcategories based on selected category
    setSubCategories(getSubCategories(selectedCategory));
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSubCategories = (category) => {
    const subCategoryMap = {
      'Knowledge Portal': ['GHG Emissions', 'Water Management', 'Waste Management', 'Biodiversity', 'Carbon Credit Programs'],
      'Paid Tools': ['Emissions Measurement', 'Water Management', 'Waste Management', 'Biodiversity', 'Carbon Credit Programs'],
      'Reports': [],
      'Marketplace': ['Sustainable Sourcing', 'Sustainable Services']
    };
    return subCategoryMap[category] || [];
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('');
    setFormData({ ...formData, subCategory: '' });
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setFormData({ ...formData, subCategory });
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('videos', formData.videos);
    formDataToSubmit.append('subCategory', formData.subCategory);
    formDataToSubmit.append('category', selectedCategory);

    formData.images.forEach((image, index) => {
      formDataToSubmit.append(`images[${index}]`, image);
    });

    try {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: formDataToSubmit,
      });
      setFormData({ title: '', description: '', images: [], videos: '', subCategory: '' });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({ title: item.title, description: item.description, images: [], videos: item.videos.join(', '), subCategory: item.subCategory });
    setEditing(item.id);
  };

  const handleUpdate = async () => {
    const updatedFormData = new FormData();
    updatedFormData.append('title', formData.title);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('videos', formData.videos);
    updatedFormData.append('subCategory', formData.subCategory);
    updatedFormData.append('category', selectedCategory);

    formData.images.forEach((image, index) => {
      updatedFormData.append(`images[${index}]`, image);
    });

    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${editing}`, {
        method: 'PUT',
        body: updatedFormData,
      });
      setFormData({ title: '', description: '', images: [], videos: '', subCategory: '' });
      setEditing(null);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className='cms-container'>
      <h1 className='cms-heading'>CMS Dashboard</h1>
      <div className='cms-category-selector'>
        <h2 className='cms-selector-heading'>Select Category</h2>
        <div className='cms-button-group'>
          {categories.map(category => (
            <button 
              key={category} 
              className={`cms-category-button ${selectedCategory === category ? 'cms-active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {selectedCategory && (
        <div className='cms-subcategory-selector'>
          <h2 className='cms-selector-heading'>Select Subcategory</h2>
          <div className='cms-button-group'>
            {subCategories.map(subCategory => (
              <button 
                key={subCategory} 
                className={`cms-subcategory-button ${selectedSubCategory === subCategory ? 'cms-active' : ''}`}
                onClick={() => handleSubCategoryChange(subCategory)}
              >
                {subCategory}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className='cms-form-container'>
        <h2 className='cms-form-heading'>{editing ? 'Edit Data' : 'Add Data'}</h2>
        <form onSubmit={editing ? handleUpdate : handleSubmit} className='cms-data-form'>
          <input 
            type="text" 
            name="title" 
            placeholder="Title" 
            value={formData.title} 
            onChange={handleFormChange} 
            required 
            className='cms-form-input'
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            value={formData.description} 
            onChange={handleFormChange} 
            required 
            className='cms-form-textarea'
          />
          <input 
            type="file" 
            name="images" 
            accept="image/*" 
            multiple 
            onChange={handleFormChange} 
            className='cms-form-input'
          />
          <input 
            type="text" 
            name="videos" 
            placeholder="Video URLs (comma-separated)" 
            value={formData.videos} 
            onChange={handleFormChange} 
            className='cms-form-input'
          />
          <button type="submit" className='cms-submit-button'>{editing ? 'Update' : 'Submit'}</button>
        </form>
      </div>
      <div className='cms-data-list'>
        <h2 className='cms-list-heading'>Data List</h2>
        {data.filter(item => item.category === selectedCategory && item.subCategory === selectedSubCategory).map(item => (
          <div key={item.id} className='cms-data-item'>
            {item.images && item.images.map((image, index) => (
              <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} className='cms-data-image' />
            ))}
            <h3 className='cms-data-title'>{item.title}</h3>
            <p className='cms-data-description'>{item.description}</p>
            {item.videos && item.videos.split(',').map((video, index) => (
              <div key={index}>
                <video controls>
                  <source src={video.trim()} type="video/mp4" />
                </video>
              </div>
            ))}
            <button className='cms-edit-button' onClick={() => handleEdit(item)}>Edit</button>
            <button className='cms-delete-button' onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
