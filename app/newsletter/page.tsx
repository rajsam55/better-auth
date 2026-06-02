"use client";

import { useState } from "react";

const CATEGORIES = [
  { id: "tutorials", label: "Tutorials", description: "Step-by-step guides and how-tos" },
  { id: "news", label: "Tech News", description: "Latest in web development" },
  { id: "tools", label: "Tools & Resources", description: "Handpicked tools worth your time" },
  { id: "essays", label: "Essays", description: "Long-form thoughts and opinions" },
];

const FREQUENCIES = [
  { id: "weekly", label: "Weekly digest", sublabel: "Every Sunday morning" },
  { id: "biweekly", label: "Twice a month", sublabel: "1st & 15th" },
  { id: "monthly", label: "Monthly roundup", sublabel: "End of the month" },
];

const RECENT_ISSUES = [
  {
    issue: "#42",
    title: "The death of the SPA — and what comes next",
    date: "May 25, 2026",
    readTime: "6 min",
    tags: ["Essays", "Next.js"],
  },
  {
    issue: "#41",
    title: "12 TypeScript patterns that changed how I write code",
    date: "May 18, 2026",
    readTime: "9 min",
    tags: ["Tutorials", "TypeScript"],
  },
  {
    issue: "#40",
    title: "AI tooling for frontend devs: an honest review",
    date: "May 11, 2026",
    readTime: "7 min",
    tags: ["Tools & Resources"],
  },
];

const STATS = [
  { value: "14,200+", label: "Subscribers" },
  { value: "42", label: "Issues published" },
  { value: "92%", label: "Open rate" },
];

