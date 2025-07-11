import React, { useState } from "react";

const LeadTable = ({ leads, onDelete, onUpdateStatus }) => {
  const [filter, setFilter] = useState("All");

  const filteredLeads = leads.filter((lead) => {
    if (filter === "All") return true;
    return lead.status === filter;
  });

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Leads Dashboard</h2>

      <div className="mb-2">
        <button
          className={`px-3 py-1 mr-2 border rounded ${filter === "All" ? "bg-gray-200" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`px-3 py-1 mr-2 border rounded ${filter === "New" ? "bg-gray-200" : ""}`}
          onClick={() => setFilter("New")}
        >
          New
        </button>
        <button
          className={`px-3 py-1 border rounded ${filter === "Contacted" ? "bg-gray-200" : ""}`}
          onClick={() => setFilter("Contacted")}
        >
          Contacted
        </button>
      </div>

      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Source</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.email}</td>
              <td className="border px-4 py-2">{lead.phone}</td>
              <td className="border px-4 py-2">{lead.status}</td>
              <td className="border px-4 py-2">{lead.source}</td>
              <td className="border px-4 py-2">
                {lead.status === "New" && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => onUpdateStatus(index)}
                  >
                    Mark Contacted
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
