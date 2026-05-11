/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Blog page — WordPress-style post listings with kacyculpepper.digital card aesthetic
 * Posts are static content representing the kind of writing Kacy would publish
 */

import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Link } from "wouter";

const posts = [
  {
    slug: "bulletproof-email-html",
    date: "April 2025",
    category: "Email Development",
    title: "What 'Bulletproof' Actually Means in Email HTML",
    excerpt:
      "After a decade of building email templates, I've learned that 'bulletproof' isn't a feature — it's a discipline. Here's what it actually takes to make an email render correctly in Outlook 2016, Gmail app, and Apple Mail simultaneously.",
    readTime: "6 min read",
    tags: ["HTML Email", "Outlook", "Development"],
  },
  {
    slug: "ampscript-personalization-scale",
    date: "March 2025",
    category: "Automation",
    title: "AMPscript Personalization at Scale: Beyond First Name",
    excerpt:
      "First-name personalization is table stakes. Real personalization means dynamic content blocks, behavioral triggers, and data extensions that make every send feel like a one-to-one conversation. Here's how I approach it in Salesforce Marketing Cloud.",
    readTime: "8 min read",
    tags: ["AMPscript", "Salesforce MC", "Personalization"],
  },
  {
    slug: "deliverability-unsexy-foundation",
    date: "February 2025",
    category: "Strategy",
    title: "Deliverability: The Unsexy Foundation of Every Campaign",
    excerpt:
      "Nobody gets excited about SPF records and bounce management. But I've seen campaigns with brilliant copy and perfect design fail because the fundamentals weren't in place. This is the deliverability checklist I run before every major send.",
    readTime: "5 min read",
    tags: ["Deliverability", "SPF/DKIM", "List Hygiene"],
  },
  {
    slug: "ab-testing-hypothesis",
    date: "January 2025",
    category: "Strategy",
    title: "A/B Testing Without a Hypothesis Is Just Guessing",
    excerpt:
      "I've audited dozens of email programs where teams were running A/B tests constantly but learning nothing. The problem isn't the testing — it's the lack of a structured hypothesis. Here's the framework I use to make every test actually teach you something.",
    readTime: "7 min read",
    tags: ["A/B Testing", "Analytics", "Strategy"],
  },
  {
    slug: "wordpress-email-integration",
    date: "December 2024",
    category: "Web Development",
    title: "Connecting WordPress to Your Email Platform the Right Way",
    excerpt:
      "Most WordPress-to-ESP integrations I inherit are held together with plugins and prayers. Here's how to build a clean, maintainable connection between WordPress and Salesforce Marketing Cloud (or Klaviyo, or Mailchimp) that won't break when you update your theme.",
    readTime: "9 min read",
    tags: ["WordPress", "ESP Integration", "PHP"],
  },
  {
    slug: "blue-collar-white-collar",
    date: "November 2024",
    category: "Career",
    title: "What Running Cable Taught Me About Email Marketing",
    excerpt:
      "I spent the last year installing commercial network infrastructure alongside my marketing work. The parallels are striking: both disciplines reward systematic thinking, punish shortcuts, and require you to understand the system before you can optimize it.",
    readTime: "4 min read",
    tags: ["Career", "Process", "Perspective"],
  },
];

const categories = [
  "All",
  "Email Development",
  "Automation",
  "Strategy",
  "Web Development",
  "Career",
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

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
          Blog
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--kc-accent)",
            marginBottom: 0,
          }}
        >
          Thoughts on email marketing, automation, web development, and the
          craft of technical marketing.
        </p>
      </header>

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              border:
                activeCategory === cat ? "none" : "1px solid var(--kc-border)",
              background:
                activeCategory === cat ? "var(--kc-link)" : "transparent",
              color: activeCategory === cat ? "#fff" : "var(--kc-accent)",
              fontSize: "0.85rem",
              fontWeight: 500,
              fontFamily: "'IBM Plex Mono', monospace",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.map((post) => (
          <article key={post.slug} className="blog-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span className="blog-card-date">{post.date}</span>
              <span
                style={{
                  background: "rgba(200, 16, 46, 0.06)",
                  color: "var(--kc-link)",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 600,
                }}
              >
                {post.category}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "1.2rem",
                margin: "8px 0 0",
                lineHeight: 1.35,
              }}
            >
              <span className="blog-card-title" style={{ cursor: "pointer" }}>
                {post.title}
              </span>
            </h2>

            <p className="blog-card-excerpt">{post.excerpt}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "auto",
                paddingTop: "12px",
                borderTop: "1px solid var(--kc-border)",
              }}
            >
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="kc-tag"
                    style={{ fontSize: "0.75rem", padding: "3px 10px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "var(--kc-accent)",
                  fontFamily: "'IBM Plex Mono', monospace",
                  whiteSpace: "nowrap",
                }}
              >
                <i className="fas fa-clock" style={{ marginRight: "4px" }} />
                {post.readTime}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div
        className="bento-card"
        style={{
          marginTop: "60px",
          background: "var(--kc-link)",
          border: "none",
          color: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "8px",
              opacity: 0.8,
            }}
          >
            // Stay Updated
          </div>
          <h3
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.3rem",
              margin: "0 0 8px",
              color: "#fff",
            }}
          >
            Get new posts in your inbox
          </h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.85, margin: 0 }}>
            Practical email marketing and automation content. No fluff.
          </p>
        </div>
        <a
          href="mailto:kacy@kacyculpepper.digital?subject=Subscribe to Blog"
          style={{
            background: "#fff",
            color: "var(--kc-link)",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "0.9rem",
            display: "inline-block",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          <i className="fas fa-envelope" style={{ marginRight: "8px" }} />
          Subscribe
        </a>
      </div>
    </Layout>
  );
}
