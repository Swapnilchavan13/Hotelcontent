import React, { useState, useEffect } from 'react';
import '../styles/cms.css';
import { LoadingPopup } from './LoadingPopup';

// Define API endpoints
const API_BASE_URL = 'https://localitebackend.localite.services';
const GET_CMS_DATA_URL = `${API_BASE_URL}/getcmsdata`;
const ADD_CMS_DATA_URL = `${API_BASE_URL}/addcmsdata`;
const DELETE_CMS_DATA_URL = `${API_BASE_URL}/cms`;
const UPDATE_CMS_DATA_URL = (id) => `${API_BASE_URL}/cms/${id}`;


export const CMSDashboard = () => {
  const [categories] = useState(['Knowledge Portal', 'Marketplace']);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Knowledge Portal');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    videos: '',
    detailedText: '',
    files: [],
    subCategory: ''
  });
  const [editing, setEditing] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  useEffect(() => {
    fetchData();
    setSubCategories(getSubCategories(selectedCategory));
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      const response = await fetch(GET_CMS_DATA_URL);
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
    if (name === 'images') {
      setFormData({ ...formData, [name]: Array.from(files) });
      setSelectedImages(Array.from(files).map(file => URL.createObjectURL(file)));
    } else if (name === 'files') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowLoadingPopup(true);
  
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
      await fetch(ADD_CMS_DATA_URL, {
        method: 'POST',
        body: formDataToSubmit,
      });
      // Reset the form fields, but keep the selected subCategory
      setFormData({
        title: '',
        description: '',
        images: [],
        videos: '',
        detailedText: '',
        files: [],
        subCategory: formData.subCategory, // Retain the selected subcategory
      });
      setSelectedImages([]);
      fetchData();
    } catch (error) {
      console.error('Error posting data:', error);
    } finally {
      setIsSubmitting(false);
      setShowLoadingPopup(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${DELETE_CMS_DATA_URL}/${id}`, {
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
      await fetch(UPDATE_CMS_DATA_URL(editing), {
        method: 'PUT',
        body: updatedFormData,
      });
      // Reset the form fields, but keep the selected subCategory
      setFormData({
        title: '',
        description: '',
        images: [],
        videos: '',
        detailedText: '',
        files: [],
        subCategory: formData.subCategory, // Retain the selected subcategory
      });
      setSelectedImages([]);
      setEditing(null);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className='cms-container'>
      {showLoadingPopup && <LoadingPopup />}
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
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleFormChange}
            required
            className='cms-form-input'
          />
          <label>Summary</label>
          <textarea
            name="description"
            placeholder="Summary"
            value={formData.description}
            onChange={handleFormChange}
            required
            className='cms-form-textarea'
          />
          <label>Detailed Text</label>
          <textarea
            name="detailedText"
            placeholder="Detailed Text"
            value={formData.detailedText}
            onChange={handleFormChange}
            className='cms-form-textarea'
          />
          <label>Featuring Image</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFormChange}
            className='cms-form-input'
          />
          {selectedImages.length > 0 && (
            <div className='cms-selected-images'>
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Selected ${index + 1}`}
                  className='cms-selected-image'
                />
              ))}
            </div>
          )}
          <label>Files</label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFormChange}
            className='cms-form-input'
          />
          <label>Videos</label>
          <input
            type="text"
            name="videos"
            placeholder="Video URLs (comma separated)"
            value={formData.videos}
            onChange={handleFormChange}
            className='cms-form-input'
          />
          <button type="submit" className='cms-submit-button' disabled={isSubmitting}>
            {editing ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
      <table className='cms-data-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            {/* <th>Detailed Text</th> */}
            <th>Images</th>
            <th>Files</th>
            <th>Videos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (item) =>
                item.category === selectedCategory &&
                item.subCategory === selectedSubCategory
            )
            .map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                {/* <td>{item.detailedText}</td> */}
                <td>
                  {item.images &&
                    item.images.map((image, index) => (
                      <a
                        key={index}
                        href={`${API_BASE_URL}/${image}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <img
                          src={`${API_BASE_URL}/${image}`}
                          alt={`Image ${index + 1}`}
                          className='cms-data-thumbnail'
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </a>
                    ))}
                </td>
                <td>
                  {item.files &&
                    item.files.map((file, index) => (
                      <a
                        key={index}
                        href={`${API_BASE_URL}/${file}`}
                        download
                        target='_blank'
                        rel='noopener noreferrer'
                        className='cms-data-file-link'
                      >
                        File {index + 1}
                      </a>
                    ))}
                </td>
                <td>
                  {item.videos &&
                    item.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='cms-data-video-link'
                      >
                        Watch Video {index + 1}
                      </a>
                    ))}
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <br />
                  <br />
                  <button className='dltbtn' onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
