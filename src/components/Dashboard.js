import React from "react";

const Dashboard = ({
  leads,
  role,
  userEmail,
  onDelete,
  onToggleStatus,
  onInteract,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Lead Dashboard</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
        </select>
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-600">No leads to display.</p>
      ) : (
        <ul className="space-y-4">
          {leads.map((lead, idx) => (
            <li
              key={idx}
              className="border p-4 rounded bg-gray-50 shadow-sm space-y-1"
            >
              <p>
                <strong>Name:</strong> {lead.name}
              </p>
              <p>
                <strong>Email:</strong> {lead.email}
              </p>
              <p>
                <strong>Phone:</strong> {lead.phone}
              </p>
              <p>
                <strong>Status:</strong> {lead.status}
              </p>
              <p>
                <strong>Source:</strong> {lead.source}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => onInteract(lead)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Interact
                </button>

                {(role === "admin" || (role === "agent" && lead.createdBy === userEmail)) && (
                  <>
                    <button
                      onClick={() => onToggleStatus(idx)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => onDelete(idx)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
