import React, { useEffect, useRef } from "react";
import "./hero.css";

export default function GreenHabitHero({
  id = "green-habit-hero",
  bgImage = "/assets/MobileProjectDetails2/portal-7256636_1920.jpg",
  eyebrow = "React Native Mobile Application Development",
  title = "Green Habit\nTracker",
  subtitle =
    "Track eco-friendly habits, organise them by category, and see progress clearly — designed to make sustainable actions easier to keep up.",
  primaryBtn = "View Case Study",
  primaryLink = "/case-study/green-habit-tracker",
  secondaryBtn = "View GitHub",
  secondaryLink = "https://github.com/WebDeveloper1299",
}) {
  const bgImgRef = useRef(null);
  const cardRef = useRef(null);

  // Parallax: translateY only (NO scale)
  useEffect(() => {
    const img = bgImgRef.current;
    if (!img) return;

    let raf = 0;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const vh = window.innerHeight || 1;
        const p = clamp(y / (vh * 2), 0, 1);
        const eased = p * (2 - p);

        const ty = (eased * 14).toFixed(1);
        img.style.transform = `translate3d(0, ${ty}px, 0)`;
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal only on the card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => card.classList.toggle("is-shown", e.isIntersecting)),
      { threshold: 0.15 }
    );

    io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <section className="gh-hero" id={id} aria-label="Green Habit Tracker hero">
      {/* background */}
      <div className="gh-bgwrap" aria-hidden="true">
        <img ref={bgImgRef} className="gh-bgimg" src={bgImage} alt="" />
      </div>

      <div className="gh-overlay" aria-hidden="true" />

      <div className="gh-inner">
        <article ref={cardRef} className="gh-glass">
          <p className="gh-eyebrow">{eyebrow}</p>

          {/* ✅ Use global gradient title style */}
          <h1 className="gh-title title-aurora">
            {title.split("\n").map((line, i) => (
              <span key={i} className="gh-title-line">{line}</span>
            ))}
          </h1>

          {/* ✅ Subtitle uses global body-muted already in styles.css */}
          <p className="gh-sub">{subtitle}</p>

          <div className="gh-ctas">
            <a href={primaryLink} className="gh-btn primary">{primaryBtn}</a>
            <a
              href={secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gh-btn ghost"
            >
              {secondaryBtn}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
