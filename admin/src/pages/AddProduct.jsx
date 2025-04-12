import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';

const AddProduct = () => {
  const { backendurl, token } = useContext(AdminContext);
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      const { data } = await axios.post(`${backendurl}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setName('');
        setDescription('');
        setPrice('');
        setImages([]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to add product');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="my-3 text-lg font-medium">Add Product</p>
      <div className="px-8 py-8 bg-white border rounded w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <label htmlFor={`image${i}`} className="block mb-2 cursor-pointer">
                <img
                  src={images[i] ? URL.createObjectURL(images[i]) : assets.upload_area}
                  alt={`Upload ${i + 1}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              </label>
              <input
                type="file"
                id={`image${i}`}
                accept="image/*"
                onChange={(e) => handleImageChange(i, e.target.files[0])}
                hidden
              />
              <p className="text-sm mt-1">Image {i + 1}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-gray-800">
          <div>
            <p>Product Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <p>Price</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <p>Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 mt-6 rounded hover:bg-blue-700 transition">
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
