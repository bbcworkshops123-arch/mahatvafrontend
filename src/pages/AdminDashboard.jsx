import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [view, setView] = useState("registrations");

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("https://mahatvabackend.onrender.com/api/registrations");
      setRegistrations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/registrations/leaderboard");
      setLeaderboard(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchLeaderboard();
  }, []);

  const handleMarksUpdate = async (id, marks) => {
    try {
      await axios.put(`http://localhost:5000/api/registrations/marks/${id}`, marks);
      alert("Marks updated successfully!");
      fetchRegistrations();
      fetchLeaderboard();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-dashboard">
   
      <header className="admin-header">
        <h1>MAHATVA 2K25 Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="tabs">
        <button
          className={view === "registrations" ? "active" : ""}
          onClick={() => setView("registrations")}
        >
          Registrations
        </button>
        <button
          className={view === "leaderboard" ? "active" : ""}
          onClick={() => setView("leaderboard")}
        >
          Leaderboard
        </button>
        <button className="all">
           
                    <Link to="/admin/registrations">All Registrations</Link>
          
        </button>
      </div>

      <div className="content">
        {view === "registrations" ? (
          <section className="table-section">
            <h2>All Registrations</h2>
            <div className="table-wrapper">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>College</th>
                    <th>Faculty Incharge</th>
                    <th>Event</th>
                    <th>Members</th>
                    <th>Marks (Rounds)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <RegistrationRow key={reg._id} reg={reg} onUpdate={handleMarksUpdate} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="table-section">
            <h2>Leaderboard</h2>
            <div className="table-wrapper">
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>College</th>
                    <th>Event</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((team, index) => (
                    <tr key={team._id}>
                      <td>{index + 1}</td>
                      <td>{team.collegeName}</td>
                      <td>{team.eventName}</td>
                      <td>{team.marks.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const RegistrationRow = ({ reg, onUpdate }) => {
  const [rounds, setRounds] = useState({
    round1: reg.marks.round1 || 0,
    round2: reg.marks.round2 || 0,
    round3: reg.marks.round3 || 0,
    round4: reg.marks.round4 || 0,
    round5: reg.marks.round5 || 0,
  });

  const handleChange = (e) => {
    setRounds({ ...rounds, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const handleSubmit = () => {
    onUpdate(reg._id, rounds);
  };

  return (
    <tr>
      <td>{reg.registrationId}</td>
      <td>{reg.collegeName}</td>
      <td>{reg.facultyIncharge}</td>
      <td>{reg.eventName}</td>
      <td>{reg.memberNames?.join(", ") || "—"}</td>
      <td>
        <div className="marks-inputs">
          {Object.keys(rounds).map((key) => (
            <input
              key={key}
              type="number"
              name={key}
              value={rounds[key]}
              onChange={handleChange}
              min="0"
              max="100"
            />
          ))}
        </div>
      </td>
      <td>
        <button className="save-btn" onClick={handleSubmit}>
          Save
        </button>
      </td>
    </tr>
  );
};

export default AdminDashboard;
