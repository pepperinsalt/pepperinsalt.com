/*
 * DESIGN: Neo-Editorial / Brutalist Minimalism
 * Layout wraps all pages with: fixed clock, top nav, footer
 * Nav: left-anchored, minimal, Inter font
 * Clock: fixed top-right, IBM Plex Mono
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState("");
  const [location] = useLocation();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: "var(--kc-bg)", minHeight: "100vh" }}>
      {/* Skip to Content Link */}
      <a
        href="#main"
        className="absolute -translate-y-full focus:translate-y-0 -left-[9999px] focus:left-4 top-4 z-[100000] bg-[var(--kc-link)] text-white px-4 py-2 rounded-md font-bold transition-transform duration-200"
      >
        Skip to main content
      </a>

      {/* Fixed Clock */}
      <div className="fixed-clock">{time}</div>

      <div className="container" style={{ paddingTop: "48px", paddingBottom: "64px" }}>
        {/* Navigation */}
        <nav className="kc-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={location === link.href ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Page Content */}
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            marginTop: "80px",
            paddingTop: "32px",
            borderTop: "1px solid var(--kc-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.85rem",
            color: "var(--kc-accent)",
          }}
        >
          <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            © {new Date().getFullYear()} Kacy Edward Culpepper
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a
              href="mailto:kacy@kacyculpepper.digital"
              style={{ color: "var(--kc-accent)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--kc-link)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--kc-accent)")}
            >
              <i className="fas fa-envelope" style={{ marginRight: "6px" }} />
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/kacyculpepper"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--kc-accent)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--kc-link)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--kc-accent)")}
            >
              <i className="fab fa-linkedin" style={{ marginRight: "6px" }} />
              LinkedIn
            </a>
            <a
              href="https://github.com/pepperinsalt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--kc-accent)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--kc-link)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--kc-accent)")}
            >
              <i className="fab fa-github" style={{ marginRight: "6px" }} />
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
