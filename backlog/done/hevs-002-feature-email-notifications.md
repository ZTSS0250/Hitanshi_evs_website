## Metadata
- **Task ID**: hevs-002
- **Title**: Email Notifications on Form Submissions
- **Type**: feature
- **Status**: done
- **Complexity**: HIGH
- **Created**: 2026-06-13
- **Author**: Sheetal Sharma
- **Quality Gates**: Gate 1: ✅ Approved | Gate 2: ✅ Approved | Gate 3: ✅ Approved

---

## Planning

**Description**: When a visitor submits any of the three forms on the website — the Test Drive booking form, the Contact Us message form, or the Floating Help quick-query form — the submitted details must be emailed to the showroom inbox at `hitanshievs@gmail.com` so the team can follow up immediately. Currently all three forms only store data in React state (lost on page reload) and no notification reaches the owner.

**Goal**: Every form submission triggers an email to `hitanshievs@gmail.com` containing all fields the visitor filled in. Visitor sees a success toast/state as before. If the email send fails, the visitor sees a clear error message instead of silent success.

**Objectives**:
- [x] Integrate EmailJS (client-side email SDK — no backend required)
- [x] Send structured email for Test Drive bookings (7 fields)
- [x] Send structured email for Contact Us messages (5 fields)
- [x] Send structured email for Floating Help quick queries (3 fields)
- [x] Show loading state on submit button while email is sending
- [x] Show user-facing error if the send fails
- [x] Document EmailJS setup steps so the owner can configure credentials

**Deliverables**:
- [x] `src/utils/emailService.js` — centralised send functions for all three forms
- [x] `.env.example` — documents the five required environment variables
- [x] Updated `src/pages/BookTestDrive.jsx` — async submit with loading + error
- [x] Updated `src/pages/ContactUs.jsx` — async submit with loading + error
- [x] Updated `src/components/FloatingHelpButton.jsx` — async submit with loading + error
- [x] Updated `package.json` — adds `@emailjs/browser` dependency

---

## Specification

**Complexity**: HIGH
**Reason**: 6 files changed (new utility, new env config, three form components, package.json). Cross-cutting concern touching every form in the app. Requires third-party service account setup by the developer.

---

### EmailJS Overview

EmailJS is a client-side email SDK. It sends emails directly from the browser using a pre-configured Gmail connection — no backend server needed. The **public key** is designed to be exposed in frontend code; abuse is prevented by setting a domain restriction in the EmailJS dashboard.

Free tier: **200 emails / month**. Upgrade available if needed.

**One-time setup by developer (before `fix it`):**

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com)
2. **Add Email Service**: Connect Gmail → select `hitanshievs@gmail.com` → note the **Service ID** (e.g. `service_abc123`)
3. **Create 3 Email Templates** (details below) → note each **Template ID**
4. Go to **Account → API Keys** → copy the **Public Key**
5. Create `.env.local` in project root with the five variables (see `.env.example`)
6. In EmailJS dashboard → **Settings → Allowed Origins** → add `http://localhost:5173` (dev) and the production domain

**EmailJS template configuration** (set the "To email" field to `hitanshievs@gmail.com` in each template):

| Template | Subject line | Variables used |
|----------|-------------|----------------|
| `template_test_drive` | `New Test Drive Booking – {{from_name}}` | `from_name`, `mobile`, `from_email`, `address`, `vehicle`, `preferred_date`, `preferred_time` |
| `template_contact` | `New Message from {{from_name}}` | `from_name`, `mobile`, `from_email`, `city`, `message` |
| `template_query` | `Quick Query from {{from_name}}` | `from_name`, `mobile`, `address` |

---

### Code Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` | modify | Add `"@emailjs/browser": "^4.4.1"` to `dependencies` |
| `.env.example` | create | Documents the 5 `VITE_EMAILJS_*` env variables; safe to commit |
| `src/utils/emailService.js` | create | Three exported async functions: `sendTestDriveEmail`, `sendContactEmail`, `sendQueryEmail` |
| `src/pages/BookTestDrive.jsx` | modify | Make `handleSubmit` async; add `sending` + `sendError` state; call `sendTestDriveEmail`; disable button while sending |
| `src/pages/ContactUs.jsx` | modify | Make `handleSubmit` async; add `sending` + `sendError` state; call `sendContactEmail`; disable button while sending |
| `src/components/FloatingHelpButton.jsx` | modify | Make `handleSubmit` async; add `sending` + `sendError` state; call `sendQueryEmail`; disable button while sending |

---

### Implementation Notes

#### `src/utils/emailService.js`

```js
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
    from_email:     form.email     || 'Not provided',
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
```

