/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Experience page — full work history, timeline style
 */

import Layout from "@/components/Layout";

const jobs = [
  {
    period: "2026 – Present",
    type: "Contract",
    title: "Web Support & Ad Operations Specialist",
    company: "Altaracks",
    location: "Remote",
    highlights: [
      "Manage and optimize WordPress site architecture for performance and SEO",
      "Design and deploy digital ad creatives across Google and Meta platforms",
      "Build and maintain lead generation funnels and landing pages",
      "Implement tracking pixels, UTM parameters, and conversion reporting",
    ],
    tags: ["WordPress", "Google Ads", "Meta Ads", "SEO", "Lead Gen"],
  },
  {
    period: "2024 – Present",
    type: "Full-Time",
    title: "Technical Infrastructure Specialist",
    company: "Self-Directed / Commercial Projects",
    location: "Salt Lake City, UT",
    highlights: [
      "Install and terminate commercial Cat6/Cat6A structured cabling systems",
      "Configure and deploy network switches, patch panels, and access points",
      "Troubleshoot complex network topology issues in commercial environments",
      "Apply systematic, process-driven discipline to every installation",
    ],
    tags: ["Cat6 Cabling", "Network Config", "Troubleshooting", "Infrastructure"],
  },
  {
    period: "2023",
    type: "Contract",
    title: "Email Automation Specialist",
    company: "Artisan Talent",
    location: "Remote",
    highlights: [
      "Reduced manual email workload by 60% through CSV-driven automation",
      "Built reusable, modular HTML email template library",
      "Implemented dynamic content blocks using AMPscript and Liquid",
      "Audited and cleaned contact lists, improving deliverability by 18%",
    ],
    tags: ["AMPscript", "Liquid", "HTML Email", "Automation", "List Hygiene"],
  },
  {
    period: "2014 – 2018",
    type: "Full-Time",
    title: "Email & Front-End Developer",
    company: "CHG Healthcare",
    location: "Salt Lake City, UT",
    highlights: [
      "Led full migration from table-based to responsive email design across all brands",
      "Integrated Salesforce Marketing Cloud as primary ESP for 250k+ contact database",
      "Built and maintained automated nurture journeys for healthcare professional recruitment",
      "Developed custom AMPscript logic for dynamic personalization at scale",
      "Collaborated with design, content, and compliance teams on 50+ campaigns per year",
      "Managed A/B testing program, improving average open rates from 18% to 31%",
    ],
    tags: ["Salesforce MC", "AMPscript", "Responsive Email", "A/B Testing", "CRM", "HTML/CSS"],
  },
  {
    period: "2010 – 2014",
    type: "Full-Time",
    title: "Digital Marketing Coordinator",
    company: "Various Agencies",
    location: "Salt Lake City, UT",
    highlights: [
      "Managed email campaigns for retail, entertainment, and hospitality clients",
      "Built HTML email templates from PSD mockups using table-based layouts",
      "Coordinated campaign scheduling, list segmentation, and reporting",
      "Supported clients including Simon Malls, Sorenson, and Arenawins",
    ],
    tags: ["Email Marketing", "HTML", "Campaign Management", "Reporting"],
  },
];

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
        <p style={{ fontSize: "1.1rem", color: "var(--kc-accent)", marginBottom: 0 }}>
          10+ years across email marketing, automation, web development, and technical infrastructure.
        </p>
      </header>

      <div className="bento-grid">
        <div className="bento-card bento-card-full">
          <div className="section-label section-label-red">// Career Timeline</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "48px", marginTop: "8px" }}>
            {jobs.map((job, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  gap: "32px",
                  paddingBottom: "48px",
                  borderBottom: i < jobs.length - 1 ? "1px solid var(--kc-border)" : "none",
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
                  <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "8px" }}>
                    <i className="fas fa-map-marker-alt" style={{ marginRight: "4px" }} />
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
                      <li key={j} style={{ fontSize: "0.95rem", color: "#444", lineHeight: 1.6 }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
            <div className="section-label" style={{ color: "var(--kc-cement)", borderColor: "#555" }}>
              // Full C/V
            </div>
            <p style={{ color: "#ccc", fontSize: "0.95rem", margin: 0 }}>
              Download the complete curriculum vitae for a full picture of qualifications and accomplishments.
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
