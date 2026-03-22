import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Rocket, Brain, Coffee, Library } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-grid text-slate-200 dark:text-slate-800/20 opacity-50"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col gap-12">
          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block p-2 px-6 rounded-full glass border border-primary-100 text-primary-600 dark:text-primary-400 font-black text-xs uppercase tracking-widest mb-6">
              Who is Riya?
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
              A DEVELOPER WHO <span className="text-primary-600">THINKS</span>
            </h2>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[160px]">
            {/* Big Feature Box */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="md:col-span-6 lg:col-span-8 row-span-2 glass-card p-10 flex flex-col justify-end relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 text-primary-600/5 -rotate-12 select-none">
                <Code2 size={400} />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">CRAFTING DIGITAL EXPERIENCES</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                I'm a final-year CS student with a deep fascination for the intersection of logic and creativity. My approach is simple: understand the core of the problem, then build the most efficient and elegant solution possible.
              </p>
            </motion.div>

            {/* Square Box - Icon focus */}
            <motion.div
              whileHover={{ y: -10 }}
              className="md:col-span-3 lg:col-span-4 row-span-2 glass-card p-8 bg-gradient-to-br from-primary-600 to-accent-violet text-white flex flex-col justify-between"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Brain size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Problem Solver</h3>
                <p className="text-white/80 font-medium">Solving 100+ DSA challenges with optimized algorithms and elegant code structures.</p>
              </div>
            </motion.div>

            {/* Wide Box - Education Focus */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-3 lg:col-span-4 row-span-2 glass-card p-8 flex flex-col justify-center border-accent-rose/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-accent-rose/10 text-accent-rose">
                  <Library size={28} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Academic Journey</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Currently pursuing B.Tech CSE at <span className="text-accent-rose font-bold">Lovely Professional University</span>. Maintaining a 7.2 CGPA while diving deep into specialized AI modules.
              </p>
            </motion.div>

            {/* Small box - fun fact */}
            <motion.div
              whileHover={{ rotate: -2 }}
              className="md:col-span-3 lg:col-span-4 row-span-1 glass-card p-6 flex items-center gap-6"
            >
              <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                <Coffee size={24} />
              </div>
              <div>
                <h4 className="font-black text-lg leading-tight uppercase">Coffee Fueled</h4>
                <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">Debugging companion</p>
              </div>
            </motion.div>

            {/* Large box - Tech Focus */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="md:col-span-3 lg:col-span-4 row-span-1 glass-card p-6 flex items-center gap-6 border-accent-emerald/20"
            >
              <div className="p-3 rounded-full bg-accent-emerald/10 text-accent-emerald">
                <Rocket size={24} />
              </div>
              <div>
                <h4 className="font-black text-lg leading-tight uppercase">Always Building</h4>
                <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">Scaling new heights</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
