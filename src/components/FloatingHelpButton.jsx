import { useState } from 'react'
import { FaHeadset, FaTimes, FaCheckCircle } from 'react-icons/fa'
import './FloatingHelpButton.css'

const INITIAL = { name: '', mobile: '', address: '' }

export default function FloatingHelpButton() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name   = 'Name is required'
    if (!form.mobile.trim())  e.mobile = 'Mobile number is required'
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = 'Enter a valid 10-digit mobile number'
    if (!form.address.trim()) e.address = 'Address is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSuccess(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => { setSuccess(false); setForm(INITIAL); setErrors({}) }, 300)
  }

  const onChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
  }

  return (
    <>
      {/* Floating trigger */}
      <button className="fab" onClick={() => setOpen(true)} aria-label="Get help">
        <FaHeadset />
        <span className="fab-label">Help</span>
      </button>

      {/* Backdrop */}
      {open && <div className="fab-backdrop" onClick={handleClose} />}

      {/* Modal */}
      <div className={`fab-modal${open ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="fab-modal-header">
          <div>
            <h3 className="fab-modal-title">Quick Contact</h3>
            <p className="fab-modal-sub">We'll call you back shortly</p>
          </div>
          <button className="fab-close" onClick={handleClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        {success ? (
          <div className="fab-success">
            <FaCheckCircle />
            <h4>Request Submitted!</h4>
            <p>Thank you! Our team will contact you within 24 hours.</p>
            <button className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }} onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="fab-form" onSubmit={handleSubmit} noValidate>
            <div className={`form-group${errors.name ? ' has-error' : ''}`}>
              <label>Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={onChange('name')}
                placeholder="Your full name"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className={`form-group${errors.mobile ? ' has-error' : ''}`}>
              <label>Mobile Number *</label>
              <input
                type="tel"
                value={form.mobile}
                onChange={onChange('mobile')}
                placeholder="10-digit mobile number"
                maxLength={10}
              />
              {errors.mobile && <span className="field-error">{errors.mobile}</span>}
            </div>

            <div className={`form-group${errors.address ? ' has-error' : ''}`}>
              <label>Address *</label>
              <input
                type="text"
                value={form.address}
                onChange={onChange('address')}
                placeholder="Your city / area"
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>

            <div className="fab-actions">
              <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                Submit Request
              </button>
              <button type="button" className="btn-outline" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
