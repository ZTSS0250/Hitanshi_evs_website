import { Link } from 'react-router-dom'
import {
  FaBolt, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaFacebookF, FaInstagram, FaYoutube,
  FaWhatsapp, FaTwitter,
} from 'react-icons/fa'
import { MdElectricScooter } from 'react-icons/md'
import './Footer.css'

const quickLinks = [
  { to: '/',               label: 'Home' },
  { to: '/vehicles',       label: 'All Vehicles' },
  { to: '/book-test-drive', label: 'Book Test Drive' },
  { to: '/contact',        label: 'Contact Us' },
]

const vehicleLinks = [
  { to: '/vehicles', label: 'Eeva E' },
  { to: '/vehicles', label: 'Eeva Eco LX' },
  { to: '/vehicles', label: 'Eeva Eco ZX' },
  { to: '/vehicles', label: 'Eeva ZX Plus' },
  { to: '/vehicles', label: 'Gracy New' },
  { to: '/vehicles', label: 'Gracy Little' },
]

const socials = [
  { icon: <FaFacebookF />, label: 'Facebook',  href: '#' },
  { icon: <FaInstagram />, label: 'Instagram', href: '#' },
  { icon: <FaWhatsapp />,  label: 'WhatsApp',  href: '#' },
  { icon: <FaYoutube />,   label: 'YouTube',   href: '#' },
  { icon: <FaTwitter />,   label: 'Twitter',   href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon"><FaBolt /></div>
              <div>
                <span className="footer-logo-main">Hitanshi</span>
                <span className="footer-logo-sub"> EVS</span>
              </div>
            </Link>
            <p className="footer-brand-desc">
              Authorized Zelio E-Mobility franchise in Shajapur, Madhya Pradesh.
              Bringing clean, affordable electric vehicles to your doorstep.
            </p>
            <div className="footer-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="social-btn" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
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
                <span>Hitanshi EVS, Near Main Market,<br />Shajapur – 465001,<br />Madhya Pradesh, India</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <a href="tel:+917000000000">+91 70000 00000</a>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:info@hitanshievs.in">info@hitanshievs.in</a>
              </li>
              <li>
                <FaClock className="contact-icon" />
                <span>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2026 Hitanshi EVS. All Rights Reserved.</p>
          <p className="footer-partner">
            Authorized franchise partner of{' '}
            <span className="gradient-text" style={{ fontWeight: 700 }}>Zelio E-Mobility</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
