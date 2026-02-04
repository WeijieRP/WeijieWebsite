import React, { useRef, useEffect, useState } from "react";
import "./journey.css";

export default function DesignJourneyCarousel({
  id = "green-habit-journey",
  bgImage = "/assets/MobileProjectDetails2/futuristic-7789221_1920.jpg",
  items = [
    {
      week: "Week 1",
      title: "Ideation, Research & Scope",
      badges: ["Brainstorm", "Research", "Scope"],
      tasks: [
        "Brainstormed rough ideas for the app and what problem we want to solve.",
        "Did research (YouTube, examples) and used LLM tools to generate and refine ideas.",
        "Defined the project scope: key features, what is included/excluded, and success criteria.",
        "Planned who does what before starting implementation (roles + responsibilities).",
      ],
    },
    {
      week: "Week 2",
      title: "Start Implementation & Task Allocation",
      badges: ["Setup", "Teamwork", "Execution"],
      tasks: [
        "Set up the project structure and prepared the base screens/components.",
        "Dedicated tasks to each member (frontend, backend, UI, testing) with clear deliverables.",
        "Created milestones and deadlines so everyone knows what to finish each week.",
      ],
    },
    {
      week: "Week 3",
      title: "Team Coordination & Progress Tracking",
      badges: ["Leadership", "Milestones", "Communication"],
      tasks: [
        "Kept track of everyone’s progress and checked if tasks met the requirements.",
        "Helped teammates solve issues and ensured the app stays consistent as a team.",
        "Aligned the team on UI/UX decisions so the app looks and feels the same throughout.",
      ],
    },
    {
      week: "Week 3–4",
      title: "Meetings, Review & Improvements",
      badges: ["Meetings", "Review", "Refinement"],
      tasks: [
        "Held regular meetings to update progress and adjust plans when needed.",
        "Reviewed features together and fixed bugs or missing edge cases.",
        "Polished the flow and wording to keep the app simple and easy to use.",
      ],
    },
    {
      week: "Week 4",
      title: "Presentation & Live Demo",
      badges: ["Demo", "Presentation", "Final"],
      tasks: [
        "Prepared slides and key talking points for class presentation.",
        "Ran a live demo of the app to show the main flows and features clearly.",
        "Did final checks to ensure everything runs smoothly before presenting.",
      ],
    },
  ],
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  // Slide animation
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const goTo = (i) => setIndex(clamp(i, 0, items.length - 1));

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  // Drag / Swipe
  const startX = useRef(0);
  const deltaX = useRef(0);
  const isDown = useRef(false);

  const onPointerDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    deltaX.current = 0;
  };

  const onPointerMove = (e) => {
    if (!isDown.current || !trackRef.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? startX.current;
    deltaX.current = x - startX.current;

    trackRef.current.style.transition = "none";
    const base = -index * 100;
    const percentShift = (deltaX.current / trackRef.current.clientWidth) * 100;
    trackRef.current.style.transform = `translateX(calc(${base}% + ${percentShift}%))`;
  };

  const onPointerUp = () => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = "";
    isDown.current = false;

    const threshold = trackRef.current.clientWidth * 0.12;
    if (deltaX.current > threshold) prev();
    else if (deltaX.current < -threshold) next();
    else goTo(index);
  };

  return (
    <section className="tf-stage" id={id} aria-label="Development journey timeline">
      <div className="tf-bg" style={{ backgroundImage: `url(${bgImage})` }} aria-hidden="true" />
      <div className="tf-overlay" aria-hidden="true" />

      <div className="tf-container">
        <h2 className="tf-title">How We Built Green Habit Tracker</h2>
        <p className="tf-sub">
          A timeline of ideation, task allocation, teamwork, progress tracking, and final live demo.
        </p>

        <div
          className="tf-viewport"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <div className="tf-track" ref={trackRef}>
            {items.map((w, i) => (
              <article className="tf-card" key={i} role="group" aria-roledescription="slide">
                <header className="tf-head">
                  <span className="tf-week">{w.week}</span>
                  <h3 className="tf-card-title">{w.title}</h3>
                </header>

                <ul className="tf-badges">
                  {w.badges.map((b, j) => (
                    <li className="tf-badge" key={j}>{b}</li>
                  ))}
                </ul>

                <ul className="tf-list">
                  {w.tasks.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="tf-controls">
          <button className="tf-btn" onClick={prev} aria-label="Previous slide">←</button>

          <div className="tf-dots" role="tablist" aria-label="Slide dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`tf-dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === index}
                role="tab"
              />
            ))}
          </div>

          <button className="tf-btn" onClick={next} aria-label="Next slide">→</button>
        </div>
      </div>
    </section>
  );
}
