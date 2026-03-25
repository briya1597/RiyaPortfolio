import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Wrench, Layout, Server, Database, Layers, Sparkles
} from 'lucide-react';
import { 
  SiCplusplus, SiJavascript, SiC, SiReact, SiNodedotjs, SiExpress,
  SiTailwindcss, SiMongodb, SiMysql, SiGit, SiGithub, SiPostman
} from 'react-icons/si';
import skillsData from '../data/skills.json';
import PageTransition from '../components/PageTransition';

const ICON_MAP = {
  SiCplusplus: <SiCplusplus size={24} />,
  SiJavascript: <SiJavascript size={24} />,
  SiC: <SiC size={24} />,
  SiReact: <SiReact size={24} />,
  SiNodedotjs: <SiNodedotjs size={24} />,
  SiExpress: <SiExpress size={24} />,
  SiTailwindcss: <SiTailwindcss size={24} />,
  SiMongodb: <SiMongodb size={24} />,
  SiMysql: <SiMysql size={24} />,
  SiGit: <SiGit size={24} />,
  SiGithub: <SiGithub size={24} />,
  SiPostman: <SiPostman size={24} />,
};

const FILTERS = [
  { id: 'All', label: 'All Ecosystems', icon: <Layers size={14} /> },
  { id: 'Frontend', label: 'Frontend', icon: <Layout size={14} /> },
  { id: 'Backend', label: 'Backend', icon: <Server size={14} /> },
  { id: 'Tools', label: 'Tools', icon: <Wrench size={14} /> },
];

// ─── Components ───────────────────────────────────────────────────────────────

const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    whileHover={{ y: -8, scale: 1.05 }}
    className="group relative rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 flex flex-col items-center justify-center transition-all duration-500"
    style={{ 
      '--skill-color': skill.color || 'var(--accent-primary)',
    }}
  >
    {/* Animated Background Glow (Skill Specific) */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl blur-2xl" 
      style={{ background: `radial-gradient(circle at center, ${skill.color || 'var(--accent-primary)'}, transparent)` }}
    />
    
    <div 
      className="relative z-10 w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4 shadow-lg group-hover:rotate-12 transition-all duration-500"
      style={{ color: skill.color || 'var(--accent-primary)' }}
    >
      {ICON_MAP[skill.icon] || <Code2 size={24} />}
    </div>
    
    <span className="relative z-10 text-sm font-black text-theme-main group-hover:text-primary transition-colors duration-300 uppercase tracking-widest text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {skill.name}
    </span>

    {/* Custom Glow Drop Shadow on Hover */}
    <div 
      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10"
      style={{ background: skill.color || 'var(--accent-primary)' }}
    />
  </motion.div>
);

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(skillsData);

  useEffect(() => {
    if (activeFilter === 'All') {
      // Flatten all skills into a single "All" category for a unified grid
      const allSkills = Object.values(skillsData).flat();
      setFilteredData({ "All Technologies": allSkills });
    } else {
      const filtered = {};
      Object.keys(skillsData).forEach(cat => {
        const items = skillsData[cat].filter(skill => 
          skill.type === activeFilter || (activeFilter === 'Tools' && (skill.type === 'Tools' || skill.type === 'Database'))
        );
        if (items.length > 0) filtered[cat] = items;
      });
      setFilteredData(filtered);
    }
  }, [activeFilter]);

  return (
    <PageTransition>
      <div className="relative min-h-screen py-24 px-6 overflow-hidden bg-transparent transition-colors duration-700">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-20 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[160px] pointer-events-none z-0"
        />

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          {/* ── Page Header ── */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-xl"
            >
              <Sparkles size={14} className="animate-pulse" />
              Technical Stack
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-black mb-10 text-theme-main tracking-tighter">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ecosystems</span>
            </h1>
            <p className="text-lg md:text-xl text-theme-muted max-w-2xl mx-auto leading-relaxed font-medium italic border-l-4 border-primary/20 pl-8">
              A gallery of the languages, frameworks, and tools I use to build scalable, high-performance web solutions.
            </p>
          </div>

          {/* ── Filter Engine ── */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 border-b border-slate-200 dark:border-white/5 pb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Code2 size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-theme-main leading-tight">Expertise</h3>
                <p className="text-[10px] text-theme-muted font-bold tracking-widest uppercase opacity-60">Verified Mastery</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 p-2 rounded-[32px] bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-white/8 backdrop-blur-3xl shadow-2xl">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative px-8 py-3.5 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-700 overflow-hidden ${
                    activeFilter === filter.id ? 'text-white' : 'text-theme-muted hover:text-theme-main'
                  }`}
                >
                  {activeFilter === filter.id && (
                    <motion.div
                      layoutId="skillTabPill"
                      className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {filter.icon}
                    {filter.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Dynamic Category Sections ── */}
          <div className="grid grid-cols-1 gap-16">
            <AnimatePresence mode="popLayout">
              {Object.entries(filteredData).map(([category, skills]) => (
                <motion.div
                  key={category}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  {activeFilter !== 'All' && (
                    <div className="flex items-center gap-6 text-left">
                      <h2 className="text-2xl font-black text-theme-main tracking-widest uppercase border-b-4 border-primary/20 pb-2">
                        {category}
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent" />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {skills.map((skill, idx) => (
                      <SkillCard key={skill.name} skill={skill} index={idx} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Footer Insights ── */}
          {!Object.keys(filteredData).length && (
            <div className="py-20 text-center">
              <p className="text-theme-muted italic text-lg">No technologies found in this ecosystem yet.</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-40 pt-20 border-t border-slate-200 dark:border-white/5"
          >
            <div className="flex flex-wrap justify-center gap-16 lg:gap-32">
              {[
                { label: 'Total Tech', val: Object.values(skillsData).flat().length },
                { label: 'Focus Area', val: activeFilter === 'All' ? 'Full Stack' : activeFilter },
                { label: 'Development', val: 'Expert' }
              ].map((s, i) => (
                <div key={i} className="group">
                  <div className="text-5xl font-black text-theme-main group-hover:text-primary transition-all duration-300 tracking-tighter tabular-nums mb-2">
                    {s.val}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-theme-dim">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;
