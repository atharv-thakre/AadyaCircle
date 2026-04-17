import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Brain, HeartHandshake, ShieldCheck, Target, ArrowLeft } from 'lucide-react';
import BorderGlow from '../Generic/BorderGlow';

export default function About() {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #fce8f0 0%, #f9dde8 40%, #f5d6e4 100%)',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Background Texture similar to Landing */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.15, pointerEvents: 'none', zIndex: 0
            }} />

            {/* Simple Top Navigation */}
            <nav style={{
                position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '24px 8%', maxWidth: '1440px', margin: '0 auto'
            }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: '#1a1025', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={24} color="#6b5b7f" style={{ cursor: 'pointer' }}/>
                        <span>aadya<span style={{ fontWeight: 400, fontStyle: 'italic' }}>Circle</span></span>
                    </div>
                </Link>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <Link to="/login" style={{ textDecoration: 'none', color: '#4a3f5c', fontWeight: 600 }}>Login</Link>
                    <Link to="/signup" style={{ textDecoration: 'none', color: '#c47ea8', fontWeight: 700 }}>Get Started</Link>
                </div>
            </nav>

            <main style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', padding: '64px 8% 120px 8%' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 900, color: '#1a1025', marginBottom: '24px', lineHeight: 1.1 }}>
                        Empowering <span style={{ fontStyle: 'italic', color: '#c47ea8' }}>women</span>,<br/> one connection at a time.
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#6b5b7f', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto', fontWeight: 500 }}>
                        Our platform is built with a simple yet powerful vision—to create a safe, supportive, and empowering digital space for women. We aim to address the everyday challenges women face by bringing together emotional support, community connection, career opportunities, and essential resources into one unified platform.
                    </p>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {/* Feature 1 */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <BorderGlow animated={true} backgroundColor="rgba(255, 255, 255, 0.6)" glowColor="330 80 70" className="rounded-[24px]">
                            <div style={{ padding: '40px', display: 'flex', gap: '32px', alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
                                <div style={{ background: '#f5d6e4', padding: '16px', borderRadius: '20px', color: '#c47ea8' }}>
                                    <Brain size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2d1f3d', marginBottom: '16px' }}>AI-Powered Support</h3>
                                    <p style={{ color: '#5a4d6b', fontSize: '1.1rem', lineHeight: 1.7 }}>
                                        At the heart of our system is an AI-powered therapist that provides instant, private, and accessible emotional support. By using intelligent conversations, the platform helps users cope with stress, anxiety, and personal challenges, ensuring that support is always available whenever it is needed.
                                    </p>
                                </div>
                            </div>
                        </BorderGlow>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <BorderGlow animated={true} backgroundColor="rgba(255, 255, 255, 0.6)" glowColor="330 80 70" className="rounded-[24px]">
                            <div style={{ padding: '40px', display: 'flex', gap: '32px', alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
                                <div style={{ background: '#f5d6e4', padding: '16px', borderRadius: '20px', color: '#c47ea8' }}>
                                    <HeartHandshake size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2d1f3d', marginBottom: '16px' }}>Social & Economic Independence</h3>
                                    <p style={{ color: '#5a4d6b', fontSize: '1.1rem', lineHeight: 1.7 }}>
                                        Beyond emotional well-being, we believe in empowering women socially and economically. Our community platform allows users to share experiences, connect with like-minded individuals, and build a strong support network. At the same time, our freelancing module opens doors to flexible job opportunities, helping women achieve financial independence and professional growth.
                                    </p>
                                </div>
                            </div>
                        </BorderGlow>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <BorderGlow animated={true} backgroundColor="rgba(255, 255, 255, 0.6)" glowColor="330 80 70" className="rounded-[24px]">
                            <div style={{ padding: '40px', display: 'flex', gap: '32px', alignItems: 'flex-start', backdropFilter: 'blur(10px)' }}>
                                <div style={{ background: '#f5d6e4', padding: '16px', borderRadius: '20px', color: '#c47ea8' }}>
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2d1f3d', marginBottom: '16px' }}>Welfare & Resources</h3>
                                    <p style={{ color: '#5a4d6b', fontSize: '1.1rem', lineHeight: 1.7 }}>
                                        We also bridge the gap in awareness by providing clear and organized information about welfare schemes and resources, enabling users to make informed decisions and access the support they deserve.
                                    </p>
                                </div>
                            </div>
                        </BorderGlow>
                    </motion.div>
                </div>

                {/* Final CTA / Stats Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6, delay: 0.4 }}
                    style={{ marginTop: '80px', textAlign: 'center', background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)', padding: '80px 40px', borderRadius: '32px', color: 'white', position: 'relative', overflow: 'hidden' }}
                >
                    {/* Dotted Texture Background */}
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
                    
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.5px' }}>
                            AadyaCircle: Empowering Women Everywhere
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', marginBottom: '64px', fontWeight: 400 }}>
                            Freelance, AadyaAI, Support, Community – All in One Place
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '32px', marginBottom: '64px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '4px', letterSpacing: '-1px' }}>100+</div>
                                <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>Opportunities</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '4px', letterSpacing: '-1px' }}>24/7</div>
                                <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>AadyaAI Support</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '4px', letterSpacing: '-1px' }}>100%</div>
                                <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>Strong Community</div>
                            </div>
                        </div>

                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <button style={{ 
                                background: '#111', color: 'white', padding: '16px 40px', borderRadius: '12px', 
                                border: 'none', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.2s ease', boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
                            >
                                Join AadyaCircle
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
