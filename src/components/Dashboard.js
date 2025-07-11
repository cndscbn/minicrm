import React from 'react';

const Dashboard = ({ leads, onUpdateStatus, onDelete, onInteract }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lead Dashboard</h2>
      <table className="min-w-full table-auto border">
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
          {leads.map((lead, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.email}</td>
              <td className="border px-4 py-2">{lead.phone}</td>
              <td className="border px-4 py-2">{lead.status}</td>
              <td className="border px-4 py-2">{lead.source}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => onUpdateStatus(index)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Update Status
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => onInteract(lead)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Interact
                </button>
              </td>
            </tr>
          ))}
          {leads.length === 0 && (
            <tr>
              <td colSpan="6" className="border px-4 py-4 text-gray-500">
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
