import React, { useState, useEffect } from 'react';
import '../styles/cms.css';

export const CMSDashboard = () => {
  const [categories] = useState(['Knowledge Portal', 'Marketplace']);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Knowledge Portal');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [], // To store multiple images as files
    videos: '', // Field to store video URLs
    detailedText: '', // New field for detailed text
    files: [], // New field to store multiple files like PDFs, PPTs, Excel files
    subCategory: ''
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchData();
    setSubCategories(getSubCategories(selectedCategory));
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3005/getcmsdata'); // Fetch from the Express API
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSubCategories = (category) => {
    const subCategoryMap = {
      'Knowledge Portal': ['GHG Emissions', 'Water Management', 'Waste Management', 'Biodiversity', 'Carbon Credit Programs'],
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
    if (name === 'images' || name === 'files') {
      setFormData({ ...formData, [name]: Array.from(files) });
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
    formDataToSubmit.append('detailedText', formData.detailedText);
    formDataToSubmit.append('subCategory', formData.subCategory);
    formDataToSubmit.append('category', selectedCategory);

    formData.images.forEach((image) => {
      formDataToSubmit.append('images', image);
    });
    formData.files.forEach((file) => {
      formDataToSubmit.append('files', file);
    });

    try {
      await fetch('http://localhost:3005/addcmsdata', {
        method: 'POST',
        body: formDataToSubmit,
      });
      setFormData({
        title: '',
        description: '',
        images: [],
        videos: '',
        detailedText: '',
        files: [],
        subCategory: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3005/cms/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      images: [], // To be updated with new images if needed
      videos: item.videos.join(', '),
      detailedText: item.detailedText,
      files: [], // To be updated with new files if needed
      subCategory: item.subCategory,
    });
    setEditing(item._id);
  };

  const handleUpdate = async () => {
    const updatedFormData = new FormData();
    updatedFormData.append('title', formData.title);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('videos', formData.videos);
    updatedFormData.append('detailedText', formData.detailedText);
    updatedFormData.append('subCategory', formData.subCategory);
    updatedFormData.append('category', selectedCategory);

    formData.images.forEach((image) => {
      updatedFormData.append('images', image);
    });
    formData.files.forEach((file) => {
      updatedFormData.append('files', file);
    });

    try {
      await fetch(`http://localhost:3005/cms/${editing}`, {
        method: 'PUT',
        body: updatedFormData,
      });
      setFormData({
        title: '',
        description: '',
        images: [],
        videos: '',
        detailedText: '',
        files: [],
        subCategory: ''
      });
      setEditing(null);
      fetchData();
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
          <lable>Title</lable>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleFormChange}
            required
            className='cms-form-input'
          />
          <lable>Summary</lable>
          <textarea
            name="description"
            placeholder="Summary"
            value={formData.description}
            onChange={handleFormChange}
            required
            className='cms-form-textarea'
          />
          <lable>Detailed Text</lable>
          <textarea
            name="detailedText"
            placeholder="Detailed Text"
            value={formData.detailedText}
            onChange={handleFormChange}
            className='cms-form-textarea'
          />
          <lable>Featuring Image</lable>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFormChange}
            className='cms-form-input'
          />
          <lable>Upload Files</lable>
          <input
            type="file"
            name="files"
            accept=".pdf, .ppt, .xls, .xlsx"
            multiple
            onChange={handleFormChange}
            className='cms-form-input'
          />
          <lable>Add Video Links</lable>

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
      <h2 className='cms-list-heading'>Data List</h2>
      <div className='cms-data-list'>
        {data.filter(item => item.category === selectedCategory && item.subCategory === selectedSubCategory).map(item => (
          <div key={item._id} className='cms-data-item'>
            {item.images && item.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:3005/${image}`}
                alt={`Image ${index + 1}`}
                className='cms-data-image'
              />
            ))}
            {item.files && item.files.map((file, index) => (
              <a
                key={index}
                href={`http://localhost:3005/${file}`}
                download
                className='cms-data-file'
              >
                File {index + 1}
              </a>
            ))}
            <h3 className='cms-data-title'>{item.title}</h3>
            <p className='cms-data-description'>{item.description}</p>
            <p className='cms-data-detailed-text'>{item.detailedText}</p>
            {item.videos && item.videos.map((video, index) => (
              <div key={index}>
                <video controls>
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            ))}
            <button className='cms-edit-button' onClick={() => handleEdit(item)}>Edit</button>
            <button className='cms-delete-button' onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
