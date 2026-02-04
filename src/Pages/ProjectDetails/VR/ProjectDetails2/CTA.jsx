// FinalCTA.jsx — XR collaboration CTA (scroll-direction reveal, aurora title)
import React, { useEffect, useRef } from "react";
import "./cta.css";
import { Link } from "react-router-dom"; // <-- if you see error, change to: import { Link } from "react-router-dom";

/* ✅ Move SmartButton OUTSIDE component */
function SmartButton({ to, className, children }) {
  const external = /^https?:\/\//i.test(to || "");
  return external ? (
    <a
      href={to}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link to={to || "#"} className={className}>
      {children}
    </Link>
  );
}

export default function FinalCTA({
  id = "final-cta",

  heading = "Let’s Create Immersive Worlds Together",
  tagline =
    "I design and build immersive XR experiences — from emotional spaces and diegetic UI to hand-based interaction and puzzle logic in Unity. If you're exploring VR, AR, or real-time 3D storytelling, I'd love to collaborate.",

  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/planet-6977161_1920.jpg",

  primaryHref = "https://www.linkedin.com/in/hooi-weijie-b13b11310",
  secondaryHref = "https://github.com/WeijieRP",
  primaryLabel = "Connect with Me",
  secondaryLabel = "View GitHub",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const dir = y > lastY.current ? "down" : "up";
      root.setAttribute("data-dir", dir);
      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const items = root.querySelectorAll(".fcta-snap");
    items.forEach((el, i) => el.style.setProperty("--i", i.toString()));

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-in");
          else e.target.classList.remove("is-in");
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
    );

    items.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      items.forEach((el) => io.unobserve(el));
      io.disconnect();
    };
  }, []);

  return (
    <section ref={rootRef} className="fcta-stage" id={id}>
      <div
        className="fcta-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div className="fcta-overlay" aria-hidden="true" />

      <div className="fcta-content">
        <div className="fcta-glass fcta-snap">
          <h2 className="fcta-heading">{heading}</h2>
          <p className="fcta-tagline">{tagline}</p>
        </div>

        <div className="fcta-actions fcta-snap">
          <SmartButton to={primaryHref} className="fcta-btn fcta-btn--primary">
            {primaryLabel}
          </SmartButton>

          <SmartButton to={secondaryHref} className="fcta-btn fcta-btn--ghost">
            {secondaryLabel}
          </SmartButton>
        </div>
      </div>
    </section>
  );
}
