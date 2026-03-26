import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Home, Code2, FolderKanban, Award, GraduationCap, Mail, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const navLinks = [
    { title: 'Profile',          path: '/',                icon: <Home size={16} /> },
    { title: 'Skills',           path: '/skills',          icon: <Code2 size={16} /> },
    { title: 'Projects',         path: '/projects',        icon: <FolderKanban size={16} /> },
    { title: 'Certifications',   path: '/certifications',  icon: <Award size={16} /> },
    { title: 'Education',        path: '/education',       icon: <GraduationCap size={16} /> },
    { title: 'Achievements',     path: '/achievements',    icon: <Award size={16} /> },
    { title: 'Contact',          path: '/contact',         icon: <Mail size={16} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="relative group">
          <div className="text-3xl font-black italic tracking-tighter uppercase" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className="text-primary">R</span>
            <span className="text-theme-main">iya</span>
            <span className="text-primary">.</span>
          </div>
          <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
        </Link>

        {/* Desktop Nav Pill */}
        <div className="hidden lg:flex items-center gap-1 px-3 py-2 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 shadow-xl backdrop-blur-2xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.14em] transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white'
                    : 'text-theme-muted hover:text-theme-main'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.icon}
                    {link.title}
                  </span>
                </>
              )}
            </NavLink>
          ))}
          
        </div>



        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-900/40 flex items-center justify-center text-theme-muted hover:text-primary transition-colors shadow-lg border border-slate-200 dark:border-white/10"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-900/40 flex items-center justify-center text-theme-muted z-50 shadow-lg border border-slate-200 dark:border-white/10"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-white/95 dark:bg-slate-950/96 flex flex-col items-center justify-center gap-6 pt-20"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-2xl font-black uppercase tracking-tighter italic transition-all hover:text-primary ${
                      isActive ? 'text-primary' : 'text-theme-dim'
                    }`
                  }
                >
                  {link.icon} {link.title}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
