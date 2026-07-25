"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, MagnifyingGlass, ArrowRight, DownloadSimple, ArrowUpRight } from "@phosphor-icons/react";

const commands = [
  { id: "about", label: "Go to About", section: "about", category: "Navigate" },
  { id: "skills", label: "Go to Skills", section: "skills", category: "Navigate" },
  { id: "projects", label: "Go to Work", section: "projects", category: "Navigate" },
  { id: "experience", label: "Go to Experience", section: "experience", category: "Navigate" },
  { id: "techstack", label: "Go to Tech Stack", section: "techstack", category: "Navigate" },
  { id: "contact", label: "Go to Contact", section: "contact", category: "Navigate" },
  { id: "theme", label: "Toggle Dark / Light Theme", action: "theme", category: "Actions" },
  { id: "resume", label: "Download Resume", href: "/resume.pdf", category: "Actions", download: true },
  { id: "linkedin", label: "Open LinkedIn", href: "https://linkedin.com/in/christinkoshy", category: "Social" },
  { id: "github", label: "Open GitHub", href: "https://github.com/christinkoshy", category: "Social" },
  { id: "email", label: "Send Email", href: "mailto:christinkoshy@email.com", category: "Social" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback((cmd: typeof commands[0]) => {
    setOpen(false);
    setQuery("");

    if (cmd.action === "theme") {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    } else if (cmd.section) {
      document.getElementById(cmd.section)?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd.href) {
      if (cmd.download) {
        const a = document.createElement("a");
        a.href = cmd.href;
        a.download = "Christin_Koshy_Resume.pdf";
        a.click();
      } else {
        window.open(cmd.href, "_blank");
      }
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setSelected(0);
      }
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) execute(filtered[selected]);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, selected, execute]);

  useEffect(() => setSelected(0), [query]);

  const grouped = filtered.reduce<Record<string, typeof commands>>((acc, cmd) => {
    (acc[cmd.category] = acc[cmd.category] || []).push(cmd);
    return acc;
  }, {});

  return (
    <>
      {/* Trigger button bottom left */}
      <motion.button
        className="hidden md:flex items-center gap-2 px-3 py-2 text-xs"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-md)",
          color: "var(--text-muted)",
          cursor: "pointer",
          zIndex: 990,
          fontFamily: "var(--font-mono)",
        }}
        onClick={() => setOpen(true)}
        whileHover={{ borderColor: "var(--accent-border)", color: "var(--text-secondary)" }}
      >
        <Command size={12} weight="bold" />
        <span>K</span>
        <span>&middot; Quick Actions</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cmd-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setOpen(false); setQuery(""); }}
          >
            <motion.div
              className="cmd-palette"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 8px", borderBottom: "1px solid var(--border)" }}>
                <MagnifyingGlass size={18} color="var(--text-muted)" style={{ marginLeft: 16 }} />
                <input
                  className="cmd-input"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <kbd
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-mono)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.06)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                    marginRight: 16,
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div style={{ padding: "8px 0", maxHeight: 320, overflowY: "auto" }}>
                {filtered.length === 0 ? (
                  <div style={{ padding: "16px 24px", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    No results for &quot;{query}&quot;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <div
                        style={{
                          padding: "8px 20px 4px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-muted)",
                        }}
                      >
                        {category}
                      </div>
                      {items.map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd);
                        const isSelected = globalIdx === selected;
                        return (
                          <button
                            key={cmd.id}
                            className={`cmd-row ${isSelected ? "active" : ""}`}
                            style={{ width: "calc(100% - 16px)" }}
                            onClick={() => execute(cmd)}
                            onMouseEnter={() => setSelected(globalIdx)}
                          >
                            <span style={{ flex: 1 }}>{cmd.label}</span>
                            {cmd.download ? (
                              <DownloadSimple size={14} color="var(--text-muted)" />
                            ) : cmd.href ? (
                              <ArrowUpRight size={14} color="var(--text-muted)" />
                            ) : (
                              <ArrowRight size={14} color="var(--text-muted)" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
