/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Contact page — form + direct contact info
 */

import { useState } from "react";
import Layout from "@/components/Layout";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link as a functional fallback
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    const subject = encodeURIComponent(form.subject || "Portfolio Contact");
    window.location.href = `mailto:kacy@kacyculpepper.digital?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Layout>
      <header style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            margin: "0 0 12px",
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}
        >
          Get In Touch
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--kc-accent)", marginBottom: 0 }}>
          Available for full-time roles, contract work, and consulting engagements.
        </p>
      </header>

      <div className="bento-grid">

        {/* Contact Form */}
        <div className="bento-card bento-card-wide">
          <div className="section-label section-label-red">// Send a Message</div>

          {sent ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                gap: "16px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(200, 16, 46, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fas fa-check" style={{ color: "var(--kc-link)", fontSize: "1.5rem" }} />
              </div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", margin: 0 }}>Message Sent!</h3>
              <p style={{ color: "var(--kc-accent)", margin: 0 }}>
                Your email client should have opened. I'll get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="btn-kc btn-kc-outline"
                style={{ marginTop: "8px" }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: "6px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--kc-accent)",
                    }}
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="kc-input"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: "6px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--kc-accent)",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="kc-input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "var(--kc-accent)",
                  }}
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="kc-input"
                  value={form.subject}
                  onChange={handleChange}
                  style={{ cursor: "pointer" }}
                >
                  <option value="">Select a topic...</option>
                  <option value="Full-Time Opportunity">Full-Time Opportunity</option>
                  <option value="Contract / Freelance">Contract / Freelance</option>
                  <option value="Email Marketing Consulting">Email Marketing Consulting</option>
                  <option value="WordPress / Web Support">WordPress / Web Support</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "6px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "var(--kc-accent)",
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="kc-input"
                  placeholder="Tell me about your project or opportunity..."
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  style={{ resize: "vertical", minHeight: "140px" }}
                />
              </div>

              <div>
                <button type="submit" className="btn-kc btn-kc-primary">
                  <i className="fas fa-paper-plane" style={{ marginRight: "8px" }} />
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", flex: "1 1 280px" }}>

          <div className="bento-card">
            <div className="section-label">// Direct Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  icon: "fas fa-envelope",
                  label: "Email",
                  value: "kacy@kacyculpepper.digital",
                  href: "mailto:kacy@kacyculpepper.digital",
                },
                {
                  icon: "fab fa-linkedin",
                  label: "LinkedIn",
                  value: "linkedin.com/in/kacyculpepper",
                  href: "https://www.linkedin.com/in/kacyculpepper",
                },
                {
                  icon: "fab fa-github",
                  label: "GitHub",
                  value: "github.com/pepperinsalt",
                  href: "https://github.com/pepperinsalt",
                },
                {
                  icon: "fas fa-map-marker-alt",
                  label: "Location",
                  value: "Salt Lake City, UT",
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(200, 16, 46, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={item.icon} style={{ color: "var(--kc-link)", fontSize: "0.9rem" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--kc-accent)", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "2px" }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.9rem", color: "var(--kc-text)", textDecoration: "none", fontWeight: 500 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--kc-link)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--kc-text)")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bento-card bento-dark">
            <div className="section-label">// Availability</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Full-Time Roles", status: "Open", color: "#4caf50" },
                { label: "Contract / Freelance", status: "Open", color: "#4caf50" },
                { label: "Consulting", status: "Available", color: "#ffd700" },
                { label: "Response Time", status: "< 48 hours", color: "var(--kc-terminal-text)" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid #3a3a3a",
                    fontSize: "0.88rem",
                  }}
                >
                  <span style={{ color: "#aaa" }}>{item.label}</span>
                  <span
                    style={{
                      color: item.color,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bento-card"
            style={{ background: "var(--kc-link)", border: "none", color: "#fff" }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
                opacity: 0.8,
              }}
            >
              // Download C/V
            </div>
            <p style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "16px", lineHeight: 1.6 }}>
              Full curriculum vitae with complete work history and references.
            </p>
            <a
              href="https://docs.google.com/document/d/16RSZtZuLAhohoX6JN_oaQpijdfaV1biIAhZfVc6lK8Q/export?format=pdf"
              download
              style={{
                background: "#fff",
                color: "var(--kc-link)",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.9rem",
                display: "inline-block",
              }}
            >
              <i className="fas fa-download" style={{ marginRight: "8px" }} />
              Download PDF
            </a>
          </div>
        </div>

      </div>

      {/* Responsive fix for form grid */}
      <style>{`
        @media (max-width: 640px) {
          .contact-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Layout>
  );
}
