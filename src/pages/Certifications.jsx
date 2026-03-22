import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, BookOpen, Wifi, Database, Brain, Star, Code, Cloud } from 'lucide-react';
import certsData from '../data/certifications.json';
import PageTransition from '../components/PageTransition';

// ─── Platform Icons map ───────────────────────────────────────────────────────
const PlatformIcon = ({ platform, color, size = 28 }) => {
  if (platform.includes('Infosys')) return <Brain size={size} style={{ color }} />;
  if (platform.includes('MongoDB')) return <Database size={size} style={{ color }} />;
  if (platform.includes('Coursera')) return <Wifi size={size} style={{ color }} />;
  if (platform.includes('NPTEL')) return <Cloud size={size} style={{ color }} />;
  if (platform.includes('Udemy')) return <Star size={size} style={{ color }} />;
  if (platform.includes('Neocolab')) return <Code size={size} style={{ color }} />;
  return <BookOpen size={size} style={{ color }} />;
};

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORIES = ['All', 'Training', 'AI / ML', 'Database', 'CS Fundamentals', 'Networking', 'Web Development', 'Cloud'];

// ─── Card Variants ────────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Cert Card ────────────────────────────────────────────────────────────────
const CertCard = ({ cert }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative w-full h-[450px] cursor-pointer group perspective-1000"
    >
      <motion.div
        className="w-full h-full relative transition-all duration-700 preserve-3d"
        whileHover={{ rotateY: 180 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="glass-card h-full flex flex-col overflow-hidden">
            <div className="relative h-52 w-full overflow-hidden">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                {cert.platform}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${cert.colorBg} ${cert.colorText} border ${cert.colorBorder} dark:opacity-90`}>
                  {cert.category}
                </span>
                <span className="text-[10px] text-theme-dim font-bold uppercase tracking-widest">
                  {cert.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-theme-main mb-2 leading-tight">
                {cert.title}
              </h3>
              <p className="text-sm text-theme-muted line-clamp-3 leading-relaxed">
                {cert.description}
              </p>
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                  <span>Hover to flip</span>
                  <ExternalLink size={12} className="rotate-45" />
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cert.colorBg}`}>
                  <PlatformIcon platform={cert.platform} color={cert.color} size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="glass-card h-full p-8 flex flex-col items-center justify-center text-center shadow-2xl bg-white/95 dark:bg-slate-950/95">
            <div 
              className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 ${cert.colorBg} border ${cert.colorBorder}`}
            >
              <PlatformIcon platform={cert.platform} color={cert.color} size={40} />
            </div>
            
            <h3 className="text-2xl font-black text-theme-main mb-2 leading-tight">
              {cert.title}
            </h3>
            
            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6">
              {cert.platform}
            </p>
            
            <p className="text-theme-muted text-sm leading-relaxed mb-8 max-w-[280px]">
              {cert.description}
            </p>
            
            <div className="flex flex-col gap-3 w-full">
              <motion.a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-bold text-white uppercase tracking-widest transition-all duration-300 shadow-xl"
                style={{ background: `linear-gradient(135deg, ${cert.color}, #7c3aed)` }}
                onClick={(e) => e.stopPropagation()}
              >
                View Certificate
                <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hover Glow Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" 
        style={{ 
          background: `radial-gradient(circle at center, ${cert.color}15 0%, transparent 70%)`
        }} 
      />
    </motion.div>
  );
};


// ─── Main Certifications Page ─────────────────────────────────────────────────
const Certifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? certsData
    : certsData.filter((c) => c.category === activeFilter);

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden py-8 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-700">
        <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-20 pointer-events-none" />
        {/* Background orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent-secondary), transparent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-[130px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent)' }}
        />

        <div className="relative z-10 container mx-auto max-w-6xl">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              Portfolio / Certifications
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-5 leading-tight tracking-tight text-theme-main"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              My{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
              >
                Certifications
              </span>
            </h1>
            <p
              className="text-base md:text-lg text-theme-muted max-w-xl mx-auto leading-relaxed font-medium"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Recognized credentials and <span className="text-secondary font-semibold uppercase tracking-tighter italic">Specialized Trainings</span> across{' '}
              <span className="text-theme-main font-semibold">AI, Cloud, Databases, Networking,</span> and
              core Computer Science fundamentals.
            </p>
            <div className="flex items-center gap-4 justify-center mt-8 opacity-60">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-secondary" />
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-secondary" />
            </div>
          </motion.div>

          {/* ── Filter Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center flex-wrap gap-2 mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white/50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/8 backdrop-blur-xl shadow-xl">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeFilter === cat
                      ? 'text-white'
                      : 'text-theme-muted hover:text-theme-main'
                  }`}
                >
                  {activeFilter === cat && (
                    <motion.div
                      layoutId="certPill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </motion.div>

          {/* ── Stats ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-10"
          >
            {[
              { label: 'Certificates', count: certsData.length },
              { label: 'Platforms', count: [...new Set(certsData.map((c) => c.platform))].length },
              { label: 'Categories', count: [...new Set(certsData.map((c) => c.category))].length },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span
                  className="text-3xl font-black text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', fontFamily: "'Poppins', sans-serif" }}
                >
                  {s.count}
                </span>
                <span className="text-xs text-theme-dim font-bold uppercase tracking-widest border-l border-slate-200 dark:border-white/10 pl-3">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Certifications;
