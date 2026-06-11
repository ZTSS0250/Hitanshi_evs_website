import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight, FaBolt, FaLeaf, FaShieldAlt, FaTools,
  FaHandshake, FaStar, FaQuoteLeft, FaCheckCircle,
  FaAward, FaCarAlt,
} from 'react-icons/fa'
import { MdElectricScooter, MdSpeed, MdBatteryChargingFull } from 'react-icons/md'
import { vehicles, testimonials, stats } from '../data/vehicles'
import { HERO_BIKE, OFFER_BANNER } from '../assets/images/index'
import './Home.css'

/* ── Inline SVG scooter silhouette ── */
function ScooterSVG({ color = '#00D45E', className = '' }) {
  return (
    <svg viewBox="0 0 260 180" className={`scooter-svg ${className}`} xmlns="http://www.w3.org/2000/svg">
      {/* Rear wheel */}
      <circle cx="58"  cy="138" r="32" fill="none" stroke={color} strokeWidth="7" opacity=".85"/>
      <circle cx="58"  cy="138" r="16" fill="none" stroke={color} strokeWidth="3" opacity=".35"/>
      <circle cx="58"  cy="138" r="5"  fill={color} opacity=".7"/>
      {/* Front wheel */}
      <circle cx="200" cy="138" r="32" fill="none" stroke={color} strokeWidth="7" opacity=".85"/>
      <circle cx="200" cy="138" r="16" fill="none" stroke={color} strokeWidth="3" opacity=".35"/>
      <circle cx="200" cy="138" r="5"  fill={color} opacity=".7"/>
      {/* Frame */}
      <path d="M90 106 L120 46 L162 46 L200 106" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Seat */}
      <path d="M112 44 Q138 30 162 44" stroke={color} strokeWidth="9" fill="none" strokeLinecap="round"/>
      {/* Handlebar column */}
      <line x1="185" y1="68" x2="200" y2="106" stroke={color} strokeWidth="7" strokeLinecap="round"/>
      <line x1="185" y1="68" x2="185" y2="28" stroke={color} strokeWidth="7" strokeLinecap="round"/>
      <line x1="168" y1="28" x2="202" y2="28" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      {/* Rear footrest link */}
      <path d="M58 106 Q75 95 90 106" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Battery pack */}
      <rect x="108" y="72" width="46" height="24" rx="6" fill={color} opacity=".18" stroke={color} strokeWidth="1.5" />
      <text x="131" y="88" fill={color} fontSize="10" fontWeight="800" textAnchor="middle" opacity=".8">EV</text>
      {/* Headlight */}
      <circle cx="204" cy="86" r="7" fill={color} opacity=".65"/>
      {/* Ground shadow */}
      <ellipse cx="130" cy="173" rx="80" ry="6" fill={color} opacity=".07"/>
    </svg>
  )
}

/* ── Animated counter ── */
function useCounter(end, duration = 2200, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, active])
  return count
}