#### Pattern applied to all three `handleSubmit` functions

```js
const [sending, setSending] = useState(false)
const [sendError, setSendError] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()
  const errs = validate(form)           // or validate() for FloatingHelpButton
  if (Object.keys(errs).length) { setErrors(errs); return }

  setSending(true)
  setSendError('')
  try {
    await sendXxxEmail(form)            // whichever send function
    // success path — show toast / success state, reset form
    setToast(true)                      // or setSuccess(true)
    setForm(INITIAL)
    setErrors({})
  } catch {
    setSendError('Failed to send. Please call us directly or try again.')
  } finally {
    setSending(false)
  }
}
```

Submit button while sending:

```jsx
<button type="submit" className="btn-primary ..." disabled={sending}>
  {sending ? 'Sending…' : <><FaCalendarAlt /> Submit Test Drive Request</>}
</button>
```

Error display below the submit button:

```jsx
{sendError && (
  <p className="send-error">{sendError}</p>
)}
```

Add `.send-error` to the relevant CSS file:

```css
.send-error {
  color: #EF4444;
  font-size: .85rem;
  margin-top: .5rem;
  text-align: center;
}
```

#### `.env.example`

```
# EmailJS credentials — copy this file to .env.local and fill in real values.
# .env.local is git-ignored. .env.example is safe to commit.
# Get values from: https://www.emailjs.com → Dashboard

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_TEMPLATE_TEST_DRIVE=
VITE_EMAILJS_TEMPLATE_CONTACT=
VITE_EMAILJS_TEMPLATE_QUERY=
```

---

## Test Cases

### Unit Tests

| # | Test Name | Input / Condition | Expected Result | Status |
|---|-----------|-------------------|-----------------|--------|
| 1 | sendTestDriveEmail — all fields | All 7 form fields populated | `emailjs.send` called with correct params; resolves | pending |
| 2 | sendTestDriveEmail — optional email absent | `form.email = ''` | `from_email` param equals `'Not provided'` | pending |
| 3 | sendContactEmail — optional fields absent | `email = ''`, `address = ''` | Both sent as `'Not provided'` | pending |
| 4 | sendQueryEmail — minimal fields | name, mobile, address populated | `emailjs.send` called with correct 3 params | pending |

### Functional Tests

| # | Test Name | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 1 | Test Drive form sends email | Fill all required fields → click Submit | Button shows "Sending…" → Toast appears → Email arrives at hitanshievs@gmail.com | pending |
| 2 | Contact form sends email | Fill name, mobile, message → click Send Message | Toast appears → Email arrives at hitanshievs@gmail.com with correct fields | pending |
| 3 | Floating Help form sends email | Open FAB → fill name, mobile, address → Submit | Success state appears → Email arrives with 3 fields | pending |
| 4 | Test Drive — optional email omitted | Leave email blank → submit | Email received shows "Not provided" for from_email | pending |
| 5 | Contact — optional fields omitted | Leave email + city blank → submit | Email shows "Not provided" for both | pending |
| 6 | Button disabled during send | Click Submit | Button is disabled and shows "Sending…" until response | pending |
| 7 | Email content — Test Drive | Submit with known values | Email subject matches template; all 7 fields correct | pending |

### Edge Cases

| # | Scenario | Expected Behaviour | Status |
|---|----------|--------------------|--------|
| 1 | EmailJS network error (offline) | `sendError` message shown below submit button; form data preserved; button re-enabled | pending |
| 2 | EmailJS quota exceeded (200/month) | Same as network error — user sees error, can call directly | pending |
| 3 | Double-click submit | Button disabled on first click; second click ignored | pending |
| 4 | Missing env vars (empty VITE_EMAILJS_*) | EmailJS call fails → `sendError` shown; no silent success | pending |
| 5 | Form reset only on success | If send fails, form values stay so user can retry | pending |

### QA Test Plan

**Scope**: Email delivery from all three submission forms to `hitanshievs@gmail.com`.

**Pre-conditions**:
- Developer has created EmailJS account and connected Gmail (`hitanshievs@gmail.com`)
- Three email templates created in EmailJS dashboard with correct variable names
- `.env.local` populated with real Service ID, Public Key, and three Template IDs
- Domain restriction set to `localhost:5173` (dev) in EmailJS → Settings → Allowed Origins
- `npm install` run after adding `@emailjs/browser`
- Dev server running (`npm run dev`)

