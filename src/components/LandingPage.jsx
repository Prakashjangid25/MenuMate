import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layout,
  Zap,
  Clock,
  DollarSign,
  Smartphone,
  BarChart2,
  Shield,
  Star,
  ChevronRight,
  Menu,
  X,
  LogIn,
  Printer,
  ShoppingBag,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  Cpu,
  Layers,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    let heroSafety;
    let alignWordGradients;
    const ctx = gsap.context(() => {
      // Navbar - instant visible
      gsap.from('.nav-item', {
        y: -10,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.05
      });

      // Hero - kicker fades in first
      gsap.from('.hero-kicker', {
        y: 14,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      });

      // Hero title - EK EK WORD reveal hota hai
      // Har word apna gradient rakhta hai, lekin JS se align karte hain
      // taaki poori line par ek hi continuous gradient dikhe.
      alignWordGradients = () => {
        gsap.utils.toArray('.hero-title > span').forEach((line) => {
          const words = line.querySelectorAll('.hero-word');
          if (!words.length) return;
          const lineWidth = line.getBoundingClientRect().width;
          if (!lineWidth) return;
          let offset = 0;
          words.forEach((w) => {
            const wWidth = w.getBoundingClientRect().width;
            w.style.backgroundSize = `${lineWidth}px 100%`;
            w.style.backgroundPosition = `${-offset}px 0`;
            offset += wWidth;
          });
        });
      };
      alignWordGradients();
      window.addEventListener('resize', alignWordGradients);

      const heroWords = gsap.utils.toArray('.hero-word');
      gsap.set(heroWords, { y: 44, opacity: 0, filter: 'blur(12px)' });
      gsap.to(heroWords, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.075,
        delay: 0.15
      });

      // Hero subtitle
      gsap.from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.55,
        ease: 'power3.out'
      });

      // Hero CTAs
      gsap.from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Hero stats
      gsap.from('.hero-stats', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.85,
        ease: 'power3.out'
      });

      // Safety net: agar animation kisi wajah se na chale to content invisible na rahe
      heroSafety = window.setTimeout(() => {
        const heroSel = '.hero-word, .hero-kicker, .hero-subtitle, .hero-cta-group, .hero-stats';
        gsap.killTweensOf(heroSel);
        gsap.set(heroSel, { clearProps: 'opacity,filter,transform' });
      }, 3000);

      // Floating orbs
      gsap.to('.orb-1', {
        y: -15,
        x: 8,
        rotation: 2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.orb-2', {
        y: 15,
        x: -12,
        rotation: -2,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });

      gsap.to('.orb-3', {
        y: -12,
        x: 15,
        rotation: 3,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      });

      // Reveal sections
      gsap.utils.toArray('.reveal').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Feature cards
      gsap.utils.toArray('.feat-card').forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          delay: i * 0.05
        });
      });

      // Stats
      gsap.utils.toArray('.stat-val').forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Steps
      gsap.utils.toArray('.step-item').forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Pricing cards
      gsap.utils.toArray('.price-card').forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          delay: i * 0.1
        });
      });

      // Parallax
      gsap.utils.toArray('.parallax-bg').forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

      // Cursor glow
      document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        gsap.to('.cursor-glow', {
          x: x * 100 - 300,
          y: y * 100 - 300,
          duration: 1.5,
          ease: 'power3.out'
        });
      });
    });

    return () => {
      window.removeEventListener('resize', alignWordGradients);
      window.clearTimeout(heroSafety);
      ctx.revert();
    };
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Contactless QR Ordering',
      desc: 'Customers scan table QR codes with phones — no apps, no downloads.',
      grad: 'from-violet-500 to-fuchsia-500',
      bg: 'bg-violet-500/10',
      text: 'text-violet-400'
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Kitchen Display System',
      desc: 'Real-time kitchen dashboard with prep timers and acoustic alerts.',
      grad: 'from-cyan-500 to-blue-500',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400'
    },
    {
      icon: <Printer className="w-6 h-6" />,
      title: 'Smart Billing & PDF',
      desc: 'Generate tax invoices, thermal receipts, and send bills via WhatsApp.',
      grad: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Table Management',
      desc: 'Create unlimited tables, design QR tent cards, track orders live.',
      grad: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50/10',
      text: 'text-emerald-400'
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: 'SaaS Analytics',
      desc: 'Track MRR, subscriptions, active restaurants, and revenue.',
      grad: 'from-pink-500 to-rose-500',
      bg: 'bg-pink-50/10',
      text: 'text-pink-400'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Multi-Tenant Security',
      desc: 'Complete data isolation per restaurant with role-based access.',
      grad: 'from-indigo-500 to-violet-500',
      bg: 'bg-indigo-50/10',
      text: 'text-indigo-400'
    }
  ];

  const steps = [
    { num: '01', title: 'Scan QR', desc: 'Customer scans table QR with smartphone camera.' },
    { num: '02', title: 'Browse Menu', desc: 'View digital menu, add items to cart, apply coupons.' },
    { num: '03', title: 'Kitchen Prep', desc: 'Order appears instantly on Kitchen Display System.' },
    { num: '04', title: 'Live Track', desc: 'Customer watches status: preparing → ready → served.' },
    { num: '05', title: 'Smart Bill', desc: 'Generate PDF receipt, print, or send via WhatsApp.' }
  ];

  const heroLines = [
    { text: 'Elevate Your Restaurant', grad: 'from-white via-violet-400 to-fuchsia-400' },
    { text: 'To The Future', grad: 'from-violet-400 via-cyan-400 to-blue-400' },
    { text: 'Of Contactless Dining', white: true }
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Restaurants Live' },
    { value: 25, suffix: 'K+', label: 'Orders Daily' },
    { value: 99, suffix: '%', label: 'Uptime' },
    { value: 24, suffix: '/7', label: 'Support' }
  ];

  const pricing = [
    {
      name: 'Standard Bistro',
      price: '499',
      period: '/month',
      desc: 'Perfect for single outlet restaurants getting started.',
      features: ['Digital QR Menu', 'Kitchen Display (KDS)', 'Staff Accounts', 'Basic Analytics', 'Table Management'],
      grad: 'from-violet-500 to-fuchsia-500',
      popular: false
    },
    {
      name: 'Enterprise Dine',
      price: '899',
      period: '/month',
      desc: 'Advanced platform for multi-outlet restaurant chains.',
      features: ['Multiple Outlets', 'Advance KDS', 'Promo & Coupons', 'Tax Configuration', 'Custom Branding', 'Priority Support'],
      grad: 'from-fuchsia-500 to-cyan-500',
      popular: true
    }
  ];

  const faqs = [
    { q: 'Do I need technical knowledge to setup?', a: 'No. MenuMate is plug-and-play. Deploy your restaurant, generate QR codes, and start taking orders in minutes.' },
    { q: 'Can I use my own domain?', a: 'Yes. Connect your custom domain and brand MenuMate as your own ordering platform.' },
    { q: 'Is customer data secure?', a: 'Absolutely. All data is encrypted and isolated per restaurant using Firebase Firestore with role-based access.' },
    { q: 'Do you support offline mode?', a: 'MenuMate works online for real-time order sync. Kitchen displays update instantly as orders come in.' }
  ];

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden selection:bg-violet-500/30 selection:text-white ${isDark ? 'bg-[#0a0a0f] text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Cursor Glow */}
      <div className="fixed top-0 left-0 z-[-1] w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none cursor-glow" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:shadow-violet-500/60 transition-shadow duration-300">
              <Layout className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-300 to-fuchsia-300">MenuMate</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Table Booking', href: '#booking' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-item text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300 relative group`}
              >
                <span className="absolute -bottom-[3px] left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="#pricing"
              className={`px-5 py-2.5 rounded-2xl border text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            >
              <Zap className="w-4 h-4 text-violet-400" /> Get Started
            </a>
            <button
              onClick={() => navigate('/admin')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Admin Sign In
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.05]' : 'bg-slate-100 border border-slate-300 text-slate-900 hover:bg-slate-200'}`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className={`fixed inset-0 z-40 backdrop-blur-2xl ${isDark ? 'bg-[#0a0a0f]/95' : 'bg-slate-50/95'}`}>
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <button
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.05]"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.05]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-20 px-6 space-y-6">
              {[
                { label: 'Features', href: '#features' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Table Booking', href: '#booking' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'FAQ', href: '#faq' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-slate-300 hover:text-white transition-colors block py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/admin'); }}
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-center text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/30"
              >
                Admin Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 overflow-x-hidden overflow-y-visible">
        <div className="absolute inset-0 overflow-hidden">
          <div className="orb-1 absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[160px] pointer-events-none" />
          <div className="orb-2 absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-fuchsia-600/15 blur-[180px] pointer-events-none" />
          <div className="orb-3 absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none" />
        </div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Centered Content */}
          <div className="flex flex-col items-center text-center">
            <div className="hero-kicker inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/[0.08] border border-violet-500/[0.2] text-violet-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5" />
              Premium Restaurant SaaS Platform
            </div>

            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabord font-display tracking-tight leading-[1.05] mb-8">
              {heroLines.map((line, li) => (
                <span key={li} className={`block ${line.white ? (isDark ? 'text-white' : 'text-slate-900') : 'text-transparent'}`}>
                  {line.text.split(' ').map((word, wi, arr) => (
                    <span
                      key={wi}
                      className={`hero-word inline-block${line.white ? '' : ` bg-clip-text bg-gradient-to-r ${line.grad}`}`}
                    >
                      {word}{wi < arr.length - 1 ? '\u00A0' : ''}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              A luxury QR-based ordering & management suite built for modern restaurants.
              Contactless menus, real-time kitchen displays, smart billing, and elegant table booking.
            </p>

            <div className="hero-cta-group flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="hero-cta px-8 py-4.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Start Free Trial
              </button>
              <a
                href="#features"
                className="hero-cta px-8 py-4.5 rounded-2xl border border-white/10 bg-white/[0.03] text-white font-bold text-lg hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
              >
                <Sparkles className="w-5 h-5" /> View Features
              </a>
            </div>

            <div className={`hero-stats mt-16 flex flex-wrap items-end justify-center gap-10 md:gap-16 border-t pt-8 w-full max-w-3xl mx-auto ${isDark ? 'border-white/5' : 'border-slate-300'}`}>
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabord font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    <span className="stat-val" data-target={stat.value}>{stat.value}</span>{stat.suffix}
                  </div>
                  <div className="text-xs text-slate-500 mt-2 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 relative overflow-x-hidden reveal">
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent -mt-[20%]" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/[0.1] border border-fuchsia-500/[0.2] text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" />
              Premium Features
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabord font-display tracking-tight mb-6">
              Everything Your Restaurant Needs
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              From QR ordering to kitchen displays, smart billing to table management —
              MenuMate is the complete luxury platform for modern dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feat-card group relative p-8 rounded-3xl ${isDark ? 'bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04]' : 'bg-slate-900/[0.04] border border-slate-900/[0.08] hover:border-slate-900/[0.15] hover:bg-slate-900/[0.06]'} transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
              >
                <div className={`${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-[0_0_40px_rgba(99,102,241,0.15)] shrink-0 w-14 h-14 rounded-2xl`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{f.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.01] reveal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/[0.1] border border-cyan-500/[0.2] text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3" />
              Seamless Flow
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabord font-display tracking-tight mb-6">
              From Scan To Serve
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              A frictionless journey for customers and staff — built for luxury dining experiences.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`step-item group relative flex items-center gap-8 p-8 rounded-3xl ${isDark ? 'bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08]' : 'bg-slate-900/[0.04] border border-slate-900/[0.08] hover:border-slate-900/[0.15]'} transition-all duration-500 overflow-hidden`}
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-extrabord text-xl font-mono shadow-2xl shadow-violet-500/30 group-hover:scale-110 transition-transform duration-500">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold font-display mb-2 group-hover:text-white transition-colors truncate">{step.title}</h3>
                  <p className="text-slate-400 text-sm font-light">{step.desc}</p>
                </div>
                <div className={`absolute -right-8 top-1/2 -translate-y-1/2 w-px h-[60px] bg-white/[0.05] ${i === steps.length - 1 ? 'hidden' : 'block'}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table Booking */}
      <section id="booking" className="py-24 px-6 relative overflow-x-hidden overflow-y-visible reveal">
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-900/10 via-transparent to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col justify-center max-w-[560px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/[0.1] border border-emerald-500/[0.2] text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <ShoppingBag className="w-3 h-3" />
              Smart Table Management
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabord font-display tracking-tight mb-6">
              Premium Table Booking
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Create unlimited tables, design beautiful QR tent cards, and let customers 
              scan instantly. Each table gets a unique QR code linking directly to your 
              digital menu with real-time order sync.
            </p>

            <div className="space-y-4 mb-12">
              {[
                'Unlimited tables per restaurant',
                '4 premium QR card templates',
                'Download PNG or PDF for printing',
                'Custom brand colors & typography',
                'Track table-wise orders live',
                'Auto-bill generation on checkout'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-white/[0.03] border border-white/[0.05] text-emerald-400' : 'bg-slate-100 border border-slate-300 text-emerald-600'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/admin')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              Manage Tables <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative flex justify-center">
            <div className="grid grid-cols-2 gap-5 max-w-md mx-auto">
              {[
                { name: 'Table 1', sub: 'Garden View', color: 'from-violet-500 to-fuchsia-500', glow: 'shadow-violet-500/30' },
                { name: 'Table 2', sub: 'Window Side', color: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/30' },
                { name: 'Table 3', sub: 'VIP Booth', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/30' },
                { name: 'Table 4', sub: 'Bonsai Corner', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/30' }
              ].map((t, i) => (
                <div
                  key={i}
                  className={`group relative p-6 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.1] hover:border-white/[0.25]' : 'bg-gradient-to-br from-slate-900/[0.06] to-slate-900/[0.02] border border-slate-900/[0.1] hover:border-slate-900/[0.25]'}`}
                >
                  {/* Top accent gradient line */}
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${t.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Soft corner glow */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className="relative flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg ${t.glow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Layout className="text-white text-base" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.12] border border-emerald-500/[0.25]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-300 tracking-wide">Active</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className={`relative font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight mb-1`}>{t.name}</h4>
                  <p className="relative text-xs text-slate-400 font-medium">{t.sub}</p>

                  {/* Bottom QR hint */}
                  <div className="relative mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">Scan to order</span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                      <span className="w-3 h-3 rounded-sm bg-white/[0.08] border border-white/[0.1] flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-[1px]" />
                      </span>
                      QR
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 relative overflow-x-hidden reveal">
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/[0.1] border border-amber-500/[0.2] text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
              <DollarSign className="w-3 h-3" />
              Simple Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabord font-display tracking-tight mb-6">
              Choose Your Plan
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Transparent pricing for restaurants of all sizes. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`price-card relative rounded-3xl transition-all duration-500 ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-fuchsia-500/40">
                    <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                    Most Popular
                  </div>
                )}

                {/* Card body */}
                <div
                  className={`relative h-full p-8 md:p-10 rounded-3xl border backdrop-blur-xl transition-all duration-500 overflow-visible ${plan.popular
                    ? 'border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-500/[0.08] via-violet-500/[0.05] to-transparent shadow-2xl shadow-fuchsia-500/20 hover:shadow-fuchsia-500/30'
                    : `${isDark ? 'border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:border-white/[0.18] hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1' : 'border-slate-900/[0.08] bg-gradient-to-br from-slate-900/[0.05] to-slate-900/[0.01] hover:border-slate-900/[0.18] hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1'}`
                  }`}
                >
                  {/* Corner glow for popular */}
                  {plan.popular && (
                    <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
                  )}

                  {/* Plan name */}
                  <div className="relative flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                    {plan.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20 px-2.5 py-1 rounded-full">
                        Best Value
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="relative flex items-baseline gap-1.5 mb-3">
                    <span className={`text-5xl md:text-6xl font-extrabord font-mono tracking-tight ${plan.popular
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400'
                    }`}>
                      ₹{plan.price}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
                  </div>

                  <p className="relative text-sm text-slate-400 font-light mb-8 leading-relaxed">{plan.desc}</p>

                  {/* Divider */}
                  <div className={`relative h-px mb-8 ${plan.popular ? 'bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent' : 'bg-white/[0.06]'}`} />

                  {/* Features */}
                  <ul className="relative space-y-3.5 mb-10">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className={`shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular
                          ? 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/25'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => navigate('/admin')}
                    className={`relative w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 cursor-pointer group flex items-center justify-center gap-2 ${plan.popular
                      ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-xl shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 hover:scale-[1.02]'
                      : 'bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08] hover:border-white/[0.2]'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white/[0.01] reveal">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/[0.1] border border-pink-500/[0.2] text-pink-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Phone className="w-3 h-3" />
              Frequently Asked
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabord font-display tracking-tight mb-6">
              Everything You Need To Know
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Got questions? We have answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`p-6 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08]' : 'bg-slate-900/[0.04] border border-slate-900/[0.08] hover:border-slate-900/[0.15]'} transition-all duration-300 group overflow-hidden`}>
                <div className="flex justify-between items-center mb-3 cursor-pointer">
                  <h3 className={`font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-violet-400 transition-colors truncate`}>{faq.q}</h3>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 transition-colors" />
                </div>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-x-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-transparent" />
        </div>
        <div className={`relative z-10 max-w-4xl mx-auto text-center p-16 rounded-[3rem] backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-violet-900/20 via-fuchsia-900/20 to-transparent border border-white/[0.05]' : 'bg-gradient-to-br from-violet-100/40 via-fuchsia-100/40 to-transparent border border-slate-200'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabord font-display tracking-tight mb-6">
            Ready To Transform Your Restaurant?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join hundreds of restaurants already using MenuMate to deliver 
            exceptional contactless dining experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Start Free Trial
            </button>
            <a
              href="#pricing"
              className={`px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-2.5 group cursor-pointer ${isDark ? 'border border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05]' : 'border border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            >
              <DollarSign className="w-5 h-5" /> View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 border-t ${isDark ? 'border-white/[0.05]' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Layout className="text-white text-sm" />
              </div>
              <span className="font-display font-bold text-lg tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-300 to-fuchsia-300">MenuMate</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-slate-400">
              {[
                { label: 'Features', href: '#features' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Table Booking', href: '#booking' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Support', href: '/support' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-white transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex gap-4">
              {[
                { icon: <Mail className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />, href: 'mailto:support@menumate.in' },
                { icon: <Phone className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />, href: 'tel:+919876543210' }
              ].map((contact) => (
                <a key={contact.href} href={contact.href} className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05]' : 'bg-slate-100 border border-slate-300 hover:bg-slate-200'}`}>
                  {contact.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-6 md:mt-0">© 2026 MenuMate SaaS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
