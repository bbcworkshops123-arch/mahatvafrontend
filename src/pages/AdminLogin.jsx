import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Predefined login credentials
    const ADMIN_USER = "BBC@mahatva";
    const ADMIN_PASS = "mahatva@2k25";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="admin-login-container">
      
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
