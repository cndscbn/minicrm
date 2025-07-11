// src/components/ManualLeadForm.js
import React, { useState } from 'react';

const ManualLeadForm = ({ role, userEmail, onLeadCreated }) => {
  const [lead, setLead] = useState({ name: '', email: '', phone: '', status: 'New', source: 'Manual', assignedTo: userEmail });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lead.name && lead.email) {
      onLeadCreated(lead);
      setLead({ ...lead, name: '', email: '', phone: '' });
    }
  };

  if (role !== 'admin' && role !== 'agent') {
    return <p className="text-red-500">You don't have permission to create leads.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Manual Lead Entry</h2>
      <input
        type="text"
        placeholder="Name"
        value={lead.name}
        onChange={(e) => setLead({ ...lead, name: e.target.value })}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={lead.email}
        onChange={(e) => setLead({ ...lead, email: e.target.value })}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={lead.phone}
        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
        className="block w-full mb-2 p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
};

export default ManualLeadForm;
