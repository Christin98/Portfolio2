"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { List, X, ArrowUpRight, Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "@/hooks/useTheme";

const NAV_ITEMS = [
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "projects",   label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

export default function Navbar() {
  const reduce = useReducedMotion();
  const { theme, toggleTheme, mounted } = useTheme();
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        className="nav-island"
        initial={reduce ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          boxShadow: scrolled
            ? "0 1px 0 var(--border-strong), 0 16px 64px rgba(0,0,0,0.2)"
            : "0 1px 0 var(--border), 0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
            padding: "6px 12px",
            borderRadius: "100px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            marginRight: "4px",
            flexShrink: 0,
          }}
        >
          CK
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav-link ${active === id ? "active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={toggleTheme}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginLeft: "4px",
              marginRight: "4px",
              transition: "all 0.25s ease",
            }}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun size={15} weight="regular" />
            ) : (
              <Moon size={15} weight="regular" />
            )}
          </button>
        )}

        {/* CTA */}
        <a
          href="mailto:christinkoshy@email.com"
          className="btn-primary hidden md:inline-flex"
          style={{ padding: "8px 16px", fontSize: "0.75rem", marginLeft: "4px" }}
        >
          Hire Me
          <span className="btn-icon" style={{ width: 20, height: 20 }}>
            <ArrowUpRight size={12} weight="bold" />
          </span>
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            width: 36, height: 36,
            borderRadius: "50%",
            border: "1px solid var(--border-strong)",
            background: "transparent",
            color: "var(--text-primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            marginLeft: "auto",
          }}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {menuOpen ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
          </motion.div>
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 990,
              background: "var(--canvas)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 12,
            }}
            onClick={() => setMenuOpen(false)}
          >
            {NAV_ITEMS.map(({ id, label }, i) => (
              <motion.button
                key={id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => { e.stopPropagation(); scrollTo(id); }}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(2rem, 6vw, 2.8rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: active === id ? "var(--accent)" : "var(--text-primary)",
                  background: "transparent", border: "none",
                  cursor: "pointer",
                  padding: "8px 24px",
                }}
              >
                {label}
              </motion.button>
            ))}

            {/* Mobile Theme Toggle */}
            {mounted && (
              <button
                onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                className="btn-ghost"
                style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            )}

            <motion.a
              href="mailto:christinkoshy@email.com"
              className="btn-primary"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: 12 }}
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
              <span className="btn-icon">
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
