import React, { useEffect, useRef } from "react";
import "./projects-built.css";
import { Link } from "react-router-dom";

export default function ProjectsBuilt({
  bgImage = "/assets/PortfolioMobileBackgroundImage/planet-5509642_1920.jpg",
}) {
  const rootRef = useRef(null);

  // Apply background image via CSS variable
  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      root.style.setProperty("--pg-bg", `url("${bgImage}")`);
    }
  }, [bgImage]);

  // Track scroll direction
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let lastY = window.scrollY || 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      root.setAttribute("data-scroll", y > lastY ? "down" : "up");
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = root.querySelectorAll(".pg-card");
    if (!cards.length) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-in", e.isIntersecting)
        ),
      { threshold: 0.2 }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const projects = [
    {
      title: "GPA Tracker — Grade Calculator",
      desc:
        "A simple offline GPA calculator that lets students add subjects, credits, and grades with instant GPA updates.",
      img: "/assets/Moblie/MobileView1.jpg",
      href: "/portfolio/Mobile/projectdetail1",
    },
    {
      title: "Green Habit Tracker",
      desc:
        "A sustainability-focused mobile app that helps users track eco-friendly habits such as transport, energy usage, and daily actions, backed by a full-stack system.",
      img: "/assets/MobileProjectDetails2/Solutionss.png",
      href: "/portfolio/Mobile/projectdetail2",
    },
  ];

  return (
    <section className="pg-section" ref={rootRef} id="mobile-projects">
      <div className="pg-bg" aria-hidden="true" />

      <header className="pg-header">
        <h2 className="pg-title-metallic">Projects That I Built</h2>
        <p className="pg-subtitle">
          These are mobile projects where I learned to design and develop real
          apps, including full-stack features.
        </p>
      </header>

      {/* ✅ 2 columns desktop/tablet, 1 column mobile */}
      <div className="pg-grid">
        {projects.map((p, idx) => (
          <article
            className="pg-card"
            key={p.title}
            data-dir={idx % 2 === 0 ? "left" : "right"}
          >
            <figure className="pg-media">
              <img src={p.img} alt={p.title} loading="lazy" />
            </figure>

            <div className="pg-body">
              <h3 className="pg-card-title">{p.title}</h3>
              <p className="pg-card-desc">{p.desc}</p>
              <Link to={p.href} className="pg-btn">
                View Project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
