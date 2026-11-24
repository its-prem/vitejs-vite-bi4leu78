import React, { useState, useEffect, useRef } from "react";
import "./Footer.css";

const PHONE_DISPLAY = "+91 87099 11016";
const PHONE_RAW = "918709911016";

const STORE_PILLS = [
  { id: "all", label: "All Store" },
  { id: "notes", label: "Notes" },
  { id: "ebooks", label: "E-Books" },
  { id: "resume", label: "ATS Resumes" },
  { id: "projects", label: "Projects" },
];

export default function Footer({ onSelectCategory }) {
  const [logoSrc, setLogoSrc] = useState("/PM-LOGO-TEXT.png");
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (e, catId) => {
    e.preventDefault();
    if (onSelectCategory) onSelectCategory(catId);
    const storeEl = document.getElementById("our-store");
    if (storeEl) storeEl.scrollIntoView({ behavior: "smooth" });
  };

  const waLink = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(
    "Hello PREMium Mind! Mujhe notes/courses ke bare me help chahiye."
  )}`;

  return (
    <footer
      ref={footerRef}
      className={`pmf-footer ${isVisible ? "pmf-visible" : ""}`}
      id="footer-contact"
    >
      {/* Animated Top Gold-Crimson Glow Line */}
      <div className="pmf-top-beam" aria-hidden="true" />
      <div className="pmf-glow-bg" aria-hidden="true" />

      <div className="pmf-container">
        {/* TIER 1: Sleek Floating Brand & Direct Action Card */}
        <div className="pmf-hero-card">
          <div className="pmf-brand-block">
            <a
              href="#top"
              className="pmf-logo-badge"
              onClick={(e) => scrollToSection(e, "top")}
              aria-label="PREMium Mind Home"
            >
              <img
                src={logoSrc}
                alt="PREMium Mind"
                className="pmf-logo-img"
                onError={() => setLogoSrc("/small-logo.png")}
              />
            </a>
            <p className="pmf-tagline">
              Exam-ready handwritten notes, solved PYQs &amp; projects for
              Polytechnic and Engineering students.
            </p>
          </div>

          <div className="pmf-action-group">
            <a href={`tel:+${PHONE_RAW}`} className="pmf-call-btn">
              <span className="pmf-call-icon">
                <ion-icon name="call-outline"></ion-icon>
              </span>
              <span className="pmf-call-num">{PHONE_DISPLAY}</span>
            </a>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="pmf-wa-btn"
            >
              <span className="pmf-wa-shine" aria-hidden="true" />
              <span className="pmf-live-dot" />
              <ion-icon name="logo-whatsapp"></ion-icon>
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>

        {/* TIER 2: Single-Row Store Pills + Social Icons */}
        <div className="pmf-mid-row">
          <div className="pmf-pill-nav" aria-label="Store Categories">
            {STORE_PILLS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleCategoryClick(e, item.id)}
                className="pmf-cat-pill"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#cta-banner"
              onClick={(e) => scrollToSection(e, "cta-banner")}
              className="pmf-cat-pill pmf-pill-gold"
            >
              Courses
            </a>
          </div>

          <div className="pmf-socials">
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="pmf-soc-icon pmf-wa"
              aria-label="WhatsApp"
            >
              <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
            <a
              href="#our-store"
              onClick={(e) => scrollToSection(e, "our-store")}
              className="pmf-soc-icon pmf-yt"
              aria-label="YouTube"
            >
              <ion-icon name="logo-youtube"></ion-icon>
            </a>
            <a
              href="#our-store"
              onClick={(e) => scrollToSection(e, "our-store")}
              className="pmf-soc-icon pmf-ig"
              aria-label="Instagram"
            >
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a
              href="#our-store"
              onClick={(e) => scrollToSection(e, "our-store")}
              className="pmf-soc-icon pmf-tg"
              aria-label="Telegram"
            >
              <ion-icon name="paper-plane-outline"></ion-icon>
            </a>
          </div>
        </div>
      </div>

      {/* TIER 3: Minimal Bottom Strip */}
      <div className="pmf-bottom-bar">
        <div className="pmf-container pmf-bottom-inner">
          <p className="pmf-copyright">
            © {new Date().getFullYear()} <strong>PREMium Mind</strong> • Wisdom
            on Demand
          </p>

          <div className="pmf-legal-right">
            <a href="#privacy">Privacy</a>
            <span className="pmf-dot">•</span>
            <a href="#terms">Terms</a>
            <button
              type="button"
              className="pmf-top-btn"
              onClick={(e) => scrollToSection(e, "top")}
              aria-label="Back to top"
              title="Back to top"
            >
              <ion-icon name="arrow-up-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}