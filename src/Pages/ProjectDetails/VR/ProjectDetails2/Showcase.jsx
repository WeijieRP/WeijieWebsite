import React, { useEffect, useRef, useState } from "react";
import "./showcasework.css";

export default function EscapeRoomVRDemo({
  id = "escape-vr-demo",
  title = "Escape Archive VR — Gameplay Demo",
  bgImage = "/assets/PortfolioVRProjectDetails2BackgroundImage/heramb-kamble-PfGXoM4ZPCc-unsplash.jpg",
  shotA = "/assets/VR_ArtWork/Room1.png",
  shotB = "/assets/VR_ArtWork/ExitRoom_storyboard.png",
  youtubeId = "",
  mp4Src = "/assets/Gameplay/EscapeRoom_24040351_Weijie.mp4",
  caption = "A guided journey through Curiosity → Doubt → Fear → Acceptance → Exit.",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  const [showImg, setShowImg] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  // Track scroll direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Direction-aware reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-reveal]");

    const setVars = (el, fromX, fromY, toX, toY, fromScale = 0.96, toScale = 1) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.setProperty("--from-scale", String(fromScale));
      el.style.setProperty("--to-scale", String(toScale));
    };

    const enter = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "-48px", "10px", "0", "0");
        else if (side === "right") setVars(el, "48px", "10px", "0", "0");
        else setVars(el, "0", "18px", "0", "0");
      } else {
        if (side === "left") setVars(el, "48px", "10px", "0", "0");
        else if (side === "right") setVars(el, "-48px", "10px", "0", "0");
        else setVars(el, "0", "18px", "0", "0");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "0", "0", "-48px", "16px", 1, 0.96);
        else if (side === "right") setVars(el, "0", "0", "48px", "16px", 1, 0.96);
        else setVars(el, "0", "0", "0", "18px", 1, 0.96);
      } else {
        if (side === "left") setVars(el, "0", "0", "48px", "16px", 1, 0.96);
        else if (side === "right") setVars(el, "0", "0", "-48px", "16px", 1, 0.96);
        else setVars(el, "0", "0", "0", "18px", 1, 0.96);
      }
      el.classList.add("reveal", "is-out");
      el.classList.remove("is-in");
      void el.offsetWidth;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const dir = dirRef.current;
        entries.forEach((e) => {
          const el = e.target;
          const side = el.getAttribute("data-side") || "center";
          if (e.isIntersecting) enter(el, side, dir);
          else leave(el, side, dir);
        });
      },
      { threshold: 0.22 }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 5) * 70}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const hasYouTube = Boolean(youtubeId);
  const ytSrc = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`;

  const closeOnBackdrop = (setter) => (e) => {
    if (e.target.classList.contains("arc-modal")) setter(false);
  };

  return (
    <section className="arc-section arc-crisp" id={id} ref={rootRef} aria-label="Escape Archive VR — Gameplay Demo">
      <div className="arc-bg" style={{ backgroundImage: `url(${bgImage})` }} aria-hidden="true" />
      <div className="arc-overlay" aria-hidden="true" />

      <header className="arc-head">
        <div className="arc-headGlass" data-reveal data-side="center" data-stagger>
          <h2 className="arc-title title-aurora">{title}</h2>
          <p className="arc-sub">
            Solve emotion-themed rooms, unlock the path, and step into the Exit — sky, wind, and freedom.
          </p>
        </div>
      </header>

      <div className="arc-cards" data-reveal data-side="left" data-stagger>
        <figure className="arc-card" onClick={() => setShowImg(shotA)}>
          <img src={shotA} className="arc-img" alt="Curiosity Room — first clues" />
          <figcaption>Curiosity — follow the light and symbols</figcaption>
        </figure>

        <figure className="arc-card" onClick={() => setShowImg(shotB)}>
          <img src={shotB} className="arc-img" alt="Acceptance Room — storyboard" />
          <figcaption>Acceptance — storyboard overview</figcaption>
        </figure>
      </div>

      <div className="arc-player" data-reveal data-side="center" data-stagger>
        <div className="browser-frame">
          <div className="browser-topbar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="bar-title">EscapeArchiveVR_Demo.mp4</span>
          </div>
          <div className="browser-content">
            {hasYouTube ? (
              <div className="arc-iframe-wrap">
                <iframe
                  className="arc-iframe"
                  src={ytSrc}
                  title="Escape Archive VR Demo"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            ) : (
              <video className="arc-video" controls playsInline preload="metadata">
                <source src={mp4Src} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
        <p className="arc-caption">{caption}</p>
      </div>

      <div className="arc-actions" data-reveal data-side="right" data-stagger>
        <button className="arc-btn primary" onClick={() => setShowHints(true)}>
          Puzzle Hints
        </button>
        <button className="arc-btn outline" onClick={() => setShowSteps(true)}>
          Build Steps
        </button>
      </div>

      {/* ✅ Image Zoom Modal (fixed for wide storyboard) */}
      {showImg && (
        <div className="arc-modal" onClick={closeOnBackdrop(setShowImg)} role="dialog" aria-modal="true">
          <div className="arc-modal-card arc-modal-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="arc-modal-head">
              <h3>Screenshot Preview</h3>
              <button className="arc-x" onClick={() => setShowImg(null)} aria-label="Close">
                ×
              </button>
            </div>

            {/* ✅ scrollable area so wide images can pan */}
            <div className="arc-modal-media">
              <img src={showImg} className="arc-modal-img" alt="Screenshot preview" />
            </div>
          </div>
        </div>
      )}

      {/* Hints Modal */}
      {showHints && (
        <div className="arc-modal" onClick={closeOnBackdrop(setShowHints)} role="dialog" aria-modal="true">
          <div className="arc-modal-card arc-modal-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="arc-modal-head">
              <h3>Escape Archive VR — Puzzle Hints</h3>
              <button className="arc-x" onClick={() => setShowHints(false)} aria-label="Close">
                ×
              </button>
            </div>
            <ul className="arc-list">
              <li><strong>Curiosity:</strong> Observe patterns first, then interact — the order matters.</li>
              <li><strong>Doubt:</strong> Cross-check symbols; one clue is a red herring.</li>
              <li><strong>Fear:</strong> Lights and audio react to progress — listen for the “right” tone.</li>
              <li><strong>Acceptance:</strong> Align objects so their shadows form one motif.</li>
              <li><strong>Exit:</strong> When leaves rise, look up — the final path is open.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Steps Modal */}
      {showSteps && (
        <div className="arc-modal" onClick={closeOnBackdrop(setShowSteps)} role="dialog" aria-modal="true">
          <div className="arc-modal-card arc-modal-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="arc-modal-head">
              <h3>Unity Build Steps (Escape Archive VR)</h3>
              <button className="arc-x" onClick={() => setShowSteps(false)} aria-label="Close">
                ×
              </button>
            </div>
            <ol className="arc-steps">
              <li>Create Unity project (URP recommended). Set XR plugins.</li>
              <li>Set up XR Rig/Origin, controllers, interaction toolkit.</li>
              <li>Build rooms + lighting (baked GI, probes).</li>
              <li>Implement puzzles (C# scripts + triggers + states).</li>
              <li>Optimize (draw calls, LODs, lightmaps, occlusion).</li>
              <li>Build & test on device, profile and refine.</li>
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}
