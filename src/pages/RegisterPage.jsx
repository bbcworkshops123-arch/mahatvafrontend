import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
  const events = [
    "YUKTIMIND",
    "UTHKARSH",
    "VITTANVAYA",
    "KALA SPARDHA",
    "ROYAL LITLMOOM",
    "VYAPARA VEDA",
    "VYUHA",
    "EKATVAM",
    "KALA VAIBHAVAM",
    "VIDHYA VIMARSHA",
    "TECH GYAN SANGRAAM",
    "APSKAITA",
  ];

  const [showInstructions, setShowInstructions] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [eventIndex, setEventIndex] = useState(0);
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeAddress: "",
    facultyIncharge: "",
    contactNumber: "",
    eventName: events[0],
    membersCount: 0,
    members: [],
  });

  const handleProceed = () => setShowInstructions(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "membersCount") {
      const count = Math.max(0, Math.min(15, parseInt(value) || 0));
      setFormData((prev) => ({
        ...prev,
        membersCount: count,
        members: Array.from({ length: count }, (_, i) => prev.members[i] || ""),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMemberChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.members];
      updated[index] = value;
      return { ...prev, members: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data
      const res = await axios.post("https://mahatvabackend.onrender.com/api/registrations", formData);
      setRegistrationId(res.data.registrationId || Math.floor(Math.random() * 1000));
      setShowSuccess(true);

      // After 5 seconds, redirect and auto-fill next event
      setTimeout(() => {
        setShowSuccess(false);
        const nextIndex = (eventIndex + 1) % events.length;
        setEventIndex(nextIndex);
        setFormData((prev) => ({
          ...prev,
          eventName: events[nextIndex],
          members: Array.from({ length: prev.membersCount }, () => ""),
        }));
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-overlay"></div>
      <div className="register-container">
        {showInstructions ? (
          <div className="instructions-box">
            <h2>📋 Registration Instructions</h2>
            <ul className="instruction-list">
              <li>Fill all details carefully before submitting.</li>
              <li>Each registration gets a unique ID.</li>
              <li>After each registration, you’ll move to the next event automatically.</li>
              <li>Ensure correct contact details and faculty name.</li>
              <li>Team size can be 0 to 15 members.</li>
              <li>You’ll auto-redirect in 5 seconds after each successful submission.</li>
            </ul>
            <button className="proceed-btn" onClick={handleProceed}>
              Proceed to Registration →
            </button>
          </div>
        ) : showSuccess ? (
          <div className="success-box">
            <h2>🎉 Registration Successful!</h2>
            <p>Your Registration ID:</p>
            <h1 className="reg-id">BBCMAHT2K25{registrationId}</h1>
            <p>Auto redirecting to next event in 5 seconds...</p>
          </div>
        ) : (
          <>
            <h1 className="page-title">MAHATVA 2K25</h1>
            <p className="sub-title">Ballari Business College • Inter PU Competition</p>
            <h2 className="form-title">Event Registration Form</h2>

            <form className="register-form" onSubmit={handleSubmit}>
              <label className="label">College Name</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                required
              />

              <label className="label">College Address</label>
              <input
                type="text"
                name="collegeAddress"
                value={formData.collegeAddress}
                onChange={handleChange}
                required
              />

              <label className="label">Faculty In-Charge</label>
              <input
                type="text"
                name="facultyIncharge"
                value={formData.facultyIncharge}
                onChange={handleChange}
                required
              />

              <label className="label">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />

              <label className="label">Select Event</label>
              <select
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
              >
                {events.map((event, i) => (
                  <option key={i} value={event}>
                    {event}
                  </option>
                ))}
              </select>

              <label className="label">Number of Members (0–15)</label>
              <input
                type="number"
                name="membersCount"
                min="0"
                max="15"
                value={formData.membersCount}
                onChange={handleChange}
                required
              />

              {Array.isArray(formData.members) && formData.members.length > 0 && (
                <div className="member-inputs">
                  {formData.members.map((member, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Member ${index + 1} Name`}
                      value={member}
                      onChange={(e) => handleMemberChange(index, e.target.value)}
                      required
                    />
                  ))}
                </div>
              )}

              <button type="submit" className="submit-btn">
                Register
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
