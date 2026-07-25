"use client";

import { useRef, useEffect, useRef as useRefAny } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Certificate } from "@phosphor-icons/react";

const EXPERIENCES = [
  {
    role: "Power BI Team Lead",
    company: "Current Organisation",
    period: "2022 — Present",
    points: [
      "Lead a team of 6 BI developers delivering 30+ dashboards to executive stakeholders.",
      "Architected an enterprise semantic model serving 200+ reports with row-level security.",
      "Reduced report load time 65% via incremental refresh and aggregation tables.",
    ],
  },
  {
    role: "Senior BI Developer",
    company: "Previous Organisation",
    period: "2020 — 2022",
    points: [
      "Migrated legacy SSRS reports to Power BI, reducing maintenance cost 40%.",
      "Designed Power Automate workflows automating 15+ manual reporting processes.",
      "Implemented DirectQuery models with dual-mode tables for 50M+ row datasets.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Starting Point",
    period: "2018 — 2020",
    points: [
      "Built operational dashboards for sales, HR, and finance teams.",
      "Developed T-SQL stored procedures for ETL from ERP to data warehouse.",
      "Delivered Power BI training sessions for 80+ business users.",
    ],
  },
];

const CERTS = [
  { code: "PL-300", name: "Power BI Data Analyst" },
  { code: "DP-600", name: "Microsoft Fabric Analytics Engineer" },
  { code: "AZ-900", name: "Azure Fundamentals" },
  { code: "PL-900", name: "Power Platform Fundamentals" },
  { code: "DP-900", name: "Azure Data Fundamentals" },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();

  return (
    <section id="experience" ref={ref} className="section-wrapper">
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <h2 className="display-lg" style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            Career timeline
          </h2>
          <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
            Six years building data products across analytics, engineering, and leadership.
          </p>
        </motion.div>

        {/* Split layout — timeline left, certs right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 64, alignItems: "start" }}>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            <div className="timeline-track" />

            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={reduce ? false : { opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", gap: 24, paddingLeft: 24, marginBottom: i < EXPERIENCES.length - 1 ? 48 : 0 }}
              >
                {/* Node */}
                <div
                  style={{
                    position: "absolute", left: -5,
                    top: i === 0 ? 6 : `${i * (48 + 80)}px`,
                  }}
                >
                  <div className="timeline-node" />
                </div>

                <div style={{ flex: 1 }}>
                  {/* Meta */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 16 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                        {exp.role}
                      </div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--accent)", marginTop: 2, fontFamily: "var(--font-mono)" }}>
                        {exp.company}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                        paddingTop: 3,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {exp.points.map((pt) => (
                      <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span
                          style={{
                            width: 4, height: 4, borderRadius: "50%",
                            background: "var(--accent)",
                            marginTop: 8, flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {i < EXPERIENCES.length - 1 && (
                    <div style={{ marginTop: 32, height: 1, background: "var(--border)" }} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right sidebar — certifications */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 20,
              }}
            >
              Certifications
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CERTS.map((c, i) => (
                <motion.div
                  key={c.code}
                  className="glass-card"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div
                    style={{
                      width: 32, height: 32, borderRadius: "var(--r-sm)",
                      background: "var(--accent-dim)",
                      border: "1px solid var(--accent-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Certificate size={14} weight="regular" color="var(--accent)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", marginBottom: 2 }}>
                      {c.code}
                    </div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{c.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
