// src/components/ManualLeadForm.js
import React, { useState } from 'react';

const ManualLeadForm = ({ onLeadCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lead = {
      ...formData,
      status: 'New',
      source: 'Manual'
    };
    onLeadCreated(lead);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Manual Lead Form</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 mb-2 w-full" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 mb-2 w-full" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Lead</button>
    </form>
  );
};

export default ManualLeadForm;
