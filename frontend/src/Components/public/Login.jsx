import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import BorderGlow from '../Generic/BorderGlow';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://app.totalchaos.online/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: credentials.email,
                    password: credentials.password
                })
            });
            
            if (!response.ok) {
                const text = await response.text();
                throw new Error("Login failed: " + text);
            }

            const data = await response.json();
            console.log("Login successful", data);

            // Dynamically scan payload for matching token signature
            const finalToken = data.token || data.access_token || data.jwt || (typeof data === 'string' ? data : null);
            if (finalToken) {
                login(finalToken);
            } else {
                console.warn("Could not find mapped token identifier in payload", data);
                if (typeof data === 'object') alert('Login token key mismatch! Incoming payload keys: ' + Object.keys(data).join(', '));
            }

            // Redirect to dashboard explicitly
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #fce8f0 0%, #f9dde8 40%, #f5d6e4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
        }}>
            {/* Background Texture similar to Landing */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.15, pointerEvents: 'none'
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 10 }}
            >
                {/* Logo top center hidden behind glow until hovered, or maybe separated? Let's separate it! */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: '#1a1025' }}>
                            aadya<span style={{ fontWeight: 400, fontStyle: 'italic' }}>Circle</span>
                        </span>
                    </Link>
                </div>

                <BorderGlow
                    backgroundColor="#ffffff"
                    glowColor="330 80 70"
                    animated={true}
                    className="w-full rounded-[2rem] shadow-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                >
                    <div style={{
                        padding: '48px 36px',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(16px)',
                        height: '100%'
                    }}>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2d1f3d', marginBottom: '8px', textAlign: 'center', letterSpacing: '-0.5px' }}>
                            Welcome back
                        </h1>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7a6b89', textAlign: 'center', marginBottom: '36px' }}>
                            Step back into your safe circle.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            <div>
                                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4a3f5c', marginBottom: 8 }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} color="#9b8ba9" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        style={{
                                            width: '100%', padding: '14px 16px 14px 44px',
                                            borderRadius: '12px', border: '1px solid rgba(155,139,169,0.3)',
                                            background: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: 15,
                                            color: '#2d1f3d', outline: 'none', transition: 'border-color 0.2s'
                                        }}
                                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4a3f5c' }}>Password</label>
                                    <a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#c47ea8', textDecoration: 'none' }}>Forgot password?</a>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} color="#9b8ba9" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%', padding: '14px 16px 14px 44px',
                                            borderRadius: '12px', border: '1px solid rgba(155,139,169,0.3)',
                                            background: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: 15,
                                            color: '#2d1f3d', outline: 'none'
                                        }}
                                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{ color: '#e03131', fontSize: 14, fontFamily: "'Inter', sans-serif", textAlign: 'center', background: '#ffe3e3', padding: '10px', borderRadius: '8px', border: '1px solid #ffa8a8', marginTop: 4 }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    marginTop: '8px', width: '100%', background: '#2d1f3d', color: '#ffffff',
                                    borderRadius: '99px', padding: '16px', fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600,
                                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                                    transition: 'background 0.2s', opacity: loading ? 0.7 : 1
                                }}
                                onMouseEnter={e => !loading && (e.currentTarget.style.background = '#1a1025')}
                                onMouseLeave={e => !loading && (e.currentTarget.style.background = '#2d1f3d')}
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
                            </button>
                        </form>

                        <p style={{ marginTop: '32px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7a6b89', textAlign: 'center' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ fontWeight: 700, color: '#c47ea8', textDecoration: 'none' }}>Join aadyaCircle</Link>
                        </p>
                    </div>
                </BorderGlow>
            </motion.div>
        </div>
    );
}
