import React, { useEffect, useState } from 'react';
import './Navbar.css';

const STORE_CATEGORIES = [
  {
    id: 'all',
    title: 'All Resources',
    desc: 'Complete PREMium store',
    icon: 'grid-outline',
  },
  {
    id: 'notes',
    title: 'Handwritten Notes',
    desc: 'Unit-wise exam notes',
    icon: 'document-text-outline',
  },
  {
    id: 'pyq',
    title: 'D2D & Semester PYQs',
    desc: 'Solved previous papers',
    icon: 'book-outline',
  },
  {
    id: 'resume',
    title: 'ATS Resume Templates',
    desc: 'Job-ready formats',
    icon: 'briefcase-outline',
  },
  {
    id: 'projects',
    title: 'Major / Minor Projects',
    desc: 'Source code & reports',
    icon: 'code-slash-outline',
  },
];

export default function Navbar({
  user = null,
  activeNav = 'home',
  onNavChange,
  onOpenSidebar,
  onSelectCategory,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/PM-LOGO-TEXT.png');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 14);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, tabName, targetId) => {
    e.preventDefault();
    setStoreOpen(false);
    if (onNavChange) onNavChange(tabName);

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (e, catId) => {
    e.preventDefault();
    setStoreOpen(false);
    if (onNavChange) onNavChange('store');
    if (onSelectCategory) onSelectCategory(catId);

    const storeSection = document.getElementById('our-store');
    if (storeSection) {
      storeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`pm-edge-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="pm-edge-inner">
        {/* Left: Natural Logo */}
        <a
          href="#top"
          className="pm-edge-brand"
          onClick={(e) => handleNavClick(e, 'home', 'top')}
        >
          <img
            src={logoSrc}
            alt="PREMium Mind"
            className="pm-edge-logo"
            onError={() => setLogoSrc('/small-logo.png')}
          />
        </a>

        {/* Center: Clean Architectural Nav Links */}
        <nav className="pm-edge-nav" aria-label="Primary Navigation">
          <a
            href="#top"
            className={`pm-edge-link ${activeNav === 'home' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'top')}
          >
            <ion-icon name="home-outline"></ion-icon>
            <span>Home</span>
          </a>

          {/* Store Mega Dropdown */}
          <div
            className={`pm-edge-dropdown ${storeOpen ? 'open' : ''}`}
            onMouseEnter={() => setStoreOpen(true)}
            onMouseLeave={() => setStoreOpen(false)}
          >
            <button
              type="button"
              className={`pm-edge-link ${
                activeNav === 'store' ? 'active' : ''
              }`}
              onClick={() => setStoreOpen((prev) => !prev)}
            >
              <ion-icon name="bag-handle-outline"></ion-icon>
              <span>PREMium Store</span>
              <ion-icon
                name="chevron-down-outline"
                className="pm-caret"
              ></ion-icon>
            </button>

            <div className="pm-edge-menu">
              <div className="pm-menu-top">
                <span>Browse Store</span>
                <span className="pm-menu-badge">NEW</span>
              </div>

              {STORE_CATEGORIES.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="pm-menu-item"
                  onClick={(e) => handleCategorySelect(e, item.id)}
                >
                  <div className="pm-menu-icon">
                    <ion-icon name={item.icon}></ion-icon>
                  </div>
                  <div className="pm-menu-copy">
                    <strong>{item.title}</strong>
                    <small>{item.desc}</small>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <a
            href="#cta-banner"
            className={`pm-edge-link ${
              activeNav === 'courses' ? 'active' : ''
            }`}
            onClick={(e) => handleNavClick(e, 'courses', 'cta-banner')}
          >
            <ion-icon name="play-circle-outline"></ion-icon>
            <span>Courses</span>
          </a>

          <a
            href="#footer-contact"
            className={`pm-edge-link ${
              activeNav === 'contact' ? 'active' : ''
            }`}
            onClick={(e) => handleNavClick(e, 'contact', 'footer-contact')}
          >
            <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            <span>Contact</span>
          </a>
        </nav>

        {/* Right: Account CTA + Crisp Menu Button */}
        <div className="pm-edge-right">
          {user ? (
            <button
              type="button"
              className="pm-profile-box"
              onClick={onOpenSidebar}
              title="Open Profile & Menu"
            >
              <span className="pm-box-avatar">
                {(user.name || 'P').charAt(0).toUpperCase()}
              </span>
              <span className="pm-box-name">
                {(user.name || 'User').split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="pm-cta-box-btn"
              onClick={onOpenSidebar}
            >
              <ion-icon name="person-circle-outline"></ion-icon>
              <span>Account</span>
            </button>
          )}

          <button
            type="button"
            className="pm-burger-box"
            onClick={onOpenSidebar}
            aria-label="Open Navigation Menu"
          >
            <span className="b-line top" />
            <span className="b-line bottom" />
          </button>
        </div>
      </div>
    </header>
  );
}
