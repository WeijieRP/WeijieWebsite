import React, { useEffect, useRef } from "react";
import "./showcase.css";

export default function ArcMobileShowcase({
  bgImage = "/assets/MobileProjectDetails2/scifi-4916165_1920.jpg",

  title = "Green Habit Tracker",
  description =
    "A short demo video showcasing quick habit logging, category tracking, and progress updates — built with React Native (Expo) and a Node/Express + MySQL backend.",

  // ✅ valid local file
  videoSrc = "/assets/MobileProjectDetails2/GreenHabits.mp4",
  poster = "/assets/demo/gpa_poster.jpg",

  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
}) {
  const sectionRef = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    // track scroll direction
    const onScroll = () => {
      const y = window.scrollY || 0;
      root.setAttribute("data-scroll", y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // reveal
    const nodes = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.add("is-in");
            el.classList.remove("is-out"); // ✅ FIXED
          } else {
            el.classList.remove("is-in");
            el.classList.add("is-out");
          }
        }),
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    nodes.forEach((n) => io.observe(n));

    return () => {
      window.removeEventListener("scroll", onScroll);
      nodes.forEach((n) => io.unobserve(n));
      io.disconnect();
    };
  }, []);

  return (
    <section className="arc-section arc-crisp" ref={sectionRef} aria-label="Mobile demo showcase">
      {/* Background */}
      <div className="arc-bg" aria-hidden="true">
        <img className="arc-bg-img" src={bgImage} alt="" />
        <div className="arc-overlay" />
      </div>

      <div className="arc-grid">
        {/* LEFT: realistic phone frame */}
        <div className="arc-left reveal from-left" data-reveal>
          <div className="phone-real" aria-label="Mobile device preview">
            <div className="phone-real__frame">
              {/* side buttons */}
              <span className="phone-real__btn phone-real__btn--volup" />
              <span className="phone-real__btn phone-real__btn--voldown" />
              <span className="phone-real__btn phone-real__btn--power" />

              {/* top camera island */}
              <div className="phone-real__island" aria-hidden="true">
                <span className="phone-real__speaker" />
                <span className="phone-real__cam" />
              </div>

              {/* screen window */}
              <div className="phone-real__screen">
                <video
                  className="phone-real__video"
                  src={videoSrc}
                  poster={poster}
                  playsInline
                  autoPlay={autoPlay}
                  loop={loop}
                  muted={muted}
                  controls={controls}
                  preload="metadata"
                />
              </div>

              {/* bottom gesture bar (visual only) */}
              <div className="phone-real__bar" aria-hidden="true" />
            </div>
          </div>

          <p className="arc-caption">
            Demo: log habit → select category → view progress.
          </p>
        </div>

        {/* RIGHT: glass card */}
        <div className="arc-right reveal from-right" data-reveal>
          <div className="glass-card">
            <p className="arc-kicker">REACT NATIVE (EXPO) · NODE/EXPRESS · MYSQL</p>
            <h2 className="arc-title">{title}</h2>
            <p className="arc-sub">{description}</p>

            <div className="arc-pills">
              <span className="arc-pill">Quick logging</span>
              <span className="arc-pill">Categories</span>
              <span className="arc-pill">Progress</span>
              <span className="arc-pill">REST API</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
