import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [view, setView] = useState("registrations");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all registrations
  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/registrations");
      setRegistrations(res.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  // ✅ Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/registrations/leaderboard");
      setLeaderboard(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchLeaderboard();
  }, []);

  // ✅ Update marks for specific event
  const handleMarksUpdate = async (registrationId, eventName, marks) => {
    try {
      await axios.put(
        `http://localhost:5000/api/registrations/${registrationId}/event/${eventName}/marks`,
        marks
      );
      alert(`Marks updated for ${eventName}!`);
      fetchRegistrations();
      fetchLeaderboard();
    } catch (error) {
      console.error("Error updating marks:", error);
      alert("Failed to update marks");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/admin/login";
  };

  // ✅ Filter registrations by event name
  const filteredRegistrations = registrations.filter((reg) =>
    reg.events.some((event) =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

      {view === "registrations" && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by event name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="content">
        {view === "registrations" ? (
          <section className="table-section">
            <h2>All College Registrations</h2>
            <div className="table-wrapper">
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => (
                  <div key={reg._id} className="college-card">
                    <h3>
                      {reg.registrationId} — {reg.collegeName}
                    </h3>
                    <p>
                      Faculty Incharge: <strong>{reg.facultyIncharge}</strong> | Contact:{" "}
                      {reg.contactNumber}
                    </p>

                    <table className="styled-table">
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Members</th>
                          <th>Marks (Rounds 1–5)</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reg.events
                          .filter((event) =>
                            event.eventName
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((event, index) => (
                            <EventRow
                              key={index}
                              registrationId={reg.registrationId}
                              event={event}
                              onUpdate={handleMarksUpdate}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <p className="no-results">No events found matching your search.</p>
              )}
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
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{team.collegeName}</td>
                      <td>{team.eventName}</td>
                      <td>{team.total}</td>
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

// ✅ Single Event Row
const EventRow = ({ registrationId, event, onUpdate }) => {
  const [rounds, setRounds] = useState({
    round1: event.marks.round1 || 0,
    round2: event.marks.round2 || 0,
    round3: event.marks.round3 || 0,
    round4: event.marks.round4 || 0,
    round5: event.marks.round5 || 0,
  });

  const handleChange = (e) => {
    setRounds({ ...rounds, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const handleSubmit = () => {
    onUpdate(registrationId, event.eventName, rounds);
  };

  return (
    <tr>
      <td>{event.eventName}</td>
      <td>{event.memberNames?.join(", ") || "—"}</td>
      <td>
        <div className="marks-inputs">
          {["round1", "round2", "round3", "round4", "round5"].map((key) => (
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
