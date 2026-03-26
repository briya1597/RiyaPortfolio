import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Github, 
  Code2, 
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Solved 150+ problems across LeetCode, GeeksforGeeks, and HackerRank. Maintaining a consistent problem-solving streak and optimizing algorithmic complexity.",
    icon: <Code2 className="w-6 h-6" />,
    stats: "150+ Problems",
    color: "from-sky-500 to-blue-600",
    tags: ["LeetCode", "GFG", "HackerRank"],
    link: { label: "View on Codolio", url: "https://codolio.com/profile/riyabisht" }
  },
  {
    id: 2,
    title: "Smart India Hackathon 2024",
    description: "Participated in SIH 2024, working on high-impact real-world problem statements. Developed a functional prototype within the intense competition timeframe.",
    icon: <Trophy className="w-6 h-6" />,
    stats: "Semi-Finalist",
    color: "from-amber-400 to-orange-500",
    tags: ["Hackathon", "Innovation", "Teamwork"]
  },
  {
    id: 3,
    title: "HackerRank Gold Badges",
    description: "Achieved Gold level proficiency in C++ and Python on HackerRank. Demonstrated strong understanding of language-specific features and best practices.",
    icon: <Star className="w-6 h-6" />,
    stats: "Gold Level",
    color: "from-emerald-400 to-teal-500",
    tags: ["C++", "Python", "Skill Verified"],
    link: { label: "View HackerRank Profile", url: "https://www.hackerrank.com/profile/briya1597" },
    badges: [
      { 
        name: "C++", 
        stars: 3, 
        color: "text-sky-400", 
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
      },
      { 
        name: "Python", 
        stars: 3, 
        color: "text-emerald-400", 
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
      }
    ]
  },
  {
    id: 4,
    title: "Open Source Contributions",
    description: "Active contributor to open-source projects on GitHub, focusing on React and modern front-end tools. Improving documentation and fixing critical bugs.",
    icon: <Github className="w-6 h-6" />,
    stats: "5+ Repos",
    color: "from-slate-600 to-slate-800",
    tags: ["GitHub", "Collaboration", "Git"],
    link: { label: "View GitHub Profile", url: "https://github.com/briya1597" }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Achievements = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen pt-24 pb-20 px-4 overflow-hidden bg-transparent transition-colors duration-700">
        {/* Background elements */}
        <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-20 pointer-events-none" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-secondary/10 dark:bg-violet-500/10 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Award size={12} />
              Career Highlights
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-theme-main tracking-tight">
              Achievements & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Highlights</span>
            </h1>
            <p className="text-lg text-theme-muted max-w-2xl mx-auto leading-relaxed font-medium">
              A showcase of my accomplishments, problem-solving journey, and technical milestones achieved throughout my academic and professional career.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {ACHIEVEMENTS.map((achievement) => (
              <motion.div
                key={achievement.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="relative group text-left"
              >
                {/* Glow background on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
                
                <div className="glass-card relative p-8 md:p-10 h-full">
                  <div className="flex flex-col h-full gap-6">
                    <div className="flex justify-between items-start">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.color} p-0.5`}>
                        <div className="w-full h-full rounded-[14px] bg-white/10 dark:bg-black/10 backdrop-blur-md flex items-center justify-center text-white">
                          {achievement.icon}
                        </div>
                      </div>
                      <div className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-theme-muted border border-slate-200 dark:border-white/10">
                        {achievement.stats}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black mb-4 text-theme-main group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-theme-muted font-medium leading-relaxed mb-8">
                        {achievement.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {achievement.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-lg bg-primary/5 text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {achievement.link && (
                          <a
                            href={achievement.link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-theme-muted border border-white/10 px-3 py-1.5 rounded-lg hover:border-primary/40 hover:text-primary transition-all duration-300"
                          >
                            <ExternalLink size={10} />
                            {achievement.link.label}
                          </a>
                        )}
                      </div>

                      {/* Achievements Badges (specifically for HackerRank section) */}
                      {achievement.badges && (
                        <div className="flex flex-wrap gap-4 mt-2">
                          {achievement.badges.map((badge, i) => (
                            <motion.div
                              key={badge.name}
                              initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                              whileHover={{ y: -8, scale: 1.05 }}
                              className="relative group/badge"
                            >
                              {/* Glowing background on hover */}
                              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${achievement.color} opacity-0 group-hover/badge:opacity-20 blur-md transition-opacity duration-500`} />
                              
                              <div className="relative flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 dark:bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover/badge:border-white/20">
                                {/* Badge Image/Icon */}
                                <div className="w-14 h-14 flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                                  {badge.img ? (
                                    <img 
                                      src={badge.img} 
                                      alt={badge.name} 
                                      className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                    />
                                  ) : (
                                    <div className={badge.color}>
                                      <Terminal size={24} />
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-col items-center gap-1">
                                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-theme-muted">
                                    {badge.name}
                                  </span>
                                  <div className="flex gap-0.5">
                                    {[...Array(badge.stars)].map((_, i) => (
                                      <Star key={i} size={9} className="fill-amber-400 text-amber-400 shadow-amber-500/50" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 p-8 rounded-[2.5rem] glass overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-violet-600/5" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h4 className="text-2xl font-black mb-2 text-theme-main">Continuous Growth</h4>
                <p className="text-theme-muted font-medium tracking-tight">Always learning and pushing the boundaries of what's possible.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-black uppercase tracking-widest shadow-xl flex items-center gap-3 group"
              >
                View Certifications
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Achievements;
