import { useEffect } from 'react'
import { FaCheckCircle, FaTimes } from 'react-icons/fa'
import './Toast.css'

export default function Toast({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [onClose, duration])

  return (
    <div className="toast">
      <FaCheckCircle className="toast-icon" />
      <span className="toast-msg">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close">
        <FaTimes />
      </button>
    </div>
  )
}
