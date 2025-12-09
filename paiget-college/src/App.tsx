"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import "./App.css"
import Homepage from "./pages/homepage"
import Loader from "./loader/loader"

function AppContent() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [location])

  return (
    <>
      <Loader isActive={loading} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
