"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EnvelopeSimple, Phone, LinkedinLogo, GithubLogo, ArrowUpRight, CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";

const SOCIALS = [
  { icon: EnvelopeSimple, label: "Email", value: "christinkoshy@email.com", href: "mailto:christinkoshy@email.com" },
  { icon: LinkedinLogo, label: "LinkedIn", value: "linkedin.com/in/christinkoshy", href: "https://linkedin.com/in/christinkoshy" },
  { icon: GithubLogo, label: "GitHub", value: "github.com/christinkoshy", href: "https://github.com/christinkoshy" },
  { icon: Phone, label: "Phone", value: "+91 9876 543 210", href: "tel:+919876543210" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:christinkoshy@email.com?subject=${encodeURIComponent(form.subject || "Portfolio enquiry")}&body=${body}`;
      setLoading(false);
      setSent(true);
    }, 600);
  };

  return (
    <section id="contact" ref={ref} className="section-wrapper">
      <div className="section-container">

        {/* Eyebrow — second and final usage on the page (hero + contact = 2/3 quota for 9 sections) */}
        <motion.div
          className="eyebrow"
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow-dot" />
          Let's talk
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Left — copy + social links */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="display-xl"
              style={{ fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}
            >
              Start a project.
            </h2>
            <p
              className="body-lg"
              style={{ color: "var(--text-secondary)", marginBottom: 40 }}
            >
              Whether it's a full Fabric architecture, a Power BI migration, or an embedded analytics solution — I'd love to hear about it.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOCIALS.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 20px",
                    background: "var(--surface-glass)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-lg)",
                    textDecoration: "none",
                    transition: "all 0.3s cubic-bezier(0.32,0.72,0,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,200,150,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface-glass)";
                  }}
                >
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: "var(--r-md)",
                      background: "var(--accent-dim)", border: "1px solid var(--accent-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} weight="regular" color="var(--accent)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{value}</div>
                  </div>
                  <ArrowUpRight size={14} color="var(--text-muted)" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bezel-outer">
              <div className="bezel-inner" style={{ padding: "32px" }}>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <CheckCircle size={48} weight="regular" color="var(--accent)" style={{ margin: "0 auto 16px" }} />
                    <div style={{ fontWeight: 600, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: 8 }}>
                      Message sent
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      I'll get back to you within 24 hours.
                    </div>
                    <button
                      className="btn-ghost"
                      style={{ marginTop: 24 }}
                      onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label className="form-label" htmlFor="contact-name">Name</label>
                        <input
                          id="contact-name"
                          className="form-input"
                          type="text"
                          placeholder="Your name"
                          required
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="contact-email">Email</label>
                        <input
                          id="contact-email"
                          className="form-input"
                          type="email"
                          placeholder="your@email.com"
                          required
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label" htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        className="form-input"
                        type="text"
                        placeholder="Project brief or enquiry"
                        value={form.subject}
                        onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="form-label" htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        className="form-input"
                        rows={5}
                        placeholder="Tell me about your project..."
                        required
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        style={{ resize: "none" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                      disabled={loading}
                    >
                      {loading ? "Opening mail…" : "Send message"}
                      <span className="btn-icon">
                        <PaperPlaneTilt size={14} weight="bold" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
