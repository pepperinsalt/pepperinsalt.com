/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Home page = full bento grid from kacyculpepper.digital
 * Sections: Hero header, About, Experience, Skills, Terminal, Insights, Trusted By, Projects preview
 */

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "wouter";

const TERMINAL_LINES = [
  "> Initializing email_engine.js...",
  "> Loading Salesforce Marketing Cloud...",
  "> Compiling AMPscript templates...",
  "> Segmenting audience: 250,000 contacts",
  "> A/B test variant deployed ✓",
  "> Open rate: 34.2% (+12% vs baseline)",
  "> Automation journey: ACTIVE",
  "> All systems operational.",
];

const INSIGHTS = [
  "\"Personalization at scale is not a feature — it's infrastructure.\"",
  "\"The best email is the one that never feels like an email.\"",
  "\"Deliverability is the unsexy foundation of every campaign.\"",
  "\"A/B testing without a hypothesis is just guessing with extra steps.\"",
  "\"Bulletproof HTML means nothing if your subject line fails.\"",
];

const TRUSTED = [
  { name: "CHG Healthcare", desc: "Email & Front-End Developer, 2014–2018" },
  { name: "Sorenson", desc: "Marketing Automation" },
  { name: "Simon Malls", desc: "Email Campaigns" },
  { name: "Arenawins", desc: "Digital Marketing" },
  { name: "Altaracks", desc: "Web Support & Ad Ops, 2026–Present" },
];

function TerminalCard() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex]);
        setCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((prev) => [...prev, line]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((i) => i + 1);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  return (
    <div
      className="bento-card terminal-card bento-card-wide"
      style={{ minHeight: "220px" }}
    >
      <div className="terminal-inner" style={{ flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
        {displayed.map((line, i) => (
          <div key={i} style={{ opacity: 0.7 }}>{line}</div>
        ))}
        {lineIndex < TERMINAL_LINES.length && (
          <div>
            {currentLine}
            <span style={{ animation: "blink 1s step-end infinite", color: "var(--kc-terminal-text)" }}>|</span>
          </div>
        )}
      </div>
    </div>
  );
}

function InsightsCard() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % INSIGHTS.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bento-card bento-dark" style={{ minHeight: "180px" }}>
      <div className="section-label">// Industry Insights</div>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "1rem",
          lineHeight: 1.6,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.4s ease",
          color: "#eee",
        }}
      >
        {INSIGHTS[idx]}
      </div>
    </div>
  );
}

function SkillBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const skills = [
    { label: "HTML / CSS (Email)", pct: 98 },
    { label: "AMPscript / Liquid", pct: 92 },
    { label: "CRM & List Hygiene", pct: 88 },
    { label: "Automation Logic", pct: 95 },
    { label: "Adobe CC", pct: 85 },
    { label: "WordPress / PHP", pct: 80 },
  ];

  return (
    <div ref={ref} className="bento-card" style={{ minWidth: "280px" }}>
      <div className="section-label">// Skills</div>
      {skills.map((s) => (
        <div className="skill-row" key={s.label}>
          <div className="skill-label">
            <span>{s.label}</span>
            <span style={{ color: "var(--kc-link)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.85rem" }}>{s.pct}%</span>
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

export default function Home() {
  return (
    <Layout>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <img
          src="/manus-storage/pepper-in-salt-logo_0dd5bc47.jpg"
          alt="Pepper in Salt logo"
          style={{
            maxWidth: "200px",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Hero Header */}
      <header
        style={{
          marginBottom: "40px",
          background: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663629149134/Td5qG4NmV8Vq5Ena4ai8Ct/hero-bg-QHDWAGKAv6Pid5miB4Djro.webp') center/cover no-repeat`,
          borderRadius: "16px",
          padding: "52px 48px",
          border: "1px solid var(--kc-border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            margin: "0 0 12px",
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
            color: "var(--kc-text)",
          }}
        >
          Kacy Edward Culpepper
        </h1>
        <p
          style={{
            fontSize: "1.4rem",
            color: "var(--kc-accent)",
            marginBottom: "28px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          Email Marketing Specialist &amp; Technical Creative
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="https://docs.google.com/document/d/16RSZtZuLAhohoX6JN_oaQpijdfaV1biIAhZfVc6lK8Q/export?format=pdf"
            className="btn-kc btn-kc-primary"
            download
          >
            <i className="fas fa-download" style={{ marginRight: "8px" }} />
            Download C/V
          </a>
          <Link href="/contact" className="btn-kc btn-kc-outline">
            Get In Touch
          </Link>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="bento-grid">

        {/* About — full width */}
        <div id="about" className="bento-card bento-card-full">
          <div className="section-label section-label-red">// About</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            <div>
              <p style={{ marginTop: 0 }}>
                I am a creative technologist with over <strong>10 years of experience</strong> intersecting{" "}
                <strong>Email Marketing</strong>, <strong>Web Development</strong>, and{" "}
                <strong>Process Automation</strong>. I specialize in building "bulletproof" email templates
                that render perfectly across clients while designing automated customer journeys that drive engagement.
              </p>
              <p>
                My background is deeply rooted in the technical side of marketing. At CHG Healthcare, I led
                the migration to responsive design and managed complex Salesforce marketing initiatives. I thrive
                in environments that require both creative eyes and technical hands.
              </p>
            </div>
            <div>
              <p>
                <strong>Current Focus:</strong> Managing Web Support and Ad Operations for{" "}
                <em>Altaracks</em> (Contract), simplifying WordPress setups and managing digital ad campaigns.
                Simultaneously maintaining technical edge through infrastructure projects — installing commercial
                data cabling and network systems.
              </p>
              <p style={{ marginBottom: 0 }}>
                Bringing a mix of "blue-collar" work ethic and "white-collar" marketing strategy to every engagement.
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div id="experience" className="bento-card bento-card-wide">
          <div className="section-label">// Relevant Experience</div>
          <div style={{ display: "grid", gap: "24px" }}>
            {[
              {
                period: "2026 – Present (Contract)",
                title: "Web Support & Ad Ops",
                company: "Altaracks",
                desc: "Managing WordPress architecture, ad creatives, and lead gen optimization.",
              },
              {
                period: "2024 – Present",
                title: "Technical Infrastructure Specialist",
                company: "Self-Directed",
                desc: "Data cabling & network logic. Sharpening troubleshooting & process discipline.",
              },
              {
                period: "2023 · Artisan Talent",
                title: "Email Automation Specialist",
                company: "Contract",
                desc: "Reduced manual workload by 60% via CSV automation & reusable templates.",
              },
              {
                period: "2014–2018 · CHG Healthcare",
                title: "Email & Front-End Developer",
                company: "Full-Time",
                desc: "Led responsive migration & Salesforce ESP integration. Managed 250k+ contact lists.",
              },
            ].map((job) => (
              <div key={job.title} style={{ borderLeft: "3px solid var(--kc-border)", paddingLeft: "16px" }}>
                <div
                  style={{
                    color: "var(--kc-link)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "'IBM Plex Mono', monospace",
                    marginBottom: "4px",
                  }}
                >
                  {job.period}
                </div>
                <strong style={{ fontSize: "1.05rem" }}>
                  {job.title} | {job.company}
                </strong>
                <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "4px" }}>{job.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px" }}>
            <Link href="/experience" className="btn-kc btn-kc-outline" style={{ fontSize: "0.9rem", padding: "10px 20px" }}>
              Full Experience →
            </Link>
          </div>
        </div>

        {/* Skills */}
        <SkillBars />

        {/* Terminal */}
        <TerminalCard />

        {/* Insights */}
        <InsightsCard />

        {/* Trusted By */}
        <div className="bento-card bento-card-wide">
          <div className="section-label">// Trusted By</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {TRUSTED.map((t) => (
              <div
                key={t.name}
                style={{
                  flex: "1 1 160px",
                  background: "#f8f8f8",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  border: "1px solid var(--kc-border)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--kc-text)",
                    marginBottom: "4px",
                  }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--kc-accent)", fontFamily: "'IBM Plex Mono', monospace" }}>
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Preview CTA */}
        <div
          className="bento-card"
          style={{
            background: `linear-gradient(135deg, var(--kc-link) 0%, #a00d25 100%)`,
            border: "none",
            color: "#fff",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: "0.85rem",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
              opacity: 0.8,
            }}
          >
            // Portfolio
          </div>
          <h3
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.5rem",
              margin: "0 0 16px",
              color: "#fff",
            }}
          >
            View My Projects
          </h3>
          <p style={{ fontSize: "0.95rem", opacity: 0.9, marginBottom: "24px", lineHeight: 1.6 }}>
            Email campaigns, automation workflows, web builds, and more.
          </p>
          <Link
            href="/projects"
            style={{
              background: "#fff",
              color: "var(--kc-link)",
              padding: "10px 22px",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.9rem",
              display: "inline-block",
              transition: "all 0.2s",
            }}
          >
            See Projects →
          </Link>
        </div>

        {/* Great Salt Lake Illustration */}
        <div
          className="bento-card"
          style={{
            padding: 0,
            overflow: "hidden",
            minHeight: "260px",
            background: "#f8f8f8",
          }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663629149134/Td5qG4NmV8Vq5Ena4ai8Ct/salt-lake-illustration-BzbHGv7U49TFC79qYgvVXU.webp"
            alt="Great Salt Lake - Pepper in Salt"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* Contact CTA */}
        <div className="bento-card bento-dark">
          <div className="section-label">// Let's Connect</div>
          <p style={{ color: "#ccc", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "20px" }}>
            Open to full-time and contract roles in email marketing, marketing automation, and web development.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="mailto:kacy@kacyculpepper.digital"
              className="btn-kc btn-kc-primary"
              style={{ fontSize: "0.9rem", padding: "10px 20px" }}
            >
              <i className="fas fa-envelope" style={{ marginRight: "8px" }} />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/kacyculpepper"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-kc"
              style={{
                fontSize: "0.9rem",
                padding: "10px 20px",
                background: "transparent",
                border: "1px solid #555",
                color: "#ccc",
              }}
            >
              <i className="fab fa-linkedin" style={{ marginRight: "8px" }} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bento-card bento-card-full" style={{ background: "#f8f8f8" }}>
          <div className="section-label section-label-red">// By The Numbers</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "24px", marginTop: "8px" }}>
            {[
              { value: "10+", label: "Years Experience" },
              { value: "250k+", label: "Contacts Managed" },
              { value: "60%", label: "Workload Reduction" },
              { value: "31%", label: "Peak Open Rate" },
              { value: "50+", label: "Campaigns / Year" },
              { value: "5", label: "Major Brands Served" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center", padding: "16px" }}>
                <div style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "var(--kc-link)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>{stat.value}</div>
                <div style={{
                  fontSize: "0.8rem",
                  color: "var(--kc-accent)",
                  fontFamily: "'IBM Plex Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
