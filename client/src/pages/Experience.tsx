/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Experience page — full work history, timeline style
 */

import Layout from "@/components/Layout";
import { EXPERIENCE_JOBS } from "@/data/experience";

export default function Experience() {
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
          Work Experience
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--kc-accent)",
            marginBottom: 0,
          }}
        >
          10+ years across email marketing, automation, web development, and
          technical infrastructure.
        </p>
      </header>

      <div className="bento-grid">
        <div className="bento-card bento-card-full">
          <div className="section-label section-label-red">
            // Career Timeline
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "48px",
              marginTop: "8px",
            }}
          >
            {EXPERIENCE_JOBS.map((job, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "32px",
                  paddingBottom: "48px",
                  borderBottom:
                    i < EXPERIENCE_JOBS.length - 1
                      ? "1px solid var(--kc-border)"
                      : "none",
                }}
              >
                {/* Left: Period */}
                <div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.85rem",
                      color: "var(--kc-link)",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    {job.period}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      background: "rgba(200, 16, 46, 0.08)",
                      color: "var(--kc-link)",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {job.type}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#999",
                      marginTop: "8px",
                    }}
                  >
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ marginRight: "4px" }}
                    />
                    {job.location}
                  </div>
                </div>

                {/* Right: Details */}
                <div>
                  <h3
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: "1.3rem",
                      margin: "0 0 4px",
                      color: "var(--kc-text)",
                    }}
                  >
                    {job.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "var(--kc-burgundy)",
                      fontWeight: 600,
                      marginBottom: "16px",
                    }}
                  >
                    {job.company}
                  </div>
                  <ul
                    style={{
                      margin: "0 0 20px",
                      padding: "0 0 0 20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {job.highlights.map((h, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: "0.95rem",
                          color: "#444",
                          lineHeight: 1.6,
                        }}
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {job.tags.map((tag) => (
                      <span key={tag} className="kc-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download CV CTA */}
        <div
          className="bento-card"
          style={{
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
            <div
              className="section-label"
              style={{ color: "var(--kc-cement)", borderColor: "#555" }}
            >
              // Full C/V
            </div>
            <p style={{ color: "#ccc", fontSize: "0.95rem", margin: 0 }}>
              Download the complete curriculum vitae for a full picture of
              qualifications and accomplishments.
            </p>
          </div>
          <a
            href="https://docs.google.com/document/d/16RSZtZuLAhohoX6JN_oaQpijdfaV1biIAhZfVc6lK8Q/export?format=pdf"
            className="btn-kc btn-kc-primary"
            download
            style={{ flexShrink: 0 }}
          >
            <i className="fas fa-download" style={{ marginRight: "8px" }} />
            Download C/V
          </a>
        </div>
      </div>

      {/* Responsive grid override for small screens */}
      <style>{`
        @media (max-width: 640px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Layout>
  );
}
