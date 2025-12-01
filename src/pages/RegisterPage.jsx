import React from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  // 👉 If you want to show a real ID, replace this with a prop or value from backend
  const sampleRegId = "BBCMAHT2K25XXXX";

  return (
    <div className="rc-wrapper">
      <div className="rc-card">
        <div className="rc-pill">REGISTRATION COMPLETED</div>

        <h1 className="rc-title">Thank You for Registering! 🎉</h1>

        <p className="rc-subtitle">
          Your college has successfully registered for{" "}
          <strong>BBC MAHATVA 2K25</strong>.
        </p>

        <div className="rc-box">
          <p className="rc-box-label">Registration Status</p>
          <p className="rc-box-value rc-status">✅ Confirmed</p>
        </div>

        <div className="rc-box">
          <p className="rc-box-label">Registration ID</p>
          <p className="rc-box-value rc-id">{sampleRegId}</p>
          <p className="rc-note">
            *Use this ID for any event-related queries and entry at the venue.
          </p>
        </div>

        <div className="rc-info">
          <h2>What’s Next?</h2>
          <ul>
            <li>
              Coordinate with your <strong>faculty incharge</strong> and team
              members.
            </li>
            <li>
              Reach the venue on time as per the{" "}
              <strong>schedule shared by organizers</strong>.
            </li>
            <li>
              Carry your <strong>college ID card</strong> and basic stationery.
            </li>
          </ul>
        </div>

        <div className="rc-footer">
          <p>For any queries, contact:</p>
          <p className="rc-contact">
            📞 Event Coordinator: +91-XXXXXXXXXX
          </p>
          <p className="rc-contact">
            📧 Email: mahatva@bbc.edu
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
