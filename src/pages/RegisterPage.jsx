import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterPage.css";

// ✅ Event list with maximum participant limits
const eventsList = [
  { name: "VITTANVAYA", limit: 2 },
  { name: "UTHKARSH", limit: 2 },
  { name: "VYAPARA VEDA", limit: 3 },
  { name: "KALA SPARDHA", limit: 3 },
  { name: "APSKAITA", limit: 2 },
  { name: "VIDHYA VIMARSHA", limit: 2 },
  { name: "YUKTIMIND", limit: 3 },
  { name: "VYUHA", limit: 2 },
  { name: "TECH GYAN SANGRAAM", limit: 2 },
  { name: "ROYAL LITLMOOM", limit: 3 },
  { name: "EKATVAM", limit: 4 },
  { name: "KALA VAIBHAVAM", limit: 10 },
];

const RegisterPage = () => {
  const [collegeDetails, setCollegeDetails] = useState({
    collegeName: "",
    collegeAddress: "",
    facultyIncharge: "",
    contactNumber: "",
  });

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [memberNames, setMemberNames] = useState([]);
  const [eventTeams, setEventTeams] = useState([]);
  const [registrationId, setRegistrationId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const currentEvent = eventsList[currentEventIndex];

  const handleCollegeChange = (e) => {
    setCollegeDetails({ ...collegeDetails, [e.target.name]: e.target.value });
  };

  const handleMemberNameChange = (index, value) => {
    const updated = [...memberNames];
    updated[index] = value;
    setMemberNames(updated);
  };

  const handleNextEvent = async (e) => {
    e.preventDefault();

    // Validation for events requiring all names
    if (currentEvent.limit <= 3) {
      const allFilled = memberNames.every((name) => name.trim() !== "");
      if (!allFilled) {
        setError(
          `Please fill all ${currentEvent.limit} participant names for ${currentEvent.name}.`
        );
        return;
      }
    }

    setError("");
    const filledNames = memberNames.filter((name) => name.trim() !== "");

    const newEvent = {
      eventName: currentEvent.name,
      membersCount: filledNames.length,
      memberNames: filledNames,
    };

    setEventTeams((prev) => [...prev, newEvent]);
    setShowSuccess(true);

    // Final event = submit to backend
    if (currentEventIndex === eventsList.length - 1) {
      try {
        const response = await axios.post(
          "https://mahatvabackend.onrender.com/api/registrations",
          {
            ...collegeDetails,
            events: [...eventTeams, newEvent],
          }
        );
        setRegistrationId(response.data.registrationId);
      } catch (error) {
        console.error("❌ Error submitting registration:", error);
      }
      return;
    }

    // Move to next event
    setTimeout(() => {
      setShowSuccess(false);
      setMemberNames([]);
      setCurrentEventIndex((prev) => prev + 1);
    }, 2500);
  };

  // Skip Event Handler
  const handleSkipEvent = () => {
    const skippedEvent = {
      eventName: currentEvent.name,
      membersCount: 1,
      memberNames: ["None"],
    };

    setEventTeams((prev) => [...prev, skippedEvent]);
    setShowSuccess(true);

    if (currentEventIndex === eventsList.length - 1) {
      axios
        .post("https://mahatvabackend.onrender.com/api/registrations", {
          ...collegeDetails,
          events: [...eventTeams, skippedEvent],
        })
        .then((res) => setRegistrationId(res.data.registrationId))
        .catch((err) =>
          console.error("❌ Error submitting skipped event:", err)
        );
      return;
    }

    setTimeout(() => {
      setShowSuccess(false);
      setMemberNames([]);
      setCurrentEventIndex((prev) => prev + 1);
    }, 2000);
  };

  // Initialize name fields based on limit
  useEffect(() => {
    setMemberNames(Array(currentEvent.limit).fill(""));
  }, [currentEventIndex]);

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="page-title">BBC MAHATVA Registration</h2>

        {!showSuccess ? (
          <form className="register-form" onSubmit={handleNextEvent}>

            {/* 🔙 BACK BUTTON */}
            {currentEventIndex > 0 && (
              <button
                type="button"
                className="back-btn"
                onClick={() => {
                  const previousEvent = eventTeams[currentEventIndex - 1];

                  // Remove last saved event when going back
                  setEventTeams((prev) => prev.slice(0, prev.length - 1));

                  // Load previous participant names
                  const placeholders = Array(
                    eventsList[currentEventIndex - 1].limit
                  ).fill("");

                  setMemberNames(
                    previousEvent
                      ? [
                          ...previousEvent.memberNames,
                          ...placeholders,
                        ].slice(0, placeholders.length)
                      : placeholders
                  );

                  // Move back one event
                  setCurrentEventIndex((prev) => prev - 1);
                }}
              >
                ⬅ Back
              </button>
            )}

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
              <h3>{currentEvent.name}</h3>
              <span>
                Event {currentEventIndex + 1} of {eventsList.length}
              </span>
            </div>

            <p className="member-limit-note">
              Maximum {currentEvent.limit} participants allowed.
              {currentEvent.limit <= 3 && <strong> (All names required)</strong>}
            </p>

            {error && <p className="error-text">{error}</p>}

            {Array.from({ length: currentEvent.limit }).map((_, index) => (
              <div key={index}>
                <label>Member {index + 1} Name</label>
                <input
                  type="text"
                  value={memberNames[index] || ""}
                  onChange={(e) =>
                    handleMemberNameChange(index, e.target.value)
                  }
                />
              </div>
            ))}

            {/* SKIP EVENT */}
            <button
              type="button"
              className="skip-btn"
              onClick={handleSkipEvent}
            >
              ⏭ Skip This Event (Not Participating)
            </button>

            {/* NEXT / SUBMIT */}
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
                <h2>✅ {currentEvent.name} Saved!</h2>
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
