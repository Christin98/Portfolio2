"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ChartBar, Database, Cloud, Code, GitBranch, Table,
  Gauge, Sparkle, BracketsSquare, TerminalWindow, Funnel, Share
} from "@phosphor-icons/react";

const SKILL_GROUPS = [
  {
    category: "Visualisation",
    icon: ChartBar,
    skills: [
      { name: "Power BI Desktop", pct: 97 },
      { name: "Power BI Service", pct: 95 },
      { name: "Power BI Embedded", pct: 88 },
      { name: "Paginated Reports", pct: 82 },
    ],
  },
  {
    category: "Data Engineering",
    icon: Database,
    skills: [
      { name: "Microsoft Fabric", pct: 90 },
      { name: "Azure Data Factory", pct: 86 },
      { name: "Azure Synapse", pct: 83 },
      { name: "Databricks", pct: 75 },
    ],
  },
  {
    category: "Languages",
    icon: Code,
    skills: [
      { name: "DAX", pct: 96 },
      { name: "SQL / T-SQL", pct: 92 },
      { name: "Power Query M", pct: 90 },
      { name: "Python (PySpark)", pct: 72 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "Azure (Data services)", pct: 88 },
      { name: "Git / Azure DevOps", pct: 84 },
      { name: "Power Automate", pct: 85 },
      { name: "Power Apps", pct: 78 },
    ],
  },
];

const QUICK_TAGS = [
  { name: "DAX Studio", icon: TerminalWindow },
  { name: "Tabular Editor", icon: Table },
  { name: "KQL", icon: BracketsSquare },
  { name: "Event Hubs", icon: Share },
  { name: "Delta Lake", icon: Funnel },
  { name: "OneLake", icon: Database },
  { name: "Report Server", icon: Gauge },
  { name: "Dataflows Gen2", icon: GitBranch },
  { name: "Row-Level Security", icon: Sparkle },
];

function SkillBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{name}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--accent)",
          }}
        >
          {pct}%
        </span>
      </div>
      {/* Track */}
      <div
        style={{
          height: 2,
          background: "var(--border)",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, var(--accent), rgba(99,102,241,0.8))",
            borderRadius: 1,
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: pct / 100 } : { scaleX: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();

  return (
    <section id="skills" ref={ref} className="section-wrapper">
      <div className="section-container">
        {/* Header — no eyebrow (quota) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <h2 className="display-lg" style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            Technical depth
          </h2>
          <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
            Proficiency across the Microsoft data stack — from canvas to lakehouse.
          </p>
        </motion.div>

        {/* 4-column skill groups with bar charts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            marginBottom: 56,
          }}
        >
          {SKILL_GROUPS.map(({ category, icon: Icon, skills }, gi) => (
            <motion.div
              key={category}
              className="glass-card"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 * gi, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: "28px" }}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div
                  style={{
                    width: 36, height: 36, borderRadius: "var(--r-md)",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--accent-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)", flexShrink: 0,
                  }}
                >
                  <Icon size={18} weight="regular" />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {category}
                </div>
              </div>

              {skills.map((s, si) => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} delay={0.1 * gi + 0.06 * si} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Quick tool tags — horizontal scroll-snap pill row */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            Tools & Ecosystem
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {QUICK_TAGS.map(({ name, icon: Icon }, i) => (
              <motion.span
                key={name}
                className="skill-pill"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon size={13} weight="regular" />
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
