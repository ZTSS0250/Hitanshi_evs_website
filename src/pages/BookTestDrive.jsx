import { useState } from 'react'
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBolt, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import { MdElectricScooter } from 'react-icons/md'
import { vehicles } from '../data/vehicles'
import Toast from '../components/Toast'
import './BookTestDrive.css'

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
]

const INITIAL = {
  fullName: '', mobile: '', email: '', address: '',
  vehicle: '', date: '', time: '',
}

function validate(form) {
  const e = {}
  if (!form.fullName.trim())  e.fullName = 'Full name is required'
  if (!form.mobile.trim())    e.mobile   = 'Mobile number is required'
  else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = 'Enter a valid 10-digit mobile number'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
  if (!form.address.trim())   e.address  = 'Address is required'
  if (!form.vehicle)          e.vehicle  = 'Please select a vehicle model'
  if (!form.date)             e.date     = 'Preferred date is required'
  else {
    const chosen = new Date(form.date)
    const today  = new Date(); today.setHours(0,0,0,0)
    if (chosen < today) e.date = 'Date cannot be in the past'
  }
  if (!form.time)             e.time     = 'Preferred time is required'
  return e
}

const today = new Date().toISOString().split('T')[0]

export default function BookTestDrive() {
  const [form, setForm]     = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [toast, setToast]   = useState(false)
  const [bookings, setBookings] = useState([])

  const onChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setBookings(b => [...b, { ...form, id: Date.now() }])
    setToast(true)
    setForm(INITIAL)
    setErrors({})
  }

  return (
    <div className="btd-page">
      {toast && (
        <Toast
          message="Your Test Drive Request has been Submitted Successfully!"
          onClose={() => setToast(false)}
        />
      )}

      {/* Header */}
      <div className="btd-header">
        <div className="btd-header-bg">
          <div className="btd-orb btd-orb-1" />
          <div className="btd-orb btd-orb-2" />
        </div>
        <div className="container" style={{ position:'relative', zIndex:1, textAlign:'center', padding:'3.5rem 1.5rem' }}>
          <div className="section-badge"><FaCalendarAlt /> Book Now</div>
          <h1 className="section-title">
            Book a Free{' '}
            <span className="gradient-text">Test Drive</span>
          </h1>
          <p className="section-subtitle" style={{ marginBottom:0 }}>
            Experience the Zelio electric scooter before you buy.
            Fill in the form below and our team will confirm your slot within 2 hours.
          </p>
        </div>
      </div>

      <div className="container btd-body">
        <div className="btd-grid">
          {/* ─── FORM ─── */}
          <div className="btd-form-card">
            <h2 className="form-card-title">
              <FaArrowRight className="form-card-icon" />
              Test Drive Request Form
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                {/* Full Name */}
                <div className={`form-group${errors.fullName ? ' has-error' : ''}`}>
                  <label><FaUser /> Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={onChange('fullName')}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>

                {/* Mobile */}
                <div className={`form-group${errors.mobile ? ' has-error' : ''}`}>
                  <label><FaPhone /> Mobile Number *</label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={onChange('mobile')}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.mobile && <span className="field-error">{errors.mobile}</span>}
                </div>
              </div>

              <div className="form-row">
                {/* Email */}
                <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                  <label><FaEnvelope /> Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={onChange('email')}
                    placeholder="your@email.com (optional)"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                {/* Vehicle */}
                <div className={`form-group${errors.vehicle ? ' has-error' : ''}`}>
                  <label><MdElectricScooter /> Vehicle Model *</label>
                  <select value={form.vehicle} onChange={onChange('vehicle')}>
                    <option value="">Select a model</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.name}>{v.name} – {v.price}</option>
                    ))}
                  </select>
                  {errors.vehicle && <span className="field-error">{errors.vehicle}</span>}
                </div>
              </div>

              {/* Address */}
              <div className={`form-group${errors.address ? ' has-error' : ''}`}>
                <label><FaMapMarkerAlt /> Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={onChange('address')}
                  placeholder="Your city, area, or full address"
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>

              <div className="form-row">
                {/* Date */}
                <div className={`form-group${errors.date ? ' has-error' : ''}`}>
                  <label><FaCalendarAlt /> Preferred Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={onChange('date')}
                    min={today}
                  />
                  {errors.date && <span className="field-error">{errors.date}</span>}
                </div>

                {/* Time */}
                <div className={`form-group${errors.time ? ' has-error' : ''}`}>
                  <label><FaClock /> Preferred Time *</label>
                  <select value={form.time} onChange={onChange('time')}>
                    <option value="">Choose a time slot</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <span className="field-error">{errors.time}</span>}
                </div>
              </div>

              <button type="submit" className="btn-primary btd-submit">
                <FaCalendarAlt />
                Submit Test Drive Request
              </button>
            </form>
          </div>

          {/* ─── SIDEBAR ─── */}
          <div className="btd-sidebar">
            {/* Info card */}
            <div className="btd-info-card">
              <div className="btd-info-header">
                <FaBolt />
                <h3>Visit Us in Shajapur</h3>
              </div>
              <ul className="btd-info-list">
                <li><FaMapMarkerAlt /><span>Near Main Market, Shajapur – 465001, MP</span></li>
                <li><FaPhone /><a href="tel:+917000000000">+91 70000 00000</a></li>
                <li><FaEnvelope /><a href="mailto:info@hitanshievs.in">info@hitanshievs.in</a></li>
                <li><FaClock /><span>Mon–Sat 9:00 AM – 7:00 PM<br />Sunday 10:00 AM – 4:00 PM</span></li>
              </ul>
            </div>

            {/* Why test drive */}
            <div className="btd-why-card">
              <h3>Why Book a Test Drive?</h3>
              <ul className="btd-why-list">
                {[
                  '100% free — no commitment',
                  'Feel the instant torque',
                  'Check fit and comfort',
                  'Compare multiple models',
                  'Talk to our EV experts',
                  'EMI & finance guidance',
                ].map(item => (
                  <li key={item}>
                    <FaCheckCircle />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent bookings badge */}
            {bookings.length > 0 && (
              <div className="btd-booked-badge">
                <FaCheckCircle />
                <span>{bookings.length} booking{bookings.length > 1 ? 's' : ''} submitted this session</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
