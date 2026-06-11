import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBolt, FaBars, FaTimes, FaPhone, FaWhatsapp, FaImages } from 'react-icons/fa'
import { COMPANY } from '../config/companyInfo'
import './Navbar.css'

const NAV_LINKS = [
  { path: '/',                label: 'Home' },
  { path: '/vehicles',        label: 'Vehicles' },
  { path: '/gallery',         label: 'Gallery' },
  { path: '/book-test-drive', label: 'Book Test Drive' },
  { path: '/contact',         label: 'Contact Us' },
]

const primaryPhone = COMPANY.phones.find(p => p.primary)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon"><FaBolt /></div>
          <div className="logo-text">
            <span className="logo-main">Hitanshi</span>
            <span className="logo-sub">EVS</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar-links">
          {NAV_LINKS.map(l => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`nav-link${location.pathname === l.path ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="navbar-cta">
          <a
            href={`tel:${primaryPhone.number}`}
            className="navbar-phone"
            title={primaryPhone.display}
          >
            <FaPhone /><span>{primaryPhone.display}</span>
          </a>
          <a
            href={COMPANY.whatsapp.url}
            className="navbar-wa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <Link to="/book-test-drive" className="btn-primary">Book Test Drive</Link>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-links">
          {NAV_LINKS.map(l => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`mobile-link${location.pathname === l.path ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-footer">
          <a href={`tel:${primaryPhone.number}`} className="mobile-phone">
            <FaPhone /><span>{primaryPhone.display}</span>
          </a>
          <a
            href={COMPANY.whatsapp.url}
            className="mobile-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /><span>Chat on WhatsApp</span>
          </a>
          <Link to="/book-test-drive" className="btn-primary" style={{ justifyContent: 'center' }}>
            Book Free Test Drive
          </Link>
        </div>
      </div>
    </nav>
  )
}
