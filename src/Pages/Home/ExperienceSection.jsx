import React, { useEffect, useMemo, useRef } from "react";
import "./experience.css";

const toRad = (d) => (d * Math.PI) / 180;

function maxDistWithinStage({ cx, cy, sw, sh, halfW, halfH, dx, dy, safe }) {
  const minX = halfW + safe;
  const maxX = sw - halfW - safe;
  const minY = halfH + safe;
  const maxY = sh - halfH - safe;

  const limits = [];
  if (dx > 0) limits.push((maxX - cx) / dx);
  else if (dx < 0) limits.push((minX - cx) / dx);
  if (dy > 0) limits.push((maxY - cy) / dy);
  else if (dy < 0) limits.push((minY - cy) / dy);

  const pos = limits.filter((v) => Number.isFinite(v) && v > 0);
  return pos.length ? Math.min(...pos) : Number.POSITIVE_INFINITY;
}

function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-inview", e.isIntersecting)
        ),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

export default function Experience() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const coreRef = useRef(null);
  const panelRefs = useRef([]);
  const pathRefs = useRef([]);
  const gradRefs = useRef([]);

  useReveal(rootRef);

  const items = useMemo(
    () => [
      {
        id: "figma",
        title: "Figma",
        logo: "/assets/Icons/Figma.png",
        copy:
          "I map flows, wireframe quickly, and build pixel-perfect UI for fast feedback and iteration.",
        corner: "tl",
      },
      {
        id: "ai",
        title: "Illustrator",
        logo: "/assets/Icons/Adobe_Illustrator.png",
        copy:
          "I craft logos, icons, and scalable vectors to keep brand assets crisp at any size.",
        corner: "tr",
      },
      {
        id: "xd",
        title: "Adobe XD",
        logo: "/assets/Icons/AdobeXD.png",
        copy:
          "I prototype interactions to validate usability early and communicate intent clearly.",
        corner: "bl",
      },
      {
        id: "ps",
        title: "Photoshop",
        logo: "/assets/Icons/Adobe-Photoshop.png",
        copy:
          "I retouch, light, and composite visuals so screens feel polished and production-ready.",
        corner: "br",
      },
    ],
    []
  );

  useEffect(() => {
    const stage = stageRef.current;
    const coreDisc = coreRef.current;
    if (!stage || !coreDisc) return;

    const clearLines = () => {
      pathRefs.current.forEach((p) => p?.setAttribute("d", ""));
    };

    const layout = () => {
      if (typeof window === "undefined") return;

      const w = window.innerWidth;

      // ✅ mobile/tablet: no lines + no absolute positioning
      if (w <= 900) {
        clearLines();
        return;
      }

      const sw = stage.clientWidth;
      const sh = stage.clientHeight;

      const hubSize = coreDisc.offsetWidth || 420;
      const radius = hubSize / 2;

      const cx = sw / 2;
      const cy = sh / 2;

      // ✅ Spread to 4 sides (fix “too close”)
      const SAFE = 10;          // keeps inside stage edges
      const EXTRA_RING = 200;    // pushes cards outward
      const START_ON_RIM = 0.92; // start line at rim
      const GAP_TO_CARD = 4;    // stop before touching card

      items.forEach((it, i) => {
        const panel = panelRefs.current[i];
        const path = pathRefs.current[i];
        const grad = gradRefs.current[i];
        if (!panel || !path || !grad) return;

        panel.classList.add("is-inview");

        // angles to corners
        let angle;
        if (it.corner === "tl") angle = 225;
        else if (it.corner === "tr") angle = 315;
        else if (it.corner === "bl") angle = 135;
        else angle = 45;

        const dx = Math.cos(toRad(angle));
        const dy = Math.sin(toRad(angle));

        const halfW = panel.offsetWidth / 2;
        const halfH = panel.offsetHeight / 2;

        const projectedHalf = Math.abs(dx) * halfW + Math.abs(dy) * halfH;

        // ✅ Ensure always outside hub (minDist)
        const minDist = radius + projectedHalf + 140;
        const ringDist = radius + projectedHalf + EXTRA_RING;

        const maxDist = maxDistWithinStage({
          cx,
          cy,
          sw,
          sh,
          halfW,
          halfH,
          dx,
          dy,
          safe: SAFE,
        });

        const dist = Math.min(Math.max(minDist, ringDist), maxDist);

        // panel center
        const px = cx + dist * dx;
        const py = cy + dist * dy;

        panel.style.left = `${px}px`;
        panel.style.top = `${py}px`;

        // line start on hub rim
        const sx = cx + radius * START_ON_RIM * dx;
        const sy = cy + radius * START_ON_RIM * dy;

        // line end at card edge minus gap
        const kx = dx !== 0 ? halfW / Math.abs(dx) : Infinity;
        const ky = dy !== 0 ? halfH / Math.abs(dy) : Infinity;
        const k = Math.min(kx, ky);

        const edgeX = px - dx * k;
        const edgeY = py - dy * k;

        const ex = edgeX - dx * GAP_TO_CARD;
        const ey = edgeY - dy * GAP_TO_CARD;

        path.setAttribute("d", `M ${sx},${sy} L ${ex},${ey}`);
        grad.setAttribute("x1", sx);
        grad.setAttribute("y1", sy);
        grad.setAttribute("x2", ex);
        grad.setAttribute("y2", ey);
      });
    };

    const run = () => requestAnimationFrame(() => requestAnimationFrame(layout));
    run();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(run);
      ro.observe(stage);
    }
    window.addEventListener("resize", run);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, [items]);

  return (
    <section ref={rootRef} className="exp">
      <div
        className="exp-bg"
        style={{
          backgroundImage:
            "url(/assets/HomeBackgroundImage/cloudy-1869753_1920.png)",
        }}
        aria-hidden="true"
      />

      <div ref={stageRef} className="stage">
        {/* HUB */}
        <div className="core breathe">
          <div ref={coreRef} className="core-disc halo reveal">
            <h3 className="exp-title--galaxy">My Design Toolkit</h3>
            <p className="exp-desc">
              I craft seamless interfaces — these are the tools I rely on to
              plan, design, prototype, and polish every screen.
            </p>
          </div>
        </div>

        {/* LINES (desktop only via CSS) */}
        <svg className="arrows" width="100%" height="100%" aria-hidden="true">
          <defs>
            {items.map((_, i) => (
              <linearGradient
                key={i}
                id={`lineBlend-${i}`}
                ref={(el) => (gradRefs.current[i] = el)}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="rgba(150,178,255,0)" />
                <stop offset="55%" stopColor="rgba(150,178,255,.95)" />
                <stop offset="100%" stopColor="rgba(150,178,255,0)" />
              </linearGradient>
            ))}
          </defs>

          {items.map((_, i) => (
            <path
              key={i}
              ref={(el) => (pathRefs.current[i] = el)}
              className="arrow-path"
              style={{ stroke: `url(#lineBlend-${i})` }}
            />
          ))}
        </svg>

        {/* PANELS */}
        <div className="panels">
          {items.map((it, i) => (
            <div
              key={it.id}
              ref={(el) => (panelRefs.current[i] = el)}
              className="panel reveal"
            >
              <article className="panel-card">
                <header className="panel-head">
                  <img className="tool" src={it.logo} alt={it.title} />
                  <h4 className="caption">{it.title}</h4>
                </header>
                <p className="copy">{it.copy}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
