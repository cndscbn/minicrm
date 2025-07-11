import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter both fields");

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    onLogin({ email, role });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm space-y-3">
        <h2 className="text-2xl text-center">Mini‑CRM Login</h2>
        <input type="email" placeholder="Email" className="border w-full p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border w-full p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} />
        <select value={role} onChange={e => setRole(e.target.value)} className="border w-full p-2 rounded">
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
