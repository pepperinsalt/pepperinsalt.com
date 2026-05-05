/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Skills page — progress bars, tech grid, certifications
 */

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

const skillCategories = [
  {
    title: "Email Development",
    icon: "fas fa-envelope-open-text",
    skills: [
      { label: "HTML / CSS (Email-Specific)", pct: 98 },
      { label: "Responsive Email Design", pct: 96 },
      { label: "Table-Based Layouts", pct: 95 },
      { label: "Dark Mode Optimization", pct: 85 },
      { label: "Litmus / Email on Acid Testing", pct: 90 },
    ],
  },
  {
    title: "Marketing Automation",
    icon: "fas fa-robot",
    skills: [
      { label: "Automation Logic & Journey Mapping", pct: 95 },
      { label: "AMPscript (Salesforce MC)", pct: 92 },
      { label: "Liquid (Klaviyo / Shopify)", pct: 88 },
      { label: "Salesforce Marketing Cloud", pct: 90 },
      { label: "Trigger-Based Campaigns", pct: 93 },
    ],
  },
  {
    title: "CRM & Data",
    icon: "fas fa-database",
    skills: [
      { label: "CRM & List Hygiene", pct: 88 },
      { label: "Segmentation & Targeting", pct: 90 },
      { label: "A/B Testing & Optimization", pct: 87 },
      { label: "Deliverability Management", pct: 85 },
      { label: "Analytics & Reporting", pct: 82 },
    ],
  },
  {
    title: "Web & Creative",
    icon: "fas fa-code",
    skills: [
      { label: "WordPress / PHP", pct: 80 },
      { label: "JavaScript / React (Basic)", pct: 72 },
      { label: "Adobe Creative Suite", pct: 85 },
      { label: "Ad Operations (Google / Meta)", pct: 78 },
      { label: "SEO Fundamentals", pct: 75 },
    ],
  },
];

const certifications = [
  { name: "Salesforce Marketing Cloud Email Specialist", issuer: "Salesforce", icon: "fas fa-certificate" },
  { name: "Email Marketing Fundamentals", issuer: "HubSpot Academy", icon: "fas fa-graduation-cap" },
  { name: "Google Ads — Search Certification", issuer: "Google", icon: "fab fa-google" },
  { name: "CompTIA Network+", issuer: "CompTIA (In Progress)", icon: "fas fa-network-wired" },
];

function SkillCategory({ category, visible }: { category: typeof skillCategories[0]; visible: boolean }) {
  return (
    <div className="bento-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
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
          <i className={category.icon} style={{ color: "var(--kc-link)", fontSize: "0.9rem" }} />
        </div>
        <div className="section-label" style={{ margin: 0, border: "none", padding: 0 }}>
          {category.title}
        </div>
      </div>
      {category.skills.map((s) => (
        <div className="skill-row" key={s.label}>
          <div className="skill-label">
            <span style={{ fontSize: "0.9rem" }}>{s.label}</span>
            <span
              style={{
                color: "var(--kc-link)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.82rem",
              }}
            >
              {s.pct}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: visible ? `${s.pct}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

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
          Skills & Expertise
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--kc-accent)", marginBottom: 0 }}>
          Technical depth across email, automation, web, and data.
        </p>
      </header>

      <div ref={ref} className="bento-grid">
        {skillCategories.map((cat) => (
          <SkillCategory key={cat.title} category={cat} visible={visible} />
        ))}

        {/* Certifications */}
        <div className="bento-card bento-card-full">
          <div className="section-label section-label-red">// Certifications & Education</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.name}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "16px 20px",
                  background: "#f8f8f8",
                  borderRadius: "10px",
                  border: "1px solid var(--kc-border)",
                }}
              >
                <i
                  className={cert.icon}
                  style={{
                    color: "var(--kc-link)",
                    fontSize: "1.2rem",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "2px" }}>
                    {cert.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--kc-accent)",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {cert.issuer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bento-card bento-dark">
          <div className="section-label">// Soft Skills</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            {[
              "Cross-functional collaboration",
              "Technical documentation",
              "Process optimization",
              "Stakeholder communication",
              "Problem decomposition",
              "Deadline management",
              "Self-directed learning",
              "Attention to detail",
            ].map((skill) => (
              <span
                key={skill}
                style={{
                  background: "#3a3a3a",
                  border: "1px solid #555",
                  color: "#ddd",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
