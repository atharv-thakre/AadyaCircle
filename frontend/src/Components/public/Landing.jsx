import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
    Star, Menu, X, Heart, Brain, Users, Briefcase, Landmark,
    Activity, Zap, CheckCircle, ArrowRight, ChevronRight, Sparkles, Shield
} from 'lucide-react';
import CardSwap, { Card } from '../ui/CardSwap';
import BorderGlow from '../Generic/BorderGlow';
import DomeGallery from '../Generic/DomeGallery';

const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80', alt: 'Therapy Session' },
    { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', alt: 'Community' },
    { src: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80', alt: 'Freelancing' },
    { src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', alt: 'Gov Schemes' },
    { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', alt: 'Empowerment' },
    { src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80', alt: 'Career' },
    { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80', alt: 'Network' }
];


/* ─── Feature pill card (below hero) ────────────── */
const FeatureCard = ({ icon: Icon, title, image, glowHSL, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay }}
        className="w-full flex"
    >
        <BorderGlow
            backgroundColor="#ffffff"
            glowColor={glowHSL}
            animated={true}
            glowIntensity={3.0}
            glowRadius={60}
            edgeSensitivity={5}
            fillOpacity={0.8}
            className="w-full aspect-square rounded-[1.75rem] cursor-pointer group hover:-translate-y-2 transition-all duration-500 shadow-[0_0_30px_5px_rgba(196,126,168,0.15)] hover:shadow-[0_0_140px_60px_rgba(196,126,168,0.5)] relative"
        >
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />
            {/* Light Overlay for Readability */}
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] group-hover:bg-white/30 transition-colors duration-500" />
            
            <div className="flex flex-col items-center justify-center p-6 h-full w-full text-center relative z-10">
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon className="w-8 h-8 text-[#2d1f3d]" />
                </div>
                <p className="text-[#2d1f3d] font-bold text-xl leading-tight drop-shadow-sm">{title}</p>
            </div>
        </BorderGlow>
    </motion.div>
);

export default function Landing() {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const features = [
        { icon: Brain, title: 'AI Therapist', image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', glowHSL: '330 80 70' },
        { icon: Users, title: 'Community', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', glowHSL: '330 80 70' },
        { icon: Briefcase, title: 'Freelancing', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', glowHSL: '330 80 70' },
        { icon: Landmark, title: 'Gov Schemes', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', glowHSL: '330 80 70' },
    ];

    return (
        <div className="min-h-screen bg-white">
            <style>{`
                @keyframes floatOrb {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-22px) scale(1.04); }
                }
                @keyframes floatOrbSlow {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-14px) translateX(8px); }
                    66% { transform: translateY(10px) translateX(-6px); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulseRing {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(196,126,168,0.15); }
                    50% { box-shadow: 0 0 0 18px rgba(196,126,168,0); }
                }
                .hero-orb-1 {
                    animation: floatOrb 7s ease-in-out infinite;
                }
                .hero-orb-2 {
                    animation: floatOrbSlow 11s ease-in-out infinite;
                }
                .hero-orb-3 {
                    animation: floatOrb 9s ease-in-out infinite reverse;
                }
                .stat-card-animate {
                    animation: fadeSlideUp 0.6s ease-out both;
                }
                .pulse-ring {
                    animation: pulseRing 2.5s ease-in-out infinite;
                }
            `}</style>
 
             {/* ══════════════════════════════════════════
           NAVBAR
       ══════════════════════════════════════════ */}
             <nav
                 style={{
                     background: 'rgba(255,255,255,0.96)',
                     backdropFilter: 'blur(12px)',
                     borderBottom: '1px solid rgba(0,0,0,0.07)',
                     position: 'sticky',
                     top: 0,
                     zIndex: 50,
                 }}
             >
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '0 32px',
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 24,
                    }}
                >
                    {/* Logo */}
                    <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
                        <span
                            style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontWeight: 800,
                                fontSize: 26,
                                color: '#1a1025',
                                letterSpacing: '-0.5px',
                                fontStyle: 'italic',
                            }}
                        >
                            aadyaCircle
                        </span>
                    </a>    

                    {/* Divider */}
                    <div style={{ width: 1, height: 22, background: '#d0ccd8', flexShrink: 0 }} className="hidden md:block" />

                    {/* Nav links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1 }} className="hidden md:flex">
                        <a
                            href="/about"
                            onClick={(e) => { e.preventDefault(); navigate('/about'); }}
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 14,
                                fontWeight: 500,
                                color: '#6b6278',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.target.style.color = '#1a1025'}
                            onMouseLeave={e => e.target.style.color = '#6b6278'}
                        >
                            About
                        </a>
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }} className="hidden md:flex">
                        <button
                            style={{
                                background: 'transparent',
                                color: '#2d1f3d',
                                border: '1.5px solid rgba(45,31,61,0.12)',
                                borderRadius: 999,
                                padding: '8px 20px',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: 'pointer',
                                transition: 'background 0.2s, transform 0.15s',
                            }}
                            onMouseEnter={e => { e.target.style.background = 'rgba(45,31,61,0.04)'; e.target.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.transform = 'none'; }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                        <button
                            style={{
                                background: '#2d1f3d',
                                color: '#fff',
                                border: '1.5px solid #2d1f3d',
                                borderRadius: 999,
                                padding: '8px 20px',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: 'pointer',
                                transition: 'background 0.2s, transform 0.15s',
                            }}
                            onMouseEnter={e => { e.target.style.background = '#1a1025'; e.target.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.target.style.background = '#2d1f3d'; e.target.style.transform = 'none'; }}
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </button>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(o => !o)}
                        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
                        className="md:hidden"
                    >
                        {mobileOpen ? <X size={22} color="#1a1025" /> : <Menu size={22} color="#1a1025" />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                {mobileOpen && (
                    <div style={{
                        background: 'white', padding: '16px 24px 24px',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        display: 'flex', flexDirection: 'column', gap: 12,
                    }}>
                        <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); setMobileOpen(false); }} style={{ color: '#4a3f5c', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>About</a>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                            <button 
                                onClick={() => { navigate('/login'); setMobileOpen(false); }}
                                style={{
                                    background: 'transparent', color: '#2d1f3d',
                                    border: '1.5px solid rgba(45,31,61,0.12)', borderRadius: 999, padding: '12px 0',
                                    fontWeight: 600, fontSize: 15, cursor: 'pointer',
                                }}>
                                Login
                            </button>
                            <button 
                                onClick={() => { navigate('/signup'); setMobileOpen(false); }}
                                style={{
                                    background: '#2d1f3d', color: '#fff',
                                    border: 'none', borderRadius: 999, padding: '12px 0',
                                    fontWeight: 600, fontSize: 15, cursor: 'pointer',
                                }}>
                                Signup
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* ══════════════════════════════════════════
          HERO — soft pink, serif headline
      ══════════════════════════════════════════ */}
            <section
                style={{
                    background: 'linear-gradient(160deg, #fce8f0 0%, #f9dde8 40%, #f5d6e4 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '82vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Background image at low opacity */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/hero-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.22,
                    pointerEvents: 'none',
                }} />

                {/* Subtle floating ambient orbs */}
                <div className="hero-orb-1" style={{
                    position: 'absolute', top: '10%', left: '5%',
                    width: 320, height: 320, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(196,126,168,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none', zIndex: 0
                }} />
                <div className="hero-orb-2" style={{
                    position: 'absolute', top: '55%', right: '8%',
                    width: 260, height: 260, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245,214,228,0.2) 0%, transparent 70%)',
                    pointerEvents: 'none', zIndex: 0
                }} />
                <div className="hero-orb-3" style={{
                    position: 'absolute', bottom: '5%', left: '38%',
                    width: 180, height: 180, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(196,126,168,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none', zIndex: 0
                }} />


                {/* ── 2-column grid wrapper ── */}
                <div
                    style={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        padding: '72px 32px 96px',
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 48,
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {/* ── LEFT: headline, subtitle, CTAs ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.65 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            style={{ marginBottom: 18 }}
                        >
                            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #c47ea8, #f5d6e4)', padding: '5px 18px', borderRadius: 99, fontSize: 12, fontWeight: 700, color: '#2d1f3d', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                ✦ Women-First Platform
                            </span>
                        </motion.div>
                        <h1
                            style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontWeight: 800,
                                fontSize: 'clamp(40px, 5vw, 78px)',
                                color: '#1a1025',
                                lineHeight: 1.08,
                                letterSpacing: '-1.5px',
                                marginBottom: 24,
                            }}
                        >
                            <motion.span style={{ display: 'block' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>Small daily rituals.</motion.span>
                            <motion.span style={{ display: 'block' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>Real, lasting change.</motion.span>
                        </h1>

                        <p
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 17,
                                color: 'black',
                                lineHeight: 1.65,
                                maxWidth: 440,
                                marginBottom: 40,
                            }}
                        >
                            A wellness platform for women navigating life transitions with AI support, community, career tools, and government guidance.
                        </p>

                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                            <button
                                style={{
                                    background: '#2d1f3d',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 999,
                                    padding: '15px 36px',
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#1a1025'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,31,61,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#2d1f3d'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                                onClick={() => navigate('/signup')}
                            >
                                Get Started
                            </button>
                            <button
                                style={{
                                    background: 'rgba(255,255,255,0.7)',
                                    color: '#2d1f3d',
                                    border: '1.5px solid rgba(45,31,61,0.12)',
                                    borderRadius: 999,
                                    padding: '14px 34px',
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    backdropFilter: 'blur(8px)',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'none'; }}
                                onClick={() => navigate('/login')}
                            >
                                Already a User? Login
                            </button>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: CardSwap carousel ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                        transition={{ duration: 0.65, delay: 0.15, y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
                        style={{
                            position: 'relative',
                            height: 520,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ marginLeft: '-55px' }}>
                            <CardSwap
                                width={440}
                                height={300}
                                cardDistance={55}
                                verticalDistance={65}
                                delay={1500}
                                pauseOnHover
                                skewAmount={4}
                                easing="smooth"
                            >
                                {/* Card 1 — AI Therapist */}
                                <Card style={{
                                    background: 'linear-gradient(135deg, #fce8f0 0%, #f5c8dc 100%)',
                                    boxShadow: '0 16px 48px rgba(196,126,168,0.25)',
                                    border: '1px solid rgba(255,255,255,0.8)',
                                    padding: '28px 30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 12px rgba(196,126,168,0.2)' }}>
                                            <Brain size={22} color="#c47ea8" />
                                        </div>
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c47ea8' }}>AI Therapist</span>
                                    </div>
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2d1f3d', lineHeight: 1.3, marginBottom: 12 }}>
                                        Always here to listen &amp; support you
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c47ea8' }} />
                                        <span style={{ fontSize: 13, color: '#7a6b89', fontWeight: 500 }}>Available 24 / 7</span>
                                    </div>
                                </Card>

                                {/* Card 2 — Community */}
                                <Card style={{
                                    background: 'linear-gradient(135deg, #ede8fc 0%, #d8c7f5 100%)',
                                    boxShadow: '0 16px 48px rgba(155,126,200,0.25)',
                                    border: '1px solid rgba(255,255,255,0.8)',
                                    padding: '28px 30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 12px rgba(155,126,200,0.2)' }}>
                                            <Users size={22} color="#9b7ec8" />
                                        </div>
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b7ec8' }}>Community</span>
                                    </div>
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2d1f3d', lineHeight: 1.3, marginBottom: 12 }}>
                                        10,000+ women, one safe circle
                                    </p>
                                    <div style={{ display: 'flex' }}>
                                        {['#fce8f0', '#d8c7f5', '#fce8c0', '#c8f0e0'].map((c, i) => (
                                            <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid white', marginLeft: i === 0 ? 0 : -8 }} />
                                        ))}
                                        <span style={{ fontSize: 12, color: '#7a6b89', fontWeight: 600, marginLeft: 6, alignSelf: 'center' }}>+9.8k more</span>
                                    </div>
                                </Card>

                                {/* Card 3 — Freelancing */}
                                <Card style={{
                                    background: 'linear-gradient(135deg, #fef3e2 0%, #fde0b0 100%)',
                                    boxShadow: '0 16px 48px rgba(232,168,56,0.2)',
                                    border: '1px solid rgba(255,255,255,0.8)',
                                    padding: '28px 30px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 12px rgba(232,168,56,0.2)' }}>
                                            <Briefcase size={22} color="#d49030" />
                                        </div>
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d49030' }}>Freelancing</span>
                                    </div>
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2d1f3d', lineHeight: 1.3, marginBottom: 12 }}>
                                        500+ jobs matched to your skills
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Sparkles size={14} color="#d49030" />
                                        <span style={{ fontSize: 13, color: '#7a6b89', fontWeight: 500 }}>Remote &middot; Flexible &middot; Yours</span>
                                    </div>
                                </Card>
                            </CardSwap>
                        </div>
                    </motion.div>

                </div>


                {/* Bottom wave fade */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 80,
                    background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))',
                    pointerEvents: 'none',
                }} />
            </section>

            {/* ══════════════════════════════════════════
          FEATURES STRIP (4 cards below hero)
      ══════════════════════════════════════════ */}
            <section style={{ 
                position: 'relative',
                padding: '80px 32px',
                backgroundImage: 'url(/feature-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                {/* Light overlay to soften the heavy pink texture somewhat so text remains legible */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
                
                <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#c47ea8',
                            textAlign: 'center',
                            marginBottom: 12,
                        }}
                    >
                        Everything you need
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700,
                            fontSize: 'clamp(32px, 4vw, 52px)',
                            color: '#1a1025',
                            textAlign: 'center',
                            letterSpacing: '-0.5px',
                            marginBottom: 48,
                        }}
                    >
                        Built for every woman's journey
                    </motion.h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 32,
                        maxWidth: 1100,
                        margin: '0 auto',
                    }}>
                        {features.map((f, i) => (
                            <FeatureCard key={f.title} {...f} delay={0.1 + i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
          DAILY GOAL SECTION
      ══════════════════════════════════════════ */}
            <section style={{
                background: '#ecd2e2',
                minHeight: 'calc(100vh - 80px)',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Left — Full Bleed Dome Gallery Container */}
                <div style={{ width: '50%', position: 'relative' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ position: 'absolute', inset: 0 }}
                    >
                        <DomeGallery 
                            images={galleryImages}
                            overlayBlurColor="#ecd2e2"
                            grayscale={false}
                        />
                    </motion.div>
                </div>

                {/* Right — Content */}
                <div style={{
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '64px 8%'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        style={{ maxWidth: 500, width: '100%' }}
                    >
                        <h2 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700,
                            fontSize: 'clamp(32px, 4vw, 52px)',
                            color: '#1a1025',
                            letterSpacing: '-0.5px',
                            marginBottom: 36,
                        }}>
                            Daily wellness goal
                        </h2>

                        {/* Animated ring card */}
                        <div style={{
                            background: 'linear-gradient(135deg, #F5C2D4 0%, #D8C7F5 100%)',
                            borderRadius: 40,
                            padding: 48,
                            marginBottom: 24,
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 20 }}>
                                    <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="9" />
                                        <motion.circle
                                            initial={{ strokeDasharray: '0 264' }}
                                            whileInView={{ strokeDasharray: '198 264' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.6, ease: 'easeOut' }}
                                            cx="50" cy="50" r="42"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="9"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>Score</span>
                                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: 'white', lineHeight: 1 }}>75</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', fontWeight: 700, fontSize: 15 }}>
                                    View details <ChevronRight size={16} />
                                </div>
                            </div>
                            <div style={{ position: 'absolute', top: 20, right: 20, width: 8, height: 8, background: 'white', borderRadius: '50%' }} className="animate-pulse" />
                            <div style={{ position: 'absolute', bottom: 20, left: 20, width: 12, height: 12, background: 'rgba(255,255,255,0.45)', borderRadius: '50%' }} className="animate-pulse" />
                        </div>

                        {/* Tip card */}
                        <div style={{
                            background: 'rgba(245,194,212,0.15)',
                            borderRadius: 28,
                            padding: 28,
                            border: '1px solid rgba(245,194,212,0.5)',
                            display: 'flex',
                            gap: 20,
                            alignItems: 'flex-start',
                        }}>
                            <div style={{ background: 'white', padding: 10, borderRadius: 14, flexShrink: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                                <Zap size={18} color="#c47ea8" />
                            </div>
                            <div>
                                <p style={{ fontSize: 11, fontWeight: 700, color: '#c47ea8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Daily Inspiration</p>
                                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#4a3f5c', lineHeight: 1.55, fontStyle: 'italic' }}>
                                    "Every woman carries within her the power to reshape the world."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
          FEATURES DEEP DIVE
      ══════════════════════════════════════════ */}
            <section style={{ background: 'linear-gradient(180deg, #fff0f5 0%, #ffffff 100%)', padding: '100px 32px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: 72 }}
                    >
                        <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #f5d6e4, #c47ea8)', padding: '6px 20px', borderRadius: 99, fontSize: 12, fontWeight: 700, color: '#2d1f3d', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                            Everything You Need
                        </span>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, color: '#2d1f3d', lineHeight: 1.2, marginBottom: 20 }}>
                            Built for every woman,<br /><em style={{ fontWeight: 400, color: '#c47ea8' }}>at every stage.</em>
                        </h2>
                        <p style={{ fontSize: 18, color: '#7a6b89', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                            AadyaCircle is a unified platform combining mental wellness, professional growth, government support, and a thriving community — all in one safe space.
                        </p>
                    </motion.div>

                    {/* Feature Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                        {[
                            {
                                icon: Brain,
                                color: '#c47ea8',
                                bg: 'linear-gradient(135deg, #fff0f5, #fce8f0)',
                                title: 'AI Therapist',
                                subtitle: 'Your 24/7 Emotional Companion',
                                description: 'Talk freely with an empathetic AI therapist trained to support women through stress, anxiety, burnout, and emotional overwhelm. Speak via voice or type — Aadya is always listening without judgment.',
                                badges: ['Voice-to-Text', 'Text-to-Speech', 'Secure & Private']
                            },
                            {
                                icon: Activity,
                                color: '#9b59b6',
                                bg: 'linear-gradient(135deg, #f8f0ff, #f0e6ff)',
                                title: 'Sentiment Analysis',
                                subtitle: 'Understand Your Inner State',
                                description: 'Complete our clinically inspired 6-question assessment covering mood, stress, sleep, social support, cognitive focus, and anxiety. Receive a personalized wellness score and actionable guidance.',
                                badges: ['6-Domain Analysis', 'Wellness Score', 'Guided Insights']
                            },
                            {
                                icon: Briefcase,
                                color: '#e67e22',
                                bg: 'linear-gradient(135deg, #fff8f0, #ffeedc)',
                                title: 'Jobs For Her',
                                subtitle: 'Opportunities Curated for Women',
                                description: 'Browse verified full-time, part-time, freelance, and internship listings posted within the AadyaCircle network. Filter by role, skill, and salary — and apply with confidence.',
                                badges: ['Verified Listings', 'Skill Filters', 'Direct Apply']
                            },
                            {
                                icon: Sparkles,
                                color: '#27ae60',
                                bg: 'linear-gradient(135deg, #f0fff5, #dcfce7)',
                                title: 'Freelancer Directory',
                                subtitle: 'Showcase Your Expertise',
                                description: 'Create your womanlancer profile and get discovered by recruiters and founders within the network. Share your bio, skills, and rate — and let opportunities come to you.',
                                badges: ['Profile Listing', 'Skill Showcase', 'Hourly & Salary']
                            },
                            {
                                icon: Landmark,
                                color: '#2980b9',
                                bg: 'linear-gradient(135deg, #f0f8ff, #dbeafe)',
                                title: 'Government Schemes',
                                subtitle: 'Know Your Rights & Benefits',
                                description: 'Explore India\'s top welfare programs for women including Mudra Yojana, Stand Up India, Beti Bachao, and WEP — all curated in one place with eligibility info and direct portal links.',
                                badges: ['6+ Schemes', 'Eligibility Info', 'Direct Links']
                            },
                            {
                                icon: Shield,
                                color: '#c47ea8',
                                bg: 'linear-gradient(135deg, #fff0f5, #fce8f0)',
                                title: 'Role-Based Access',
                                subtitle: 'Personalised From Day One',
                                description: 'AadyaCircle uses biometric facial recognition to intelligently assign your role at signup. Womanlancers get access to all features, while every user gets a safe, personalised experience.',
                                badges: ['Face Verification', 'Auto Role Assign', 'Privacy First']
                            },
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    style={{
                                        background: feature.bg,
                                        borderRadius: 28,
                                        padding: '36px 32px',
                                        border: '1px solid rgba(196,126,168,0.15)',
                                        cursor: 'default',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                    whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(196,126,168,0.2)' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 20 }}>
                                        <div style={{ background: 'white', padding: 14, borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.07)', flexShrink: 0 }}>
                                            <Icon size={26} color={feature.color} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2d1f3d', marginBottom: 4 }}>{feature.title}</h3>
                                            <p style={{ fontSize: 12, fontWeight: 600, color: feature.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{feature.subtitle}</p>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: 15, color: '#5a4f6a', lineHeight: 1.75, marginBottom: 24 }}>
                                        {feature.description}
                                    </p>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {feature.badges.map((badge, bIdx) => (
                                            <span key={bIdx} style={{
                                                background: 'white',
                                                color: '#4a3f5c',
                                                fontSize: 11,
                                                fontWeight: 700,
                                                padding: '5px 12px',
                                                borderRadius: 99,
                                                border: '1px solid rgba(196,126,168,0.25)',
                                                letterSpacing: '0.05em'
                                            }}>{badge}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                            marginTop: 72,
                            background: 'linear-gradient(135deg, #2d1f3d, #4a3f5c)',
                            borderRadius: 32,
                            padding: '56px 48px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(196,126,168,0.12)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(196,126,168,0.08)', pointerEvents: 'none' }} />
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: 'white', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                            Ready to begin your journey?
                        </h3>
                        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>
                            Join thousands of women who have already found their community, their confidence, and their career on AadyaCircle.
                        </p>
                        <button
                            onClick={() => window.location.href = '/signup'}
                            style={{
                                background: '#c47ea8',
                                color: '#1a1025',
                                border: 'none',
                                padding: '16px 40px',
                                borderRadius: 99,
                                fontSize: 16,
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10,
                                transition: 'all 0.25s ease',
                                position: 'relative',
                                zIndex: 1
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#f5d6e4'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#c47ea8'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            Create Your Account <ArrowRight size={18} />
                        </button>
                    </motion.div>

                </div>
            </section>

            {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
            <footer style={{ background: '#1a1025', padding: '48px 32px' }}>
                <div style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                }}>
                    <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: 22,
                        color: 'white',
                        fontStyle: 'italic',
                    }}>aadyaCircle</span>
                    <div style={{ display: 'flex', gap: 32 }}>
                        {['Privacy', 'Terms', 'Contact'].map(l => (
                            <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.target.style.color = 'white'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                            >{l}</a>
                        ))}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>© 2026 aadyaCircle. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
}
