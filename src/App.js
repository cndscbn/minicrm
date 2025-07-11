import React, { useState } from 'react';
import ManualLeadForm from './components/ManualLeadForm';
import DocumentUpload from './components/DocumentUpload';
import Dashboard from './components/Dashboard';
import LeadInteractionModal from './components/LeadInteractionModal';
import WorkflowDesigner from './components/WorkflowDesigner';
import InteractModal from './components/InteractModal';
import { ToastContainer } from 'react-toastify';



function App() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleLeadCreated = (lead) => {
    setLeads([...leads, lead]);
  };

  const handleInteract = (lead) => {
    setSelectedLead(lead);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mini CRM</h1>
      <ManualLeadForm onLeadCreated={handleLeadCreated} />
      <DocumentUpload onLeadCreated={handleLeadCreated} />
      <Dashboard leads={leads} onInteract={handleInteract} />
      <LeadInteractionModal lead={selectedLead} onClose={handleCloseModal} />
      <InteractModal leads={leads} />
      <WorkflowDesigner />
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}

export default App;
