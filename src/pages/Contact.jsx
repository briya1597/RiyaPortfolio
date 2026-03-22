import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Linkedin, Github, Send, ArrowUpRight,
  User, MessageSquare, CheckCircle2, Loader2
} from 'lucide-react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import PageTransition from '../components/PageTransition';

// ─── Contact links ────────────────────────────────────────────────────────────
const CONTACTS = [
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'riya@example.com',
    href: 'mailto:riya@example.com',
    color: 'var(--accent-primary)',
    colorBg: 'bg-primary/10',
    colorBorder: 'border-primary/20',
    colorText: 'text-primary',
    desc: 'Drop me a line anytime',
  },
  {
    icon: <IoLogoWhatsapp size={22} />,
    label: 'WhatsApp',
    value: '+91 79064 11379',
    href: 'https://wa.me/917906411379',
    color: '#25D366',
    colorBg: 'bg-emerald-500/10',
    colorBorder: 'border-emerald-500/20',
    colorText: 'text-emerald-400',
    desc: 'Chat with me instantly',
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/riya',
    href: 'https://linkedin.com',
    color: 'var(--accent-secondary)',
    colorBg: 'bg-secondary/10',
    colorBorder: 'border-secondary/20',
    colorText: 'text-secondary',
    desc: "Let's connect professionally",
  },
  {
    icon: <Github size={22} />,
    label: 'GitHub',
    value: 'github.com/riya',
    href: 'https://github.com',
    color: '#ffffff',
    colorBg: 'bg-slate-500/10',
    colorBorder: 'border-slate-500/20',
    colorText: 'text-slate-300',
    desc: 'Explore my open-source work',
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const leftVariants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const rightVariants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } },
};

const fieldStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
};

const fieldItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Styled Input ─────────────────────────────────────────────────────────────
const FormField = ({ label, icon, type = 'text', placeholder, value, onChange, name, textarea }) => {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? 'textarea' : 'input';

  return (
    <motion.div variants={fieldItem} className="flex flex-col gap-2">
      <label
        className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {label}
      </label>
      <div className={`relative rounded-2xl transition-all duration-500 ${focused ? 'shadow-[0_0_25px_rgba(var(--accent-primary-rgb),0.25)]' : ''}`}>
        {/* Glow effect on focus */}
        <div 
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${focused ? 'opacity-100' : 'opacity-0'}`}
          style={{ boxShadow: 'inset 0 0 0 1.5px var(--accent-primary)' }}
        />
        {/* Icon */}
        <div className={`absolute left-4 ${textarea ? 'top-4' : 'top-1/2 -translate-y-1/2'} transition-all duration-300 ${focused ? 'text-primary scale-110' : 'text-theme-dim'} pointer-events-none z-10`}>
          {icon}
        </div>
        <Tag
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={textarea ? 5 : undefined}
          className={`w-full bg-slate-100/50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-theme-main placeholder-theme-dim outline-none resize-none transition-all duration-500 focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary/30 ${textarea ? 'pt-4' : ''}`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        />
      </div>
    </motion.div>
  );
};

// ─── Contact Card ─────────────────────────────────────────────────────────────
const ContactCard = ({ contact }) => (
  <motion.a
    href={contact.href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    className="group flex items-center gap-5 p-5 glass-card relative overflow-hidden cursor-pointer"
  >
    {/* Animated Background Glow */}
    <div
      className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
      style={{ background: contact.color + '22' }}
    />
    
    {/* Border Glow */}
    <div className="absolute inset-0 rounded-[22px] border border-transparent group-hover:border-white/10 transition-colors duration-500" />
    
    {/* Shine effect */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

    {/* Icon Container */}
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${contact.colorBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl dark:opacity-90`}
      style={{ color: contact.color, border: `1px solid ${contact.color}33` }}
    >
      {contact.icon}
    </div>

    {/* Text Content */}
    <div className="flex-1 min-w-0 z-10">
      <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${contact.colorText} opacity-80 group-hover:opacity-100 transition-opacity`}>{contact.label}</div>
      <div className="text-sm font-bold text-theme-main truncate" style={{ fontFamily: "'Inter', sans-serif" }}>{contact.value}</div>
      <div className="text-[11px] text-theme-muted font-medium transition-colors duration-300">{contact.desc}</div>
    </div>

    {/* Arrow Icon */}
    <div className="bg-white/5 p-2 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
      <ArrowUpRight
        size={16}
        className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500 shrink-0"
      />
    </div>
  </motion.a>
);

// ─── Main Contact Page ────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1600));
    setStatus('done');
    setTimeout(() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }); }, 3000);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden py-8 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-700">
        {/* Background orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.25, 1], 
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent)' }}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, var(--accent-secondary), transparent)' }}
        />
        <div className="absolute inset-0 bg-mesh opacity-40 dark:opacity-20 pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-6xl">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Portfolio / Contact
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tight text-theme-main flex items-center justify-center gap-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let's{' '}
              <span
                className="text-transparent bg-clip-text animate-gradient-x"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary))', backgroundSize: '200% 200%' }}
              >
                Connect
              </span>
            </h1>
            <p
              className="text-base md:text-lg text-theme-muted max-w-xl mx-auto leading-relaxed font-medium"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Open to{' '}
              <span className="text-theme-main font-semibold">opportunities, collaborations,</span>{' '}
              and meaningful conversations.
            </p>
            <div className="flex items-center gap-4 justify-center mt-8 opacity-60">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary" />
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary" />
            </div>
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── Left: Info ── */}
            <motion.div
              variants={leftVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Intro text */}
              <div>
                <h2
                  className="text-2xl font-black text-theme-main mb-2 tracking-tight flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Get in Touch <span className="text-primary animate-pulse-glow">✦</span>
                </h2>
                <p className="text-sm text-theme-muted leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Whether you have a project idea, a job opportunity, or just want to say hello — my inbox is always open.
                </p>
              </div>

              {/* Contact cards */}
              <div className="flex flex-col gap-3">
                {CONTACTS.map((c) => (
                  <ContactCard key={c.label} contact={c} />
                ))}
              </div>

              {/* Availability badge */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20">
                <div className="relative shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block absolute inset-0 animate-ping opacity-70" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
                  Currently available for opportunities
                </span>
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              variants={rightVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3"
            >
              <div
                className="relative glass-card p-8 md:p-10 !rounded-[28px]"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                
                {/* Background glow behind form components */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20"
                  style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent)' }}
                />
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-20"
                  style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.4), transparent)' }}
                />

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-2">Send a Message</div>
                    <h3
                      className="text-2xl font-black text-theme-main tracking-tight"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      I'll get back to you soon ✦
                    </h3>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === 'done' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 gap-4"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <CheckCircle2 size={56} className="text-emerald-500" />
                        </motion.div>
                        <p className="text-lg font-black text-theme-main" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Message Sent!
                        </p>
                        <p className="text-sm text-theme-muted text-center">Thanks for reaching out. I'll reply soon.</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        variants={fieldStagger}
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                      >
                        <FormField
                          label="Your Name"
                          icon={<User size={16} />}
                          name="name"
                          placeholder="Enter your name"
                          value={form.name}
                          onChange={handleChange}
                        />
                        <FormField
                          label="Email Address"
                          icon={<Mail size={16} />}
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={handleChange}
                        />
                        <FormField
                          label="Your Message"
                          icon={<MessageSquare size={16} />}
                          name="message"
                          placeholder="Write your message..."
                          value={form.message}
                          onChange={handleChange}
                          textarea
                        />

                        <motion.div variants={fieldItem} className="mt-2">
                          <motion.button
                            type="submit"
                            disabled={status === 'sending'}
                            whileHover={{ y: -4, scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center py-4 rounded-xl text-sm font-bold tracking-widest text-white transition-all duration-300 bg-primary hover:bg-primary-500 shadow-xl hover:shadow-primary-500/30 active:scale-[0.98] group relative overflow-hidden"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            <span className="relative z-10 flex items-center gap-3 uppercase">
                              {status === 'sending' ? (
                                <>
                                  <Loader2 size={18} className="animate-spin" />
                                  Sending
                                </>
                              ) : (
                                <>
                                  Send Message
                                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </>
                              )}
                            </span>
                          </motion.button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
