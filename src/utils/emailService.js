import emailjs from '@emailjs/browser'

const SVC  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PK   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const T_TD = import.meta.env.VITE_EMAILJS_TEMPLATE_TEST_DRIVE
const T_CT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT
const T_QR = import.meta.env.VITE_EMAILJS_TEMPLATE_QUERY

export async function sendTestDriveEmail(form) {
  return emailjs.send(SVC, T_TD, {
    from_name:      form.fullName,
    mobile:         form.mobile,
    from_email:     form.email    || 'Not provided',
    address:        form.address,
    vehicle:        form.vehicle,
    preferred_date: form.date,
    preferred_time: form.time,
  }, PK)
}

export async function sendContactEmail(form) {
  return emailjs.send(SVC, T_CT, {
    from_name:  form.name,
    mobile:     form.mobile,
    from_email: form.email   || 'Not provided',
    city:       form.address || 'Not provided',
    message:    form.message,
  }, PK)
}

export async function sendQueryEmail(form) {
  return emailjs.send(SVC, T_QR, {
    from_name: form.name,
    mobile:    form.mobile,
    address:   form.address,
  }, PK)
}
