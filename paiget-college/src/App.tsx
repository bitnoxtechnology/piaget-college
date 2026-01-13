"use client";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage";
import Loader from "./loader/loader";
import AboutPage from "./pages/aboutpage";
import Schoolspage from "./pages/academics/subpages/schoolspage";
import Availablecoursespage from "./pages/academics/subpages/availablecoursespage";
import Sandwichprogramme from "./pages/academics/subpages/sandwichprogramme";
import Calendarpage from "./pages/academics/subpages/calendarpage";
import Workshopspage from "./pages/workshops/workshopspage";
import Contactus from "./pages/contact/contactus";
import GalleryPage from "./pages/gallery/gallery";
import { Toaster } from "sonner";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="bottom-right" richColors closeButton />
      <Loader isActive={loading} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/academics/schools" element={<Schoolspage />} />
        <Route
          path="/academics/available-courses"
          element={<Availablecoursespage />}
        />
        <Route
          path="/academics/sandwich-programme"
          element={<Sandwichprogramme />}
        />
        <Route path="/academics/calendar" element={<Calendarpage />} />
        <Route path="/workshops" element={<Workshopspage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<Contactus />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
