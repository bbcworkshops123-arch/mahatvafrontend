import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
const clubs = [
  {
    id: 1,
    name: "VITTANVAYA",
    image: "/VITTANVAYA.png",
    tagline: "Economic Vision, Financial Precision",
    desc: `Step into 'Vittanvaya'—where numbers come alive, and learning gets thrilling! Unleash your inner economist as you crack finance puzzles, battle it out in quizzes, and solve real-world money mysteries. Get ready to dazzle with your knowledge, debate with friends, and discover how economic choices shape our national finances.`,
    dept: "Economics",
    incharge: "Ms. Meghana",
    studentCoordinators: [
      { name: "Mr. Vinod", phone: "9380877500" },
      { name: "Ms. Ananya", phone: "8904340896" },
    ],
    participants: 2,
  },
  {
    id: 2,
    name: "UTHKARSH",
    image: "/UTHKARSH.png",
    tagline: "Rising High",
    desc: `Uthkarsh is all about learning, fun, and growth — where every activity enhances your communication, strengthens your leadership, and builds true team spirit. Step in, explore, and experience a day full of energy, ideas, and inspiration!`,
    dept: "HR",
    incharge: "Ms. Pearl Sahana",
    studentCoordinators: [
      { name: "Mr. Chidannada", phone: "8197334569" },
      { name: "Ms. Namrutha", phone: "9945985660" },
    ],
    participants: 2,
  },
  {
    id: 3,
    name: "VYAPARA VEDA",
    image: "/VYAPARAVEDA.png",
    tagline: "A New Era of Marketing - Unlock Your Potential",
    desc: `Vyapar Veda is a learning experience focusing on advertisement and promotion. It provides insights into sales, communication, creativity, and current marketing trends.`,
    dept: "Marketing",
    incharge: "Ms. Darunisha & Mr. Yaseer",
    studentCoordinators: [],
    participants: 3,
  },
  {
    id: 4,
    name: "KALA SPARDHA",
    image: "/KALASPARDHA.png",
    tagline: "Unleash The Art Within",
    desc: `The Drawing & Craft Competition tests creativity, innovation, and teamwork through theme-based art and craft activities.`,
    dept: "Drawing & Crafting",
    incharge: "Ms. Fameeda & Mr. Chaitanya",
    studentCoordinators: [
      { name: "Ms. Heena", phone: "9590783999" },
      { name: "Ms. Shifa", phone: "6361860767" },
    ],
    participants: 3,
  },
  {
    id: 5,
    name: "APSKAITA",
    image: "/APSKAITA.png",
    tagline: "Where Numbers Meet & Logic Speak",
    desc: `Participants showcase their accounting skills—covering conceptual understanding, error rectification, and final account preparation. Promotes logical thinking and practical commerce applications.`,
    dept: "Accounting",
    incharge: "Ms. Tazeen & Ms. Geeta",
    studentCoordinators: [
      { name: "Ms. Uma", phone: "8884562068" },
      { name: "Mr. Ibtehal Javeed", phone: "9353737794" },
    ],
    participants: 2,
  },
  {
    id: 6,
    name: "VIDYA VIMARSHA",
    image: "/VIDYAVIMARSHA.png",
    tagline: "The Platform for Pioneering Thought",
    desc: `A quiz competition celebrating intellect and exploration through rounds on business, culture, and general knowledge.`,
    dept: "General Quiz",
    incharge: "Ms. Veeramangala & Ms. Vidisha",
    studentCoordinators: [
      { name: "Ms. Shivangi", phone: "8123610065" },
      { name: "Mr. Bhardwaj", phone: "6366512205" },
    ],
    participants: 2,
  },
  {
    id: 7,
    name: "YUKTIMIND",
    image: "/YUKTIMIND.png",
    tagline: "Where Logic Meets Learning",
    desc: `A next-gen tech initiative blending AI, ML, and software innovation. YuktiMind celebrates the harmony of logic, creativity, and technology.`,
    dept: "Computer - Coding",
    incharge: "Dr. Shoba & Mr. Marisiddana",
    studentCoordinators: [
      { name: "Ms. Riya", phone: "9902346597" },
      { name: "Ms. Khushi", phone: "8073166638" },
    ],
    participants: 3,
  },
  {
    id: 8,
    name: "VYUHA",
    image: "/VYUHA.png",
    tagline: "The Strategic Vision of Design",
    desc: `A grand design event celebrating creativity, problem-solving, and innovation through collaborative design challenges.`,
    dept: "Computer - Designing",
    incharge: "Ms. Nazeena & Ms. Usha Rani",
    studentCoordinators: [],
    participants: 2,
  },
  {
    id: 9,
    name: "TECH GYAN SANGRAAM",
    image: "/TECHGYANSANGRAAM.png",
    tagline: "Where Minds Upgrade and Knowledge Uploads!",
    desc: `An engaging tech event exploring gadgets, innovation, and the evolution of technology in a fun, competitive setting.`,
    dept: "Computer - Technology",
    incharge: "Ms. Pricsilla & Mr. Vamshi",
    studentCoordinators: [
      { name: "Ms. Manasa B", phone: "7483306711" },
      { name: "Ms. Nithya MD", phone: "9353299149" },
    ],
    participants: 2,
  },
  {
    id: 10,
    name: "ROYAL LITLOOM",
    image: "/ROYALLITLMOOM.png",
    tagline: "Crafting Brilliance Through Language",
    desc: `A celebration of literature and creativity that inspires participants to communicate with brilliance and grace.`,
    dept: "English",
    incharge: "Ms. Shyamala & Ms. Vani",
    studentCoordinators: [],
    participants: 3,
  },
  {
    id: 11,
    name: "EKATVAM",
    image: "/EKATVAM.png",
    tagline: "Power of Unity",
    desc: `An exciting team-building event designed to enhance teamwork, communication, and leadership through interactive challenges.`,
    dept: "Team Building",
    incharge: "Ms. Farheen, Ms. Mubeena & Ms. Sowmya",
    studentCoordinators: [
      { name: "Ms. Vaishnavi", phone: "9052199421" },
      { name: "Ms. Nethravath", phone: "6361974088" },
    ],
    participants: 4,
  },
  {
    id: 12,
    name: "KALA VAIBHAVAM",
    image: "/KALAVAIBHAVAM.png",
    tagline: "Echoes of Tradition, Essence of Art",
    desc: `A vibrant celebration of India’s cultural heritage showcasing traditional and modern art forms inspired by mythology and divine rhythm.`,
    dept: "Cultural",
    incharge: "Ms. Sarvamangala & Ms. Manasa",
    studentCoordinators: [{ name: "Ms. Deepika S", phone: "9611175165" }],
    participants: "6–10",
  },
];

