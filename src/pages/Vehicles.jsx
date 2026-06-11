import { useState, useMemo } from 'react'
import { FaSearch, FaTimes, FaCheckCircle, FaBolt } from 'react-icons/fa'
import { MdElectricScooter, MdSpeed, MdBatteryChargingFull } from 'react-icons/md'
import { vehicles } from '../data/vehicles'
import { VEHICLE_IMAGES } from '../assets/images/index'
import { Link } from 'react-router-dom'
import './Vehicles.css'

const CATEGORIES = ['All', ...new Set(vehicles.map(v => v.category))]

function ScooterSVG({ color = '#00D45E' }) {
  return (
    <svg viewBox="0 0 260 180" className="v-scooter-svg" xmlns="http://www.w3.org/2000/svg">
      <circle cx="58"  cy="138" r="32" fill="none" stroke={color} strokeWidth="7" opacity=".85"/>
      <circle cx="58"  cy="138" r="16" fill="none" stroke={color} strokeWidth="3" opacity=".35"/>
      <circle cx="58"  cy="138" r="5"  fill={color} opacity=".7"/>
      <circle cx="200" cy="138" r="32" fill="none" stroke={color} strokeWidth="7" opacity=".85"/>
      <circle cx="200" cy="138" r="16" fill="none" stroke={color} strokeWidth="3" opacity=".35"/>
      <circle cx="200" cy="138" r="5"  fill={color} opacity=".7"/>
      <path d="M90 106 L120 46 L162 46 L200 106" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M112 44 Q138 30 162 44" stroke={color} strokeWidth="9" fill="none" strokeLinecap="round"/>
      <line x1="185" y1="68" x2="200" y2="106" stroke={color} strokeWidth="7" strokeLinecap="round"/>
      <line x1="185" y1="68" x2="185" y2="28" stroke={color} strokeWidth="7" strokeLinecap="round"/>
      <line x1="168" y1="28" x2="202" y2="28" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      <path d="M58 106 Q75 95 90 106" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"/>
      <rect x="108" y="72" width="46" height="24" rx="6" fill={color} opacity=".18" stroke={color} strokeWidth="1.5"/>
      <text x="131" y="88" fill={color} fontSize="10" fontWeight="800" textAnchor="middle" opacity=".8">EV</text>
      <circle cx="204" cy="86" r="7" fill={color} opacity=".65"/>
      <ellipse cx="130" cy="173" rx="80" ry="6" fill={color} opacity=".07"/>
    </svg>
  )
}

function VehicleCard({ vehicle }) {
  const [expanded, setExpanded] = useState(false)
  const c = vehicle.accentColor
  const vehicleImg = VEHICLE_IMAGES[vehicle.imageKey]

  return (
    <div className="vc" style={{ '--c': c }}>
      {/* Image area */}
      <div className="vc-image">
        <span className="vc-badge">{vehicle.category}</span>
        {vehicleImg ? (
          <img
            src={vehicleImg}
            alt={vehicle.name}
            className="vc-vehicle-img"
            loading="lazy"
          />
        ) : (
          <ScooterSVG color={c} />
        )}
      </div>

      {/* Info */}
      <div className="vc-body">
        <div className="vc-header">
          <div>
            <h3 className="vc-name">{vehicle.name}</h3>
            <p className="vc-tagline">{vehicle.tagline}</p>
          </div>
          <div className="vc-price">{vehicle.price}</div>
        </div>

        <p className="vc-desc">{vehicle.description}</p>

        {/* Specs grid */}
        <div className="vc-specs">
          <div className="vc-spec-item">
            <MdBatteryChargingFull className="spec-icon" />
            <div>
              <div className="spec-val">{vehicle.range}</div>
              <div className="spec-key">Range</div>
            </div>
          </div>
          <div className="vc-spec-item">
            <MdSpeed className="spec-icon" />
            <div>
              <div className="spec-val">{vehicle.topSpeed}</div>
              <div className="spec-key">Top Speed</div>
            </div>
          </div>
          <div className="vc-spec-item">
            <FaBolt className="spec-icon" />
            <div>
              <div className="spec-val">{vehicle.chargingTime}</div>
              <div className="spec-key">Charge Time</div>
            </div>
          </div>
          <div className="vc-spec-item">
            <MdElectricScooter className="spec-icon" />
            <div>
              <div className="spec-val">{vehicle.warranty.split(' ')[0]} Yr</div>
              <div className="spec-key">Warranty</div>
            </div>
          </div>
        </div>

        {/* Battery type */}
        <div className="vc-battery">
          <span className="battery-label">Battery</span>
          <span className="battery-val">{vehicle.batteryType}</span>
        </div>

        {/* Features toggle */}
        <button
          className="features-toggle"
          onClick={() => setExpanded(e => !e)}
          style={{ color: c }}
        >
          {expanded ? 'Hide Features ▲' : `View ${vehicle.features.length} Features ▼`}
        </button>

        {expanded && (
          <div className="vc-features">
            {vehicle.features.map(f => (
              <div key={f} className="vc-feature-chip">
                <FaCheckCircle style={{ color: c }} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action */}
        <Link to="/book-test-drive" className="vc-cta" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}>
          Book Test Drive for {vehicle.name}
        </Link>
      </div>
    </div>
  )
}

export default function Vehicles() {
  const [query, setQuery]     = useState('')
  const [category, setCat]    = useState('All')

  const filtered = useMemo(() => {
    return vehicles.filter(v => {
      const q = query.toLowerCase()
      const matchQ = !q || v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q) || v.batteryType.toLowerCase().includes(q)
      const matchC = category === 'All' || v.category === category
      return matchQ && matchC
    })
  }, [query, category])

  return (
    <div className="vehicles-page">
      {/* Page header */}
      <div className="vp-header">
        <div className="vp-header-bg">
          <div className="vp-orb vp-orb-1" />
          <div className="vp-orb vp-orb-2" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '4rem 1.5rem' }}>
          <div className="section-badge"><MdElectricScooter /> Our Fleet</div>
          <h1 className="section-title">
            Zelio Electric{' '}
            <span className="gradient-text">Vehicle Catalog</span>
          </h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            Explore the complete range of Zelio electric scooters available at
            Hitanshi EVS, Shajapur. Find your perfect ride.
          </p>
        </div>
      </div>

      <div className="container vp-body">
        {/* Filters */}
        <div className="vp-filters">
          <div className="search-wrap">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by model, category…"
              className="search-input"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <FaTimes />
              </button>
            )}
          </div>

          <div className="category-chips">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`chip${category === c ? ' active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="result-count">
          Showing <strong>{filtered.length}</strong> of {vehicles.length} vehicles
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="vp-grid">
            {filtered.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        ) : (
          <div className="no-results">
            <MdElectricScooter />
            <h3>No vehicles found</h3>
            <p>Try adjusting your search or filter.</p>
            <button className="btn-outline" onClick={() => { setQuery(''); setCat('All') }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
