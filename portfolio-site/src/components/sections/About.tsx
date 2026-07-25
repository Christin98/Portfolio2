"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Lightbulb, Users, Code, RocketLaunch } from "@phosphor-icons/react";

const counters = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Dashboards Built" },
  { value: 20, suffix: "+", label: "Clients Served" },
  { value: 100, suffix: "M+", label: "Rows Processed" },
];

const storyCards = [
  {
    icon: RocketLaunch,
    title: "My Journey",
    description:
      "Evolved from raw data exploration into leading enterprise Power BI & Fabric architectures. Built with a deliberate focus on performance and business impact.",
  },
  {
    icon: Users,
    title: "Leadership",
    description:
      "Directing cross-functional analytics teams, setting DAX & data engineering standards, and bridging executive vision with engineering execution.",
  },
  {
    icon: Lightbulb,
    title: "Data Philosophy",
    description:
      "Transforming complex datasets into clear, actionable intelligence. Focused on intuitive visual hierarchy and sub-second report response times.",
  },
  {
    icon: Code,
    title: "Engineering Rigor",
    description:
      "From complex DAX calculations to Microsoft Fabric OneLake Lakehouses — approaching every layer of the data stack with precision and clean design.",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let start = 0;
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();

  return (
    <section id="about" ref={ref} className="section-wrapper">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          <h2 className="display-lg" style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            Behind the analytics
          </h2>
          <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
            Building high-performance data systems that empower decisions at scale.
          </p>
        </motion.div>

        {/* Counter Strip */}
        <motion.div
          className="bento-grid"
          style={{ marginBottom: 48 }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {counters.map((c, i) => (
            <div
              key={c.label}
              className="bento-cell"
              style={{ gridColumn: "span 3", padding: "24px" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "-0.04em",
                  marginBottom: 4,
                }}
              >
                <AnimatedCounter value={c.value} suffix={c.suffix} />
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                {c.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Story Grid — 2x2 bento */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}>
          {storyCards.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="bezel-outer"
              style={{ gridColumn: i % 2 === 0 ? "span 7" : "span 5" }}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bezel-inner" style={{ padding: "28px", height: "100%" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--r-md)",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon size={20} weight="regular" color="var(--accent)" />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: 8 }}>
                  {title}
                </h3>
                <p className="body-base" style={{ color: "var(--text-secondary)" }}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
