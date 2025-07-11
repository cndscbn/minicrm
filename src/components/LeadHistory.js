import React from "react";

const LeadHistory = ({ history }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Lead History</h2>
      {history.length === 0 ? (
        <p>No interactions yet.</p>
      ) : (
        <ul className="border p-4 rounded bg-gray-50 max-h-72 overflow-y-scroll">
          {history.map((entry, idx) => (
            <li key={idx} className="mb-2">
              <div className="text-sm text-gray-600">{entry.time}</div>
              <div className="text-md">{entry.action} - {entry.lead.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeadHistory;
