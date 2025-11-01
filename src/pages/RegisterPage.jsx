import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [formData, setFormData] = useState({
    collegeName: "",
    collegeAddress: "",
    facultyIncharge: "",
    contactNumber: "",
    eventName: "",
    membersCount: 0,
    memberNames: [],
  });

  const [registrationId, setRegistrationId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEventChange = (e) => {
    const eventName = e.target.value;
    setFormData({
      ...formData,
      eventName,
      membersCount: 0,
      memberNames: [],
    });
  };

  const handleMembersCountChange = (e) => {
    const count = Number(e.target.value);
    const names = Array(count).fill("");
    setFormData({ ...formData, membersCount: count, memberNames: names });
  };

  const handleMemberNameChange = (index, value) => {
    const updatedNames = [...formData.memberNames];
    updatedNames[index] = value;
    setFormData({ ...formData, memberNames: updatedNames });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mahatvabackend.onrender.com/api/registrations", formData);
      if (res.data.success) {
        setRegistrationId(res.data.registrationId);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-overlay"></div>
      <div className="register-container">
        <h1 className="page-title">MAHATVA 2K25</h1>
        <p className="sub-title">Ballari Business College • Inter PU Competition</p>

        {/* Step 1: Show Instructions */}
        {showInstructions ? (
          <div className="instructions-box">
            <h2 className="form-title">Before You Register</h2>
            <ol className="instruction-list">
              <li>Ensure you are representing your college officially.</li>
              <li>Each event requires separate registration.</li>
              <li>Provide accurate college and contact details.</li>
              <li>Team size should follow event-specific limits.</li>
              <li>Member names once entered cannot be changed.</li>
              <li>Faculty incharge must verify all entries.</li>
              <li>Use an active contact number for communication.</li>
              <li>Carry your registration ID during the event.</li>
              <li>On-spot registrations may not be accepted.</li>
              <li>Follow all event rules and decorum strictly.</li>
            </ol>
            <button
              className="proceed-btn"
              onClick={() => setShowInstructions(false)}
            >
              Proceed to Registration →
            </button>
          </div>
        ) : !submitted ? (
          /* Step 2: Show Registration Form */
          <form onSubmit={handleSubmit} className="register-form">
            <h2 className="form-title">Event Registration Form</h2>

            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="collegeAddress"
              placeholder="College Address"
              value={formData.collegeAddress}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="facultyIncharge"
              placeholder="Faculty Incharge"
              value={formData.facultyIncharge}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />

            <select
              name="eventName"
              value={formData.eventName}
              onChange={handleEventChange}
              required
            >
              <option value="">Select Event</option>
              <option value="YUKTIMIND">YUKTIMIND</option>
              <option value="UTHKARSH">UTHKARSH</option>
              <option value="VITTANVAYA">VITTANVAYA</option>
              <option value="KALA SPARDHA">KALA SPARDHA</option>
              <option value="ROYAL LITLMOOM">ROYAL LITLMOOM</option>
              <option value="VYAPARA VEDA">VYAPARA VEDA</option>
              <option value="VYUHA">VYUHA</option>
              <option value="EKATVAM">EKATVAM</option>
              <option value="KALA VAIBHAVAM">KALA VAIBHAVAM</option>
              <option value="VIDHYA VIMARSHA">VIDHYA VIMARSHA</option>
              <option value="TECH GYAN SANGRAAM">TECH GYAN SANGRAAM</option>
              <option value="APSKAITA">APSKAITA</option>
            </select>

            {formData.eventName && (
              <>
                <label className="label">Number of Members</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.membersCount}
                  onChange={handleMembersCountChange}
                  required
                />
              </>
            )}

            {formData.membersCount > 0 && (
              <div className="member-inputs">
                {formData.memberNames.map((name, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Member ${index + 1} Name`}
                    value={name}
                    onChange={(e) => handleMemberNameChange(index, e.target.value)}
                    required
                  />
                ))}
              </div>
            )}

            <button type="submit" className="submit-btn">Register</button>
          </form>
        ) : (
          /* Step 3: Success message */
          <div className="success-box">
            <h2>🎉 Registration Successful!</h2>
            <p>Your Registration ID:</p>
            <h1 className="reg-id">BBCMAHT2K25{registrationId}</h1>
            <p>Keep this ID safe for event entry.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
