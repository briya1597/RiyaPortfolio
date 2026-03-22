import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import profileImg from '../assets/profile.png';

// ─── Floating Particle ──────────────────────────────────────────────────────
const PARTICLE_COUNT = 18;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: `${Math.random() * 100}%`,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 12,
}));

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
    {particles.map((p) => (
      <div
        key={p.id}
        className="particle"
        style={{
          width: p.size,
          height: p.size,
          left: p.left,
          bottom: '-20px',
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
        }}
      />
    ))}
  </div>
);

// ─── Cursor Glow ────────────────────────────────────────────────────────────
const CursorGlow = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <div ref={cursorRef} className="cursor-glow hidden lg:block" />;
};

// ─── Stagger Variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Typing Designation ──────────────────────────────────────────────────────
const useTypewriter = (text, speed = 55) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const tick = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(tick); setDone(true); }
    }, speed);
    return () => clearInterval(tick);
  }, [text, speed]);

  return { displayed, done };
};

// ─── Home Page ────────────────────────────────────────────────────────────────
const Home = () => {
  // Mouse parallax for the entire content
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Parallax transforms
  const moveX = useTransform(springX, [-0.5, 0.5], ['-15px', '15px']);
  const moveY = useTransform(springY, [-0.5, 0.5], ['-15px', '15px']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const { displayed: typedDesig, done: designDone } = useTypewriter(
    'Full Stack Developer | CSE Student',
    60
  );

  return (
    <PageTransition>
      {/* Cursor glow */}
      <CursorGlow />

      <section
        className="relative min-h-[88vh] flex items-center justify-center overflow-hidden px-4 py-12"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated background layer */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-700 pointer-events-none" />
        <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-30 pointer-events-none" />

        {/* Subtle pulsing orbs - more professional colors */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-primary-900/10 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-secondary/10 dark:bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Floating particles - subtle */}
        <FloatingParticles />

        {/* ── Content Wrapper ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ x: moveX, y: moveY }}
          className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center px-6"
        >
          {/* ── Avatar ── */}
          <motion.div variants={itemVariants} className="relative mb-14 group">
            {/* Classy glow behind avatar */}
            <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Subtle gradient ring */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-slate-700 via-slate-500 to-slate-700 opacity-20" />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-primary-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            
            {/* Avatar container */}
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl transition-all duration-700 group-hover:scale-[1.03] group-hover:border-primary/40">
              <img
                src={profileImg}
                alt="Riya – Full Stack Developer"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>
            
            {/* Status dot */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-xl border border-slate-200 dark:border-white/5 z-20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 relative" />
              <span className="text-[10px] font-bold tracking-widest text-theme-muted uppercase">Available</span>
            </div>
          </motion.div>

          {/* ── Name ── */}
          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-9xl font-black mb-6 leading-none tracking-tight text-theme-main"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Riya<span className="text-primary">.</span>
          </motion.h1>

          {/* ── Designation (Typing) ── */}
          <motion.div variants={itemVariants} className="mb-10 flex items-center justify-center">
            <p
              className="text-lg md:text-xl font-medium text-theme-muted tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {typedDesig}
              {!designDone && (
                <span className="inline-block w-px h-6 bg-primary/50 ml-1 align-middle animate-pulse" />
              )}
            </p>
          </motion.div>

          {/* ── Description ── */}
          <motion.div 
            variants={itemVariants} 
            className="mb-14 max-w-2xl mx-auto px-6"
          >
            <p className="text-lg md:text-xl leading-[1.8] text-theme-muted transition-colors duration-500 group-hover:text-theme-main font-light text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              A Full Stack Developer and CSE student passionate about building 
              <span className="text-primary font-medium mx-1.5">scalable web applications</span> 
              and 
              <span className="text-secondary font-medium mx-1.5">AI-driven solutions.</span> 
              I focus on writing clean, efficient code and creating seamless user experiences.
            </p>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full"
          >
            {/* Primary: View Projects */}
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/projects"
                className="flex items-center justify-center gap-4 px-12 py-5 rounded-full text-xs font-bold text-theme-main uppercase tracking-[0.2em] bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group shadow-2xl"
              >
                View Selected Work
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-2 transition-transform duration-300 text-primary"
                />
              </Link>
            </motion.div>

            {/* Secondary: Contact Me */}
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-theme-muted hover:text-theme-main transition-all duration-300"
              >
                Let's Talk
              </Link>
            </motion.div>

            {/* Tertiary: Resume */}
            <motion.a
              href="#"
              whileHover={{ y: -2, color: 'var(--accent-primary)' }}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-theme-muted transition-colors duration-300"
            >
              <Download size={14} className="text-theme-dim" /> Resume.pdf
            </motion.a>
          </motion.div>

          {/* ── Social Icons ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-10 mt-20 pt-12 border-t border-slate-200 dark:border-white/5 w-full max-w-sm justify-center"
          >
            {[
              { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
              { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: <Mail size={20} />, href: 'mailto:riya@example.com', label: 'Email' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ y: -5, color: 'var(--accent-primary)' }}
                className="text-theme-dim hover:text-primary transition-all duration-500"
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

      </section>
    </PageTransition>
  );
};

export default Home;
