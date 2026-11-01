import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiCheck,
  FiZap,
  FiGrid,
  FiClock,
  FiDollarSign,
  FiShoppingBag,
  FiPrinter,
  FiSmartphone,
  FiBarChart2,
  FiShield,
  FiUsers,
  FiStar,
  FiChevronRight,
  FiMenu,
  FiX,
  FiLogIn
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const featuresRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      // Navbar fade in
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Hero title
      gsap.from('.hero-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
      });

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });

      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.9,
        stagger: 0.15
      });

      gsap.from('.hero-visual', {
        x: 100,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.5
      });

      // Floating orbs parallax
      gsap.to('.orb-1', {
        y: -120,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.orb-2', {
        y: -80,
        x: 40,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      // Feature cards scroll trigger
      gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          delay: i * 0.1
        });
      });

      // Section headers
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Stats counter animation
      gsap.utils.toArray('.stat-number').forEach((el) => {
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
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // How it works steps
      gsap.utils.toArray('.step-card').forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Parallax section backgrounds
      gsap.utils.toArray('.parallax-bg').forEach((bg) => {
        gsap.to(bg, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: bg.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FiSmartphone className="text-2xl" />,
      title: 'QR Code Ordering',
      desc: 'Contactless dining experience. Customers scan table QR and order instantly from their phone.',
      gradient: 'from-violet-500 to-fuchsia-500'
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: 'Kitchen Display System (KDS)',
      desc: 'Real-time order tracking for kitchen staff. Timers, acoustic alerts, and chef notes.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <FiDollarSign className="text-2xl" />,
      title: 'Smart Billing & Invoicing',
      desc: 'Generate professional bills, thermal receipts, PDF invoices, and send via WhatsApp.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: <FiPrinter className="text-2xl" />,
      title: 'Premium QR Stand Printing',
      desc: 'Customizable table tents with 4 templates, brand colors, and high-res PNG/PDF export.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <FiBarChart2 className="text-2xl" />,
      title: 'SaaS Analytics Dashboard',
      desc: 'Track revenue, subscriptions, MRR, and platform-wide metrics in real-time.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: 'Multi-Tenant Security',
      desc: 'Each restaurant isolated with role-based access. Super Admin, Restaurant Admin, Kitchen.',
      gradient: 'from-indigo-500 to-violet-500'
    }
  ];

  const steps = [
    { num: '01', title: 'Scan QR Code', desc: 'Customer scans the table QR code with their smartphone camera.' },
    { num: '02', title: 'Browse & Order', desc: 'Explore the digital menu, add items to cart, apply coupons.' },
    { num: '03', title: 'Kitchen Receives', desc: 'Order instantly appears on the Kitchen Display System.' },
    { num: '04', title: 'Track Live', desc: 'Customer watches real-time order status: preparing → ready → served.' },
    { num: '05', title: 'Smart Billing', desc: 'Generate bill, print receipt, or send PDF via WhatsApp.' }
  ];

  const stats = [
    { value: 50, suffix: '+', label: 'Restaurants' },
    { value: 10, suffix: 'K+', label: 'Orders Processed' },
    { value: 99, suffix: '%', label: 'Uptime' },
    { value: 24, suffix: '/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FiGrid className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">MenuMate</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">How It Works</a>
            <a href="#booking" className="text-sm text-slate-300 hover:text-white transition-colors">Table Booking</a>
            <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/admin')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FiLogIn className="text-sm" /> Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 text-white"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-2xl bg-slate-900/95 backdrop-blur border border-white/10">
            <div className="flex flex-col gap-3">
              <a href="#features" className="text-sm text-slate-300 py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-sm text-slate-300 py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#booking" className="text-sm text-slate-300 py-2" onClick={() => setMobileMenuOpen(false)}>Table Booking</a>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/admin'); }}
                className="w-full mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <FiLogIn /> Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb-1 absolute top-20 left-10 w-72 h-72 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="orb-2 absolute bottom-20 right-10 w-96 h-96 rounded-full bg-fuchsia-600/15 blur-[140px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[160px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="hero-subtitle inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6">
              <FiZap className="text-sm" />
              Next-Generation Contactless Dining
            </div>

            <h1 className="hero-title text-5xl md:text-7xl font-extrabold font-display tracking-tight leading-[1.05] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                The Future of
              </span>
              <br />
              <span className="text-white">Restaurant Dining</span>
            </h1>

            <p className="hero-subtitle text-lg text-slate-400 font-light leading-relaxed mb-8 max-w-xl">
              Transform your restaurant with a premium QR-based ordering system. 
              Contactless menus, real-time kitchen displays, smart billing, and seamless table booking — all in one luxury platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="hero-cta px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-base shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                Get Started <FiArrowRight />
              </button>
              <a
                href="#features"
                className="hero-cta px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-base hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                Explore Features <FiChevronRight />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    <span className="stat-number" data-target={stat.value}>{stat.value}</span>{stat.suffix}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="hero-visual relative hidden lg:block">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Phone mockup */}
              <div className="relative mx-auto w-72 h-[580px] rounded-[3rem] border-4 border-slate-700 bg-slate-900 shadow-2xl shadow-violet-500/20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />
                <div className="p-4 pt-8 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mx-auto mb-2 flex items-center justify-center">
                      <FiGrid className="text-white" />
                    </div>
                    <h3 className="font-bold text-sm">MenuMate</h3>
                    <p className="text-[10px] text-slate-400">Table 4 • Garden View</p>
                  </div>
                  <div className="flex-1 space-y-3 overflow-hidden">
                    {['Truffle Fries', 'Pesto Pizza', 'Mint Mojito'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20" />
                        <div className="flex-1">
                          <div className="text-xs font-bold">{item}</div>
                          <div className="text-[10px] text-slate-400">₹{249 + i * 100}</div>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold">+</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center text-sm font-bold">
                    View Cart • ₹648
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl shadow-cyan-500/30 animate-bounce" style={{ animationDuration: '3s' }}>
                <FiClock className="text-white text-2xl" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30 animate-bounce" style={{ animationDuration: '4s' }}>
                <FiDollarSign className="text-white text-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative py-24 px-6">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="section-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-sm font-medium mb-4">
              <FiStar /> Premium Features
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-4">
              Everything Your Restaurant Needs
            </h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto">
              From QR ordering to kitchen displays, smart billing to table booking — 
              MenuMate is the complete SaaS platform for modern dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="section-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-4">
              <FiZap /> Seamless Flow
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-4">
              How MenuMate Works
            </h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto">
              From scan to serve — a frictionless journey for customers and staff.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="step-card flex items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-extrabold text-xl font-mono shadow-lg shadow-violet-500/20">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm font-light">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block ml-auto">
                    <FiChevronRight className="text-slate-600 text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TABLE BOOKING ── */}
      <section id="booking" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-600/10 blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-fuchsia-600/10 blur-[140px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-header">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-4">
                <FiShoppingBag /> Table Booking
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-4">
                Smart Table Management
              </h2>
              <p className="text-slate-400 font-light leading-relaxed mb-6">
                Create tables, generate beautiful QR stand cards, and let customers book 
                or scan instantly. Each table gets a unique QR code linking directly to 
                your digital menu.
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'Create unlimited tables per restaurant',
                'Generate premium QR stand cards (4 templates)',
                'Download as PNG or PDF for printing',
                'Custom brand colors & typography',
                'Track table-wise orders in real-time'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <FiCheck className="text-emerald-400 text-xs" />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/admin')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-base shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              Manage Tables <FiArrowRight />
            </button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Table 1', sub: 'Garden View', color: 'from-violet-500 to-fuchsia-500' },
                { name: 'Table 2', sub: 'Window Side', color: 'from-cyan-500 to-blue-500' },
                { name: 'Table 3', sub: 'VIP Booth', color: 'from-amber-500 to-orange-500' },
                { name: 'Table 4', sub: 'Bonsai Corner', color: 'from-emerald-500 to-teal-500' }
              ].map((t, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <FiGrid className="text-white" />
                  </div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.sub}</p>
                  <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KDS SHOWCASE ── */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="section-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-4">
              <FiClock /> Kitchen Display System
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-4">
              Real-Time Kitchen Operations
            </h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto">
              Orders appear instantly on the KDS. Track preparation, set timers, and never miss a ticket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Pending Orders', count: 5, color: 'from-amber-500 to-orange-500', status: 'Awaiting approval' },
              { title: 'Preparing', count: 3, color: 'from-sky-500 to-blue-500', status: 'In kitchen' },
              { title: 'Ready to Serve', count: 2, color: 'from-emerald-500 to-teal-500', status: 'Plating complete' }
            ].map((kds, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${kds.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-3xl font-extrabold text-white font-mono">{kds.count}</span>
                </div>
                <h3 className="text-lg font-bold font-display mb-1">{kds.title}</h3>
                <p className="text-sm text-slate-400">{kds.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="section-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-medium mb-4">
              <FiDollarSign /> Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto">
              Choose the plan that fits your restaurant. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: 'Standard Bistro',
                price: '1,999',
                features: ['Digital QR Menu', 'Kitchen Display (KDS)', 'Staff Accounts', 'Basic Analytics', 'Table Management'],
                gradient: 'from-violet-500 to-fuchsia-500',
                popular: false
              },
              {
                name: 'Enterprise Dine',
                price: '4,999',
                features: ['Multiple Outlets', 'Advance KDS', 'Promo & Coupons Engine', 'Tax Configuration', 'SaaS Custom Branding', 'Priority Support'],
                gradient: 'from-fuchsia-500 to-cyan-500',
                popular: true
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border transition-all duration-300 ${plan.popular ? 'border-fuchsia-500/50 bg-fuchsia-500/[0.05] scale-105' : 'border-white/5 bg-white/[0.03]'}`}
              >
                {plan.popular && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold mb-4">
                    <FiStar /> Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold font-display mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold font-mono">₹{plan.price}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                      <FiCheck className="text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/admin')}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${plan.popular ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/30' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 border border-white/10">
          <h2 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-slate-400 font-light mb-8 max-w-xl mx-auto">
            Join hundreds of restaurants already using MenuMate to deliver 
            exceptional dining experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-base shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              Start Free Trial <FiArrowRight />
            </button>
            <button
              onClick={() => navigate('/support')}
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold text-base hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              Contact Sales <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <FiGrid className="text-white text-sm" />
              </div>
              <span className="font-display font-bold">MenuMate</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#booking" className="hover:text-white transition-colors">Table Booking</a>
              <button onClick={() => navigate('/support')} className="hover:text-white transition-colors cursor-pointer">Support</button>
            </div>
            <p className="text-xs text-slate-500">© 2026 MenuMate SaaS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
