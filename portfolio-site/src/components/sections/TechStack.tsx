"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ChartBar, Database, Cloud, Code, Lightning, Robot,
  Folder, GitBranch, Plugs, Package, TerminalWindow, Cpu
} from "@phosphor-icons/react";

const techItems = [
  { name: "Power BI", icon: ChartBar },
  { name: "Microsoft Fabric", icon: Database },
  { name: "Azure Cloud", icon: Cloud },
  { name: "SQL Server", icon: Cpu },
  { name: "Python / PySpark", icon: Code },
  { name: "Power Apps", icon: Lightning },
  { name: "Power Automate", icon: Robot },
  { name: "SharePoint", icon: Folder },
  { name: "Git / DevOps", icon: GitBranch },
  { name: "REST APIs", icon: Plugs },
  { name: "Docker", icon: Package },
  { name: "DAX Studio", icon: TerminalWindow },
];

const orbits = [
  { radius: 120, duration: 24, items: [0, 1, 2, 3] },
  { radius: 190, duration: 34, items: [4, 5, 6, 7] },
  { radius: 260, duration: 44, items: [8, 9, 10, 11] },
];

function OrbitRing({
  radius,
  duration,
  items,
  inView,
}: {
  radius: number;
  duration: number;
  items: number[];
  inView: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      style={{
        position: "absolute",
        width: radius * 2,
        height: radius * 2,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        border: "1px dashed var(--border)",
      }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0, borderRadius: "50%" }}
        animate={inView && !reduce ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {items.map((techIdx, i) => {
          const tech = techItems[techIdx];
          const Icon = tech.icon;
          const angle = (i / items.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);

          return (
            <div
              key={tech.name}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotate icon to keep upright */}
              <motion.div
                animate={inView && !reduce ? { rotate: -360 } : { rotate: 0 }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                className="glass-card"
                style={{
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-secondary)",
                  borderRadius: "100px",
                  whiteSpace: "nowrap",
                }}
              >
                <Icon size={14} weight="regular" color="var(--accent)" />
                <span>{tech.name}</span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  return (
    <section id="techstack" ref={ref} className="section-wrapper" style={{ overflow: "hidden" }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          <h2 className="display-lg" style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            Connected ecosystem
          </h2>
          <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
            An integrated stack powering modern data architecture.
          </p>
        </motion.div>

        {/* Orbit Visualization Container */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            height: 580,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Central Avatar Core */}
          <div
            style={{
              zIndex: 10,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--surface-1)",
              border: "2px solid var(--accent)",
              boxShadow: "0 0 40px var(--orb-a), var(--shadow-inner)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "var(--accent)",
            }}
          >
            CK
          </div>

          {/* Orbits */}
          {orbits.map((o) => (
            <OrbitRing
              key={o.radius}
              radius={o.radius}
              duration={o.duration}
              items={o.items}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
