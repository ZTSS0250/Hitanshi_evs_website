import { useState } from 'react'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaPaperPlane, FaWhatsapp, FaFacebookF, FaInstagram,
} from 'react-icons/fa'
import { COMPANY } from '../config/companyInfo'
import Toast from '../components/Toast'
import { sendContactEmail } from '../utils/emailService'
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

const primaryPhone = COMPANY.phones.find(p => p.primary)

const CONTACT_INFO = [
  {
    icon: <FaMapMarkerAlt />,
    label: 'Our Showroom',
    value: COMPANY.address.full,
    color: '#00D45E',
  },
  {
    icon: <FaPhone />,
    label: 'Call Us',
    value: primaryPhone.display,
    href: `tel:${primaryPhone.number}`,
    color: '#0066FF',
  },
  {
    icon: <FaEnvelope />,
    label: 'Email Us',
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
    color: '#00D45E',
  },
  {
    icon: <FaClock />,
    label: 'Business Hours',
    value: `${COMPANY.hours.weekdays.days}: ${COMPANY.hours.weekdays.time}\n${COMPANY.hours.sunday.days}: ${COMPANY.hours.sunday.time}`,
    color: '#0066FF',
  },
]

const SOCIAL_LINKS = [
  { icon: <FaWhatsapp />,  label: 'WhatsApp',  href: COMPANY.whatsapp.url,      c: '#25D366' },
  COMPANY.social.facebook  ? { icon: <FaFacebookF />, label: 'Facebook',  href: COMPANY.social.facebook,  c: '#1877F2' } : null,
  COMPANY.social.instagram ? { icon: <FaInstagram />, label: 'Instagram', href: COMPANY.social.instagram, c: '#E1306C' } : null,
  { icon: <FaPhone />,     label: 'Call Now',  href: `tel:${primaryPhone.number}`, c: '#00D45E' },
].filter(Boolean)

export default function ContactUs() {
  const [form, setForm]           = useState(INITIAL)
  const [errors, setErrors]       = useState({})
  const [toast, setToast]         = useState(false)
  const [sending, setSending]     = useState(false)
  const [sendError, setSendError] = useState('')

  const onChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSending(true)
    setSendError('')
    try {
      await sendContactEmail(form)
      setToast(true)
      setForm(INITIAL)
      setErrors({})
    } catch {
      setSendError('Failed to send. Please call us directly or try again.')
    } finally {
      setSending(false)
    }
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
          {/* Map section */}
          <div className="contact-map-section">
            <h2 className="contact-section-title">
              <FaMapMarkerAlt /> Find Us on Map
            </h2>

            {COMPANY.maps.embedUrl ? (
              <iframe
                title="Hitanshi EVS Location on Google Maps"
                src={COMPANY.maps.embedUrl}
                className="map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="map-placeholder">
                <div className="map-pin-wrap">
                  <div className="map-pin-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <p className="map-address">
                    {COMPANY.name}<br />
                    {COMPANY.address.line1}<br />
                    {COMPANY.address.line2}, {COMPANY.address.state} – {COMPANY.address.pincode}
                  </p>
                  <a
                    href={COMPANY.maps.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline map-btn"
                  >
                    Open in Google Maps
                  </a>
                </div>
                <div className="map-grid" />
              </div>
            )}

            {/* Social links */}
            <div className="social-section">
              <h3 className="social-title">Follow Us</h3>
              <div className="social-links">
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-link"
                    style={{ '--sc': s.c }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

              <button type="submit" className="btn-primary contact-submit" disabled={sending}>
                {sending ? 'Sending…' : <><FaPaperPlane /> Send Message</>}
              </button>
              {sendError && <p className="send-error">{sendError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