**QA Steps**:
1. Open `http://localhost:5173/book-test-drive` → fill all 7 fields → Submit → verify toast → check Gmail inbox within 30 seconds for email with correct subject and all 7 fields.
2. Open `/book-test-drive` → leave Email field blank → Submit → check Gmail email shows "Not provided" for email field.
3. Open `/contact` → fill name, mobile, message only → Send Message → verify toast → check Gmail inbox for message with city = "Not provided".
4. Open any page → click green FAB (Help) → fill name, mobile, address → Submit → verify success state → check Gmail inbox for quick query email.
5. Disable network (browser DevTools → Network → Offline) → submit any form → verify `sendError` message appears below submit button; verify form fields are NOT cleared.
6. Click Submit twice rapidly → confirm button is disabled after first click; only one email received.

**Expected Outcomes**:
- Emails arrive in `hitanshievs@gmail.com` inbox within 30 seconds of each submit
- Subject lines match the configured templates
- All field values are correct in email body
- Optional-field fallback shows "Not provided" (not blank)
- Error state shows a red message; form data preserved for retry
- Button shows "Sending…" and is non-clickable while request is in flight

**Out of Scope**:
- Wiring to a real backend / database
- Auto-reply to the visitor's email
- Email delivery receipts or read confirmations

---

## Quality Gates

### Gate 1 — Senior Developer Review
Date: 2026-06-13 | Status: ✅ Approved

| # | Severity | Finding | Location in Spec | Resolution |
|---|----------|---------|-----------------|------------|
| 1 | MEDIUM | No user-visible error if EmailJS send fails — visitor would see silent success | handleSubmit pattern | **Resolved**: `sendError` state added to all three forms; shown below submit button; form data preserved on failure |
| 2 | LOW | EmailJS `emailjs.init(publicKey)` (old API) must NOT be used — newer `@emailjs/browser` v4 passes publicKey as 4th argument to `send()` | emailService.js | **Resolved**: Spec uses `emailjs.send(svc, tmpl, params, publicKey)` — no init call |
| 3 | LOW | `.env.local` not committed — other developers won't know what vars are needed | env section | **Resolved**: `.env.example` with all 5 variables is added as a committed file |

Verdict: ✅ Approved — all findings resolved in spec

---

### Gate 2 — Security & Performance Review
Date: 2026-06-13 | Status: ✅ Approved

| # | Severity | Finding | Location in Spec | Resolution |
|---|----------|---------|-----------------|------------|
| 1 | MEDIUM | EmailJS public key will be visible in browser bundle | emailService.js | **Resolved**: This is by design for EmailJS (client-side SDK). Mitigation: **developer must set Allowed Origins in EmailJS dashboard** to restrict usage to the production domain only. Documented as Pre-condition in QA plan. |
| 2 | LOW | Free tier cap of 200 emails/month | Implementation Notes | **Resolved**: Documented. If volume exceeds limit, EmailJS paid plan or switch to Formspree/backend. |
| 3 | LOW | No CSRF risk (no backend, no cookies, stateless POST to EmailJS CDN) | — | No action needed |

Verdict: ✅ Approved — no CRITICAL/HIGH findings; MEDIUM resolved by domain restriction requirement

---

### Gate 3 — Pre-Development Sweep
Date: 2026-06-13 | Status: ✅ Approved

**Part A — Gate 1 & 2 resolution confirmed**:
- [x] `sendError` state + display present in Implementation Notes for all 3 forms
- [x] `emailjs.send(..., PK)` pattern (no init) present in emailService.js code block
- [x] `.env.example` file in Code Changes table
- [x] EmailJS domain restriction documented in QA pre-conditions

**Part B — Predicted implementation bugs**:

| # | Pattern | Predicted Bug | Edge Case Added? |
|---|---------|--------------|-----------------|
| 1 | Missing `finally` in try/catch | If send throws, `sending` stays `true` forever — button permanently disabled | ✅ EC-3 (double-click / button re-enabled) |
| 2 | Form reset inside `try` before email confirmed | If `setForm(INITIAL)` runs before `await` resolves, user loses data on failure | ✅ EC-5 (form data preserved on failure) — spec moves reset to success path only |
| 3 | Blank `VITE_EMAILJS_*` vars | `emailjs.send` gets `undefined` service ID → throws → silent if no error state | ✅ EC-4 (missing env vars) |
| 4 | FloatingHelpButton — `validate()` is a closure, not imported | Must keep using the internal `validate()` function, not import from emailService | Not a bug if spec is followed exactly |

Verdict: ✅ Approved — all predicted bugs are covered by edge cases or the implementation pattern

---

## Done

- **PR**: commit `4a5cf95` pushed directly to `main`
- **Merged**: 2026-06-13
- **Release Notes entry**: RELEASE_NOTES.md updated under [Unreleased] → Features
