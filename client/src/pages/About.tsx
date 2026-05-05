/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * About page — expanded bio, philosophy, tools, personal facts
 */

import Layout from "@/components/Layout";

const tools = [
  { icon: "fas fa-envelope", label: "Salesforce Marketing Cloud" },
  { icon: "fas fa-code", label: "HTML / CSS / AMPscript" },
  { icon: "fab fa-wordpress", label: "WordPress / PHP" },
  { icon: "fas fa-robot", label: "Marketing Automation" },
  { icon: "fas fa-chart-bar", label: "Analytics & A/B Testing" },
  { icon: "fab fa-adobe", label: "Adobe Creative Suite" },
  { icon: "fas fa-network-wired", label: "Network Infrastructure" },
  { icon: "fas fa-database", label: "CRM & List Hygiene" },
];

export default function About() {
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
          About Kacy
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--kc-accent)", marginBottom: 0 }}>
          Creative technologist. Email specialist. Blue-collar work ethic, white-collar strategy.
        </p>
      </header>

      <div className="bento-grid">

        {/* Main Bio */}
        <div className="bento-card bento-card-wide">
          <div className="section-label section-label-red">// Who I Am</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            <div>
              <p style={{ marginTop: 0 }}>
                I am a creative technologist with over <strong>10 years of experience</strong> at the intersection of
                email marketing, web development, and process automation. My work lives in the space between
                creative vision and technical execution — where a well-crafted HTML template meets a precisely
                tuned automation workflow.
              </p>
              <p>
                I got my start at <strong>CHG Healthcare</strong>, where I led the migration from table-based email
                layouts to fully responsive designs, integrated Salesforce Marketing Cloud, and managed campaigns
                reaching hundreds of thousands of healthcare professionals. That experience gave me a deep
                appreciation for the craft of email — not just as a channel, but as an engineering discipline.
              </p>
            </div>
            <div>
              <p>
                Since then, I have worked across industries — retail, entertainment, telecommunications — building
                automation systems, optimizing deliverability, and writing the kind of AMPscript that makes
                personalization feel effortless to the reader.
              </p>
              <p>
                Today, I bring that same precision to web support and ad operations, while simultaneously sharpening
                my technical edge through hands-on infrastructure work. I believe the best marketers understand
                the systems they work within — not just the surfaces.
              </p>
              <p style={{ marginBottom: 0 }}>
                I am looking for roles where I can bring both the creative and the technical — where "I can build
                that" and "I can measure that" are equally valued.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bento-card">
          <div className="section-label">// Philosophy</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { icon: "fas fa-hammer", title: "Build it right", desc: "Bulletproof HTML. Tested across 40+ clients. No shortcuts." },
              { icon: "fas fa-chart-line", title: "Measure everything", desc: "Every send is a hypothesis. Open rates, CTR, conversion — all data." },
              { icon: "fas fa-cogs", title: "Automate the repetitive", desc: "If you're doing it twice, it should be a workflow." },
              { icon: "fas fa-eye", title: "Design with intent", desc: "Every pixel, every word, every CTA has a reason to exist." },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
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
                  <strong style={{ fontSize: "0.95rem" }}>{item.title}</strong>
                  <div style={{ fontSize: "0.88rem", color: "#666", marginTop: "2px" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Tech */}
        <div className="bento-card bento-card-wide">
          <div className="section-label">// Tools & Technologies</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  background: "#f8f8f8",
                  borderRadius: "8px",
                  border: "1px solid var(--kc-border)",
                }}
              >
                <i className={tool.icon} style={{ color: "var(--kc-link)", width: "20px", textAlign: "center" }} />
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{tool.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div className="bento-card bento-dark">
          <div className="section-label">// Quick Facts</div>
          <div style={{ display: "grid", gap: "12px" }}>
            {[
              ["📍", "Location", "Salt Lake City, UT"],
              ["💼", "Status", "Open to opportunities"],
              ["⏱", "Experience", "10+ years in email & web"],
              ["🎯", "Specialty", "Email Marketing & Automation"],
              ["🔧", "Side Work", "Network infrastructure & cabling"],
              ["📧", "Campaigns Sent", "Millions of emails delivered"],
            ].map(([icon, label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #3a3a3a",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "#aaa" }}>
                  {icon} {label}
                </span>
                <span style={{ color: "#eee", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.85rem" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
