import React from "react";

const LeadSummary = ({ leads }) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const contactedLeads = leads.filter((lead) => lead.status === "Contacted").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total Leads</h3>
        <p className="text-2xl">{totalLeads}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">New Leads</h3>
        <p className="text-2xl">{newLeads}</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Contacted Leads</h3>
        <p className="text-2xl">{contactedLeads}</p>
      </div>
    </div>
  );
};

export default LeadSummary;