export default function Home() {
  // Event date (Nov 21, 2025 10:00 AM local)
  const EVENT_DATE = new Date(2025, 10, 21, 10, 0, 0);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [bgIndex, setBgIndex] = useState(0);

  // Realistic college images (Unsplash) for carousel
  const backgrounds = [
    "https://bbc.edu.in/images/home-corse/home-abt1.jpg",
    "https://bbc.edu.in/images/slides/slide2.jpg",
    "https://media.collegedekho.com/media/img/institute/crawled_images/399402/slide4.jpg",
  ];

  // Events list (12 events, no images)
  const events = [
    { name: "YUKTIMIND", desc: "Tech Innovation & Coding Challenges" },
    { name: "UTHKARSH", desc: "Personality & Cultural Showcase" },
    { name: "VITTANVAYA", desc: "Business Ideas & Startup Pitch" },
    { name: "KALA SPARDHA", desc: "Fine Arts & Creative Competition" },
    { name: "ROYAL LITLMOOM", desc: "Literary Events & Poetry" },
    { name: "VYAPARA VEDA", desc: "Commerce & Trade Quizzes" },
    { name: "VYUHA", desc: "Strategy Games & Management" },
    { name: "EKATVAM", desc: "Group Harmony & Cultural Team Event" },
    { name: "KALA VAIBHAVAM", desc: "Performing Arts Celebration" },
    { name: "VIDHYA VIMARSHA", desc: "Debates, Quizzes & Academic Battles" },
    { name: "TECH GYAN SANGRAAM", desc: "Tech Knowledge Battles" },
    { name: "APSKAITA", desc: "Accounting & Finance Challenges" },
  ];

  // Countdown updater
  useEffect(() => {
    function update() {
      const now = new Date();
      const diff = EVENT_DATE - now;
      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [EVENT_DATE]);

  // Background carousel + small parallax index
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((p) => (p + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);
 const [selectedClub, setSelectedClub] = useState(null);
  const navigate = useNavigate();
  return (

    <div className="mb-home-root">
      {/* Hero */}
      <header className="hero-root" aria-label="MAHATVA 2K25 hero">
        {/* background slides */}
        <div className="bg-wrap">
          {backgrounds.map((img, i) => (
            <div
              key={i}
              className={`bg-slide ${i === bgIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})`, transform: `translateY(${i === bgIndex ? "-2%" : "0"})` }}
              aria-hidden
            />
          ))}
          {/* moving neon gradient overlays (for pink/blue vibe) */}
          <div className="neon-overlay neon-overlay-1" />
          <div className="neon-overlay neon-overlay-2" />
          {/* floating particles layer */}
          <div className="particles" />
        </div>

        {/* Foreground content */}
        <div className="hero-foreground">
          <div className="brand-line">
            <span className="welcome">WELCOME TO</span>
          </div>

          <h1 className="college-name">BALLARI BUSINESS COLLEGE</h1>
          <div className="presents">PRESENTS</div>

          <h2 className="mahatva-title">
            <span className="mahatva-word flicker">MAHATVA</span>
            <span className="mahatva-year flicker delay">2K25</span>
          </h2>

          <div className="countdown" role="timer" aria-live="polite">
            <div className="count-pill pulse">
              <div className="count-num">{timeLeft.days}</div>
              <div className="count-label">DAYS</div>
            </div>
            <div className="count-pill pulse delay-1">
              <div className="count-num">{timeLeft.hours}</div>
              <div className="count-label">HOURS</div>
            </div>
            <div className="count-pill pulse delay-2">
              <div className="count-num">{timeLeft.minutes}</div>
              <div className="count-label">MINS</div>
            </div>
            <div className="count-pill pulse delay-3">
              <div className="count-num">{timeLeft.seconds}</div>
              <div className="count-label">SECS</div>
            </div>
          </div>

          <div className="hero-meta">
            <div>Nov 21, 2025 • 10:00 AM</div>
            <div>Ballari Business College Grounds</div>
          </div>

          <div className="hero-cta-wrap">
            <button className="cta-primary" >          <Link to="/register">Register Now</Link>
            </button>
          </div>
        </div>
        {/* subtle bottom wave */}
        <div className="hero-bottom-glow" />
      </header>

      {/* Events */}
      
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
                 <h3>
                   {club.name}{" "}
                   <span style={{ color: "#00bfa6", fontSize: "0.85rem" }}>
                     ({club.dept})
                   </span>
                 </h3>
                 <p className="tagline">{club.tagline}</p>
               </div>
             ))}
           </div>
     
           {/* === Popup Modal === */}
           {selectedClub && (
             <div className="popup-overlay" onClick={() => setSelectedClub(null)}>
               <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                 <img src={selectedClub.image} alt={selectedClub.name} />
                 <h2>{selectedClub.name}</h2>
                 <h4>{selectedClub.tagline}</h4>
                 <p>{selectedClub.desc}</p>
     
                 <div className="info-section">
                   <div className="faculty-info">
                     <h5>Faculty Incharge</h5>
                     <p>{selectedClub.incharge}</p>
                   </div>
     
                   {selectedClub.studentCoordinators?.length > 0 && (
                     <div className="coordinator-info">
                       <h5>Student Coordinators</h5>
                       <ul>
                         {selectedClub.studentCoordinators.map((sc, i) => (
                           <li key={i}>
                             <span className="coordinator-name">{sc.name}</span>
                             <a
                               href={`tel:${sc.phone}`}
                               className="coordinator-phone"
                             >
                               📞 {sc.phone}
                             </a>
                           </li>
                         ))}
                       </ul>
                     </div>
                   )}
                 </div>
     
                 <div className="popup-buttons">
                   <button
                     className="close-btn"
                     onClick={() => setSelectedClub(null)}
                   >
                     Close
                   </button>
                   <button
                     className="register-btn"
                     onClick={() => navigate("/register")}
                   >
                     Register
                   </button>
                 </div>
               </div>
             </div>
           )}
         </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-title">Ballari Business College</div>
          <div className="footer-sub">Empowering Minds • Celebrating Talent • Building Futures</div>
          <div className="footer-copyright">© 2025 MAHATVA 2K25</div>
        </div>
      </footer>
    </div>
  );
}
