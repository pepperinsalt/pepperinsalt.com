/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Projects page — alternating layout with iframe previews
 * Uses kacyculpepper.digital proj-item pattern
 */

import Layout from "@/components/Layout";

const projects = [
  {
    title: "CHG Healthcare Email System",
    description:
      "Led the full migration of CHG Healthcare's email program from table-based to fully responsive design. Built a modular template library in Salesforce Marketing Cloud with AMPscript-powered personalization, serving 250,000+ healthcare professionals across multiple brands.",
    tags: ["Salesforce MC", "AMPscript", "Responsive Email", "HTML/CSS", "Automation"],
    link: "https://www.chghealthcare.com",
    previewUrl: "https://www.chghealthcare.com",
    result: "Open rates improved from 18% → 31%",
  },
  {
    title: "Altaracks Web & Ad Operations",
    description:
      "Managing end-to-end web support and digital advertising for Altaracks. Responsibilities include WordPress architecture optimization, ad creative production for Google and Meta, UTM tracking implementation, and conversion funnel analysis.",
    tags: ["WordPress", "Google Ads", "Meta Ads", "PHP", "SEO", "Analytics"],
    link: "https://altaracks.com",
    previewUrl: "https://altaracks.com",
    result: "Active contract, 2026–present",
  },
  {
    title: "Email Automation System (Artisan Talent)",
    description:
      "Designed and implemented a CSV-driven email automation system that eliminated 60% of manual campaign work. Built reusable template components with dynamic content blocks using AMPscript and Liquid, dramatically reducing production time per campaign.",
    tags: ["AMPscript", "Liquid", "CSV Automation", "HTML Email", "Workflow Design"],
    link: "#",
    previewUrl: null,
    result: "60% reduction in manual workload",
  },
  {
    title: "kacyculpepper.digital",
    description:
      "This very site — a hand-coded single-page portfolio built with pure HTML, CSS, and JavaScript. Features a bento-card grid layout, terminal typewriter animation, real-time clock, and responsive design. Deployed via GitHub Pages with a custom domain.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Responsive Design"],
    link: "https://kacyculpepper.digital",
    previewUrl: "https://kacyculpepper.digital",
    result: "Live at kacyculpepper.digital",
  },
];

export default function Projects() {
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
          Projects
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--kc-accent)", marginBottom: 0 }}>
          Selected work across email, automation, web development, and ad operations.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "80px", marginTop: "16px" }}>
        {projects.map((proj, i) => (
          <div key={proj.title} className="proj-item">
            {/* Preview */}
            <div className="proj-preview">
              {proj.previewUrl ? (
                <iframe
                  src={proj.previewUrl}
                  title={proj.title}
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    color: "var(--kc-accent)",
                  }}
                >
                  <i className="fas fa-envelope-open-text" style={{ fontSize: "3rem", color: "var(--kc-link)", opacity: 0.4 }} />
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.85rem", textAlign: "center", padding: "0 20px" }}>
                    Internal project — preview not available
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="proj-info">
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  color: "var(--kc-link)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "8px",
                }}
              >
                Project {String(i + 1).padStart(2, "0")}
              </div>
              <h3>{proj.title}</h3>
              <p style={{ fontSize: "1rem", color: "#444", marginBottom: "16px", lineHeight: 1.8 }}>
                {proj.description}
              </p>

              {/* Result badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(200, 16, 46, 0.06)",
                  border: "1px solid rgba(200, 16, 46, 0.2)",
                  color: "var(--kc-link)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  fontFamily: "'IBM Plex Mono', monospace",
                  marginBottom: "20px",
                }}
              >
                <i className="fas fa-chart-line" />
                {proj.result}
              </div>

              <div className="proj-tags" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                {proj.tags.map((tag) => (
                  <span key={tag} className="kc-tag">{tag}</span>
                ))}
              </div>

              {proj.link !== "#" && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#fff",
                    background: "var(--kc-link)",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 15px rgba(200, 16, 46, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--kc-link-hover)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--kc-link)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <i className="fas fa-external-link-alt" style={{ marginRight: "8px" }} />
                  View Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="bento-card"
        style={{
          marginTop: "80px",
          background: "var(--kc-off-gray)",
          border: "1px solid #444",
          color: "#eee",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="section-label" style={{ color: "var(--kc-cement)", borderColor: "#555" }}>
            // Have a project in mind?
          </div>
          <p style={{ color: "#ccc", fontSize: "0.95rem", margin: 0 }}>
            I am available for contract and full-time roles. Let's talk about what you're building.
          </p>
        </div>
        <a href="mailto:kacy@kacyculpepper.digital" className="btn-kc btn-kc-primary" style={{ flexShrink: 0 }}>
          <i className="fas fa-envelope" style={{ marginRight: "8px" }} />
          Get In Touch
        </a>
      </div>
    </Layout>
  );
}
