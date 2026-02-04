import React, { useEffect, useRef } from "react";
import { CheckCircle2, AlertTriangle, GraduationCap } from "lucide-react";
import "./learning.css";

export default function ReflectionLearning({
  id = "reflection-learning",
  eyebrow = "WHAT I LEARNED FROM THIS PROJECT",
  title = "How working in a team helped me grow",
  subtitle = "A short reflection on what went well, what was challenging, and what I learned while building this project.",
  bgImage = "/assets/MobileProjectDetails2/ai-generated-7801994_1920.jpg",
}) {
  const rootRef = useRef(null);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  const winsText =
    "Working in a team helped the project move faster and smoother. Each member had a clear role, and we supported each other when problems came up. By sharing ideas and checking each other’s work, we kept the design and implementation consistent.";

  const challengesText =
    "Team collaboration was not always easy. Different opinions and working styles sometimes caused confusion. As the leader, I had to track progress, assign tasks, and make sure everything was correct and running. Balancing deadlines, communication, and quality was challenging.";

  const learningsText =
    "I learned that communication and teamwork are key to success. I improved at planning tasks clearly, following up, and keeping everyone aligned. Being a leader is not just making decisions — it’s listening, supporting the team, and staying responsible until the final output works well.";

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

  // Direction-aware reveal animations
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
        if (side === "left") setVars(el, "-54px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "54px", "12px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "54px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-54px", "12px", "0px", "0px");
        else setVars(el, "0px", "20px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
    };

    const leave = (el, side, dir) => {
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-54px", "18px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      } else {
        if (side === "left") setVars(el, "0px", "0px", "54px", "18px", 1, 0.96);
        else if (side === "right") setVars(el, "0px", "0px", "-54px", "18px", 1, 0.96);
        else setVars(el, "0px", "0px", "0px", "18px", 1, 0.96);
      }
      el.classList.add("reveal", "is-out");
      el.classList.remove("is-in");
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 6) * 60}ms`;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section className="rl-stage" id={id} ref={rootRef}>
      {/* Background */}
      <div className="rl-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      {/* ✅ Glass Header Panel (like screenshot) */}
      <header className="rl-header-glass" data-reveal data-side="center" data-stagger>
        <p className="rl-eyebrow-glass">{eyebrow}</p>
        <h2 className="rl-title-glass">{title}</h2>
        <p className="rl-subtitle-glass">{subtitle}</p>
      </header>

      {/* Metrics */}
      <ul className="rl-metrics" data-reveal data-side="center" data-stagger>
        <li className="rl-metric">
          <span className="rl-metric-value">Team</span>
          <span className="rl-metric-label">Project Type</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">Leader</span>
          <span className="rl-metric-label">Role</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">Clear</span>
          <span className="rl-metric-label">Communication</span>
        </li>
        <li className="rl-metric">
          <span className="rl-metric-value">Done</span>
          <span className="rl-metric-label">Delivery</span>
        </li>
      </ul>

      {/* Reflection Cards */}
      <div className="rl-grid">
        <div className="rl-card" data-reveal data-side="left" data-stagger>
          <h3 className="rl-card-title">
            <CheckCircle2 size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            What went well
          </h3>
          <p className="rl-copy">{winsText}</p>
        </div>

        <div className="rl-card" data-reveal data-side="right" data-stagger>
          <h3 className="rl-card-title">
            <AlertTriangle size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            What was challenging
          </h3>
          <p className="rl-copy">{challengesText}</p>
        </div>

        <div className="rl-card wide" data-reveal data-side="center" data-stagger>
          <h3 className="rl-card-title">
            <GraduationCap size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            What I learned
          </h3>
          <p className="rl-copy">{learningsText}</p>
        </div>
      </div>
    </section>
  );
}
