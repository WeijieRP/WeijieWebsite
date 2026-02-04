import React, { useEffect, useRef, useState } from "react";
import "./techstack.css";

export default function TechStackSection({
  id = "techstack",
  bgImage =
    "/assets/MobileProjectDetails2/abstract-7256616_1920.jpg",
  fallbackImage =
    "/assets/PortfolioMoblieProjectDetail2BackgroundImage/carlos-kenobi-Knla5kYvsRE-unsplash.jpg",
}) {
  const vpRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(bgImage);

  // Track scroll direction
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const dirRef = useRef("down");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      dirRef.current = y > lastY.current ? "down" : "up";
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Background parallax
  useEffect(() => {
    let raf = 0;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const tick = () => {
      const r = vpRef.current?.getBoundingClientRect();
      if (r && vpRef.current) {
        const vh = window.innerHeight || 1;
        const enter = vh,
          leave = -r.height;
        const p = clamp((enter - r.top) / (enter - leave), 0, 1);
        const d = Math.abs(p - 0.5) / 0.5;
        const scale = 1 + (1 - d) * 0.02;
        const ty = (p - 0.5) * 30;
        vpRef.current.style.setProperty("--bg-scale", scale.toFixed(3));
        vpRef.current.style.setProperty("--bg-ty", `${ty.toFixed(1)}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reveal animations (kept)
  useEffect(() => {
    const root = vpRef.current;
    if (!root) return;

    const setVars = (el, fromX, fromY, toX, toY) => {
      el.style.setProperty("--from-x", fromX);
      el.style.setProperty("--from-y", fromY);
      el.style.setProperty("--to-x", toX);
      el.style.setProperty("--to-y", toY);
      el.style.willChange = "transform";
    };

    const settle = (el) => {
      el.classList.add("settled");
      el.style.removeProperty("--from-x");
      el.style.removeProperty("--from-y");
      el.style.removeProperty("--to-x");
      el.style.removeProperty("--to-y");
      el.style.removeProperty("transform");
      el.style.willChange = "auto";
    };

    const onEnd = (e) => {
      const el = e.currentTarget;
      if (el.classList.contains("is-in")) settle(el);
    };

    const enter = (el, side, dir) => {
      el.classList.remove("settled");
      if (dir === "down") {
        if (side === "left") setVars(el, "-48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "48px", "12px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      } else {
        if (side === "left") setVars(el, "48px", "12px", "0px", "0px");
        else if (side === "right") setVars(el, "-48px", "12px", "0px", "0px");
        else setVars(el, "0px", "18px", "0px", "0px");
      }
      el.classList.add("reveal", "is-in");
      el.classList.remove("is-out");
      void el.offsetWidth;
    };

    const leave = (el, side, dir) => {
      el.classList.remove("settled");
      if (dir === "down") {
        if (side === "left") setVars(el, "0px", "0px", "-44px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "44px", "16px");
        else setVars(el, "0px", "0px", "0px", "18px");
      } else {
        if (side === "left") setVars(el, "0px", "0px", "44px", "16px");
        else if (side === "right") setVars(el, "0px", "0px", "-44px", "16px");
        else setVars(el, "0px", "0px", "0px", "18px");
      }
      el.classList.add("reveal", "is-out");
      el.classList.remove("is-in");
      void el.offsetWidth;
    };

    const targets = root.querySelectorAll("[data-reveal]");
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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el, i) => {
      if (el.hasAttribute("data-stagger")) {
        el.style.transitionDelay = `${120 + (i % 8) * 60}ms`;
      }
      el.addEventListener("transitionend", onEnd);
      io.observe(el);
    });

    return () => {
      targets.forEach((el) => el.removeEventListener("transitionend", onEnd));
      io.disconnect();
    };
  }, []);

  const items = [
    {
      name: "React Native",
      icon: "/assets/Web_Icons/icons8-react-js-96.png",
      use: "Build the mobile UI with reusable components and smooth navigation.",
      badge: "Frontend",
    },
    {
      name: "Expo",
      icon: "/assets/Icons/icons8-expo-96.png",
      use: "Fast development workflow for building, testing, and deploying React Native apps.",
      badge: "Framework",
    },
    {
      name: "Node.js",
      icon: "/assets/Web_Icons/icons8-node-js-96.png",
      use: "Runs the backend server to handle requests and connect to the database.",
      badge: "Backend",
    },
    {
      name: "Express.js",
      icon: "/assets/icons8-express-js-96.png",
      use: "Creates REST API routes for habits, categories, and progress tracking.",
      badge: "API",
    },
    {
      name: "MySQL",
      icon: "/assets/icons8-mysql-96.png",
      use: "Stores user habits, categories, and progress records reliably.",
      badge: "Database",
    },
    {
      name: "VS Code",
      icon: "/assets/Web_Icons/icons8-vs-code-96.png",
      use: "Main editor for writing frontend + backend code and debugging quickly.",
      badge: "Editor",
    },
  ];

  return (
    <section className="section-bg tech-section" id={id} aria-label="Green Habit Tracker Tech Stack">
      <div className="tech-viewport" ref={vpRef}>
        {/* Background */}
        <div className="bg-wrap" aria-hidden="true">
          <img
            className="bg-img"
            src={imgSrc}
            onError={() => setImgSrc(fallbackImage)}
            alt=""
          />
          <div className="bg-fallback" />
          <div className="bg-tint" />
        </div>

        {/* Content */}
        <div className="tech-content">
          <h2 className="tech-title" data-reveal data-side="center" data-stagger>
            Tech Stack for Green Habit Tracker
          </h2>
          <p className="tech-sub" data-reveal data-side="center" data-stagger>
            These are the tools and platforms I used to build the mobile app, backend API, and database system.
          </p>

          <div className="tech-grid" role="list">
            {items.map((t, i) => (
              <article
                className="tech-card"
                role="listitem"
                key={t.name + i}
                data-reveal
                data-stagger
                data-side={i % 2 === 0 ? "left" : "right"}
              >
                <div className="tech-card-head">
                  <img src={t.icon} alt={t.name} className="tech-card-icon" />
                  <h3 className="tech-card-title">{t.name}</h3>
                </div>

                <p className="tech-card-body">{t.use}</p>

                <div className="tech-card-pills">
                  <span className="tech-pill">{t.badge}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
