import React, { useState } from 'react';
import './styles/theme.css';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Items', icon: 'grid-outline' },
  { id: 'notes', label: 'Notes', icon: 'document-text-outline' },
  { id: 'ebooks', label: 'E-Books', icon: 'book-outline' },
  { id: 'resume', label: 'Resume', icon: 'briefcase-outline' },
  { id: 'report-writing', label: 'Reports', icon: 'bar-chart-outline' },
  { id: 'projects', label: 'Projects', icon: 'code-slash-outline' },
];

const STORE_PRODUCTS = [
  {
    id: 1,
    category: 'notes',
    badge: 'POPULAR',
    title: 'AI & Machine Learning Complete Notes + PYQ',
    desc1:
      'All 5 units crisp exam notes with solved JUT previous year questions.',
    image: '/AI AND ML.png',
    sampleImg: '/DEMO IOT PDF_1 (1).jpg',
    qrImg: '/SCANNER30.jpeg',
    price: 30,
    oldPrice: 199,
    rating: '4.9',
    timer: '02h 15m',
    btnType: 'buy',
    driveLink: 'https://drive.google.com/',
  },
  {
    id: 2,
    category: 'ebooks',
    badge: 'BEST SELLER',
    title: 'Internet of Things (IoT) Exam Booster Guide',
    desc1:
      'Complete syllabus diagrams, block architectures & expected questions.',
    image: '/DEMO IOT PDF_1 (1).jpg',
    sampleImg: '/DEMO IOT PDF_1 (1).jpg',
    qrImg: '/SCANNER30.jpeg',
    price: 30,
    oldPrice: 149,
    rating: '4.9',
    timer: '',
    btnType: 'buy',
    driveLink: 'https://drive.google.com/',
  },
  {
    id: 3,
    category: 'resume',
    badge: 'LIMITED OFFER',
    title: 'Modern ATS Resume Template Pack (Editable)',
    desc1: 'High-selection engineering & diploma fresher resume formats.',
    image: '/JUT_Banner.png',
    sampleImg: '/DEMO IOT PDF_1 (1).jpg',
    qrImg: '/SCANNER30.jpeg',
    price: 49,
    oldPrice: 199,
    rating: '4.8',
    timer: '01h 40m',
    btnType: 'buy',
    driveLink: 'https://drive.google.com/',
  },
  {
    id: 4,
    category: 'projects',
    badge: 'NEW',
    title: 'D2D PYQ Research Lab & Full Mock Bank',
    desc1: '6 years solved Jharkhand D2D entrance papers with shortcut tricks.',
    image: '/AI AND ML.png',
    sampleImg: '/DEMO IOT PDF_1 (1).jpg',
    qrImg: '/SCANNER30.jpeg',
    price: 49,
    oldPrice: 249,
    rating: '4.9',
    timer: '',
    btnType: 'coming_soon',
    driveLink: 'https://drive.google.com/',
  },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [user, setUser] = useState(null);

  // Sample Preview Modal State
  const [previewItem, setPreviewItem] = useState(null);

  // Checkout Modal State
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [utrId, setUtrId] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredProducts =
    activeCategory === 'all'
      ? STORE_PRODUCTS
      : STORE_PRODUCTS.filter((item) => item.category === activeCategory);

  const openBuyModal = (product) => {
    setCheckoutItem(product);
    setPaymentDone(false);
    setFormError('');
    setUtrId('');
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || buyerPhone.trim().length < 10) {
      setFormError('Apna Name aur 10-digit WhatsApp Number sahi se bharein.');
      return;
    }
    if (utrId.trim().length < 6) {
      setFormError('Valid UPI Transaction / UTR Number daalein.');
      return;
    }
    setFormError('');
    setPaymentDone(true);
  };

  return (
    <div className="pm-page-wrapper" id="top">
      <Navbar
        user={user}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onOpenSidebar={() => setSidebarOpen(true)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onLoginDemo={() =>
          setUser({ name: 'Prem Kumar', email: 'premkumar@premiummind.in' })
        }
        onLogout={() => setUser(null)}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* ================= SEAMLESS HERO (CONTINUOUS FLOW + STICKY PHONE PARALLAX) ================= */}
      <section className="pm-hero">
        {/* Ambient Crimson Glow */}
        <div className="pm-hero-ambient-glow" aria-hidden="true" />

        {/* Photo Stage: Seamless Right Flow on Laptop | Sticky Top Background on Phone */}
        <div className="pm-hero-photo-stage" aria-hidden="true">
          <img src="/mh.jpg" alt="PREMium Mind" className="pm-hero-clear-img" />
          <div className="pm-hero-seamless-blend" />
        </div>

        {/* Foreground Scrolling Content Layer */}
        <div className="pm-hero-inner">
          <div className="pm-hero-main-row">
            <div className="pm-hero-left">
              {/* Masked Line-by-Line Animated Heading */}
              <h1 className="pm-hero-heading">
                <span className="pm-line-mask">
                  <span className="pm-line-reveal line-1">Empowering</span>
                </span>
                <span className="pm-line-mask">
                  <span className="pm-line-reveal line-2 pm-highlight-crimson">
                    Polytechnic &amp;
                  </span>
                </span>
                <span className="pm-line-mask">
                  <span className="pm-line-reveal line-3">Engineering</span>
                </span>
                <span className="pm-line-mask pm-last-line">
                  <span className="pm-line-reveal line-4 pm-underline-target">
                    Students
                    <svg
                      className="pm-red-brush"
                      viewBox="0 0 220 18"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        className="brush-stroke-main"
                        d="M3 13 C58 3, 152 3, 217 12"
                        stroke="#e11d48"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                      <path
                        className="brush-stroke-sub"
                        d="M28 16 C82 9, 148 9, 196 15"
                        stroke="#facc15"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h1>

              <p className="pm-hero-desc anim-fade-up-1">
                Premium Notes, Courses, PYQs and More —
                <br />
                Learn Smart, Grow Better.
              </p>

              {/* 3D Frosted Glass Action Buttons */}
              <div className="pm-hero-btns anim-fade-up-2">
                <a
                  href="#our-store"
                  className="pm-glass-btn-primary"
                  onClick={() => setActiveNav('store')}
                >
                  <ion-icon name="cart-outline"></ion-icon>
                  <span>Visit Store</span>
                  <span className="btn-arrow">→</span>
                </a>

                <a
                  href="#cta-banner"
                  className="pm-glass-btn-secondary"
                  onClick={() => setActiveNav('courses')}
                >
                  <span className="play-glass-circle">
                    <ion-icon name="play"></ion-icon>
                  </span>
                  <span>Explore Courses</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4-Column Floating Glass Trust Bar */}
          <div className="pm-trust-strip anim-fade-up-3">
            <div className="pm-trust-cell">
              <div className="pm-trust-badge">
                <ion-icon name="flash"></ion-icon>
              </div>
              <span>
                Instant
                <br />
                Download
              </span>
            </div>

            <div className="pm-trust-line" />

            <div className="pm-trust-cell">
              <div className="pm-trust-badge">
                <ion-icon name="shield-checkmark"></ion-icon>
              </div>
              <span>
                Secure
                <br />
                Payment
              </span>
            </div>

            <div className="pm-trust-line" />

            <div className="pm-trust-cell">
              <div className="pm-trust-badge">
                <ion-icon name="headset"></ion-icon>
              </div>
              <span>
                24/7
                <br />
                Support
              </span>
            </div>

            <div className="pm-trust-line" />

            <div className="pm-trust-cell">
              <div className="pm-trust-badge">
                <ion-icon name="people"></ion-icon>
              </div>
              <span>
                Trusted by
                <br />
                Students
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORIGINAL THEME STORE SECTION ================= */}
      <section className="pm-store-section" id="our-store">
        <div className="pm-container">
          {/* Category Filter Bar */}
          <div className="pm-cat-bar-wrap">
            <div className="pm-cat-tabs">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`pm-cat-tab ${
                    activeCategory === tab.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  <ion-icon name={tab.icon}></ion-icon>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pm-section-heading">
            <h2>EXPLORE OUR PREMium Mind STORE</h2>
            <p>Exam-Focused Notes, Solved PYQs &amp; Career Resources</p>
          </div>

          {/* Original Card Size Grid (minmax 275px) */}
          <div className="pm-cards-grid">
            {filteredProducts.map((course, idx) => (
              <article
                key={course.id}
                className="pm-course-card"
                style={{ animationDelay: `${idx * 65}ms` }}
              >
                <div className="pm-card-thumb">
                  {course.badge && (
                    <span className="pm-ribbon-badge">{course.badge}</span>
                  )}
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/small-logo.png';
                    }}
                  />
                </div>

                <div className="pm-preview-row">
                  <button
                    type="button"
                    className="pm-preview-pill"
                    onClick={() => setPreviewItem(course)}
                  >
                    <ion-icon name="eye-outline"></ion-icon>
                    <span>Preview Page 1</span>
                  </button>
                </div>

                <h3 className="pm-card-title">{course.title}</h3>
                <p className="pm-card-desc">{course.desc1}</p>

                {course.timer && (
                  <div className="pm-mini-timer">
                    ⏰ Limited Offer: <span>{course.timer}</span>
                  </div>
                )}

                <div className="pm-card-meta">
                  <div className="pm-price-group">
                    <span className="pm-sale-price">₹{course.price}</span>
                    {course.oldPrice && (
                      <span className="pm-old-price">₹{course.oldPrice}</span>
                    )}
                  </div>
                  <div className="pm-rating-pill">
                    <ion-icon name="star"></ion-icon>
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="pm-card-footer-btn">
                  {course.btnType === 'coming_soon' ? (
                    <button
                      type="button"
                      className="pm-coming-soon-btn"
                      disabled
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="pm-buy-btn"
                      onClick={() => openBuyModal(course)}
                    >
                      <ion-icon name="cart-outline"></ion-icon>
                      <span>Buy Now</span>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CRIMSON & GOLD CTA BANNER ================= */}
      <section className="pm-cta-section" id="cta-banner">
        <div className="pm-container">
          <div className="pm-crimson-banner">
            <div className="pm-banner-icon">
              <ion-icon name="book-outline"></ion-icon>
            </div>
            <div className="pm-banner-copy">
              <h3>Build Your Skills. Achieve Your Goals.</h3>
              <p>
                Access complete semester bundles, PYQs, and project source
                codes.
              </p>
            </div>
            <a href="#our-store" className="pm-banner-gold-btn">
              Explore Store →
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />

      {/* ================= SAMPLE PAGE 1 PREVIEW MODAL ================= */}
      {previewItem && (
        <div className="pm-modal-overlay" onClick={() => setPreviewItem(null)}>
          <div
            className="pm-modal-card preview-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pm-modal-head">
              <div>
                <h4>{previewItem.title}</h4>
                <small>Page 1 Free Sample • Buy to unlock complete PDF</small>
              </div>
              <button type="button" onClick={() => setPreviewItem(null)}>
                ✕
              </button>
            </div>
            <div className="pm-modal-body center">
              <img
                src={previewItem.sampleImg}
                alt="Sample Page 1"
                className="pm-sample-img"
                onError={(e) => {
                  e.currentTarget.src = '/small-logo.png';
                }}
              />
            </div>
            <div className="pm-modal-foot">
              <button
                type="button"
                className="pm-buy-btn"
                onClick={() => {
                  const target = previewItem;
                  setPreviewItem(null);
                  openBuyModal(target);
                }}
              >
                Unlock Full PDF @ ₹{previewItem.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= UPI QR CHECKOUT MODAL ================= */}
      {checkoutItem && (
        <div className="pm-modal-overlay" onClick={() => setCheckoutItem(null)}>
          <div
            className="pm-modal-card checkout-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pm-modal-head">
              <div>
                <h4>Instant UPI Checkout</h4>
                <small>{checkoutItem.title}</small>
              </div>
              <button type="button" onClick={() => setCheckoutItem(null)}>
                ✕
              </button>
            </div>

            {!paymentDone ? (
              <form className="pm-modal-body" onSubmit={handleCheckoutSubmit}>
                <div className="pm-pay-strip">
                  <span>Total Payable</span>
                  <strong>₹{checkoutItem.price}</strong>
                </div>

                <div className="pm-qr-center">
                  <img
                    src={checkoutItem.qrImg}
                    alt="UPI Scanner"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <p>
                    PhonePe / GPay / Paytm se <b>₹{checkoutItem.price}</b> scan
                    karke pay karein:
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Student Full Name *"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="10-Digit WhatsApp Number *"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="12-Digit UPI UTR / Reference ID *"
                  value={utrId}
                  onChange={(e) => setUtrId(e.target.value)}
                />

                {formError && <p className="pm-err-msg">{formError}</p>}

                <button type="submit" className="pm-buy-btn">
                  ✔ Verify Payment &amp; Get PDF
                </button>
              </form>
            ) : (
              <div className="pm-modal-body center">
                <div className="pm-success-pill">🎉 Payment Submitted!</div>
                <h4>Thank You, {buyerName}!</h4>
                <p className="pm-sub-note">
                  UTR <code>{utrId}</code> verify ho gaya hai. Neeche se PDF
                  download karein:
                </p>
                <a
                  href={checkoutItem.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="pm-buy-btn link-btn"
                >
                  📥 Download PDF Now
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
