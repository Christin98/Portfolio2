"use client";

import { motion } from "framer-motion";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, Heart } from "@phosphor-icons/react";

const quickLinks = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const socials = [
  { icon: GithubLogo, href: "https://github.com/christinkoshy", label: "GitHub" },
  { icon: LinkedinLogo, href: "https://linkedin.com/in/christinkoshy", label: "LinkedIn" },
  { icon: EnvelopeSimple, href: "mailto:christinkoshy@email.com", label: "Email" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ padding: "64px 0 40px", position: "relative", zIndex: 1 }}>
      <div className="section-container">
        <div className="footer-rule" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "var(--r-sm)",
                  background: "var(--accent)",
                  color: "#050505",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                }}
              >
                CK
              </div>
              <span style={{ fontWeight: 700, fontSize: "1.125rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Christin Koshy
              </span>
            </div>
            <p className="body-base" style={{ color: "var(--text-secondary)", maxWidth: 360 }}>
              Power BI Team Lead & Microsoft Fabric Developer building scalable enterprise data architectures.
            </p>
          </div>

          {/* Navigation */}
          <div>
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
              Navigation
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
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
              Connect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
                >
                  <Icon size={16} weight="regular" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Christin Koshy. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span>Crafted with</span>
            <Heart size={12} weight="fill" color="var(--accent)" />
            <span>and data precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
