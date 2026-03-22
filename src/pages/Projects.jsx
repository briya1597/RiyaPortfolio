import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Zap, Globe, Filter, 
  CheckCircle2, TrendingUp, Star, Loader2, ArrowRight, MousePointer2
} from 'lucide-react';
import { useGithubProjects } from '../hooks/useGithubProjects';
import PageTransition from '../components/PageTransition';

// ─── Config ───────────────────────────────────────────────────────────────────
const TABS = ['All', 'React', 'Node.js', 'Full Stack', 'Others'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

// ─── Project Card (Main Grid) ──────────────────────────────────────────────────
const ProjectCard = ({ project }) => (
  <motion.div
    variants={cardVariants}
    layout
    whileHover={{ y: -10 }}
    className="group relative rounded-[32px] bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_30px_60px_rgba(var(--accent-primary-rgb),0.25)]"
  >
    {/* Image Container (Top) */}
    <div className="relative h-56 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-slate-900/10 z-10 transition-colors group-hover:bg-transparent duration-500" />
      {project.image ? (
        <motion.img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800/80 group-hover:scale-110 transition-transform duration-1000 ease-out">
          <Globe size={48} className="text-slate-300 dark:text-slate-600 mb-2 opacity-50" />
          <span className="text-xl font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase opacity-50">{project.title.substring(0, 2)}</span>
        </div>
      )}
      {/* Visual Accents */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 bg-black/40 text-theme-main shadow-lg">
          {project.category}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/60 to-transparent z-10" />
    </div>

    {/* Content Area */}
    <div className="flex flex-col flex-grow p-8">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-black text-theme-main leading-tight tracking-tight group-hover:text-primary transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {project.title}
        </h3>
        {project.stars > 0 && (
          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
            <Star size={10} fill="currentColor" />
            {project.stars}
          </div>
        )}
      </div>

      <p className="text-sm text-theme-muted leading-relaxed mb-6 line-clamp-2 font-medium italic opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
        {project.description}
      </p>

      {/* Tech Mini Pills */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {project.techStack.map((tech) => (
          <span key={tech} className="px-2 py-0.5 rounded-md bg-theme-dim/10 border border-slate-200 dark:border-white/5 text-[9px] font-bold text-theme-muted uppercase tracking-wider">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-3 mt-auto">
        <motion.a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2, x: -2 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-theme-muted hover:border-primary/30 hover:text-primary transition-all bg-theme-dim/5"
        >
          <Github size={14} /> Source
        </motion.a>
        {project.live && (
          <motion.a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, x: 2 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg flex-1 justify-center relative overflow-hidden group/btn"
            style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)` }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <ExternalLink size={14} /> Launch
            </span>
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const { projects, loading, error } = useGithubProjects();
  const [activeFilter, setActiveFilter] = useState('All');

  // Dynamic Tabs: Only show categories that have projects
  const TABS = useMemo(() => {
    const categories = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(categories).sort()];
  }, [projects]);
  
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div className="space-y-4">
          <div className="text-red-500 text-5xl font-black italic mb-4">Network Error.</div>
          <p className="text-theme-muted font-medium italic mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-widest text-xs transition-transform active:scale-95 shadow-lg">Retry Connection</button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen py-24 px-6 overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-700" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none z-0 bg-primary/20"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full blur-[160px] pointer-events-none z-0 bg-secondary/20"
        />

        <div className="relative z-10 container mx-auto max-w-7xl">
          {/* ── Page Intro ── */}
          <div className="mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-xl"
            >
              <MousePointer2 size={12} className="animate-bounce" />
              Creative Exhibition
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-black mb-10 tracking-tighter text-theme-main selection:bg-primary selection:text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Digital <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}>Impact.</span>
            </motion.h1>
          </div>

          {/* ── Filter Engine ── */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Filter size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-black uppercase tracking-widest text-theme-main leading-tight">Project Filter</h3>
                <p className="text-[10px] text-theme-muted font-bold tracking-wider uppercase opacity-60">Sort by ecosystem</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 p-2 rounded-[32px] bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 backdrop-blur-3xl shadow-2xl">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`relative px-8 py-3.5 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-700 overflow-hidden ${
                    activeFilter === tab ? 'text-white' : 'text-theme-muted hover:text-theme-main'
                  }`}
                >
                  {activeFilter === tab && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 z-0"
                      style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.8 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Grid Gallery ── */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[500px] rounded-[32px] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Stats Footer ── */}
          {!loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-32 flex flex-col items-center text-center py-20 border-t border-slate-200 dark:border-white/5"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
                <div>
                  <div className="text-4xl lg:text-5xl font-black text-theme-main mb-2 tabular-nums tracking-tighter">{projects.length}+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary">Repos Synced</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-black text-theme-main mb-2 tabular-nums tracking-tighter">
                    {projects.reduce((acc, p) => acc + (p.stars || 0), 0)}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-500">Stars Earned</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-black text-theme-main mb-2 tabular-nums tracking-tighter">100%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live Demos</div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-black text-theme-main mb-2 tabular-nums tracking-tighter">24/7</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Sync Status</div>
                </div>
              </div>

              <motion.a 
                href="https://github.com/briya1597"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-4 px-12 py-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all"
              >
                Explore GitHub Ecosystem
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