/* ── Stat card ── */
function StatCard({ value, suffix, label, animate }) {
  const n = useCounter(value, 2200, animate)
  return (
    <div className="stat-card">
      <div className="stat-value">{n.toLocaleString('en-IN')}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

/* ── Vehicle card (home) ── */
const ACCENT = ['#00D45E','#0066FF','#A855F7','#F59E0B','#06B6D4','#EF4444']

function HomeVehicleCard({ vehicle, index }) {
  const color = ACCENT[index % ACCENT.length]
  return (
    <div className="hvc" style={{ '--accent': color }}>
      <div className="hvc-image">
        <span className="hvc-badge">{vehicle.category}</span>
        <ScooterSVG color={color} />
      </div>
      <div className="hvc-body">
        <h3 className="hvc-name">{vehicle.name}</h3>
        <p className="hvc-tagline">{vehicle.tagline}</p>
        <div className="hvc-specs">
          <div className="hvc-spec"><MdBatteryChargingFull /><span>{vehicle.range}</span></div>
          <div className="hvc-spec"><MdSpeed /><span>{vehicle.topSpeed}</span></div>
          <div className="hvc-spec"><FaBolt /><span>{vehicle.chargingTime}</span></div>
        </div>
        <div className="hvc-footer">
          <div className="hvc-price">{vehicle.price}</div>
          <Link to="/vehicles" className="hvc-btn">Details <FaArrowRight /></Link>
        </div>
      </div>
    </div>
  )
}

/* ── Why-choose features ── */
const FEATURES = [
  { icon: <FaAward />,     title: 'Authorized Franchise',  desc: 'Officially authorized Zelio E-Mobility franchise — genuine products and full warranty.', c: '#00D45E' },
  { icon: <FaBolt />,      title: 'Affordable EVs',        desc: 'Competitive pricing and flexible EMI options make electric mobility accessible to everyone.', c: '#0066FF' },
  { icon: <FaLeaf />,      title: 'Eco-Friendly',          desc: 'Zero emissions, zero fuel costs. Contribute to a greener Madhya Pradesh with every ride.', c: '#00D45E' },
  { icon: <FaTools />,     title: 'Service & Support',     desc: 'Expert technicians and genuine spare parts for all Zelio models at our service center.', c: '#0066FF' },
  { icon: <FaHandshake />, title: 'Easy Financing',        desc: 'Get your dream EV through our partnerships with leading banks and NBFCs across MP.', c: '#00D45E' },
  { icon: <FaCarAlt />,    title: 'Wide Range',            desc: 'Complete Zelio lineup from economy to premium — a model for every need and budget.', c: '#0066FF' },
]

export default function Home() {
  const statsRef   = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimate(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="home">

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid-lines" />
        </div>

        <div className="container hero-inner">
          {/* Left */}
          <div className="hero-left">
            <div className="section-badge"><FaBolt /> Authorized Zelio Franchise</div>
            <h1 className="hero-title">
              Drive the Future<br />
              with <span className="gradient-text">Hitanshi EVS</span>
            </h1>
            <p className="hero-subtitle">
              Authorized Zelio Electric Vehicle Showroom in Shajapur,
              Madhya Pradesh. Discover the joy of clean, silent and
              affordable electric mobility.
            </p>
            <div className="hero-cta">
              <Link to="/vehicles" className="btn-primary">
                Explore Vehicles <FaArrowRight />
              </Link>
              <Link to="/book-test-drive" className="btn-outline">
                Book Test Drive
              </Link>
            </div>
            <div className="hero-trust">
              {['Zero Down Payment Available', 'Free Test Drive', '3 Year Warranty'].map(t => (
                <div key={t} className="trust-chip">
                  <FaCheckCircle className="trust-icon" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – showcase */}
          <div className="hero-right">
            <div className="showcase">
              <div className="showcase-ring r1" />
              <div className="showcase-ring r2" />
              <div className="showcase-ring r3" />
              <div className="showcase-scooter animate-float">
                {HERO_BIKE ? (
                  <img
                    src={HERO_BIKE}
                    alt="Zelio Electric Scooter"
                    className="showcase-bike-img"
                  />
                ) : (
                  <ScooterSVG color="#00D45E" />
                )}
              </div>
              <div className="showcase-pill pill-1">
                <MdBatteryChargingFull style={{ color: 'var(--green)' }} />
                <div><div className="pill-val">140 km</div><div className="pill-lbl">Max Range</div></div>
              </div>
              <div className="showcase-pill pill-2">
                <FaBolt style={{ color: 'var(--blue)' }} />
                <div><div className="pill-val">₹0</div><div className="pill-lbl">Fuel Cost</div></div>
              </div>
              <div className="showcase-pill pill-3">
                <FaLeaf style={{ color: 'var(--green)' }} />
                <div><div className="pill-val">Zero</div><div className="pill-lbl">Emissions</div></div>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="why section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge"><FaShieldAlt /> Why Choose Us</div>
            <h2 className="section-title">
              Your Trusted EV Partner in{' '}
              <span className="gradient-text">Shajapur</span>
            </h2>
            <p className="section-subtitle">
              We bring you the future of mobility with genuine products,
              expert service, and unbeatable after-sales support.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card" style={{ '--c': f.c, '--d': `${i * 0.08}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
                <div className="feature-bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ OFFER BANNER ══════════ */}
      {OFFER_BANNER && (
        <section className="offer-banner-section">
          <div className="container">
            <Link to="/book-test-drive">
              <img
                src={OFFER_BANNER}
                alt="Special Offer – Hitanshi EVS"
                className="offer-banner-img"
              />
            </Link>
          </div>
        </section>
      )}

      {/* ══════════ VEHICLES ══════════ */}
      <section className="featured-vehicles section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge"><MdElectricScooter /> Our Fleet</div>
            <h2 className="section-title">
              Featured{' '}
              <span className="gradient-text">Electric Vehicles</span>
            </h2>
            <p className="section-subtitle">
              Explore our complete range of Zelio electric scooters —
              from economical daily commuters to feature-packed premium models.
            </p>
          </div>

          <div className="vehicles-grid">
            {vehicles.map((v, i) => (
              <HomeVehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/vehicles" className="btn-primary" style={{ fontSize: '1rem', padding: '.9rem 2.2rem' }}>
              View All Vehicles <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="stats-section section-padding" ref={statsRef}>
        <div className="stats-glow" />
        <div className="container">
          <div className="stats-grid">
            {stats.map(s => (
              <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} animate={animate} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="testimonials section-padding">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge"><FaStar /> Customer Reviews</div>
            <h2 className="section-title">
              What Our{' '}
              <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="section-subtitle">
              Real stories from real customers who've made the switch to electric.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.id} className="tc-card">
                <FaQuoteLeft className="tc-quote" />
                <p className="tc-text">"{t.review}"</p>
                <div className="tc-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="tc-star" />
                  ))}
                </div>
                <div className="tc-author">
                  <div className="tc-avatar" style={{ background: t.avatarColor }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="tc-name">{t.name}</div>
                    <div className="tc-meta">{t.location} &middot; {t.vehicle} &middot; {t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="home-cta section-padding">
        <div className="container">
          <div className="cta-card">
            <div className="cta-orb cta-orb-1" />
            <div className="cta-orb cta-orb-2" />
            <div className="section-badge" style={{ margin: '0 auto 1rem' }}>
              <FaBolt /> Go Electric Today
            </div>
            <h2 className="section-title">
              Ready to Go <span className="gradient-text">Electric?</span>
            </h2>
            <p className="cta-desc">
              Experience the thrill of emission-free riding. Book a free test drive
              at Hitanshi EVS in Shajapur — no obligations, just pure EV joy.
            </p>
            <div className="cta-actions">
              <Link to="/book-test-drive" className="btn-primary" style={{ fontSize: '1rem', padding: '.9rem 2.2rem' }}>
                Book Free Test Drive <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn-outline" style={{ fontSize: '1rem', padding: '.9rem 2.2rem' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
