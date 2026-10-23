import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiLayout,
  FiCompass,
  FiTrendingUp,
  FiClock,
  FiUserCheck,
  FiShoppingBag,
  FiChevronRight,
  FiHelpCircle,
  FiSun,
  FiMoon,
  FiZap,
  FiGrid
} from 'react-icons/fi';
import { getRestaurants, getTables } from '../dbService.js';
import { useTheme } from '../contexts/ThemeContext.jsx';

export default function Onboarding() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedRest, setSelectedRest] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const restList = await getRestaurants();
        setRestaurants(restList);
        if (restList && restList.length > 0) {
          const firstRestId = restList[0].id;
          setSelectedRest(firstRestId);
          const tableList = await getTables(firstRestId);
          setTables(tableList);
          if (tableList && tableList.length > 0) {
            setSelectedTable(tableList[0].id);
          }
        }
      } catch (err) {
        console.error('Error loading onboarding data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleRestChange = async (e) => {
    const id = e.target.value;
    setSelectedRest(id);
    setSelectedTable('');
    setTables([]);
    try {
      const tableList = await getTables(id);
      setTables(tableList);
      if (tableList && tableList.length > 0) {
        setSelectedTable(tableList[0].id);
      }
    } catch (err) {
      console.error('Error loading tables for restaurant:', id, err);
    }
  };

  const handleLaunchCustomer = () => {
    if (selectedRest && selectedTable) {
      navigate(`/customer?r=${selectedRest}&t=${selectedTable}`);
    }
  };

  const roleCards = [
    {
      title: 'Super Admin Control Center',
      desc: 'Platform owner suite. Track global revenue, subscribe or suspend restaurant stores, check SaaS analytics, and manage subscription renewals.',
      icon: <FiTrendingUp className="text-2xl" />,
      hover: 'hover:border-violet-500/50',
      textAccent: 'text-violet-400',
      bgAccent: 'bg-violet-500/10',
      borderAccent: 'border-violet-500/20',
      cta: 'Access Control Center',
      path: '/super-admin'
    },
    {
      title: 'Restaurant Admin Dashboard',
      desc: 'Manage specific restaurant. Create and edit categories, items, tables, generate and download QR codes, configure taxes, logos, coupons, and orders.',
      icon: <FiLayout className="text-2xl" />,
      hover: 'hover:border-fuchsia-500/50',
      textAccent: 'text-fuchsia-400',
      bgAccent: 'bg-fuchsia-500/10',
      borderAccent: 'border-fuchsia-500/20',
      cta: 'Access Admin Console',
      path: '/admin'
    },
    {
      title: 'Kitchen Display Screen (KDS)',
      desc: 'Live dashboard for kitchen crew. Real-time updates of preparing/ready/served foods, preparation timers, acoustic alert toggle, and chef order notes.',
      icon: <FiClock className="text-2xl" />,
      hover: 'hover:border-cyan-500/50',
      textAccent: 'text-cyan-400',
      bgAccent: 'bg-cyan-500/10',
      borderAccent: 'border-cyan-500/20',
      cta: 'Open Kitchen Panel',
      path: '/kitchen'
    },
    {
      title: 'Help & Support Center',
      desc: 'Got questions or need technical help? Access our direct support channels, view helpful setup tips, and find answers to frequently asked questions.',
      icon: <FiHelpCircle className="text-2xl" />,
      hover: 'hover:border-pink-500/50',
      textAccent: 'text-pink-400',
      bgAccent: 'bg-pink-500/10',
      borderAccent: 'border-pink-500/20',
      cta: 'Open Support Center',
      path: '/support'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} font-sans flex flex-col relative overflow-hidden transition-colors duration-150`}>
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="theme-toggle flex items-center justify-center cursor-pointer shadow-md"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full ${isDark ? 'bg-violet-600/20' : 'bg-violet-400/20'} blur-[140px]`} />
        <div className={`absolute top-[30%] right-[-15%] w-[50%] h-[50%] rounded-full ${isDark ? 'bg-fuchsia-600/15' : 'bg-fuchsia-400/15'} blur-[140px]`} />
        <div className={`absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full ${isDark ? 'bg-cyan-600/15' : 'bg-cyan-400/15'} blur-[140px]`} />
      </div>

      <div className="w-full max-w-6xl mx-auto z-10 px-6 py-12 flex-1 flex flex-col">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FiGrid className="text-white text-xl" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl leading-none">MenuMate</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>QR Ordering & SaaS</p>
            </div>
          </div>
          <div className={`hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-900/5 border-slate-900/10'} border text-xs font-medium`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            MenuMate v1.0 Live Sandbox
          </div>
        </header>

        <section className="text-center mb-14">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-violet-500/10 border-violet-500/20 text-violet-600'} border font-display text-sm font-semibold mb-6 animate-fade-in`}>
            <FiZap className="text-sm" />
            Next-generation contactless dining
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-display tracking-tight mb-5 leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              MenuMate
            </span>
          </h1>
          <p className={`text-base md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto font-light leading-relaxed`}>
            The high-performance contactless QR ordering & SaaS management suite for modern culinary experiences.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {roleCards.map((card) => (
            <div
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`group cursor-pointer p-6 rounded-3xl ${isDark ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]' : 'bg-white border-slate-200 hover:bg-slate-50'} ${card.hover} border transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${card.bgAccent} border ${card.borderAccent} flex items-center justify-center ${card.textAccent} group-hover:scale-110 transition-transform duration-300 mb-5`}>
                  {card.icon}
                </div>
                <h3 className={`text-xl font-bold font-display mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {card.title}
                </h3>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm font-light leading-relaxed mb-6`}>
                  {card.desc}
                </p>
              </div>
              <div className={`flex items-center ${card.textAccent} text-sm font-medium gap-1`}>
                {card.cta} <FiChevronRight />
              </div>
            </div>
          ))}
        </div>

        <div className={`rounded-3xl p-6 md:p-8 ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200'} border shadow-xl mb-10`}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className={`text-lg font-bold font-display mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Launch Customer Experience</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pick a restaurant and table to preview the contactless ordering flow.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <select
                value={selectedRest}
                onChange={handleRestChange}
                disabled={loading}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border focus:outline-none focus:ring-2 focus:ring-violet-500/40`}
              >
                {restaurants.length === 0 && <option value="">No restaurants</option>}
                {restaurants.map((r) => (
                  <option key={r.id} value={r.id}>{r.name || r.id}</option>
                ))}
              </select>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                disabled={loading || tables.length === 0}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} border focus:outline-none focus:ring-2 focus:ring-violet-500/40`}
              >
                {tables.length === 0 && <option value="">No tables</option>}
                {tables.map((t) => (
                  <option key={t.id} value={t.id}>{t.name || t.id}</option>
                ))}
              </select>
              <button
                onClick={handleLaunchCustomer}
                disabled={!selectedRest || !selectedTable}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Launch <FiShoppingBag className="inline ml-1" />
              </button>
            </div>
          </div>
        </div>

        <footer className={`flex flex-col md:flex-row justify-between items-center border-t ${isDark ? 'border-white/10' : 'border-slate-200'} pt-6 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'} gap-3`}>
          <p>© 2026 MenuMate SaaS Corporation. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <FiUserCheck className="text-emerald-400 text-sm" />
            <span>Ready for Production Deployment</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
EOF
Write-Host "written"