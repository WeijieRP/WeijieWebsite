// VRHero.jsx
import React from "react";
import "./projectCTA.css";

export default function VRHero({
  id = "vr-hero",
  bgImage = "/assets/PortfolioVRBackgroundImage/moon-8013743_1920.jpg",

  titleTop = "FEATURED",
  titleBottom = "PROJECTS",

  subtitle =
    "A collection of AR/VR experiences I built — focused on clear interaction, player comfort, and immersive moments.",

  // ✅ Primary CTA: GitHub
  ctaText = "View GitHub Repo",
  ctaHref = "https://github.com/WeijieRP",

  // ✅ Secondary CTA: scroll to section
  secondaryText = "View Project Details",
  secondaryHref = "#vr-projects",
}) {
  const onScrollToSection = (e) => {
    // if it's an in-page anchor, smooth scroll
    if (!secondaryHref?.startsWith("#")) return;
    e.preventDefault();

    const targetId = secondaryHref.replace("#", "");
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="vr-hero"
      id={id}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="vr-hero-overlay" aria-hidden="true" />

      <div className="vr-hero-content">
        <div className="vr-panel">
          <h1 className="vr-title title-aurora">
            <span>{titleTop}</span>
            <br />
            <span>{titleBottom}</span>
          </h1>

          <p className="vr-sub section-subtitle">{subtitle}</p>

          <div className="vr-actions">
            {/* ✅ GitHub */}
            <a
              href={ctaHref}
              className="vr-btn vr-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaText}
            </a>

            {/* ✅ Smooth scroll to #vr-projects */}
            <a
              href={secondaryHref}
              className="vr-btn vr-btn-secondary"
              onClick={onScrollToSection}
            >
              {secondaryText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
