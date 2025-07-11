import React, { useState, useEffect, useCallback } from "react";
import LoginPage from "./components/LoginPage";
import ManualLeadForm from "./components/ManualLeadForm";
import DocumentUpload from "./components/DocumentUpload";
import Dashboard from "./components/Dashboard";
import LeadInteractionModal from "./components/LeadInteractionModal";
import WorkflowDesigner from "./components/WorkflowDesigner";
import LeadExportImport from "./components/LeadExportImport";
import LeadHistory from "./components/LeadHistory";
import LeadSummary from "./components/LeadSummary";
import LogoutButton from "./components/LogoutButton";
import Chatbot from "./components/Chatbot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Initialize leads state with error handling
  const [leads, setLeads] = useState(() => {
    try {
      const stored = localStorage.getItem("leads");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading leads from localStorage:", error);
      return [];
    }
  });

  // Initialize session state with error handling
  const [session, setSession] = useState(() => {
    try {
      return {
        loggedIn: localStorage.getItem("loggedIn") === "true",
        role: localStorage.getItem("userRole") || null,
        email: localStorage.getItem("userEmail") || null,
      };
    } catch (error) {
      console.error("Error loading session from localStorage:", error);
      return {
        loggedIn: false,
        role: null,
        email: null,
      };
    }
  });

  const [modalLead, setModalLead] = useState(null);

  // Initialize history state with error handling
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem("leadHistory");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading history from localStorage:", error);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Save leads to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem("leads", JSON.stringify(leads));
    } catch (error) {
      console.error("Error saving leads to localStorage:", error);
    }
  }, [leads]);

  // Save history to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem("leadHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Error saving history to localStorage:", error);
    }
  }, [history]);

  // Save session to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("loggedIn", session.loggedIn.toString());
      if (session.role) localStorage.setItem("userRole", session.role);
      if (session.email) localStorage.setItem("userEmail", session.email);
    } catch (error) {
      console.error("Error saving session to localStorage:", error);
    }
  }, [session]);

  // Handle lead creation with proper error handling
  const handleLeadCreated = useCallback((lead) => {
    if (!lead || !lead.name || !lead.email) {
      console.error("Invalid lead data:", lead);
      return;
    }

    const newLead = {
      ...lead,
      id: Date.now().toString(), // Add unique ID
      createdAt: new Date().toISOString(),
      status: lead.status || "New",
    };

    setLeads(prevLeads => [...prevLeads, newLead]);
    
    const historyEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleString(),
      action: "Created",
      lead: newLead,
    };

    setHistory(prevHistory => [...prevHistory, historyEntry]);
  }, []);

  // Handle status toggle with proper error handling
  const handleToggleStatus = useCallback((idx) => {
    if (idx < 0 || idx >= leads.length) {
      console.error("Invalid lead index:", idx);
      return;
    }

    setLeads(prevLeads => {
      const copy = [...prevLeads];
      const oldStatus = copy[idx].status;
      copy[idx].status = oldStatus === "New" ? "Contacted" : "New";
      copy[idx].lastModified = new Date().toISOString();
      return copy;
    });

    const historyEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleString(),
      action: `Status changed from ${leads[idx].status} to ${leads[idx].status === "New" ? "Contacted" : "New"}`,
      lead: leads[idx],
    };

    setHistory(prevHistory => [...prevHistory, historyEntry]);
  }, [leads]);

  // Handle lead deletion
  const handleLeadDelete = useCallback((idx) => {
    if (idx < 0 || idx >= leads.length) {
      console.error("Invalid lead index:", idx);
      return;
    }

    setLeads(prevLeads => {
      const updated = [...prevLeads];
      const removed = updated.splice(idx, 1)[0];
      
      const historyEntry = {
        id: Date.now().toString(),
        time: new Date().toLocaleString(),
        action: "Deleted",
        lead: removed,
      };

      setHistory(prevHistory => [...prevHistory, historyEntry]);
      return updated;
    });
  }, [leads]);

  // Handle login
  const handleLogin = useCallback(({ email, role }) => {
    setSession({
      loggedIn: true,
      email,
      role,
    });
  }, []);

  // Handle logout
  const handleLogout = useCallback(() => {
    setSession({
      loggedIn: false,
      role: null,
      email: null,
    });
    
    try {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
    } catch (error) {
      console.error("Error clearing session from localStorage:", error);
    }
  }, []);

  // Filter leads based on search and status
  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  // Show login page if not logged in
  if (!session.loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoginPage onLogin={handleLogin} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }

  // Main application interface
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 space-y-6">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Mini CRM</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {session.email} ({session.role})
              </span>
              <LogoutButton onLogout={handleLogout} />
            </div>
          </div>
        </div>

        {/* Lead Summary */}
        <LeadSummary leads={leads} />

        {/* Lead Creation Forms - Only for admin and agents */}
        {(session.role === "admin" || session.role === "agent") && (
          <div className="grid md:grid-cols-2 gap-6">
            <ManualLeadForm
              role={session.role}
              userEmail={session.email}
              onLeadCreated={handleLeadCreated}
            />
            <DocumentUpload onLeadCreated={handleLeadCreated} />
          </div>
        )}

        {/* Dashboard */}
        <Dashboard
          leads={filteredLeads}
          role={session.role}
          userEmail={session.email}
          onDelete={handleLeadDelete}
          onToggleStatus={handleToggleStatus}
          onInteract={setModalLead}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Lead Interaction Modal */}
        {modalLead && (
          <LeadInteractionModal
            lead={modalLead}
            onClose={() => setModalLead(null)}
          />
        )}

        {/* Admin-only features */}
        {session.role === "admin" && (
          <div className="space-y-6">
            <WorkflowDesigner />
            <LeadExportImport leads={leads} setLeads={setLeads} />
          </div>
        )}

        {/* Lead History */}
        <LeadHistory history={history} />

        {/* Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
}

export default App;