import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsPage.css";

const clubs = [
  {
    id: 1,
    name: "UTHKARSH",
    image: "/UTHKARSH.png",
    tag: "RISING HIGH",
    desc: `Uthkarsh is all about learning, fun, and growth — where every activity enhances your communication, strengthens your leadership, and builds true team spirit.
Step in, explore, and experience a day full of energy, ideas, and inspiration!`,
    incharge: "PEARL SAHANA MITRA",
  },
  {
    id: 6,
    name: "VITTANVAYA",
    image: "/VITTANVAYA.png",
    tag: "Economic Vision, Financial Precision",
    desc: `Step into "Vittanvaya" — where numbers come alive, and learning gets thrilling!
Unleash your inner economist as you crack finance puzzles, battle it out in quizzes, and solve real-world money mysteries.
Get ready to dazzle with your knowledge, debate with friends, and discover how economic choices shape our national finances.`,
    incharge: "Ms. Meghana S",
  },
  {
    id: 7,
    name: "YUKTIMIND",
    image: "/YUKTIMIND.png",
    tag: "Where Logic Meets Learning",
    desc: `Step into the future with YuktiMind, a next-generation tech initiative that blends the brilliance of Artificial Intelligence, Machine Learning, and Modern Software Engineering.`,
    incharge: "Dr. Shobha Y and Marisiddana Gouda",
  },
  {
    id: 11,
    name: "KALA SPARDHA",
    image: "/KALASPARDHA.png",
    tag: "Unleash The Art Within",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 12,
    name: "ROYAL LITLMOOM",
    image: "/ROYALLITLMOOM.png",
    tag: "Crafting Brilliance Through Language",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 13,
    name: "VYAPARA VEDA",
    image: "/VYAPARAVEDA.png",
    tag: "A New ERA of marketing unlock your potential",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 14,
    name: "VYUHA",
    image: "/VYUHA.png",
    tag: "The Strategic Vision of Design",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 15,
    name: "EKATVAM",
    image: "/EKATVAM.png",
    tag: "Power of Unity",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 16,
    name: "KALA VAIBHAVAM",
    image: "/KALAVAIBHAVAM.png",
    tag: "Echoes of Tradition, Essence of Art",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 17,
    name: "VIDYA VIMARSHA",
    image: "/VIDYAVIMARSHA.png",
    tag: "Only the Sharp Survive",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 18,
    name: "TECH GYAN SANGRAAM",
    image: "/TECHGYANSANGRAAM.png",
    tag: "Where minds Upgrade and knowledge uploads!",
    desc: `NULL`,
    incharge: "NULL",
  },
  {
    id: 19,
    name: "APSKAITA",
    image: "/APSKAITA.png",
    tag: "Where Numbers Meet & Logic Speak",
    desc: `NULL`,
    incharge: "NULL",
  },
];

const EventsPage = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="events-container">
      <h2 className="events-title">✨ Mahatva 2K25 College Events ✨</h2>
      <p className="events-subtitle">Click on any event to know more!</p>

      <div className="cards-grid">
        {clubs.map((club) => (
          <div
            className="event-card"
            key={club.id}
            onClick={() => setSelectedClub(club)}
          >
            <img src={club.image} alt={club.name} />
            <h3>{club.name}</h3>
            <p className="tagline">{club.tag}</p>
          </div>
        ))}
      </div>

      {/* === Popup Modal === */}
      {selectedClub && (
        <div className="popup-overlay" onClick={() => setSelectedClub(null)}>
          <div
            className="popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedClub.image} alt={selectedClub.name} />
            <h2>{selectedClub.name}</h2>
            <h4>{selectedClub.tag}</h4>
            <p>
              {selectedClub.desc !== "NULL"
                ? selectedClub.desc
                : "Event details coming soon..."}
            </p>
            <p className="incharge">
              <strong>Incharge:</strong>{" "}
              {selectedClub.incharge !== "NULL"
                ? selectedClub.incharge
                : "To be announced"}
            </p>
            <div className="popup-buttons">
              <button className="close-btn" onClick={() => setSelectedClub(null)}>
                Close
              </button>
              <button className="register-btn" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
