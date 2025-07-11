import React, { useState, useEffect } from "react";

const LeadNotesModal = ({ leadId, onClose }) => {
  const [notes, setNotes] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("leadNotes") || "{}");
    return stored[leadId] || [];
  });

  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const updatedNotes = [...notes, { text: newNote, time: new Date().toLocaleString() }];
    setNotes(updatedNotes);

    const allNotes = JSON.parse(localStorage.getItem("leadNotes") || "{}");
    allNotes[leadId] = updatedNotes;
    localStorage.setItem("leadNotes", JSON.stringify(allNotes));

    setNewNote("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Notes</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
          {notes.map((note, idx) => (
            <div key={idx} className="p-2 border rounded bg-gray-50">
              <p className="text-sm">{note.text}</p>
              <p className="text-xs text-gray-400">{note.time}</p>
            </div>
          ))}
        </div>
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAddNote}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 text-black rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadNotesModal;
