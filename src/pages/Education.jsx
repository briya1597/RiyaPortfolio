import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, BookOpen, CalendarDays, MapPin,
  Star, Award, TrendingUp, School
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

// ─── Education Data ────────────────────────────────────────────────────────────
const EDU_TABS = [
  { id: 'graduation', label: 'Graduation', icon: <GraduationCap size={16} /> },
  { id: 'class12',    label: 'Class XII',  icon: <BookOpen size={16} /> },
  { id: 'class10',    label: 'Class X',    icon: <School size={16} /> },
];

const EDU_DATA = {
  graduation: {
    icon: <GraduationCap size={36} />,
    label: 'Graduation',
    subtitle: 'B.Tech Computer Science & Engineering',
    period: '2023 – Present',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    score: '7.2 CGPA',
    scoreLabel: 'Current CGPA',
    color: 'var(--accent-primary)',
    gradient: 'from-sky-500 to-blue-600',
    tag: 'Undergraduate',
    description: 'Specializing in Full Stack Development and AI. Actively participating in hackathons and exploring scalable web architectures.',
  },
  class12: {
    icon: <BookOpen size={36} />,
    label: 'Class XII',
    subtitle: 'Senior Secondary — Science (PCM)',
    period: '2021 – 2023',
    institution: 'St. Francis Sr. Sec. School',
    location: 'India',
    score: '74.4%',
    scoreLabel: 'Percentage',
    color: 'var(--accent-secondary)',
    gradient: 'from-violet-500 to-purple-600',
    tag: 'Higher Secondary',
    description: 'Focused on Physics, Chemistry, and Mathematics. Developed strong analytical and problem-solving foundations.',
  },
  class10: {
    icon: <School size={36} />,
    label: 'Class X',
    subtitle: 'Secondary Education',
    period: '2019 – 2020',
    institution: 'Army Public School',
    location: 'India',
    score: '84%',
    scoreLabel: 'Percentage',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-600',
    tag: 'Secondary',
    description: 'Consistent academic performance with a strong interest in science and mathematics.',
  },
};

// ─── Card variants ─────────────────────────────────────────────────────────────
const contentVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

// ─── Info Row ─────────────────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 group/row py-4 border-b border-slate-200 dark:border-white/5 last:border-0">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover/row:scale-110`}>
      <Icon size={18} style={{ color }} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-theme-dim mb-0.5">{label}</p>
      <p className="text-sm font-bold text-theme-main group-hover/row:text-primary transition-colors">{value}</p>
    </div>
  </div>
);

// ─── Main Education Page ───────────────────────────────────────────────────────
const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-primary-500/10 rounded-full blur-[100px]"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-secondary/10 dark:bg-violet-500/10 rounded-full blur-[120px]"
    />
  </div>
);

const Education = () => {
  const [activeTab, setActiveTab] = useState('graduation');
  const activeData = EDU_DATA[activeTab];

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden py-24 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-700">
        {/* Background orbs */}
        <BackgroundOrbs />
        <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-20 pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-4xl">
          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              <GraduationCap size={14} />
              Educational Path
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-theme-main">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Education</span>
            </h1>
            <p className="text-lg text-theme-muted max-w-2xl mx-auto leading-relaxed font-medium">
              A journey of persistent learning, academic excellence, and technical skill development.
            </p>
            {/* Divider */}
            <div className="flex items-center gap-4 justify-center mt-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
            </div>
          </motion.div>

          {/* ── Tab Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex justify-center mb-16"
          >
            <div className="inline-flex p-1.5 rounded-2xl bg-white/50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/8 backdrop-blur-xl shadow-xl gap-2">
              {Object.entries(EDU_DATA).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                    activeTab === key
                      ? 'text-white'
                      : 'text-theme-muted hover:text-theme-main'
                  }`}
                >
                  {activeTab === key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{data.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Tab Content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="glass-card flex flex-col lg:flex-row items-stretch min-h-[500px]">
                {/* Left: Visual Side */}
                <div className={`lg:w-2/5 relative overflow-hidden flex flex-col justify-center p-12 text-white bg-gradient-to-br ${activeData.gradient}`}>
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
                  <div className="relative z-10 text-center lg:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/30 text-[9px] font-black uppercase tracking-widest mb-6">
                      <Award size={11} />
                      {activeData.tag}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-28 h-28 rounded-3xl flex items-center justify-center mx-auto lg:mx-0 mb-8 backdrop-blur-md bg-white/20 border border-white/30`}
                      style={{ boxShadow: `0 0 40px rgba(255,255,255,0.2)` }}
                    >
                      <span className="text-white">{activeData.icon}</span>
                    </motion.div>

                    <div
                      className="w-full rounded-3xl p-6 text-center border border-white/30 backdrop-blur-md bg-white/10"
                      style={{ boxShadow: `0 4px 30px rgba(0,0,0,0.1)` }}
                    >
                      <div className={`text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-white/70`}>
                        {activeData.scoreLabel}
                      </div>
                      <div
                        className="text-5xl font-black mb-3 text-white"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {activeData.score}
                      </div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className={i < 4 ? '' : 'opacity-25'}
                            style={{ color: 'white', fill: i < 4 ? 'white' : 'none' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content Side */}
                <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10`} style={{ color: activeData.color }}>
                      {activeData.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-theme-main tracking-tight leading-tight mb-1 uppercase">
                        {activeData.subtitle}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-theme-dim">
                          {activeData.institution}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 space-y-4">
                    <p className="text-theme-muted font-medium leading-relaxed">
                      {activeData.description}
                    </p>
                  </div>

                  <div className="space-y-0">
                    <InfoRow icon={CalendarDays} label="Duration" value={activeData.period} color={activeData.color} />
                    <InfoRow icon={MapPin} label="Location" value={activeData.location} color={activeData.color} />
                  </div>
                </div>
              </div>

              {/* Additional Card */}
              <div className="glass-card relative p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group mt-10">
                {/* Background accent */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 max-w-xl text-center md:text-left">
                  <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-4">Focus Areas</span>
                  <h3 className="text-3xl font-black mb-4 text-theme-main">Beyond the Classroom</h3>
                  <p className="text-theme-muted font-medium leading-relaxed">
                    Focusing on hands-on project experience, competitive programming, and staying updated with the latest trends in Full Stack and AI.
                  </p>
                </div>
                
                <div className="relative z-10 flex gap-4">
                  <div className="glass-card p-6 flex flex-col items-center gap-3 hover:border-primary/50 transition-colors">
                    <div className="text-2xl font-black text-theme-main">8.5+</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-theme-dim">CGPA</div>
                  </div>
                  <div className="glass-card p-6 flex flex-col items-center gap-3 hover:border-secondary/50 transition-colors">
                    <div className="text-2xl font-black text-theme-main">A+</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-theme-dim">Academic Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Timeline indicator ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center mt-12 gap-3"
          >
            {Object.keys(EDU_DATA).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-full transition-all duration-300 ${
                  activeTab === key ? 'w-8 h-2' : 'w-2 h-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-500'
                }`}
                style={activeTab === key ? { background: EDU_DATA[key].color } : {}}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Education;
