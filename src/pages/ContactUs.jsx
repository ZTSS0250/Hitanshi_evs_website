import { useState } from 'react'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaPaperPlane, FaCheckCircle, FaBolt,
  FaWhatsapp, FaFacebookF, FaInstagram,
} from 'react-icons/fa'
import Toast from '../components/Toast'
import './ContactUs.css'

const INITIAL = { name: '', mobile: '', email: '', address: '', message: '' }

function validate(form) {
  const e = {}
  if (!form.name.trim())    e.name    = 'Name is required'
  if (!form.mobile.trim())  e.mobile  = 'Mobile number is required'
  else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = 'Enter a valid 10-digit mobile number'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
  if (!form.message.trim()) e.message = 'Please write your message'
  return e
}

const CONTACT_INFO = [
  {
    icon: <FaMapMarkerAlt />,
    label: 'Our Showroom',
    value: 'Near Main Market, Shajapur – 465001, Madhya Pradesh, India',
    color: '#00D45E',
  },
  {
    icon: <FaPhone />,
    label: 'Call Us',
    value: '+91 70000 00000',
    href: 'tel:+917000000000',
    color: '#0066FF',
  },
  {
    icon: <FaEnvelope />,
    label: 'Email Us',
    value: 'info@hitanshievs.in',
    href: 'mailto:info@hitanshievs.in',
    color: '#00D45E',
  },
  {
    icon: <FaClock />,
    label: 'Business Hours',
    value: 'Mon–Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 4:00 PM',
    color: '#0066FF',
  },
]

export default function ContactUs() {
  const [form, setForm]     = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [toast, setToast]   = useState(false)

  const onChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setToast(true)
    setForm(INITIAL)
    setErrors({})
  }

  return (
    <div className="contact-page">
      {toast && (
        <Toast
          message="Your message has been sent! We'll get back to you within 24 hours."
          onClose={() => setToast(false)}
        />
      )}

      {/* Header */}
      <div className="contact-header">
        <div className="contact-header-bg">
          <div className="ch-orb ch-orb-1" />
          <div className="ch-orb ch-orb-2" />
        </div>
        <div className="container" style={{ position:'relative', zIndex:1, textAlign:'center', padding:'3.5rem 1.5rem' }}>
          <div className="section-badge"><FaPaperPlane /> Get In Touch</div>
          <h1 className="section-title">
            Contact{' '}
            <span className="gradient-text">Hitanshi EVS</span>
          </h1>
          <p className="section-subtitle" style={{ marginBottom:0 }}>
            Have questions about our electric vehicles, pricing, or test drives?
            We're here to help. Reach us through any channel below.
          </p>
        </div>
      </div>

      <div className="container contact-body">

        {/* ── Info cards ── */}
        <div className="contact-info-grid">
          {CONTACT_INFO.map((item, i) => (
            <div key={i} className="ci-card" style={{ '--c': item.color }}>
              <div className="ci-icon">{item.icon}</div>
              <div>
                <div className="ci-label">{item.label}</div>
                {item.href ? (
                  <a href={item.href} className="ci-value">{item.value}</a>
                ) : (
                  <div className="ci-value" style={{ whiteSpace: 'pre-line' }}>{item.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="contact-grid">
          {/* Map placeholder */}
          <div className="contact-map-section">
            <h2 className="contact-section-title">
              <FaMapMarkerAlt /> Find Us on Map
            </h2>
            <div className="map-placeholder">
              <div className="map-pin-wrap">
                <div className="map-pin-icon">
                  <FaMapMarkerAlt />
                </div>
                <p className="map-address">
                  Hitanshi EVS<br />
                  Near Main Market, Shajapur<br />
                  Madhya Pradesh – 465001
                </p>
                <a
                  href="https://maps.google.com/?q=Shajapur,Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline map-btn"
                >
                  Open in Google Maps
                </a>
              </div>
              {/* Decorative grid dots */}
              <div className="map-grid" />
            </div>

            {/* Social links */}
            <div className="social-section">
              <h3 className="social-title">Follow Us</h3>
              <div className="social-links">
                {[
                  { icon: <FaWhatsapp />,  label: 'WhatsApp',  href: '#', c: '#25D366' },
                  { icon: <FaFacebookF />, label: 'Facebook',  href: '#', c: '#1877F2' },
                  { icon: <FaInstagram />, label: 'Instagram', href: '#', c: '#E1306C' },
                  { icon: <FaPhone />,     label: 'Call Now',  href: 'tel:+917000000000', c: '#00D45E' },
                ].map(s => (
                  <a key={s.label} href={s.href} className="social-link" style={{ '--sc': s.c }} target="_blank" rel="noopener noreferrer">
                    <span className="sl-icon">{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="contact-section-title">
              <FaPaperPlane /> Send a Message
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group${errors.name ? ' has-error' : ''}`}>
                  <label>Full Name *</label>
                  <input type="text" value={form.name} onChange={onChange('name')} placeholder="Your full name" />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className={`form-group${errors.mobile ? ' has-error' : ''}`}>
                  <label>Mobile Number *</label>
                  <input type="tel" value={form.mobile} onChange={onChange('mobile')} placeholder="10-digit number" maxLength={10} />
                  {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                  <label>Email Address</label>
                  <input type="email" value={form.email} onChange={onChange('email')} placeholder="your@email.com" />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>City / Area</label>
                  <input type="text" value={form.address} onChange={onChange('address')} placeholder="Your city or area" />
                </div>
              </div>

              <div className={`form-group${errors.message ? ' has-error' : ''}`}>
                <label>Message *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={onChange('message')}
                  placeholder="Tell us how we can help you…"
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-primary contact-submit">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
