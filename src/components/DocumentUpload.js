import React from "react";

function DocumentUpload({ onLeadCreated }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.includes("pdf") || file.type.includes("image"))) {
      onLeadCreated({ name: "Extracted Name", email: "extracted@example.com", phone: "N/A", status: "New", source: "Document" });
    } else {
      alert("Please upload PDF or image.");
    }
  };

  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="font-semibold mb-2">Upload Document</h3>
      <input type="file" accept=".pdf,.png,.jpg" onChange={handleFileUpload} className="border p-2 rounded" />
    </div>
  );
}

export default DocumentUpload;
