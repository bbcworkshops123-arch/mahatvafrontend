import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";


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
            <button className="cta-primary" >          <Link to="/Event">Join the Legacy</Link>
            </button>
          </div>
        </div>
        {/* subtle bottom wave */}
        <div className="hero-bottom-glow" />
      </header>

      {/* Events */}
      <main className="events-root" id="events">
        <h3 className="events-heading">OUR GRAND EVENTS</h3>
        <div className="events-grid">
          {events.map((ev, idx) => (
            <article className={`event-card card-${idx % 6}`} key={ev.name}>
              <h4 className="ev-name">{ev.name}</h4>
              <p className="ev-desc">{ev.desc}</p>
            </article>
          ))}
        </div>
      </main>

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