export default function NewsletterPage() {

  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["tutorials"]);
  const [frequency, setFrequency] = useState("weekly");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (selectedCategories.length === 0) {
      setError("Please select at least one topic.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="newsletter-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .newsletter-page {
          font-family: 'Outfit', sans-serif;
          background: #0c0c0e;
          color: #e8e4dc;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Grid background */
        .newsletter-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .page-wrap {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── NAV ── */
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 80px;
        }
        .nav-logo {
          font-family: 'DM Mono', monospace;
          font-size: 15px;
          font-weight: 500;
          color: #e8e4dc;
          letter-spacing: -0.3px;
        }
        .nav-logo span { color: #b5f542; }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          font-size: 14px;
          color: rgba(232,228,220,0.5);
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 400;
        }
        .nav-links a:hover { color: #e8e4dc; }

        /* ── HERO ── */
        .hero {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 60px;
          align-items: start;
          margin-bottom: 100px;
        }

        .hero-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #b5f542;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: #b5f542;
        }

        h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(42px, 5vw, 64px);
          line-height: 1.08;
          font-weight: 400;
          color: #e8e4dc;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }
        h1 em {
          font-style: italic;
          color: #b5f542;
        }

        .hero-sub {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(232,228,220,0.6);
          font-weight: 300;
          max-width: 460px;
          margin-bottom: 40px;
        }

        .stats-row {
          display: flex;
          gap: 36px;
        }
        .stat { }
        .stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #e8e4dc;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 12px;
          color: rgba(232,228,220,0.4);
          font-weight: 400;
          letter-spacing: 0.5px;
        }

        /* ── FORM CARD ── */
        .form-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          padding: 36px;
          position: sticky;
          top: 32px;
        }

        .form-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #e8e4dc;
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .form-card-sub {
          font-size: 13px;
          color: rgba(232,228,220,0.45);
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .field { margin-bottom: 14px; }
        .field label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(232,228,220,0.5);
          letter-spacing: 0.4px;
          margin-bottom: 7px;
          text-transform: uppercase;
        }
        .field input[type="text"],
        .field input[type="email"] {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 16px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          color: #e8e4dc;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .field input:focus {
          border-color: rgba(181,245,66,0.5);
          background: rgba(181,245,66,0.04);
        }
        .field input::placeholder { color: rgba(232,228,220,0.25); }

        .section-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(232,228,220,0.5);
          letter-spacing: 0.4px;
          text-transform: uppercase;
          margin: 20px 0 10px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 20px;
        }
        .cat-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 12px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s;
        }
        .cat-btn.active {
          background: rgba(181,245,66,0.1);
          border-color: rgba(181,245,66,0.4);
        }
        .cat-btn-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: rgba(232,228,220,0.7);
          margin-bottom: 2px;
        }
        .cat-btn.active .cat-btn-label { color: #b5f542; }
        .cat-btn-desc {
          font-size: 11px;
          color: rgba(232,228,220,0.3);
          line-height: 1.3;
        }

        .freq-options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .freq-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.15s;
        }
        .freq-btn.active {
          background: rgba(181,245,66,0.08);
          border-color: rgba(181,245,66,0.35);
        }
        .freq-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(232,228,220,0.75);
        }
        .freq-btn.active .freq-label { color: #e8e4dc; }
        .freq-sublabel {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(232,228,220,0.3);
        }
        .freq-btn.active .freq-sublabel { color: rgba(181,245,66,0.7); }
        .freq-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .freq-btn.active .freq-dot {
          background: #b5f542;
          border-color: #b5f542;
        }

        .submit-btn {
          width: 100%;
          background: #b5f542;
          color: #0c0c0e;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.2px;
        }
        .submit-btn:hover { background: #c6f76a; transform: translateY(-1px); }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        .error-msg {
          font-size: 13px;
          color: #f97066;
          margin-bottom: 12px;
          padding: 10px 14px;
          background: rgba(249,112,102,0.1);
          border-radius: 8px;
          border: 1px solid rgba(249,112,102,0.2);
        }
        .privacy-note {
          text-align: center;
          font-size: 11px;
          color: rgba(232,228,220,0.25);
          margin-top: 12px;
          line-height: 1.5;
        }

        /* ── SUCCESS ── */
        .success-state {
          text-align: center;
          padding: 12px 0;
        }
        .success-icon {
          width: 56px;
          height: 56px;
          background: rgba(181,245,66,0.12);
          border: 1px solid rgba(181,245,66,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 22px;
        }
        .success-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #e8e4dc;
          margin-bottom: 8px;
        }
        .success-sub {
          font-size: 14px;
          color: rgba(232,228,220,0.5);
          line-height: 1.6;
        }
        .success-confirm {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #b5f542;
          background: rgba(181,245,66,0.08);
          border: 1px solid rgba(181,245,66,0.2);
          border-radius: 8px;
          padding: 10px 16px;
          margin-top: 20px;
          display: inline-block;
        }

        /* ── RECENT ISSUES ── */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 28px;
        }
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: 30px;
          color: #e8e4dc;
          font-weight: 400;
        }
        .view-all {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: rgba(232,228,220,0.4);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.5px;
        }
        .view-all:hover { color: #b5f542; }

        .issues-list { display: flex; flex-direction: column; gap: 2px; }
        .issue-row {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 22px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.15s;
          border-radius: 4px;
        }
        .issue-row:hover { padding-left: 8px; padding-right: 8px; background: rgba(255,255,255,0.02); }
        .issue-num {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: rgba(232,228,220,0.25);
          letter-spacing: 0.5px;
        }
        .issue-title {
          font-size: 16px;
          font-weight: 500;
          color: rgba(232,228,220,0.85);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .issue-meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .issue-date {
          font-size: 12px;
          color: rgba(232,228,220,0.3);
          font-weight: 400;
        }
        .issue-tag {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          color: rgba(232,228,220,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          font-weight: 500;
        }
        .issue-read {
          font-size: 12px;
          color: rgba(232,228,220,0.3);
          font-family: 'DM Mono', monospace;
          white-space: nowrap;
        }

        /* ── FOOTER ── */
        footer {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 40px 0;
          margin-top: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-left {
          font-size: 13px;
          color: rgba(232,228,220,0.3);
        }
        .footer-links { display: flex; gap: 24px; list-style: none; }
        .footer-links a {
          font-size: 13px;
          color: rgba(232,228,220,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: rgba(232,228,220,0.7); }

        @media (max-width: 820px) {
          .hero { grid-template-columns: 1fr; gap: 40px; }
          .form-card { position: static; }
          .stats-row { gap: 24px; }
          nav { margin-bottom: 48px; }
          .nav-links { gap: 20px; }
        }
        @media (max-width: 480px) {
          .nav-links { display: none; }
          .issue-row { grid-template-columns: 48px 1fr; }
          .issue-read { display: none; }
        }
      `}</style>

      <div className="page-wrap">
        <nav>
          <div className="nav-logo">dev<span>.</span>letters</div>
          <ul className="nav-links">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>

        <section className="hero">
          <div>
            <p className="hero-eyebrow">Newsletter</p>
            <h1>
              Ideas worth <em>reading,</em><br />
              delivered to you.
            </h1>
            <p className="hero-sub">
              A curated newsletter for developers who care about craft.
              No filler, no sponsored content — just the best writing,
              tools, and tutorials from across the web.
            </p>
            <div className="stats-row">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM CARD */}
          <div className="form-card">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h2 className="success-title">You're in!</h2>
                <p className="success-sub">
                  Check your inbox for a confirmation email.
                  Your first issue lands {frequency === "weekly" ? "this Sunday" : "soon"}.
                </p>
                <div className="success-confirm">
                  {selectedCategories.length} topic{selectedCategories.length !== 1 && "s"} · {FREQUENCIES.find(f => f.id === frequency)?.label}
                </div>
              </div>
            ) : (
              <>
                <h2 className="form-card-title">Subscribe for free</h2>
                <p className="form-card-sub">
                  Join {STATS[0].value} readers. Unsubscribe anytime.
                </p>

                <div className="field">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="Alex"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Email address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <p className="section-label">Topics I care about</p>
                <div className="categories-grid">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className={`cat-btn${selectedCategories.includes(cat.id) ? " active" : ""}`}
                      onClick={() => toggleCategory(cat.id)}
                      type="button"
                    >
                      <span className="cat-btn-label">{cat.label}</span>
                      <span className="cat-btn-desc">{cat.description}</span>
                    </button>
                  ))}
                </div>

                <p className="section-label">How often</p>
                <div className="freq-options">
                  {FREQUENCIES.map((f) => (
                    <button
                      key={f.id}
                      className={`freq-btn${frequency === f.id ? " active" : ""}`}
                      onClick={() => setFrequency(f.id)}
                      type="button"
                    >
                      <span>
                        <span className="freq-label">{f.label}</span>
                        <br />
                        <span className="freq-sublabel">{f.sublabel}</span>
                      </span>
                      <div className="freq-dot" />
                    </button>
                  ))}
                </div>

                {error && <p className="error-msg">{error}</p>}

                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                  type="button"
                >
                  {loading ? "Subscribing…" : "Subscribe — it's free"}
                </button>
                <p className="privacy-note">
                  No spam, ever. Your email stays private.
                </p>
              </>
            )}
          </div>
        </section>

        {/* RECENT ISSUES */}
        <section>
          <div className="section-header">
            <h2 className="section-title">Recent issues</h2>
            <a href="#" className="view-all">View archive →</a>
          </div>
          <div className="issues-list">
            {RECENT_ISSUES.map((issue) => (
              <div className="issue-row" key={issue.issue}>
                <span className="issue-num">{issue.issue}</span>
                <div>
                  <p className="issue-title">{issue.title}</p>
                  <div className="issue-meta">
                    <span className="issue-date">{issue.date}</span>
                    {issue.tags.map((tag) => (
                      <span className="issue-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="issue-read">{issue.readTime} read</span>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <p className="footer-left">© 2026 dev.letters</p>
          <ul className="footer-links">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Unsubscribe</a></li>
            <li><a href="#">RSS</a></li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
