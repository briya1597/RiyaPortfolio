import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, FolderGit2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import profileImg from '../assets/profile.png';
import { FaReact, FaNodeJs, FaGitAlt, FaPython, FaDatabase } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiJavascript, SiExpress, SiPostman, SiTypescript } from 'react-icons/si';

// Project Thumbnails for Showcase
import aspireLensThumb from '../assets/Projects/Aspirelens.png';
import ecoLocatorThumb from '../assets/Projects/EcoLocator.png';
import ecoReviveThumb from '../assets/Projects/Ecorevive.png';
import trackTechThumb from '../assets/Projects/TrackTech.png';

// Looping Typed Text Hook
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

// Extracted Marquee Component
const InfiniteMarquee = () => {
  const marqueeText = "FULL STACK ENGINEERING • AI INTEGRATION • SCALABLE ARCHITECTURE • UI/UX DESIGN • JWT AUTHENTICATION • MODERN WEB ECOSYSTEMS • ";
  
  return (
    <div className="relative flex overflow-x-hidden border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="text-2xl md:text-4xl font-black text-slate-300 dark:text-slate-800 uppercase tracking-widest mx-4">{marqueeText}</span>
        <span className="text-2xl md:text-4xl font-black text-slate-300 dark:text-slate-800 uppercase tracking-widest mx-4">{marqueeText}</span>
      </div>
      {/* Absolute duplicate to ensure seamless looping without visual gap */}
      <div className="absolute top-6 animate-marquee2 whitespace-nowrap flex items-center">
        <span className="text-2xl md:text-4xl font-black text-slate-300 dark:text-slate-800 uppercase tracking-widest mx-4">{marqueeText}</span>
        <span className="text-2xl md:text-4xl font-black text-slate-300 dark:text-slate-800 uppercase tracking-widest mx-4">{marqueeText}</span>
      </div>
    </div>
  );
};

// Floating Tech Icons for Arsenal Section
const TECH_ICONS = [
  { Icon: FaReact,        color: '#61DAFB', label: 'React',      x: '10%',  y: '10%', delay: 0 },
  { Icon: FaNodeJs,       color: '#8CC84B', label: 'Node.js',   x: '75%',  y: '8%',  delay: 0.4 },
  { Icon: SiJavascript,   color: '#F7DF1E', label: 'JS',        x: '55%',  y: '70%', delay: 0.2 },
  { Icon: SiMongodb,      color: '#4EA94B', label: 'MongoDB',   x: '85%',  y: '50%', delay: 0.6 },
  { Icon: SiTailwindcss,  color: '#38BDF8', label: 'Tailwind',  x: '5%',   y: '60%', delay: 0.8 },
  { Icon: FaGitAlt,       color: '#F05032', label: 'Git',       x: '40%',  y: '5%',  delay: 1.0 },
  { Icon: SiExpress,      color: '#999999', label: 'Express',   x: '20%',  y: '80%', delay: 0.3 },
  { Icon: FaPython,       color: '#3776AB', label: 'Python',    x: '70%',  y: '85%', delay: 0.7 },
  { Icon: SiPostman,      color: '#FF6C37', label: 'Postman',   x: '90%',  y: '22%', delay: 0.5 },
  { Icon: SiTypescript,   color: '#3178C6', label: 'TS',        x: '30%',  y: '45%', delay: 0.9 },
];

