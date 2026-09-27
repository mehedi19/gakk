"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ParticleLogoEngine from '../components/ParticleLogoEngine';
import { 
  ArrowRight, ArrowLeft, ArrowUpRight, Play, Pause, Volume2, VolumeX, 
  Maximize2, X, Layers, Smartphone, Radio, Code, Cpu, TrendingUp, 
  ChevronLeft, ChevronRight, Sparkles, RefreshCw, Send, Terminal, Zap 
} from 'lucide-react';

export const GakkLogo = ({ className = "h-8", showText = true, color = "#000000" }) => (
  <div className={`flex items-center gap-3.5 ${className}`}>
    <svg viewBox="0 0 200 200" fill="none" className="h-full aspect-square flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
      <mask id="gakk-mask-exact">
        <rect width="200" height="200" fill="white" />
        <circle cx="100" cy="100" r="38" fill="black" />
        <rect x="99" y="68" width="65" height="10" fill="black" />
        <circle cx="162" cy="142" r="34" fill="black" />
        <rect x="162" y="0" width="40" height="200" fill="black" />
      </mask>
      <g mask="url(#gakk-mask-exact)">
        <circle cx="100" cy="100" r="72" fill={color} />
        <rect x="100" y="28" width="62" height="40" fill={color} />
        <rect x="132" y="78" width="30" height="30" fill={color} />
      </g>
    </svg>
    {showText && <span className="text-[28px] font-bold tracking-tight text-black font-sans leading-none select-none">Gakk</span>}
  </div>
);

// Sub-brand logos
const ShadhinLogo = () => (<svg viewBox="0 0 100 100" className="w-8 h-8"><circle cx="50" cy="50" r="46" fill="#ff5900"/><path d="M40 32L68 50L40 68V32Z" fill="#fff"/><circle cx="68" cy="50" r="5" fill="#fff"/></svg>);
const DeenLogo = () => (<svg viewBox="0 0 100 100" className="w-8 h-8"><circle cx="50" cy="50" r="46" fill="#0f766e"/><path d="M52 24C40 24 30 34 30 48C30 62 40 72 52 72C46 66 42 58 42 48C42 38 46 30 52 24Z" fill="#fff"/><circle cx="62" cy="40" r="6" fill="#facc15"/></svg>);
const WinLogo = () => (<svg viewBox="0 0 100 100" className="w-8 h-8"><circle cx="50" cy="50" r="46" fill="#581c87"/><path d="M28 35L36 68H44L50 48L56 68H64L72 35H60L54 54L48 35H42L36 54L30 35H28Z" fill="#facc15"/></svg>);
const Cloud7Logo = () => (<svg viewBox="0 0 100 100" className="w-8 h-8"><circle cx="50" cy="50" r="46" fill="#0284c7"/><path d="M34 58C30 58 26 54 26 49C26 44 29 41 33 40C34 33 40 28 47 28C53 28 58 32 60 37C63 37 66 40 66 44C69 45 72 48 72 52C72 56 68 60 64 60H34V58Z" fill="#fff"/><path d="M46 42H58L50 58H44L50 48H46V42Z" fill="#0284c7"/></svg>);
const PocketPlayLogo = () => (<svg viewBox="0 0 100 100" className="w-8 h-8"><circle cx="50" cy="50" r="46" fill="#be123c"/><path d="M30 42C30 36 34 32 40 32H60C66 32 70 36 70 42V58C70 64 66 68 60 68H40C34 68 30 64 30 58V42Z" fill="#fff"/><rect x="36" y="47" width="12" height="4" rx="2" fill="#be123c"/><rect x="40" y="43" width="4" height="12" rx="2" fill="#be123c"/><circle cx="60" cy="46" r="3" fill="#be123c"/><circle cx="64" cy="53" r="3" fill="#be123c"/></svg>);
const OneAILogo = () => (<svg viewBox="0 0 100 100" className="w-8 h-8"><circle cx="50" cy="50" r="46" fill="#1e1b4b"/><path d="M50 24L64 38L50 52L36 38L50 24Z" fill="#60a5fa"/><path d="M50 48L64 62L50 76L36 62L50 48Z" fill="#3b82f6"/><circle cx="50" cy="50" r="5" fill="#fff"/></svg>);

