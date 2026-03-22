import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronRight, Code2, Briefcase, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import profileImg from '../assets/profile.png';

// Data imports
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import certificationsData from '../data/certifications.json';

// Extract preview data
const topSkills = Object.values(skillsData).flat().slice(0, 10);
const featuredProjects = projectsData.slice(0, 2);
const featuredCerts = certificationsData.slice(0, 3);

// Typed Text Hook
const useTypewriter = (texts, typingSpeed = 70, deletingSpeed = 40, delay = 2000) => {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];

    if (!isDeleting && displayed === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      const nextDelay = isDeleting ? deletingSpeed : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length + (isDeleting ? -1 : 1)));
      }, nextDelay);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delay]);

  return displayed;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  const typedDesig = useTypewriter([
    'Full Stack Developer',
    'Tech Problem Solver',
    'Creative Engineer'
  ]);

  return (
    <PageTransition>
      <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-700 min-h-screen">
        
        {/* ─── HERO SECTION ───────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-12 overflow-hidden px-6 lg:px-12">
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 dark:opacity-20">
            <div className="w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px]" />
          </div>

          <motion.div 
            variants={stagger} initial="hidden" animate="visible"
            className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Text */}
            <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-primary/50" />
                <span className="text-xs font-black tracking-[0.3em] uppercase text-primary">Based in India</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-[7rem] font-medium leading-[0.95] tracking-tighter text-slate-900 dark:text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Hi, I'm <br />
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Riya</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="mb-8 h-8 text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-300 tracking-[0.15em] uppercase" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {typedDesig}
                <span className="inline-block w-3 h-6 bg-primary/60 ml-2 animate-pulse" />
              </motion.div>

              <motion.p variants={fadeUp} className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mb-10">
                Crafting premium digital experiences bridging complex logic with flawless design. I build scalable web ecosystems, pixel by pixel.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/projects" className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-[0.1em] text-sm hover:scale-105 transition-transform flex items-center gap-2">
                  View Work <ArrowRight size={16} />
                </Link>
                <a href="#" className="px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-[0.1em] text-sm hover:border-primary hover:text-primary transition-colors flex items-center gap-2">
                  <Download size={16} /> Resume
                </a>
              </motion.div>
            </div>

            {/* Right Image - Oval Shape */}
            <motion.div variants={fadeUp} className="order-1 lg:order-2 flex justify-center lg:justify-end relative pb-10 lg:pb-0">
               <div className="relative w-64 h-80 sm:w-[320px] sm:h-[420px] rounded-[50%] p-[3px] bg-gradient-to-tr from-sky-400 to-indigo-500 shadow-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                 <div className="absolute inset-1 rounded-[50%] overflow-hidden bg-slate-900 border-4 border-slate-950">
                   <img src={profileImg} alt="Riya" className="w-full h-full object-cover object-top grayscale-[0.15] hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-110" />
                 </div>
               </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── ABOUT / OVERVIEW SECTION ───────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-12 bg-white dark:bg-slate-900/40">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white uppercase tracking-widest border-b-2 border-primary/20 inline-block pb-4">A Brief Intro</h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              I am an ambitious Full Stack Developer and CSE student with a deep passion for designing elegant user interfaces and engineering robust backend systems. I specialize in modern web technologies and constantly explore innovative frameworks to deliver scalable, high-performance solutions.
            </p>
          </div>
        </section>

        {/* ─── SKILLS PREVIEW ───────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="flex justify-between items-end mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Code2 className="text-primary" size={28} />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Tech Arsenal</h2>
              </div>
              <Link to="/skills" className="text-sm font-bold text-primary hover:text-accent-secondary flex items-center gap-1 uppercase tracking-widest transition-colors">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {topSkills.map((skill, idx) => (
                <div key={idx} className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color || '#0ea5e9' }} />
                  <span className="text-md font-bold text-slate-800 dark:text-slate-200 tracking-wider">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROJECTS PREVIEW ───────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-12 bg-white dark:bg-slate-900/40">
          <div className="container mx-auto max-w-7xl">
            <div className="flex justify-between items-end mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Briefcase className="text-primary" size={28} />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Featured Work</h2>
              </div>
              <Link to="/projects" className="text-sm font-bold text-primary hover:text-accent-secondary flex items-center gap-1 uppercase tracking-widest transition-colors">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="group relative rounded-[32px] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-8 hover:shadow-2xl transition-all duration-500">
                  <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${project.color} group-hover:opacity-20 transition-opacity`} />
                  <div className="relative z-10">
                    <span className="text-[10px] font-black tracking-widest uppercase text-primary mb-4 block">
                      {project.tag}
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{project.shortTitle}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-3">{project.description}</p>
                    <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      Discover <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CERTIFICATIONS PREVIEW ───────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="flex justify-between items-end mb-12 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Award className="text-primary" size={28} />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Certifications</h2>
              </div>
              <Link to="/certifications" className="text-sm font-bold text-primary hover:text-accent-secondary flex items-center gap-1 uppercase tracking-widest transition-colors">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCerts.map((cert) => (
                <div key={cert.id} className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cert.title}</h3>
                  <span className="text-xs font-black tracking-widest uppercase text-primary">{cert.platform}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
