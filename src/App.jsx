import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingHelpButton from './components/FloatingHelpButton'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import BookTestDrive from './pages/BookTestDrive'
import ContactUs from './pages/ContactUs'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/book-test-drive" element={<BookTestDrive />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <FloatingHelpButton />
      </div>
    </Router>
  )
}

export default App
