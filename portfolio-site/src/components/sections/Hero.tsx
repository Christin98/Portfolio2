"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, ChartBar, Database, Lightning } from "@phosphor-icons/react";

const ROLES = [
  "Power BI Team Lead",
  "Microsoft Fabric Developer",
  "Data Analytics Engineer",
  "Azure Data Architect",
];

const STATS = [
  { value: "4+", label: "Years in data", icon: ChartBar },
  { value: "50+", label: "Dashboards shipped", icon: Database },
  { value: "100M+", label: "Rows processed", icon: Lightning },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const roleRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Rotating role text — DOM-only, no React state re-renders
  useEffect(() => {
    const el = roleRef.current;
    if (!el || reduce) return;
    let i = 0;
    const tick = () => {
      i = (i + 1) % ROLES.length;
      indexRef.current = i;
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      setTimeout(() => {
        if (el) {
          el.textContent = ROLES[i];
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      }, 350);
    };
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, [reduce]);

  // Magnetic orb parallax — motion values, no state
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, mouseX, mouseY]);

  const orbX = useTransform(mouseX, [-1, 1], [-30, 30]);
  const orbY = useTransform(mouseY, [-1, 1], [-20, 20]);
  const orbX2 = useTransform(mouseX, [-1, 1], [20, -20]);
  const orbY2 = useTransform(mouseY, [-1, 1], [15, -15]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "100px",
      }}
    >
      {/* Reactive orbs */}
      <motion.div
        style={{
          position: "absolute", top: "15%", right: "8%",
          width: 500, height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          x: orbX, y: orbY,
        }}
      />
      <motion.div
        style={{
          position: "absolute", bottom: "15%", right: "25%",
          width: 380, height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          x: orbX2, y: orbY2,
        }}
      />

      <div className="section-container" style={{ zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

          {/* LEFT — Copy block, left-aligned (anti-center-bias directive) */}
          <motion.div
            variants={containerVariants}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            {/* Eyebrow — used once on the page */}
            <motion.div variants={itemVariants} className="eyebrow">
              <span className="eyebrow-dot" />
              Available for new projects
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="display-2xl"
              style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 16 }}
            >
              Hi, I'm{" "}
              <span style={{ color: "var(--accent)" }}>Christin</span>
              <br />
              Koshy.
            </motion.h1>

            {/* Rotating subtitle — DOM mutation, no React re-renders */}
            <motion.div
              variants={itemVariants}
              style={{ marginBottom: 28, height: 32, overflow: "hidden" }}
            >
              <span
                ref={roleRef}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  letterSpacing: "-0.02em",
                  display: "block",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                {ROLES[0]}
              </span>
            </motion.div>

            {/* Sub-paragraph — max 20 words */}
            <motion.p
              variants={itemVariants}
              className="body-lg"
              style={{ color: "var(--text-secondary)", marginBottom: 40 }}
            >
              Engineering data pipelines, Power BI ecosystems, and Microsoft Fabric
              architectures that turn raw data into decisions.
            </motion.p>

            {/* CTAs — one primary, one ghost, unique intents */}
            <motion.div variants={itemVariants} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="#contact"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start a project
                <span className="btn-icon">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </a>
              <a
                href="#projects"
                className="btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View my work
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              style={{
                marginTop: 48, paddingTop: 32,
                borderTop: "1px solid var(--border)",
                display: "flex", gap: 32,
              }}
            >
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      display: "flex", alignItems: "center", gap: 4, marginTop: 2,
                    }}
                  >
                    <Icon size={12} weight="regular" />
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Visual asset: floating bento-style cards */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto auto",
              gap: 12,
            }}
          >
            {/* Profile card — double-bezel */}
            <div
              className="bezel-outer"
              style={{ gridColumn: "1 / -1" }}
            >
              <div
                className="bezel-inner"
                style={{
                  padding: "24px",
                  display: "flex", alignItems: "center", gap: 16,
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 64, height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--accent) 0%, rgba(99,102,241,0.8) 100%)",
                    border: "2px solid var(--border-strong)",
                    flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.2rem", fontWeight: 700,
                    color: "#050505",
                  }}
                >
                  CK
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
                    Christin Koshy
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>
                    Power BI Team Lead
                  </div>
                  <div
                    style={{
                      marginTop: 8, display: "flex", alignItems: "center", gap: 6,
                      fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                      color: "var(--accent)",
                    }}
                  >
                    <span
                      style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "var(--accent)",
                        boxShadow: "0 0 8px var(--accent)",
                        animation: "pulse-dot 2s ease-in-out infinite",
                        display: "inline-block",
                      }}
                    />
                    Open to opportunities
                  </div>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            {[
              { n: "50+", d: "Reports", color: "var(--accent)" },
              { n: "4+", d: "Yrs exp", color: "rgba(99,102,241,0.9)" },
              { n: "20+", d: "Clients", color: "var(--accent)" },
              { n: "100M+", d: "Rows/day", color: "rgba(99,102,241,0.9)" },
            ].map(({ n, d, color }, i) => (
              <motion.div
                key={d}
                className="bento-cell"
                style={{ padding: "20px" }}
                animate={reduce ? {} : { y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.04em", color }}>
                  {n}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 4, fontFamily: "var(--font-mono)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {d}
                </div>
              </motion.div>
            ))}

            {/* Tech strip */}
            <div
              className="bento-cell"
              style={{ gridColumn: "1 / -1", padding: "16px 20px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}
            >
              {["Power BI", "DAX", "Azure", "Fabric", "SQL"].map((t) => (
                <span key={t} className="cert-badge" style={{ fontSize: "0.65rem" }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
