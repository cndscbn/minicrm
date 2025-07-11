import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botReply = {
      sender: "bot",
      text: getMockReply(input),
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
  };

  const getMockReply = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("lead")) return "You can create a lead from the form.";
    if (lower.includes("export")) return "Click the Export button to download leads.";
    if (lower.includes("status")) return "Leads have statuses like New and Contacted.";
    if (lower.includes("workflow")) return "The Workflow Designer helps define lead pipelines.";
    return "I'm just a mock bot, but I'm here to help!";
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-80 max-h-[500px] flex flex-col border border-gray-300 z-50">
      <div className="bg-blue-500 text-white p-3 font-semibold rounded-t-lg">
        CRM Assistant
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.sender === "user"
                ? "bg-gray-200 self-end ml-auto"
                : "bg-blue-100 self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t border-gray-300">
        <input
          className="flex-1 p-2 outline-none"
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
