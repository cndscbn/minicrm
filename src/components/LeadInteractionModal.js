import React, { useState } from 'react';

export default function LeadInteractionModal({ lead, onClose }) {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const mockLLMResponse = (message) => {
    if (message.toLowerCase().includes('suggest')) {
      return `Email ${lead.name} at ${lead.email}.`;
    } else if (message.toLowerCase().includes('details')) {
      return `Name: ${lead.name}, Email: ${lead.email}, Status: ${lead.status}.`;
    } else {
      return 'Ask about follow-up or details.';
    }
  };

  const handleSend = () => {
    const response = mockLLMResponse(input);
    setChat([...chat, { user: input, bot: response }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Interact with Lead</h2>
        <div className="h-40 overflow-y-auto border rounded p-2 mb-4">
          {chat.map((entry, index) => (
            <div key={index} className="mb-2">
              <p><strong>You:</strong> {entry.user}</p>
              <p><strong>Bot:</strong> {entry.bot}</p>
              <hr className="my-2" />
            </div>
          ))}
        </div>
        <input
          type="text"
          className="border p-2 rounded w-full mb-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSend}>Send</button>
          <button className="text-red-500 font-semibold" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
