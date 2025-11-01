import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

const eventsList = [
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

const RegisterPage = () => {
  const [collegeDetails, setCollegeDetails] = useState({
    collegeName: "",
    collegeAddress: "",
    facultyIncharge: "",
    contactNumber: "",
  });

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [memberNames, setMemberNames] = useState([]);
  const [eventTeams, setEventTeams] = useState([]);
  const [registrationId, setRegistrationId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const currentEvent = eventsList[currentEventIndex];

  const handleCollegeChange = (e) => {
    setCollegeDetails({ ...collegeDetails, [e.target.name]: e.target.value });
  };

  const handleMembersCountChange = (e) => {
    const count = parseInt(e.target.value);
    setMembersCount(count);
    setMemberNames(Array(count).fill(""));
  };

  const handleMemberNameChange = (index, value) => {
    const updated = [...memberNames];
    updated[index] = value;
    setMemberNames(updated);
  };

  const handleNextEvent = async (e) => {
    e.preventDefault();

    const newEvent = {
      eventName: currentEvent,
      membersCount,
      memberNames,
    };

    setEventTeams((prev) => [...prev, newEvent]);
    setShowSuccess(true);

    // ✅ If last event → submit everything
    if (currentEventIndex === eventsList.length - 1) {
      try {
        const response = await axios.post("https://mahatvabackend.onrender.com/api/registrations", {
          ...collegeDetails,
          events: [...eventTeams, newEvent],
        });
        setRegistrationId(response.data.registrationId);
        console.log("✅ Registration submitted:", response.data);
      } catch (error) {
        console.error("❌ Error submitting registration:", error);
      }
      return;
    }

    // ⏭ Move to next event
    setTimeout(() => {
      setShowSuccess(false);
      setMembersCount(0);
      setMemberNames([]);
      setCurrentEventIndex((prev) => prev + 1);
    }, 4000);
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="page-title">BBC MAHATVA Registration</h2>

        {!showSuccess ? (
          <form className="register-form" onSubmit={handleNextEvent}>
            {/* Show college details only once */}
            {currentEventIndex === 0 && (
              <>
                <label>College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  value={collegeDetails.collegeName}
                  onChange={handleCollegeChange}
                  required
                />

                <label>College Address</label>
                <input
                  type="text"
                  name="collegeAddress"
                  value={collegeDetails.collegeAddress}
                  onChange={handleCollegeChange}
                  required
                />

                <label>Faculty Incharge</label>
                <input
                  type="text"
                  name="facultyIncharge"
                  value={collegeDetails.facultyIncharge}
                  onChange={handleCollegeChange}
                  required
                />

                <label>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={collegeDetails.contactNumber}
                  onChange={handleCollegeChange}
                  required
                />
              </>
            )}

            <div className="event-header">
              <h3>{currentEvent}</h3>
              <span>
                Event {currentEventIndex + 1} of {eventsList.length}
              </span>
            </div>

            <label>Number of Members</label>
            <input
              type="number"
              min="0"
              max="15"
              value={membersCount}
              onChange={handleMembersCountChange}
              required
            />

            {Array.from({ length: membersCount }).map((_, index) => (
              <div key={index}>
                <label>Member {index + 1} Name</label>
                <input
                  type="text"
                  value={memberNames[index]}
                  onChange={(e) => handleMemberNameChange(index, e.target.value)}
                  required
                />
              </div>
            ))}

            <button type="submit" className="submit-btn">
              {currentEventIndex === eventsList.length - 1
                ? "Submit All Events"
                : "Save & Next Event"}
            </button>
          </form>
        ) : (
          <div className="success-box">
            {currentEventIndex === eventsList.length - 1 ? (
              <>
                <h2>🎉 Registration Complete!</h2>
                <p>All events registered successfully.</p>
                <h3>Your Registration ID:</h3>
                <h1 className="reg-id">BBCMAHT2K25{registrationId}</h1>
              </>
            ) : (
              <>
                <h2>✅ {currentEvent} Saved!</h2>
                <p>Moving to next event...</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
