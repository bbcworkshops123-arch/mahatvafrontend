import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllRegistrations.css";

const AllRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("https://mahatvabackend.onrender.com/api/registrations");
      setRegistrations(res.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const handleDownloadCSV = () => {
    const csvHeaders = [
      "Registration ID",
      "College Name",
      "College Address",
      "Faculty Incharge",
      "Contact Number",
      "Event Name",
      "Members",
    ];

    const csvRows = registrations.map((reg) => [
      reg.registrationId,
      reg.collegeName,
      reg.collegeAddress,
      reg.facultyIncharge,
      reg.contactNumber,
      reg.eventName,
      Array.isArray(reg.members) ? reg.members.join(" | ") : "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeaders, ...csvRows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "college_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="all-registrations-page">
      <div className="header-section">
        <h1>📜 All Registrations</h1>
        <p>Complete list of colleges registered for MAHATVA 2K25</p>
        <button className="download-btn" onClick={handleDownloadCSV}>
          ⬇️ Download CSV
        </button>
      </div>

      {registrations.length === 0 ? (
        <p className="no-data">No registrations found yet.</p>
      ) : (
        <div className="table-container">
          <table className="registration-table">
            <thead>
              <tr>
                <th>Reg ID</th>
                <th>College Name</th>
                <th>College Address</th>
                <th>Faculty Incharge</th>
                <th>Contact Number</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr key={index}>
                  <td>{reg.registrationId}</td>
                  <td>{reg.collegeName}</td>
                  <td>{reg.collegeAddress}</td>
                  <td>{reg.facultyIncharge}</td>
                  <td>{reg.contactNumber}</td>
                  <td>{reg.eventName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRegistrations;