const FloatingTechCloud = () => (
  <div className="relative w-full h-72 md:h-96">
    {TECH_ICONS.map(({ Icon, color, label, x, y, delay }) => (
      <motion.div
        key={label}
        className="absolute flex flex-col items-center gap-1 cursor-default"
        style={{ left: x, top: y }}
        animate={{
          y: [0, -18, 0, 10, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 4 + delay * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        whileHover={{ scale: 1.4 }}
      >
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg border border-white/10 backdrop-blur-sm"
          style={{ backgroundColor: `${color}18`, borderColor: `${color}30` }}
        >
          <Icon size={26} style={{ color }} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{label}</span>
      </motion.div>
    ))}
  </div>
);

const ProjectCollage = () => (
  <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
    {/* Background Decorative Element */}
    <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl" />
    
    <div className="relative grid grid-cols-2 gap-4 group-hover:rotate-0 transition-transform duration-510 rotate-3">
      {[
        { img: aspireLensThumb },
        { img: ecoLocatorThumb },
        { img: ecoReviveThumb },
        { img: trackTechThumb },
      ].map((proj, idx) => (
        <motion.div
          key={idx}
          className={`w-24 h-24 md:w-32 md:h-32 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900 rounded-2xl`}
          whileHover={{ scale: 1.1, zIndex: 10, rotate: 0 }}
        >
          <img src={proj.img} alt="Project" className="w-full h-full object-cover" />
        </motion.div>
      ))}
    </div>
  </div>
);

const Home = () => {
  const typedDesig = useTypewriter([
    'Full Stack Developer',
    'Tech Problem Solver',
    'Creative Engineer'
  ]);

  return (
    <PageTransition>
      <div className="bg-transparent transition-colors duration-700 min-h-screen">
        
        {/* ─── HERO SECTION ───────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-12 overflow-hidden px-6 lg:px-12">
          {/* Subtle Glow Background */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 dark:opacity-20">
            <div className="w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px]" />
          </div>

          <motion.div 
            variants={stagger} initial="hidden" animate="visible"
            className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center text-center gap-10"
          >
            {/* Profile Image - Circle Shape */}
            <motion.div variants={fadeUp} className="flex justify-center">
               <div className="relative w-64 h-64 sm:w-[320px] sm:h-[320px] rounded-full p-[4px] bg-gradient-to-tr from-sky-400 to-indigo-500 shadow-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                 <div className="absolute inset-1 rounded-full overflow-hidden bg-slate-900 border-4 border-slate-950">
                   <img src={profileImg} alt="Riya" className="w-full h-full object-cover object-top grayscale-[0.15] hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-110" />
                 </div>
               </div>
            </motion.div>

            {/* Text Block */}
            <div className="flex flex-col items-center">
              <motion.div variants={fadeUp} className="mb-4 flex items-center gap-4">
                <div className="h-px w-12 bg-primary/50" />
                <span className="text-xs font-black tracking-[0.3em] uppercase text-primary">Based in India</span>
                <div className="h-px w-12 bg-primary/50" />
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-tight tracking-tighter text-slate-900 dark:text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Hi, I'm <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Riya</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="mb-6 h-8 text-lg md:text-xl font-bold text-slate-600 dark:text-slate-300 tracking-[0.15em] uppercase" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {typedDesig}
                <span className="inline-block w-3 h-6 bg-primary/60 ml-2 animate-pulse" />
              </motion.div>

              <motion.p variants={fadeUp} className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mb-10">
                I'm a Computer Science student and Full Stack Developer who loves turning complex ideas into clean, scalable web applications. From architecting RESTful APIs and handling authentication flows to crafting smooth, animated UIs — I thrive at every layer of the stack. I'm passionate about AI integration, sustainable tech, and building products that make a real-world impact.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
                <Link to="/projects" className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-[0.1em] text-sm hover:scale-105 transition-transform flex items-center gap-2">
                  View Work <ArrowRight size={16} />
                </Link>
                <a href="https://drive.google.com/uc?export=download&id=143gLVPV6mqeGwCYu5GfCpJHOcO2mjtlX" download="Riya_Resume.pdf" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-[0.1em] text-sm hover:border-primary hover:text-primary transition-colors flex items-center gap-2">
                  <Download size={16} /> Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ─── THE INFINITE MARQUEE ───────────────────────────────────────────── */}
        {/* <InfiniteMarquee /> */}
        <hr className='border-slate-300 dark:border-slate-700 w-1/2 mx-auto'></hr>

        {/* ─── THE ABSTRACT TEASERS ───────────────────────────────────────────── */}
        <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-mesh opacity-20 dark:opacity-10 pointer-events-none" />
          
          <div className="container mx-auto max-w-7xl relative z-10 space-y-32">
            
            {/* Teaser 1: The Arsenal (Skills) */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 group">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-500 font-black tracking-widest uppercase text-[10px] mb-6">
                  <Terminal size={12} /> Tech Stack
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Curious about the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">engine room?</span>
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                  I don't just write code; I orchestrate technologies. Unveil the complete map of languages, frameworks, databases, and architectures I leverage to build scalable systems.
                </p>
                <Link to="/skills" className="group-hover:translate-x-2 transition-transform inline-flex items-center gap-3 text-lg font-black uppercase tracking-widest text-sky-500 hover:text-indigo-400">
                  Enter The Arsenal <ArrowRight size={20} />
                </Link>
              </div>
              <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
                <FloatingTechCloud />
              </div>
            </div>

            {/* Teaser 2: The Archive (Projects) */}
            <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 group">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-black tracking-widest uppercase text-[10px] mb-6">
                  <FolderGit2 size={12} /> Live Deployments
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Want to see <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">what I've built?</span>
                </h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                  Explore the actual products. From AI-driven career counselling platforms to real-time e-waste locators, discover the logic and impact behind every deployment.
                </p>
                <Link to="/projects" className="group-hover:-translate-x-2 transition-transform inline-flex items-center gap-3 text-lg font-black uppercase tracking-widest text-emerald-500 hover:text-teal-400">
                  <ArrowRight size={20} className="rotate-180" /> Unlock The Archive
                </Link>
              </div>
              <div className="lg:w-1/2 relative flex justify-center lg:justify-start">
                <ProjectCollage />
              </div>
            </div>

            {/* Teaser 3: The Foundation (Education & Certs) */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto pt-16 border-t border-slate-200 dark:border-slate-800 group">
              <BookOpen size={48} className="text-slate-300 dark:text-slate-700 group-hover:text-primary transition-colors duration-500 mb-8" />
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">Foundation</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
                A strong academic timeline heavily reinforced with industry-recognized certifications and intensive hackathons. Discover the journey that shaped my architectural mindset.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link to="/education" className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 font-bold uppercase tracking-widest text-sm hover:border-violet-500 hover:text-violet-500 transition-all">
                  Academic Timeline
                </Link>
                <Link to="/certifications" className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 font-bold uppercase tracking-widest text-sm hover:border-purple-500 hover:text-purple-500 transition-all">
                  Certifications
                </Link>
              </div>
            </div>

          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
