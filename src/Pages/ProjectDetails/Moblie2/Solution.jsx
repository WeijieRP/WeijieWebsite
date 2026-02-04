import React, { useEffect, useRef } from "react";
import "./solution.css";

export default function GreenHabitSolutionShowcase({
  id = "green-habit-solution",
  bgImage = "/assets/MobileProjectDetails2/uhd-6686654_1920.jpg",
  rightImage =
    "/assets/MobileProjectDetails2/Solutionss.png",
}) {
  const rootRef = useRef(null);

  // reveal animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-in", e.isIntersecting)
        ),
      { threshold: 0.12 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={rootRef}
      className="ghs2-section"
      style={{ ["--ghs2-bg"]: `url("${bgImage}")` }}
      aria-label="Green Habit Tracker solution and approach"
    >
      <div className="ghs2-bg" aria-hidden="true" />
      <div className="ghs2-vignette" aria-hidden="true" />
      <div className="ghs2-planet" aria-hidden="true" />

      <div className="ghs2-inner">
        {/* LEFT GLASS CARD */}
        <article className="ghs2-card ghs2-left" data-reveal>
          <p className="ghs2-eyebrow">GREEN HABIT TRACKER</p>

          <h2 className="ghs2-title">
            <span>Solution &</span>
            <span>Approach</span>
          </h2>

          <p className="ghs2-desc">
            I built a simple tracker that lets users log eco-friendly habits in
            seconds. Habits are organised by category, and progress is shown
            clearly so users can stay consistent over time.
          </p>

          <div className="ghs2-tags">
            <span>Quick Logging</span>
            <span>Categories</span>
            <span>Progress</span>
            <span>Expo</span>
            <span>Express API</span>
            <span>MySQL</span>
          </div>
        </article>

        {/* RIGHT IMAGE CARD */}
        <figure className="ghs2-card ghs2-right" data-reveal>
          <div
            className="ghs2-image"
            style={{ backgroundImage: `url("${rightImage}")` }}
            role="img"
            aria-label="Green Habit Tracker screens and progress view"
          />
          <figcaption className="ghs2-cap">
            Stack: React Native (Expo) → Node/Express API → MySQL database.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
