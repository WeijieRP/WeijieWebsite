import React, { useEffect, useRef } from "react";
import "./challenge.css";

export default function ChallengeSection({
  id = "portfolio",

  bgImage =
    "/assets/MobileProjectDetails2/ai-generated-8521599_1920.jpg",

  eyebrow = "Green Habit Tracker",
  title = "Problem & Challenge",
  summary ="Many people want to live more sustainably, but it is hard to keep eco-friendly habits over time. Actions like saving energy, reducing waste, or choosing greener transport are often forgotten without clear tracking or feedback. The challenge was to design a simple mobile app that helps users track green habits easily, organise them by category, and stay motivated through visible progress",
  problemImage =
    "/assets/MobileProjectDetails2/erone-stuff-Iv-SnVK3tQc-unsplash.png",

  problemCaption =
    "Goal: A simple and motivating system that helps users build sustainable habits and track real environmental impact over time.",
}) {
  const rootRef = useRef(null);
  const vpRef = useRef(null);

  /* Parallax + subtle zoom */
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    const loop = () => {
      const el = rootRef.current;
      const vp = vpRef.current;
      if (el && vp) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        const enter = vh;
        const leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;

        const scale = 1 + (1 - d) * 0.06;
        const ty = (p - 0.5) * 90;

        vp.style.setProperty("--scroll-scale", scale.toFixed(3));
        vp.style.setProperty("--scroll-ty", `${ty.toFixed(1)}px`);
        vp.style.setProperty("--stars-tx", `${(-10 + 20 * p).toFixed(1)}px`);
        vp.style.setProperty("--stars-ty", `${(6 - 12 * p).toFixed(1)}px`);
        vp.style.setProperty("--stars-rot", `${(-1 + 2 * p).toFixed(2)}deg`);
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Reveal animation */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const targets = el.querySelectorAll("[data-reveal]");

    if (reduce) {
      targets.forEach((t) => t.classList.add("is-shown"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-shown");
          else e.target.classList.remove("is-shown");
        }),
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.06 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-bg" id={id} ref={rootRef} aria-label="Challenge">
      <div className="ch-viewport" ref={vpRef}>
        {/* Background */}
        <div
          className="ch-bg kb-layer"
          style={{ backgroundImage: `url("${bgImage}")` }}
          aria-hidden="true"
        />
        <div className="ch-stars" aria-hidden="true" />
        <div className="ch-overlay" aria-hidden="true" />

        {/* Content */}
        <div className="ch-inner">
          <div className="ch-left">
            <div className="ch-hero-card" data-reveal="title">
              <p className="ch-eyebrow">{eyebrow}</p>
              <h2 className="ch-title">{title}</h2>
              <p className="ch-summary">{summary}</p>
            </div>
          </div>

          <aside className="ch-right">
            <figure className="ch-figure" data-reveal="figure">
              <img
                src={problemImage}
                alt="People building sustainable habits and tracking eco-friendly actions"
                className="ch-img"
                loading="lazy"
              />
              <figcaption className="ch-cap">
                {problemCaption}
              </figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </section>
  );
}
