// src/components/DocumentUpload.js
import React from 'react';

const DocumentUpload = ({ onLeadCreated }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.includes('pdf') || file.type.includes('image'))) {
      // Simulate AI parsing
      const lead = {
        name: 'Extracted Name',
        email: 'extracted@example.com',
        phone: 'N/A',
        status: 'New',
        source: 'Document'
      };
      onLeadCreated(lead);
    } else {
      alert('Please upload a PDF or image file.');
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Upload Document</h2>
      <input type="file" accept=".pdf,.png,.jpg" onChange={handleFileUpload} className="mb-2" />
    </div>
  );
};

export default DocumentUpload;
