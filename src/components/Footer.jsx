import { Link } from 'react-router-dom'
import {
  FaBolt, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaFacebookF, FaInstagram, FaYoutube,
  FaWhatsapp, FaTwitter,
} from 'react-icons/fa'
import { MdElectricScooter } from 'react-icons/md'
import { COMPANY } from '../config/companyInfo'
import { LOGO } from '../assets/images/index'
import './Footer.css'

const quickLinks = [
  { to: '/',                label: 'Home' },
  { to: '/vehicles',        label: 'All Vehicles' },
  { to: '/gallery',         label: 'Gallery' },
  { to: '/book-test-drive', label: 'Book Test Drive' },
  { to: '/contact',         label: 'Contact Us' },
]

const vehicleLinks = [
  { to: '/vehicles', label: 'Eeva E' },
  { to: '/vehicles', label: 'Eeva Eco LX' },
  { to: '/vehicles', label: 'Eeva Eco ZX' },
  { to: '/vehicles', label: 'Eeva ZX Plus' },
  { to: '/vehicles', label: 'Gracy New' },
  { to: '/vehicles', label: 'Gracy Little' },
]

const SOCIAL_DEFS = [
  { key: 'facebook',  icon: <FaFacebookF />, label: 'Facebook' },
  { key: 'instagram', icon: <FaInstagram />, label: 'Instagram' },
  { key: 'youtube',   icon: <FaYoutube />,   label: 'YouTube' },
  { key: 'twitter',   icon: <FaTwitter />,   label: 'Twitter' },
]

const primaryPhone = COMPANY.phones.find(p => p.primary)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              {LOGO ? (
                <img src={LOGO} alt="Hitanshi EVS Logo" className="footer-logo-img" />
              ) : (
                <>
                  <div className="footer-logo-icon"><FaBolt /></div>
                  <div>
                    <span className="footer-logo-main">Hitanshi</span>
                    <span className="footer-logo-sub"> EVS</span>
                  </div>
                </>
              )}
            </Link>
            <p className="footer-brand-desc">
              Authorized Zelio E-Mobility franchise in Shajapur, Madhya Pradesh.
              Bringing clean, affordable electric vehicles to your doorstep.
            </p>
            <div className="footer-socials">
              <a
                href={COMPANY.whatsapp.url}
                className="social-btn"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
              {SOCIAL_DEFS.map(s => {
                const href = COMPANY.social[s.key]
                if (!href) return null
                return (
                  <a
                    key={s.key}
                    href={href}
                    className="social-btn"
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.icon}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map(l => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Vehicles */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <MdElectricScooter style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '.3rem' }} />
              Our Vehicles
            </h4>
            <ul className="footer-links">
              {vehicleLinks.map(l => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>{COMPANY.address.full}</span>
              </li>
              {COMPANY.phones.map(p => (
                <li key={p.number}>
                  <FaPhone className="contact-icon" />
                  <a href={`tel:${p.number}`}>{p.display}</a>
                </li>
              ))}
              <li>
                <FaEnvelope className="contact-icon" />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li>
                <FaClock className="contact-icon" />
                <span>
                  {COMPANY.hours.weekdays.days}: {COMPANY.hours.weekdays.time}<br />
                  {COMPANY.hours.sunday.days}: {COMPANY.hours.sunday.time}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 {COMPANY.name}. All Rights Reserved.</p>
          <p className="footer-partner">
            Authorized franchise partner of{' '}
            <span className="gradient-text" style={{ fontWeight: 700 }}>Zelio E-Mobility</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
