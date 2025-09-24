import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingAddress', JSON.stringify(formData));
    console.log('Shipping Details saved:', formData);
    navigate('/payment');
  };

  return (
    <>
      <Navbar />
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-8 text-white">Shipping Information</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-900 p-8 rounded-lg border border-gray-800">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-300 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-300 text-sm font-bold mb-2">Address (House No., Street, Area)</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-300 text-sm font-bold mb-2">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-300 text-sm font-bold mb-2">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-gray-300 text-sm font-bold mb-2">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next (to Payment)
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
