// src/components/InteractModal.js
import React, { useState } from 'react';

const InteractModal = ({ leads }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [leadIndex, setLeadIndex] = useState(0);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = () => {
    const lead = leads[leadIndex];
    const query = input.toLowerCase();

    let reply = '';
    if (query.includes('follow-up')) {
      reply = `Email ${lead.name} at ${lead.email}.`;
    } else if (query.includes('details')) {
      reply = `Name: ${lead.name}, Email: ${lead.email}, Status: ${lead.status}.`;
    } else {
      reply = 'Ask about follow-up or details.';
    }

    setResponse(reply);
  };

  return (
    <>
      <div className="mt-4">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => setIsOpen(true)}
          disabled={leads.length === 0}
        >
          Interact with Lead
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-2">Lead: {leads[leadIndex].name}</h2>

            <label className="block mb-2 text-sm">
              Choose Lead:
              <select
                value={leadIndex}
                onChange={(e) => setLeadIndex(Number(e.target.value))}
                className="ml-2 border rounded px-2 py-1"
              >
                {leads.map((lead, index) => (
                  <option key={index} value={index}>
                    {lead.name}
                  </option>
                ))}
              </select>
            </label>

            <input
              type="text"
              placeholder="Ask a question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border px-2 py-1 rounded mb-2"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send
            </button>

            <div className="mt-4 text-gray-700">
              <strong>Response:</strong>
              <p>{response}</p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-red-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractModal;
