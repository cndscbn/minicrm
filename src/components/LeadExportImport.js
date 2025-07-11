import React from "react";

function LeadExportImport({ leads, setLeads }) {
  // Export to JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(leads, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import from JSON
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedLeads = JSON.parse(event.target.result);
        if (Array.isArray(importedLeads)) {
          setLeads((prevLeads) => [...prevLeads, ...importedLeads]);
        } else {
          alert("Invalid JSON format.");
        }
      } catch (error) {
        alert("Failed to parse JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-4 p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Export / Import Leads</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleExport}
        >
          Export Leads
        </button>

        <label className="cursor-pointer text-blue-600 underline">
          Import Leads
          <input
            type="file"
            accept="application/json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

export default LeadExportImport;
