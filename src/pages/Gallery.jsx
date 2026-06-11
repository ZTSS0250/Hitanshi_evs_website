import { useState, useEffect, useCallback } from 'react'
import { FaImages, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdElectricScooter } from 'react-icons/md'
import { GALLERY_ITEMS } from '../assets/images/index'
import './Gallery.css'

const CATEGORIES = [
  { key: 'all',      label: 'All Photos' },
  { key: 'showroom', label: 'Showroom' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'events',   label: 'Events' },
]

const CATEGORY_ICONS = {
  showroom: '🏪',
  vehicles: '⚡',
  events:   '🎉',
}

export default function Gallery() {
  const [category, setCategory]     = useState('all')
  const [lightboxIndex, setLightbox] = useState(null)

  const filtered = category === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === category)

  const openLightbox = (index) => {
    if (!filtered[index].src) return
    setLightbox(index)
  }

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() => {
    setLightbox(i => {
      const realItems = filtered.filter(x => x.src)
      const realIndex = realItems.findIndex((_, ri) => filtered.indexOf(realItems[ri]) === i)
      // find previous real image in filtered
      let idx = i - 1
      while (idx >= 0 && !filtered[idx].src) idx--
      if (idx < 0) {
        // wrap to last real image
        for (let j = filtered.length - 1; j >= 0; j--) {
          if (filtered[j].src) return j
        }
      }
      return idx
    })
  }, [filtered])

  const next = useCallback(() => {
    setLightbox(i => {
      let idx = i + 1
      while (idx < filtered.length && !filtered[idx].src) idx++
      if (idx >= filtered.length) {
        for (let j = 0; j < filtered.length; j++) {
          if (filtered[j].src) return j
        }
      }
      return idx
    })
  }, [filtered])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox, prev, next])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const activeLightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <div className="gallery-page">
      {/* Header */}
      <div className="gallery-header">
        <div className="gallery-header-bg">
          <div className="gh-orb gh-orb-1" />
          <div className="gh-orb gh-orb-2" />
        </div>
        <div className="container" style={{ position:'relative', zIndex:1, textAlign:'center', padding:'3.5rem 1.5rem' }}>
          <div className="section-badge"><FaImages /> Our Gallery</div>
          <h1 className="section-title">
            Photos from{' '}
            <span className="gradient-text">Hitanshi EVS</span>
          </h1>
          <p className="section-subtitle" style={{ marginBottom:0 }}>
            A glimpse of our showroom, our Zelio electric vehicles, and moments with our customers.
          </p>
        </div>
      </div>

      <div className="container gallery-body">
        {/* Filter tabs */}
        <div className="gallery-filters">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              className={`gallery-filter-btn${category === c.key ? ' active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-tile${item.src ? ' has-image' : ' placeholder-tile'}`}
              onClick={() => openLightbox(index)}
              role={item.src ? 'button' : undefined}
              tabIndex={item.src ? 0 : undefined}
              onKeyDown={item.src ? (e) => e.key === 'Enter' && openLightbox(index) : undefined}
              aria-label={item.src ? `View ${item.title}` : undefined}
            >
              {item.src ? (
                <>
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="gallery-img"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-overlay-title">{item.title}</span>
                    <span className="gallery-overlay-cat">
                      {CATEGORY_ICONS[item.category]} {item.category}
                    </span>
                  </div>
                </>
              ) : (
                <div className="gallery-placeholder-inner">
                  <MdElectricScooter className="gallery-placeholder-icon" />
                  <span className="gallery-placeholder-label">{item.title}</span>
                  <span className="gallery-placeholder-sub">Photo coming soon</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="gallery-empty">
            <FaImages />
            <p>No photos in this category yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {activeLightboxItem && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeLightboxItem.src}
              alt={activeLightboxItem.title}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <span className="lightbox-title">{activeLightboxItem.title}</span>
              <span className="lightbox-cat">
                {CATEGORY_ICONS[activeLightboxItem.category]} {activeLightboxItem.category}
              </span>
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}