// Minimal Telemetry Visuals
const ShadhinVisual = () => (
  <div className="w-full h-full min-h-[260px] bg-[#0c1017] p-6 flex flex-col justify-between border border-white/10 select-none">
    <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#888]">SHADHIN_AUDIO_CORE</span><span className="font-sans-code text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white">LOSSLESS FLAC</span></div>
    <div className="my-auto py-2"><div className="text-[12px] text-[#aaa] mb-1">Real-Time Concurrent Streamers</div><div className="text-3xl font-sans-code font-bold text-white">284,520<span className="text-[#888] font-normal text-lg"> listeners</span></div></div>
    <div className="flex justify-between text-[11px] font-sans-code text-[#888]"><span>CATALOG: 5M+ TRACKS</span><span>CDN: GLOBAL EDGE</span></div>
  </div>
);
const DeenVisual = () => (
  <div className="w-full h-full min-h-[260px] bg-[#08131a] p-6 flex flex-col justify-between border border-white/10 select-none">
    <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#aaa]">DEEN_ISLAMIC_SUITE</span><span className="font-sans-code text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">GPS ACCURATE</span></div>
    <div className="my-auto py-2"><div className="text-[12px] text-[#aaa] mb-1">Daily Active Verified Engagements</div><div className="text-3xl font-sans-code font-bold text-white">3.2M+<span className="text-emerald-400 text-lg font-normal"> DAU</span></div></div>
    <div className="flex justify-between text-[11px] font-sans-code text-[#888]"><span>QIBLA · PRAYER · AUDIO</span><span>99.98% RETENTION</span></div>
  </div>
);
const WinVisual = () => (
  <div className="w-full h-full min-h-[260px] bg-[#120e1f] p-6 flex flex-col justify-between border border-white/10 select-none">
    <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#aaa]">WIN_ESPORTS_ARENA</span><span className="font-sans-code text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">MICRO-REWARDS</span></div>
    <div className="my-auto py-2"><div className="text-[12px] text-[#aaa] mb-1">Tournament Prizes Settled Daily</div><div className="text-3xl font-sans-code font-bold text-white">$185K+<span className="text-purple-300 text-lg font-normal"> distributed</span></div></div>
    <div className="flex justify-between text-[11px] font-sans-code text-[#888]"><span>CARRIER BILLING</span><span>LATENCY &lt;45ms</span></div>
  </div>
);
const Cloud7Visual = () => (
  <div className="w-full h-full min-h-[260px] bg-[#0a0d14] p-6 flex flex-col justify-between border border-white/10 select-none">
    <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#aaa]">CLOUD7_INFRA_GRID</span><span className="font-sans-code text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">CARRIER GRADE</span></div>
    <div className="my-auto py-2"><div className="text-[12px] text-[#aaa] mb-1">High-Throughput VAS Events Routed</div><div className="text-3xl font-sans-code font-bold text-white">2.4B+<span className="text-cyan-400 text-lg font-normal"> / mo</span></div></div>
    <div className="flex justify-between text-[11px] font-sans-code text-[#888]"><span>SMPP v3.4 ENGINE</span><span>99.999% SLA</span></div>
  </div>
);
const PocketPlayVisual = () => (
  <div className="w-full h-full min-h-[260px] bg-[#140a12] p-6 flex flex-col justify-between border border-white/10 select-none">
    <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#aaa]">POCKETPLAY_ARCADE</span><span className="font-sans-code text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">INSTANT WEB-GL</span></div>
    <div className="my-auto py-2"><div className="text-[12px] text-[#aaa] mb-1">Casual Game Session Plays</div><div className="text-3xl font-sans-code font-bold text-white">48M+<span className="text-rose-400 text-lg font-normal"> plays</span></div></div>
    <div className="flex justify-between text-[11px] font-sans-code text-[#888]"><span>TITLES: 350+</span><span>ZERO DOWNLOAD</span></div>
  </div>
);
const OneAIVisual = () => (
  <div className="w-full h-full min-h-[260px] bg-[#0a1118] p-6 flex flex-col justify-between border border-white/10 select-none">
    <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#aaa]">ONEAI_ENTERPRISE_RAG</span><span className="font-sans-code text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">GENAI LLM</span></div>
    <div className="my-auto py-2"><div className="text-[12px] text-[#aaa] mb-1">Automated Customer Inferences</div><div className="text-3xl font-sans-code font-bold text-white">14.2M<span className="text-blue-300 text-lg font-normal"> queries/mo</span></div></div>
    <div className="flex justify-between text-[11px] font-sans-code text-[#888]"><span>VOICE BOT · BENGALI &amp; EN</span><span>92% RESOLUTION</span></div>
  </div>
);

