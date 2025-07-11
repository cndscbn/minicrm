import React, { useState } from "react";

function LeadInteractionModal({ lead, onClose }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = () => {
    const q = input.toLowerCase();
    setResponse(q.includes("follow-up")
      ? `Email ${lead.name} at ${lead.email}.`
      : q.includes("details")
      ? `Name: ${lead.name}, Email: ${lead.email}, Status: ${lead.status}.`
      : "Ask about follow-up or details."
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="font-bold mb-2">Interact with {lead.name}</h2>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask..." className="border w-full p-2 mb-2 rounded" />
        <button onClick={handleSend} className="bg-blue-600 text-white py-1 rounded">Send</button>
        <p className="mt-4"><strong>Response:</strong><br />{response}</p>
        <button onClick={onClose} className="mt-4 text-red-500">Close</button>
      </div>
    </div>
  );
}

export default LeadInteractionModal;
