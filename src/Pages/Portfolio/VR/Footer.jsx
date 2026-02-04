// Footer.jsx
import React, { useEffect, useRef, useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";

/* =========================
   Deterministic PRNG (NO Math.random)
   ========================= */
function xfnv1a(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable bubbles based on a seed string (component id / route / etc.) */
function makeBubbles(seedKey = "footer", count = 15) {
  const rand = mulberry32(xfnv1a(`bubbles:${seedKey}:${count}`));
  return Array.from({ length: count }, (_, i) => {
    const size = rand() * 12 + 8;      // 8..20 px
    const left = rand() * 100;         // 0..100%
    const delay = rand() * 6;          // 0..6s
    const duration = 10 + rand() * 8;  // 10..18s
    return {
      id: i,
      size,
      left,
      delay,
      duration,
    };
  });
}

export default function Footer() {
  const ref = useRef(null);

  // ✅ Deterministic bubbles generated once (no Math.random anywhere)
  const [bubbles] = useState(() => makeBubbles("weijie-footer", 15));

  // Reveal animation on scroll
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const els = root.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-inview");
          else e.target.classList.remove("is-inview");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={ref} className="footer">
      {/* Background */}
      <div
        className="footer-bg"
        style={{ backgroundImage: 'url("/assets/footer.png")' }}
        aria-hidden="true"
      />

      {/* Bubbles */}
      <div className="footer-bubbles" aria-hidden="true">
        {bubbles.map((b) => (
          <span
            key={b.id}
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDelay: `${b.delay.toFixed(2)}s`,
              animationDuration: `${b.duration.toFixed(2)}s`,
            }}
          />
        ))}
      </div>

      <div className="footer-overlay" aria-hidden="true" />

      <div className="footer-content">
        {/* Logo + tagline */}
        <div className="footer-left reveal" data-anim="up">
          <img
            className="footer-logo"
            src="/assets/Weijie_Logo1.png"
            alt="Wei Jie logo"
            style={{ width: "200px", height: "80px" }}
            loading="lazy"
            decoding="async"
          />
          <p>Full-Stack Vision. Design Precision. Real-World Creation.</p>
        </div>

        {/* Navigation */}
        <div className="footer-links reveal" data-anim="up">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
          </ul>
        </div>

        {/* Socials (keeping your <Link> style) */}
        <div className="footer-connect reveal" data-anim="up">
          <h4>Connect</h4>
          <div className="socials">
            <Link
              className="social-btn ln"
              to="https://www.linkedin.com/in/hooi-weijie-b13b11310/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Icons/icons8-linkedin-48.png" alt="LinkedIn" />
            </Link>

            <Link
              className="social-btn gh"
              to="https://github.com/WebDeveloper1299"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Icons/icons8-github-30.png" alt="GitHub" />
            </Link>

            <Link
              className="social-btn ol"
              to="mailto:24040351@myrp.edu.sg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Icons/icons8-outlook-48.png" alt="Email" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom reveal" data-anim="up">
        <p>© 2025 Wei Jie · All Rights Reserved</p>
      </div>
    </footer>
  );
}
