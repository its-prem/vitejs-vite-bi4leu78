import React, { useEffect, useRef, useState } from 'react';
import './Sidebar.css';

const STORE_CATEGORIES = [
  { id: 'all', label: 'All Resources', icon: 'grid-outline' },
  { id: 'notes', label: 'Handwritten Notes', icon: 'document-text-outline' },
  { id: 'pyq', label: 'D2D & Semester PYQs', icon: 'book-outline' },
  { id: 'resume', label: 'ATS Resume Templates', icon: 'briefcase-outline' },
  {
    id: 'projects',
    label: 'Major / Minor Projects',
    icon: 'code-slash-outline',
  },
];

export default function Sidebar({
  isOpen = false,
  onClose,
  user = null,
  isAdmin = false,
  onLoginDemo,
  onLogout,
  onSelectCategory,
  onNavigate,
  onPhotoChange,
}) {
  const [storeOpen, setStoreOpen] = useState(true);
  const [logoSrc, setLogoSrc] = useState('/PM-LOGO-TEXT.png');
  const [customAvatar, setCustomAvatar] = useState(null);
  const photoInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCategoryClick = (e, catId) => {
    e.preventDefault();
    if (onClose) onClose();
    if (onSelectCategory) onSelectCategory(catId);

    const storeSection = document.getElementById('our-store');
    if (storeSection) {
      storeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionScroll = (e, targetId, routePath) => {
    e.preventDefault();
    if (onClose) onClose();

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate && routePath) {
      onNavigate(routePath);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomAvatar(ev.target.result);
      if (onPhotoChange) onPhotoChange(ev.target.result, file);
    };
    reader.readAsDataURL(file);
  };

  const displayName = user?.name || 'PREMium Learner';
  const avatarSrc =
    customAvatar ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || 'PM'
    )}&background=2b0205&color=facc15&bold=true&size=128`;

  return (
    <>
      {/* Blurred Backdrop */}
      <div
        className={`pm-sb-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Compact Horizontal-Header Drawer */}
      <aside
        className={`pm-sb-drawer ${isOpen ? 'is-open' : ''}`}
        aria-label="Account & Navigation Drawer"
        aria-hidden={!isOpen}
      >
        {/* Compact Crimson-Gold Wave Header */}
        <div className="pm-sb-wave-header">
          {/* Top Bar: Logo + Close Button */}
          <div className="pm-sb-topbar">
            <a
              href="#top"
              className="pm-sb-brand-pill"
              onClick={(e) => handleSectionScroll(e, 'top', '/')}
            >
              <img
                src={logoSrc}
                alt="PREMium Mind"
                className="pm-sb-logo"
                onError={() => setLogoSrc('/small-logo.png')}
              />
            </a>

            <button
              type="button"
              className="pm-sb-close-circle"
              onClick={onClose}
              aria-label="Close Sidebar"
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>
          </div>

          {/* Horizontal Profile Row (Low Vertical Height + Circular Wave Avatar) */}
          <div className="pm-sb-horiz-profile">
            {/* Left: Circular Avatar with Animated Circular Wave Rings */}
            <div
              className="pm-sb-wave-avatar-box"
              title="Click to upload circular photo"
              onClick={() => photoInputRef.current?.click()}
            >
              <span className="pm-wave-ring ring-outer" aria-hidden="true" />
              <span className="pm-wave-ring ring-inner" aria-hidden="true" />
              <span className="pm-wave-orbit" aria-hidden="true" />

              <img
                src={avatarSrc}
                alt={displayName}
                className="pm-sb-circle-img"
              />

              <span className="pm-sb-cam-badge">
                <ion-icon name="camera"></ion-icon>
              </span>
            </div>

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {/* Right: Compact Text & Action */}
            <div className="pm-sb-horiz-info">
              {user ? (
                <>
                  <span className="pm-sb-verified-tag">● VERIFIED</span>
                  <h3 className="pm-sb-horiz-name">{user.name}</h3>
                  <p className="pm-sb-horiz-email">{user.email}</p>
                </>
              ) : (
                <>
                  <h3 className="pm-sb-horiz-name">Welcome to PREMium Mind</h3>
                  <p className="pm-sb-horiz-sub">
                    Access your notes, PYQs &amp; courses
                  </p>
                  <button
                    type="button"
                    className="pm-sb-compact-login"
                    onClick={() => {
                      if (onLoginDemo) onLoginDemo();
                      else if (onNavigate) onNavigate('/login');
                    }}
                  >
                    <ion-icon name="log-in-outline"></ion-icon>
                    <span>Login / Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bottom Smooth Flowing SVG Wave */}
          <svg
            className="pm-sb-bottom-wave"
            viewBox="0 0 360 28"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,10 C95,28 245,0 360,16 L360,28 L0,28 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="pm-sb-scroll-area">
          <div className="pm-sb-divider-label">
            <span>QUICK MENU</span>
          </div>

          <ul className="pm-sb-nav-list">
            <li className="pm-sb-row" style={{ '--delay': '0.05s' }}>
              <a
                href="#top"
                className="pm-sb-nav-btn"
                onClick={(e) => handleSectionScroll(e, 'top', '/')}
              >
                <span className="pm-sb-icon-circle">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="pm-sb-nav-text">Home</span>
                <ion-icon
                  name="chevron-forward-outline"
                  className="pm-sb-arrow-right"
                ></ion-icon>
              </a>
            </li>

            {/* Expandable Store Accordion */}
            <li
              className={`pm-sb-row pm-sb-acc ${
                storeOpen ? 'is-expanded' : ''
              }`}
              style={{ '--delay': '0.1s' }}
            >
              <button
                type="button"
                className="pm-sb-nav-btn"
                onClick={() => setStoreOpen((prev) => !prev)}
                aria-expanded={storeOpen}
              >
                <span className="pm-sb-icon-circle">
                  <ion-icon name="bag-handle-outline"></ion-icon>
                </span>
                <span className="pm-sb-nav-text">PREMium Store</span>
                <ion-icon
                  name="chevron-down-outline"
                  className="pm-sb-acc-chevron"
                ></ion-icon>
              </button>

              <div className="pm-sb-acc-panel">
                <div className="pm-sb-acc-inner">
                  {STORE_CATEGORIES.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="pm-sb-sub-item"
                      onClick={(e) => handleCategoryClick(e, cat.id)}
                    >
                      <span className="pm-sb-sub-dot" />
                      <span>{cat.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </li>

            <li className="pm-sb-row" style={{ '--delay': '0.15s' }}>
              <a
                href="#cta-banner"
                className="pm-sb-nav-btn"
                onClick={(e) =>
                  handleSectionScroll(e, 'cta-banner', '/lecture')
                }
              >
                <span className="pm-sb-icon-circle">
                  <ion-icon name="play-circle-outline"></ion-icon>
                </span>
                <span className="pm-sb-nav-text">My Courses</span>
                <span className="pm-sb-gold-pill">PRO</span>
              </a>
            </li>

            <li className="pm-sb-row" style={{ '--delay': '0.2s' }}>
              <a
                href="#footer-contact"
                className="pm-sb-nav-btn"
                onClick={(e) =>
                  handleSectionScroll(e, 'footer-contact', '/contact')
                }
              >
                <span className="pm-sb-icon-circle">
                  <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                </span>
                <span className="pm-sb-nav-text">Contact &amp; Help</span>
                <ion-icon
                  name="chevron-forward-outline"
                  className="pm-sb-arrow-right"
                ></ion-icon>
              </a>
            </li>

            {(isAdmin || user?.email === 'premkumar@premiummind.in') && (
              <li className="pm-sb-row" style={{ '--delay': '0.24s' }}>
                <a
                  href="https://premind.diplomawallah.in/admin_panel.php"
                  className="pm-sb-nav-btn pm-sb-admin-row"
                >
                  <span className="pm-sb-icon-circle">
                    <ion-icon name="settings-outline"></ion-icon>
                  </span>
                  <span className="pm-sb-nav-text">Admin Panel</span>
                </a>
              </li>
            )}

            <li className="pm-sb-row" style={{ '--delay': '0.28s' }}>
              <a
                href="#footer-contact"
                className="pm-sb-nav-btn"
                onClick={(e) =>
                  handleSectionScroll(e, 'footer-contact', '/termcondition')
                }
              >
                <span className="pm-sb-icon-circle">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                </span>
                <span className="pm-sb-nav-text">Privacy Policy</span>
                <ion-icon
                  name="chevron-forward-outline"
                  className="pm-sb-arrow-right"
                ></ion-icon>
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom Action Strip */}
        <div className="pm-sb-bottom-bar">
          {user ? (
            <button
              type="button"
              className="pm-sb-logout-action"
              onClick={() => {
                setCustomAvatar(null);
                if (onLogout) onLogout();
                if (onClose) onClose();
              }}
            >
              <ion-icon name="log-out-outline"></ion-icon>
              <span>Logout Account</span>
            </button>
          ) : (
            <a
              href="https://wa.me/918709911016"
              target="_blank"
              rel="noreferrer"
              className="pm-sb-wa-action"
            >
              <ion-icon name="logo-whatsapp"></ion-icon>
              <span>WhatsApp Support</span>
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
