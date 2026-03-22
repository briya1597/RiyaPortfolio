import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Education = lazy(() => import('./pages/Education'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Contact = lazy(() => import('./pages/Contact'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
        <Route path="/skills" element={<Suspense fallback={<Loading />}><Skills /></Suspense>} />
        <Route path="/projects" element={<Suspense fallback={<Loading />}><Projects /></Suspense>} />
        <Route path="/certifications" element={<Suspense fallback={<Loading />}><Certifications /></Suspense>} />
        <Route path="/education" element={<Suspense fallback={<Loading />}><Education /></Suspense>} />
        <Route path="/achievements" element={<Suspense fallback={<Loading />}><Achievements /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<Loading />}><Contact /></Suspense>} />
      </Routes>
    </AnimatePresence>
  );
};

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full"
    ></motion.div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <AnimatePresence>
          {loading ? (
            <motion.div
              key="loader"
              exit={{ opacity: 0, scale: 1.1 }}
              className="fixed inset-0 z-[100] flex flex-center bg-slate-50 dark:bg-slate-950 items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-4 border-primary-200 dark:border-slate-800 border-t-primary-600 rounded-full"
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-primary-600 font-black text-2xl italic">R.</div>
              </div>
            </motion.div>
          ) : (
            <>
              <Navbar />
              <AnimatedRoutes />
              <Footer />
            </>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