// Detail view for each sub-brand
const ProductDetailPage = ({ product, onBack, onSelectProduct, allProducts, onCursorEnter, onCursorLeave }) => {
  const VisualComponent = product.Visual;
  const LogoComponent = product.Logo;
  return (
    <div className="min-h-screen bg-white pt-28 pb-24 text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-8 flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-sans-code px-5 py-2.5 rounded-full bg-[#f1f3fa] hover:bg-[#e3f5f3]">
          <ArrowLeft className="w-3.5 h-3.5" /><span>BACK TO ALL PRODUCTS</span>
        </button>
        <div className="font-sans-code text-xs text-[#888]">PRODUCT / <span className="text-black font-semibold">{product.name}</span></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="bg-[#f8fafc] border border-[#e3f5f3] p-8 sm:p-14 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3"><LogoComponent /><h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-black">{product.name}</h1></div>
              <p className="text-xl text-[#444] font-normal leading-relaxed">{product.headline}</p>
              <p className="text-sm text-[#666] leading-relaxed">{product.longDescription}</p>
              <div className="p-6 bg-white border border-[#e3f5f3] flex items-baseline gap-4"><span className="text-5xl font-sans-code font-bold text-black">{product.metric}</span><span className="text-sm text-[#666]">{product.metricLabel}</span></div>
              <div className="pt-2"><a href="#contact" onClick={onBack} className="px-8 py-3.5 rounded-full bg-black text-white text-xs font-semibold inline-flex items-center gap-2"><span>Request enterprise integration</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
            </div>
            <div className="lg:col-span-5"><div className="w-full aspect-[4/3] overflow-hidden border border-black/10"><VisualComponent /></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('web');
  const [complexityTier, setComplexityTier] = useState(2);
  const [addons, setAddons] = useState({ seo: false, ai: true, sla: false });
  const [insightIndex, setInsightIndex] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = useCallback((msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 4000);
  }, []);

  const servicesConfig = useMemo(() => ({
    web: { name: 'Web & SaaS Platform', base: 1200 },
    mobile: { name: 'iOS & Android App', base: 2200 },
    design: { name: 'UI/UX Design System', base: 800 },
    telco: { name: 'Carrier & VAS Gateway', base: 2400 }
  }), []);

  const complexityConfig = useMemo(() => [
    { label: 'MVP Sprint', multiplier: 0.85, weeks: '2 - 3 weeks' },
    { label: 'Growth Architecture', multiplier: 1.25, weeks: '3 - 5 weeks' },
    { label: 'Carrier Scale Enterprise', multiplier: 2.1, weeks: '6 - 10 weeks' }
  ], []);

  const calculatedBudget = useMemo(() => {
    const base = servicesConfig[selectedService]?.base || 1200;
    const tier = complexityConfig[complexityTier - 1] || complexityConfig[1];
    let total = Math.round(base * tier.multiplier);
    if (addons.seo) total += 450;
    if (addons.ai) total += 700;
    if (addons.sla) total += 350;
    return { price: total, timeframe: tier.weeks, tierName: tier.label };
  }, [selectedService, complexityTier, addons, servicesConfig, complexityConfig]);

  const cursorGlassRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorTextRef = useRef(null);
  const heroVideoRef = useRef(null);
  const coordsRef = useRef({ currentX: -100, currentY: -100, targetX: -100, targetY: -100, isHovered: false, label: '' });

  const onCursorEnter = useCallback((label = '') => {
    coordsRef.current.isHovered = true;
    coordsRef.current.label = label;
    if (cursorGlassRef.current) cursorGlassRef.current.classList.add('cursor-active-glass');
    if (cursorTextRef.current) { cursorTextRef.current.textContent = label; cursorTextRef.current.style.opacity = label ? '1' : '0'; }
  }, []);

  const onCursorLeave = useCallback(() => {
    coordsRef.current.isHovered = false;
    coordsRef.current.label = '';
    if (cursorGlassRef.current) cursorGlassRef.current.classList.remove('cursor-active-glass');
    if (cursorTextRef.current) { cursorTextRef.current.textContent = ''; cursorTextRef.current.style.opacity = '0'; }
  }, []);

  const handlePointerLeave = onCursorLeave;
  if (typeof window !== 'undefined') {
    window.handlePointerLeave = onCursorLeave;
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;
    let animationFrameId;
    const handleMouseMove = (e) => {
      coordsRef.current.targetX = e.clientX;
      coordsRef.current.targetY = e.clientY;
      if (cursorGlassRef.current && cursorDotRef.current) {
        cursorGlassRef.current.style.opacity = '1';
        cursorDotRef.current.style.opacity = '1';
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const renderLoop = () => {
      const state = coordsRef.current;
      state.currentX += (state.targetX - state.currentX) * 0.16;
      state.currentY += (state.targetY - state.currentY) * 0.16;
      if (cursorGlassRef.current) {
        cursorGlassRef.current.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0px) translate(-50%, -50%) scale(${state.isHovered ? 1.08 : 1})`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${state.targetX}px, ${state.targetY}px, 0px) translate(-50%, -50%) scale(${state.isHovered ? 0.3 : 1})`;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const allSubBrands = useMemo(() => [
    { id: 'shadhin', name: 'Shadhin', category: 'STREAMING & AUDIO OTT', type: 'streaming', headline: 'Full-spectrum music and podcast ecosystem streaming millions of hours daily.', longDescription: 'Shadhin Music is Bangladesh’s premier licensed audio platform powering lossless streaming across Android, iOS, and Web with zero latency.', metric: '12M+', metricLabel: 'verified listeners across South Asia', Visual: ShadhinVisual, Logo: ShadhinLogo },
    { id: 'deen', name: 'Deen', category: 'ISLAMIC LIFESTYLE SUITE', type: 'lifestyle', headline: 'Authentic digital Islamic companion trusted across telecom operators nationwide.', longDescription: 'Deen is a comprehensive Islamic lifestyle service developed with regional telecom giants featuring GPS-accurate prayer reminders, Qibla compass, and Quran recitation.', metric: '3.2M+', metricLabel: 'daily active devotees on Robi & GP nodes', Visual: DeenVisual, Logo: DeenLogo },
    { id: 'win', name: 'WIN', category: 'ESPORTS & GAMING REWARDS', type: 'gaming', headline: 'Competitive esports tournament network delivering instant micro-cash prizes.', longDescription: 'WIN delivers high-stakes mobile tournament infrastructure for skill-based gaming and live multiplayer trivia with instant carrier payouts.', metric: '$1.4M+', metricLabel: 'reward prizes distributed to players', Visual: WinVisual, Logo: WinLogo },
    { id: 'cloud7', name: 'Cloud7', category: 'TELECOM VAS & INFRASTRUCTURE', type: 'telco', headline: 'Carrier-grade distributed messaging and billing gateway routing billions of requests.', longDescription: 'Cloud7 bridges tier-1 telecom operator SMSCs, SMPP v3.4 nodes, and USSD gateways to modern cloud architectures with enterprise reliability.', metric: '2.4B+', metricLabel: 'high-throughput events routed monthly with zero loss', Visual: Cloud7Visual, Logo: Cloud7Logo },
    { id: 'pocketplay', name: 'PocketPlay', category: 'INSTANT CASUAL GAMING', type: 'gaming', headline: 'Lightweight HTML5 gaming portal delivering zero-install micro-entertainment.', longDescription: 'PocketPlay eliminates app-store friction by streaming 350+ casual games directly through web browsers with daily micro-subscriptions.', metric: '48M+', metricLabel: 'instant browser gaming sessions completed', Visual: PocketPlayVisual, Logo: PocketPlayLogo },
    { id: 'oneai', name: 'OneAI', category: 'ENTERPRISE AI & AUTOMATION', type: 'ai', headline: 'Context-aware LLM agents, RAG search pipelines, and bilingual voice automation.', longDescription: 'OneAI provides turnkey artificial intelligence solutions for enterprises including bilingual voice bots and private document search.', metric: '14.2M', metricLabel: 'automated customer queries resolved monthly', Visual: OneAIVisual, Logo: OneAILogo }
  ], []);

  const filteredBrands = useMemo(() => {
    if (selectedBrandFilter === 'all') return allSubBrands;
    if (selectedBrandFilter === 'streaming') return allSubBrands.filter(b => b.type === 'streaming' || b.type === 'lifestyle');
    if (selectedBrandFilter === 'gaming') return allSubBrands.filter(b => b.type === 'gaming');
    if (selectedBrandFilter === 'telco') return allSubBrands.filter(b => b.type === 'telco' || b.type === 'ai');
    return allSubBrands;
  }, [selectedBrandFilter, allSubBrands]);

  const insightsData = useMemo(() => [
    { id: 1, category: 'AI & DATA', readTime: '4 min read', title: 'Why traditional data stacks stall agentic AI projects in telecom', description: 'Agentic AI stalls in production because legacy telecom stacks cannot deliver the speed, volume, or strict logic agents require.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop' },
    { id: 2, category: 'CLOUD INFRA', readTime: '3 min read', title: 'Carrier-Grade SMPP message routing: Lessons from 2.4B events', description: 'How modern Go microservices, Kafka pipelines, and Redis clusters overcome the bottlenecks of traditional SMSCs.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
    { id: 3, category: 'PRODUCT DESIGN', readTime: '5 min read', title: 'Designing for the next billion: Frictionless OTT interfaces', description: 'Eliminating credit card barriers through Direct Operator Billing transforms consumer conversion rates in emerging streaming markets.', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop' }
  ], []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white relative font-sans antialiased overflow-x-hidden">
      
      {/* Liquid Glass Cursor */}
      <div ref={cursorGlassRef} className="hidden lg:flex liquid-glass-follower">
        <span ref={cursorTextRef} className="font-sans-code text-[10px] uppercase tracking-wider font-semibold text-white opacity-0 pointer-events-none text-center px-1" />
      </div>
      <div ref={cursorDotRef} className="hidden lg:block liquid-glass-dot" />

      {/* Header Bar with Centered Menu */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e3f5f3]">
        <nav className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <a href="#" onClick={() => setSelectedProductDetail(null)} onMouseEnter={() => onCursorEnter('GAKK')} onMouseLeave={onCursorLeave}>
            <GakkLogo className="h-8" />
          </a>

          {/* Center Navigation List */}
          <div className="hidden md:flex items-center gap-1 bg-[#f1f3fa]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#e3f5f3]">
            <a href="#products" onClick={() => setSelectedProductDetail(null)} className="px-4 py-1.5 rounded-full text-xs font-medium text-[#555] hover:text-black hover:bg-white transition-all">Products</a>
            <a href="#why-gakk" onClick={() => setSelectedProductDetail(null)} className="px-4 py-1.5 rounded-full text-xs font-medium text-[#555] hover:text-black hover:bg-white transition-all">Why Gakk</a>
            <a href="#services" onClick={() => setSelectedProductDetail(null)} className="px-4 py-1.5 rounded-full text-xs font-medium text-[#555] hover:text-black hover:bg-white transition-all">Services</a>
            <a href="#estimator" onClick={() => setSelectedProductDetail(null)} className="px-4 py-1.5 rounded-full text-xs font-medium text-[#555] hover:text-black hover:bg-white transition-all flex items-center gap-1.5">
              <span>Estimator</span><span className="w-1.5 h-1.5 rounded-full bg-[#ff5900]" />
            </a>
            <a href="#insights" onClick={() => setSelectedProductDetail(null)} className="px-4 py-1.5 rounded-full text-xs font-medium text-[#555] hover:text-black hover:bg-white transition-all">Insights</a>
          </div>

          <div className="flex items-center">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-[#222] transition-all shadow-sm">
              <span>Get in touch</span><ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {selectedProductDetail ? (
        <ProductDetailPage 
          product={selectedProductDetail} 
          onBack={() => { setSelectedProductDetail(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          onSelectProduct={(p) => { setSelectedProductDetail(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          allProducts={allSubBrands}
          onCursorEnter={onCursorEnter}
          onCursorLeave={onCursorLeave}
        />
      ) : (
        <>
          {/* Hero Fold */}
          <section className="pt-32 sm:pt-40 pb-16 md:pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-sans-code text-xs uppercase tracking-widest text-[#888888]">
                    Digital Design &amp; Development Agency
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5900]" />
                  <span className="font-sans-code text-xs text-[#888888]">Est. 2014</span>
                </div>

                <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-medium leading-[1.08] tracking-[-0.03em] text-black">
                  We provide affordable digital services &amp; solutions.
                </h1>

                <p className="mt-6 text-base sm:text-lg text-[#666666] leading-relaxed font-normal max-w-lg">
                  Gakk Media architects mission-critical digital products, high-throughput telecom value-added systems, and modern web applications with surgical engineering.
                </p>

                <div className="mt-8 flex items-center">
                  <a
                    href="#estimator"
                    className="px-8 py-4 rounded-full bg-black text-white text-xs font-semibold inline-flex items-center gap-3 hover:bg-[#222222] transition-all transform hover:scale-[1.02]"
                  >
                    <span>Estimate your project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Exact 50% Right Column: 3D Particle Logo Engine */}
              <div className="w-full flex items-center justify-center">
                <ParticleLogoEngine particleCount={2100} dotSize={0.22} dotColor="#666666" />
              </div>
            </div>

            {/* Cuberto-styled Video Showreel Section */}
            <div className="mt-16 sm:mt-20">
              <div 
                onClick={() => {
                  if (!heroVideoRef.current) return;
                  if (isVideoPlaying) { heroVideoRef.current.pause(); setIsVideoPlaying(false); }
                  else { heroVideoRef.current.play(); setIsVideoPlaying(true); }
                }} 
                className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black shadow-2xl cursor-pointer select-none border border-black/10"
              >
                <video ref={heroVideoRef} autoPlay loop muted={isVideoMuted} playsInline className="w-full h-full object-cover opacity-90" poster="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop">
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
                  <span className="font-sans-code text-[11px] text-white uppercase tracking-wider bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">Gakk Media Showreel 2026</span>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setIsVideoMuted(!isVideoMuted); }} className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center">
                      {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setVideoModalOpen(true); }} className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Pods */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-8 bg-[#e3f5f3] flex flex-col justify-between min-h-[200px] border border-[#e3f5f3]">
                <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#666]">01 / ENGINEERING</span><Code className="w-4 h-4 text-black" /></div>
                <div><h3 className="text-xl font-medium text-black mb-1">Web &amp; Cloud Platforms</h3><p className="text-xs text-[#666]">Sub-second Next.js frontend architectures and distributed Go APIs.</p></div>
              </div>
              <div className="p-8 bg-[#f1f3fa] flex flex-col justify-between min-h-[200px] border border-[#f1f3fa]">
                <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#666]">02 / TELECOM &amp; VAS</span><Radio className="w-4 h-4 text-black" /></div>
                <div><h3 className="text-xl font-medium text-black mb-1">Carrier Grade Billing</h3><p className="text-xs text-[#666]">Direct Operator Billing (DOB), SMPP messaging hubs, and USSD gateways.</p></div>
              </div>
              <div className="p-8 bg-[#eee] flex flex-col justify-between min-h-[200px] border border-[#eee]">
                <div className="flex justify-between items-center"><span className="font-sans-code text-[11px] text-[#666]">03 / INTERFACE DESIGN</span><Layers className="w-4 h-4 text-black" /></div>
                <div><h3 className="text-xl font-medium text-black mb-1">Fluid Product Systems</h3><p className="text-xs text-[#666]">Figma tokens, gesture-driven interactions, and conversion workflows.</p></div>
              </div>
            </div>
          </section>

          {/* Sub-Brands Section */}
          <section id="products" className="py-24 sm:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3"><span className="w-2.5 h-2.5 rounded-full bg-[#ff5900] animate-pulse" /><span className="font-sans-code text-xs uppercase tracking-widest text-[#888] font-semibold">PROPRIETARY SUB-BRANDS &amp; PRODUCTS</span></div>
                  <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-black leading-[1.08]">Work that drives growth.</h2>
                  <p className="mt-4 text-[#666] text-base sm:text-lg max-w-xl">For over 10 years we've built market-defining consumer platforms and telecom engines — measuring impact in hard business metrics.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-sans-code text-xs">
                  {['all', 'streaming', 'gaming', 'telco'].map(filterKey => (
                    <button key={filterKey} onClick={() => setSelectedBrandFilter(filterKey)} className={`px-4 py-2 rounded-full transition-all ${selectedBrandFilter === filterKey ? 'bg-black text-white shadow-sm' : 'bg-[#f1f3fa] text-[#666] hover:text-black'}`}>
                      {filterKey === 'all' ? 'All 6 Products' : filterKey.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                {filteredBrands.map((brand) => {
                  const VisualComponent = brand.Visual;
                  const BrandLogo = brand.Logo;
                  return (
                    <div key={brand.id} onClick={() => { setSelectedProductDetail(brand); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-[#f8fafc] hover:bg-[#f1f3fa] border border-[#e3f5f3] overflow-hidden transition-all duration-300 group cursor-pointer">
                      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
                          <div>
                            <div className="flex items-center gap-3 mb-6"><BrandLogo /><span className="font-bold text-sm text-black">{brand.name}</span><span className="text-[#888]">·</span><span className="font-sans-code text-[11px] text-[#888]">{brand.category}</span></div>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-black leading-snug">{brand.headline}</h3>
                          </div>
                          <div className="pt-4 border-t border-[#e3f5f3]">
                            <div className="flex items-baseline gap-3"><span className="text-4xl sm:text-5xl lg:text-6xl font-sans-code font-bold tracking-tight text-black">{brand.metric}</span><span className="text-xs sm:text-sm text-[#666] max-w-[220px]">{brand.metricLabel}</span></div>
                            <div className="mt-8 flex items-center gap-2 text-xs font-medium text-black group-hover:text-[#ff5900]"><span className="underline underline-offset-4">View {brand.name} Architecture Details</span><ArrowUpRight className="w-3.5 h-3.5" /></div>
                          </div>
                        </div>
                        <div className="lg:col-span-6 p-4 sm:p-8 flex items-center justify-center bg-white/60 border-t lg:border-t-0 lg:border-l border-[#e3f5f3]"><VisualComponent /></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Gakk Media */}
          <section id="why-gakk" className="py-24 sm:py-32 bg-[#f8fafc] border-t border-[#e3f5f3]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 aspect-[4/5] bg-black overflow-hidden border border-black/10">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover grayscale contrast-110" />
                </div>
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <div className="flex items-center gap-2 mb-3"><span className="w-2.5 h-2.5 rounded-full bg-[#ff5900]" /><span className="font-sans-code text-xs uppercase tracking-widest text-[#888] font-semibold">WHY GAKK MEDIA</span></div>
                    <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-black leading-[1.08]">Engineering excellence meets human-centred experiences.</h2>
                    <div className="mt-6"><a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#161a22] text-white text-xs font-medium hover:bg-black transition-colors"><span>About us</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
                  </div>
                  <div className="pt-4 border-t border-[#e3f5f3] space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4"><span className="sm:col-span-2 font-sans-code text-sm font-semibold text-[#ff5900]">01</span><div className="sm:col-span-10"><h3 className="text-xl font-medium text-black mb-1">Client-centred, engineer-led</h3><p className="text-sm text-[#666]">Strategists, designers, and systems architects working as a unified team without multi-agency handoff friction.</p></div></div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4"><span className="sm:col-span-2 font-sans-code text-sm font-semibold text-[#ff5900]">02</span><div className="sm:col-span-10"><h3 className="text-xl font-medium text-black mb-1">10+ Years of Telecom Scale</h3><p className="text-sm text-[#666]">Direct carrier billing and SMPP routing engines built to process high concurrency with 99.999% uptime.</p></div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Live Estimator Section */}
          <section id="estimator" className="py-24 sm:py-32 bg-[#f1f3fa] border-y border-[#e3f5f3]">
            <div className="max-w-5xl mx-auto px-6 sm:px-10">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="font-sans-code text-xs uppercase tracking-widest text-[#888] block mb-2">Transparent Pricing</span>
                <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-black">Calculate your project budget.</h2>
              </div>
              <div className="bg-white p-8 sm:p-12 border border-[#e3f5f3] shadow-sm">
                <div className="mb-8">
                  <label className="font-sans-code block text-xs uppercase tracking-wider text-[#888] mb-4">1. Select Core Service Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(servicesConfig).map(([key, item]) => (
                      <button key={key} type="button" onClick={() => setSelectedService(key)} className={`px-4 py-3.5 rounded-full text-xs font-medium ${selectedService === key ? 'bg-black text-white' : 'border border-[#e3f5f3] text-black hover:border-black'}`}>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-[#f1f3fa] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#e3f5f3]">
                  <div>
                    <span className="font-sans-code text-[11px] text-[#888] uppercase">Estimated Investment Benchmark</span>
                    <div className="flex items-baseline gap-2 mt-1"><span className="text-4xl font-sans-code font-bold text-black">$${calculatedBudget.price.toLocaleString()}</span><span className="text-xs text-[#666]">USD approx.</span></div>
                  </div>
                  <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-black text-white text-xs font-medium flex items-center justify-center gap-2"><span>Lock in this estimate</span><ArrowRight className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 sm:py-32 bg-[#f1f3fa] border-t border-[#e3f5f3]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <span className="font-sans-code text-xs uppercase tracking-widest text-[#888] block">Start a Conversation</span>
                  <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-black">Have a project in mind? Let's talk.</h2>
                  <p className="text-[#666] text-base leading-relaxed">Send us your specifications. A senior solution engineer will review and respond with an architectural proposal within 24 hours.</p>
                </div>
                <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#e3f5f3]">
                  <form onSubmit={(e) => { e.preventDefault(); triggerToast('Thank you. A solution architect will reply within 24 hours.'); e.target.reset(); }} className="space-y-4">
                    <input type="text" required placeholder="Your Name" className="w-full px-5 py-3.5 rounded-full border border-[#e3f5f3] text-sm bg-[#f1f3fa] focus:border-black focus:outline-none" />
                    <input type="email" required placeholder="Work Email" className="w-full px-5 py-3.5 rounded-full border border-[#e3f5f3] text-sm bg-[#f1f3fa] focus:border-black focus:outline-none" />
                    <textarea rows={4} placeholder="Project Brief..." className="w-full px-5 py-3.5 border border-[#e3f5f3] text-sm bg-[#f1f3fa] focus:border-black focus:outline-none resize-none" />
                    <button type="submit" className="w-full py-4 rounded-full bg-black text-white text-xs font-medium flex items-center justify-center gap-2"><span>Send Project Request</span><ArrowRight className="w-4 h-4" /></button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#e3f5f3] py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-[#f1f3fa]">
          <GakkLogo className="h-8" />
          <div className="flex flex-wrap gap-6 text-xs text-[#666]">
            <a href="#products">Products</a><a href="#why-gakk">Why Gakk</a><a href="#services">Services</a><a href="#estimator">Estimator</a><a href="#contact">Contact</a>
          </div>
          <p className="text-xs font-sans-code text-[#888]">Powered by Gakk Media</p>
        </div>
      </footer>

      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
          <div className="bg-black text-white px-5 py-3 rounded-full flex items-center gap-2 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[#ff5900]" />
            <span className="font-sans-code text-xs font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}