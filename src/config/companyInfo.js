/**
 * HITANSHI EVS — Centralized Business Configuration
 *
 * HOW TO UPDATE BUSINESS DETAILS:
 * Edit only this file. All pages and components read from here.
 * No need to touch any React component for business info changes.
 */

export const COMPANY = {
  name: 'Hitanshi EVS',
  tagline: 'Authorized Zelio Electric Vehicle Showroom',
  franchise: 'Authorized Zelio E-Mobility Franchise',

  address: {
    line1: '316/29 Krashi Upaj Mandi Samiti',
    line2: 'AB Road, Shajapur',
    state: 'Madhya Pradesh',
    country: 'India',
    pincode: '465001',
    // Use `full` for single-line display (map links, meta tags, etc.)
    full: '316/29 Krashi Upaj Mandi Samiti, AB Road, Shajapur, Madhya Pradesh 465001',
  },

  /**
   * phones[0] is PRIMARY — shown in Navbar, hero, and all prominent spots.
   * phones[1] is SECONDARY — shown in Footer and Contact page.
   */
  phones: [
    { number: '9893776584', display: '+91 98937 76584', primary: true },
    { number: '8234888811', display: '+91 82348 88811', primary: false },
  ],

  email: 'hitanshievs@gmail.com',

  /**
   * Social links — set to null if the account doesn't exist yet.
   * Null values are automatically hidden in Footer and Contact page.
   */
  social: {
    instagram: 'https://www.instagram.com/hitanshi_evs',
    facebook:  null,   // Add URL when Facebook page is created
    youtube:   null,   // Add URL when YouTube channel is created
    twitter:   null,   // Add URL when Twitter/X account is created
  },

  /**
   * WhatsApp click-to-chat
   * URL format: https://wa.me/<country-code><number>
   * India country code = 91 (no leading +)
   */
  whatsapp: {
    number: '9893776584',
    url: 'https://wa.me/919893776584',
  },

  /**
   * Google Maps
   * googleMapsUrl  — opens directions in new tab (always works)
   * embedUrl       — paste the src URL from Google Maps "Share > Embed a map"
   *                  Leave null until you get the embed URL from Google Maps.
   *                  When set, Contact page shows a live embedded map.
   */
  maps: {
    googleMapsUrl: 'https://maps.google.com/?q=316%2F29+Krashi+Upaj+Mandi+Samiti+AB+Road+Shajapur+Madhya+Pradesh+465001',
    embedUrl: null,
  },

  hours: {
    weekdays: { days: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' },
    sunday:   { days: 'Sunday',            time: '10:00 AM – 4:00 PM' },
  },

  /**
   * SEO / Open Graph
   * ogImage — place a 1200×630 px image at /public/og-image.jpg
   * siteUrl — update once the domain goes live
   */
  seo: {
    title:       'Hitanshi EVS | Authorized Zelio Electric Scooter Dealer in Shajapur',
    description: 'Hitanshi EVS is an authorized Zelio Electric Vehicle showroom in Shajapur, Madhya Pradesh offering electric scooters, test drives, sales, and customer support.',
    keywords:    'Hitanshi EVS, Zelio Electric Scooter, Electric Vehicle Shajapur, EV Dealer MP, Zelio franchise, Madhya Pradesh EV',
    siteUrl:     'https://hitanshievs.in',
    ogImage:     '/og-image.jpg',
  },
}
