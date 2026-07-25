"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GithubLogo, Tag } from "@phosphor-icons/react";
import Image from "next/image";

const projects = [
  {
    title: "Enterprise Power BI Dashboards",
    description:
      "Built 30+ production dashboards for C-suite executives, integrating live SAP, Salesforce, and SQL Server data sources. Delivered sub-2s refresh cycles.",
    tags: ["Power BI", "DAX", "SQL Server", "SAP"],
    image: "/images/project-powerbi.png",
    live: "#",
    github: "#",
    accent: "var(--accent)",
    featured: true,
    size: "large", // col-span-8
  },
  {
    title: "Microsoft Fabric Lakehouse",
    description:
      "Architected an end-to-end Fabric solution covering OneLake ingestion, Delta Lake tables, and Fabric notebooks for data transformation.",
    tags: ["Microsoft Fabric", "OneLake", "PySpark"],
    image: "/images/project-fabric.png",
    live: "#",
    github: "#",
    accent: "rgba(99,102,241,0.9)",
    featured: false,
    size: "small", // col-span-4
  },
  {
    title: "Real-Time Analytics Pipeline",
    description:
      "Designed an Azure Event Hubs → KQL → Power BI streaming pipeline processing 100M+ rows/day with 10-second latency.",
    tags: ["Azure", "KQL", "Event Hubs", "Power BI"],
    image: "/images/project-realtime.png",
    live: "#",
    github: "#",
    accent: "rgba(99,102,241,0.9)",
    featured: false,
    size: "small", // col-span-4
  },
  {
    title: "Embedded Analytics Portal",
    description:
      "Developed a white-labeled Power BI Embedded portal for external client reporting using React and the Power BI JavaScript SDK.",
    tags: ["Power BI Embedded", "React", "JavaScript SDK"],
    image: "/images/project-embedded.png",
    live: "#",
    github: "#",
    accent: "var(--accent)",
    featured: false,
    size: "medium", // col-span-6
  },
  {
    title: "Attendance Management System",
    description:
      "Delivered an end-to-end HR attendance system with Power Apps, a custom SQL backend, and live Power BI reporting for 1,000+ employees.",
    tags: ["Power Apps", "SQL", "Power BI"],
    image: "/images/project-attendance.png",
    live: "#",
    github: "#",
    accent: "var(--accent)",
    featured: false,
    size: "medium", // col-span-6
  },
];

function ProjectCard({ project, style }: { project: typeof projects[0]; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bezel-outer"
      style={{ height: "100%", ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bezel-inner" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "calc(var(--r-xl) - 6px) calc(var(--r-xl) - 6px) 0 0",
            flexShrink: 0,
            height: project.size === "large" ? 240 : 160,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.32,0.72,0,1)",
            }}
          />
          <div
            style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to top, var(--surface-1) 0%, transparent 50%)`,
            }}
          />
          {project.featured && (
            <div
              style={{
                position: "absolute", top: 12, left: 12,
                padding: "4px 10px",
                borderRadius: "100px",
                background: "rgba(0,200,150,0.15)",
                border: "1px solid rgba(0,200,150,0.3)",
                color: "var(--accent)",
                fontSize: "0.65rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}
          >
            {project.title}
          </h3>
          <p
            className="body-sm"
            style={{
              color: "var(--text-secondary)",
              flex: 1,
              marginBottom: 16,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {project.tags.slice(0, project.size === "large" ? 4 : 2).map((t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "4px 10px",
                  border: `1px solid ${project.accent}25`,
                  borderRadius: "100px",
                  fontSize: "0.6875rem",
                  color: project.accent,
                  background: `${project.accent}0f`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Tag size={9} />
                {t}
              </span>
            ))}
            {project.tags.length > (project.size === "large" ? 4 : 2) && (
              <span style={{ color: "var(--text-muted)", fontSize: "0.6875rem", display: "flex", alignItems: "center" }}>
                +{project.tags.length - (project.size === "large" ? 4 : 2)}
              </span>
            )}
          </div>

          {/* Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "auto" }}>
            <a
              href={project.live}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                fontSize: "0.8125rem", fontWeight: 600,
                color: project.accent, textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              <ArrowUpRight size={14} weight="bold" /> Live demo
            </a>
            <a
              href={project.github}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                fontSize: "0.8125rem",
                color: "var(--text-muted)", textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              <GithubLogo size={13} weight="regular" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();

  return (
    <section id="projects" ref={ref} className="section-wrapper">
      <div className="section-container">

        {/* Section header — no eyebrow (eyebrow quota used in Hero) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          <h2 className="display-lg" style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            Selected work
          </h2>
          <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
            Enterprise data projects spanning dashboards, pipelines, and embedded analytics.
          </p>
        </motion.div>

        {/* Asymmetric bento grid — not 3-equal-col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 14,
          }}
        >
          {/* Row 1: large (8) + small (4) */}
          <motion.div
            style={{ gridColumn: "span 8" }}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={projects[0]} />
          </motion.div>
          <motion.div
            style={{ gridColumn: "span 4" }}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={projects[1]} />
          </motion.div>

          {/* Row 2: small (4) + medium (4) + medium (4) */}
          <motion.div
            style={{ gridColumn: "span 4" }}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={projects[2]} />
          </motion.div>
          <motion.div
            style={{ gridColumn: "span 4" }}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={projects[3]} />
          </motion.div>
          <motion.div
            style={{ gridColumn: "span 4" }}
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={projects[4]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
