import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-slate-950 text-white relative overflow-hidden">
      {/* Mesh background subtle */}
      <div className="absolute inset-0 bg-mesh opacity-10"></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <div className="text-4xl font-black bg-gradient-to-r from-primary-400 to-accent-violet bg-clip-text text-transparent mb-6 tracking-tighter uppercase italic">
            RIYA.
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm max-w-sm">
            Crafting the next generation of digital experiences.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-4">
           <div className="flex gap-8 text-sm font-black uppercase tracking-widest text-slate-400">
              <a href="#about" className="hover:text-primary-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-primary-400 transition-colors">Lab</a>
              <a href="#contact" className="hover:text-primary-400 transition-colors">Talk</a>
           </div>
           <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.2em] mt-8">
            © {currentYear} RIYA DESIGN LAB. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
