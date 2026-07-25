"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Head of Finance",
    company: "TechCorp Global",
    avatar: "SM",
    rating: 5,
    quote:
      "Christin transformed our reporting infrastructure. Reports that took 3 days every month now run automatically in minutes. The dashboards gave us visibility we never had before.",
  },
  {
    name: "Raj Patel",
    role: "VP of Operations",
    company: "Meridian Logistics",
    avatar: "RP",
    rating: 5,
    quote:
      "Working with Christin on our Fabric implementation was a game-changer. He turned a complex data warehouse into a medallion lakehouse that feeds 15 dashboards seamlessly.",
  },
  {
    name: "Emma Johansson",
    role: "Chief Data Officer",
    company: "Nordic Analytics",
    avatar: "EJ",
    rating: 5,
    quote:
      "Christin doesn't just build dashboards, he builds confidence in data. He identified data quality issues and mentored our BI team to elevate everyone's technical skills.",
  },
  {
    name: "David Chen",
    role: "Product Manager",
    company: "Pulse SaaS",
    avatar: "DC",
    rating: 5,
    quote:
      "The embedded Power BI portal Christin built is phenomenal. Each client sees only their data with row-level security, and the design matches our product perfectly.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className="section-wrapper">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          <h2 className="display-lg" style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>
            Client endorsements
          </h2>
          <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
            What stakeholders say about working with me.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 840, margin: "0 auto" }}
        >
          <div className="bezel-outer">
            <div className="bezel-inner" style={{ padding: "40px" }}>
              <div style={{ position: "relative", minHeight: 180 }}>
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial={reduce ? false : "enter"}
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Stars */}
                    <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={16} weight="fill" color="var(--accent)" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p
                      className="display-sm"
                      style={{
                        color: "var(--text-primary)",
                        fontWeight: 400,
                        lineHeight: 1.5,
                        marginBottom: 32,
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author info */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "var(--accent-dim)",
                          border: "1px solid var(--accent-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--accent)",
                        }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)" }}>
                          {t.name}
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                          {t.role} &middot; <span style={{ color: "var(--accent)" }}>{t.company}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: "1px solid var(--border)",
                }}
              >
                {/* Dots */}
                <div style={{ display: "flex", gap: 8 }}>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > current ? 1 : -1);
                        setCurrent(i);
                      }}
                      style={{
                        width: i === current ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === current ? "var(--accent)" : "var(--border-strong)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => go(-1)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    aria-label="Previous testimonial"
                  >
                    <CaretLeft size={16} weight="bold" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    aria-label="Next testimonial"
                  >
                    <CaretRight size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
