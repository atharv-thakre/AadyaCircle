import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Loader2, Sparkles, UserCircle, Briefcase, MapPin, IndianRupee, CreditCard, CheckCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Freelance({ isDarkMode }) {
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ 
        title: '', bio: '', skills: '', hourly_rate: '', expected_salary: '' 
    });

    const [freelancers, setFreelancers] = useState([]);
    const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);

    // Hire Flow State
    const [selectedFreelancer, setSelectedFreelancer] = useState(null);
    const [hireStep, setHireStep] = useState(0); // 0: Close, 1: Amount, 2: Checkout, 3: Processing, 4: Success
    const [projectAmount, setProjectAmount] = useState('');

    const fetchFreelancers = async () => {
        try {
            setIsLoadingProfiles(true);
            const response = await fetch("https://app.totalchaos.online/freelancer/show", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Failed to fetch freelancer profiles");
            const data = await response.json();
            setFreelancers(Array.isArray(data) ? data : data.profiles || data.freelancers || []);
        } catch (err) {
            console.error("Error fetching freelancers:", err);
        } finally {
            setIsLoadingProfiles(false);
        }
    };

    useEffect(() => {
        if (token) fetchFreelancers();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = {
                title: formData.title,
                bio: formData.bio,
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
                hourly_rate: Number(formData.hourly_rate) || 0,
                expected_salary: Number(formData.expected_salary) || 0
            };

            const response = await fetch("https://app.totalchaos.online/freelancer/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error("Failed to post freelancer profile");
            
            setIsModalOpen(false);
            setFormData({ 
                title: '', bio: '', skills: '', hourly_rate: '', expected_salary: '' 
            });
            fetchFreelancers();
        } catch (err) {
            console.error(err);
            alert("Error: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleHireClick = (freelancer) => {
        setSelectedFreelancer(freelancer);
        setHireStep(1);
        setProjectAmount('');
    };

    const proceedToCheckout = () => {
        if (!projectAmount || isNaN(projectAmount) || Number(projectAmount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        setHireStep(2);
    };

    const startPayment = () => {
        setHireStep(3);
        setTimeout(() => {
            setHireStep(4);
        }, 2500);
    };

    return (
        <div className="w-full h-full relative">
            {/* Main Content Board */}
            <div className={`w-full h-full rounded-2xl border p-6 flex flex-col shadow-lg transition-colors overflow-y-auto no-scrollbar duration-500 ${isDarkMode ? 'border-[#333]/50 bg-[#0a0a0a]/50 backdrop-blur-md' : 'border-[#c47ea8]/20 bg-white/30 backdrop-blur-md'}`}>
                
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#c47ea8]/20' : 'bg-[#fff0f5]'}`}>
                            <Sparkles size={24} className="text-[#c47ea8]" />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Freelancer Directory</h3>
                            <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>Empower your projects with top-tier talent.</p>
                        </div>
                    </div>
                </div>

                {isLoadingProfiles ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 size={40} className="animate-spin text-[#c47ea8] mb-4" />
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Searching for experts...</p>
                    </div>
                ) : freelancers.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <UserCircle size={48} className="text-[#c47ea8]/40 mb-4" />
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No profiles available</h3>
                        <p className={isDarkMode ? 'text-gray-400 max-w-md' : 'text-gray-600 max-w-md'}>Be the first to showcase your skills by clicking the + button.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-24">
                        {freelancers.map((profile, idx) => (
                            <motion.div 
                                key={profile.id || idx} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`p-6 rounded-3xl border transition-all hover:shadow-2xl ${isDarkMode ? 'bg-[#1a1a1a]/80 border-[#333] hover:border-[#c47ea8]/50' : 'bg-white/80 border-[#c47ea8]/10 hover:border-[#c47ea8]/30 shadow-sm'}`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1 pr-4">
                                        <h4 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{profile.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-[#c47ea8]/10 text-[#c47ea8] uppercase tracking-wider`}>Verified Expert</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#c47ea8]'}`}>
                                            ₹{profile.hourly_rate || '0'}
                                            <span className="text-xs font-normal opacity-60"> / hr</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={`text-sm mb-6 line-clamp-2 italic leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>"{profile.bio}"</p>
                                
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {(profile.skills || []).slice(0, 3).map((skill, sIdx) => (
                                        <span key={sIdx} className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-[#c47ea8]/5 text-gray-700'}`}>
                                            {skill}
                                        </span>
                                    ))}
                                    {profile.skills?.length > 3 && (
                                        <span className="text-[10px] font-bold px-2 py-1 opacity-40">+{profile.skills.length - 3} more</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-dashed border-[#c47ea8]/10">
                                    <div className="flex items-center gap-1.5 text-xs opacity-60">
                                        <Briefcase size={14} /> 
                                        ₹{(profile.expected_salary/1000).toFixed(0)}k/year
                                    </div>
                                    <button 
                                        onClick={() => handleHireClick(profile)}
                                        className={`px-6 py-2 rounded-2xl text-xs font-bold transition-all ${isDarkMode ? 'bg-[#c47ea8] text-[#1a1025] hover:bg-[#a9668e]' : 'bg-[#c47ea8] text-white hover:shadow-lg shadow-[#c47ea8]/20 hover:scale-105 active:scale-95'}`}
                                    >
                                        Hire Expert
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-6 right-6 p-4 rounded-full bg-gradient-to-br from-[#c47ea8] to-purple-600 text-white shadow-2xl hover:scale-110 active:rotate-12 transition-all flex items-center justify-center z-20 group"
            >
                <Plus size={28} />
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[200px] transition-all duration-500 ease-in-out font-bold group-hover:ml-3">List Your Services</span>
            </button>

            {/* Modals Container */}
            <AnimatePresence>
                {/* Create Profile Modal */}
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.9 }}
                            animate={{ y: 0, scale: 1 }}
                            exit={{ y: 50, scale: 0.9 }}
                            className={`w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-[#111] border border-white/10' : 'bg-white'}`}
                        >
                            <button onClick={() => setIsModalOpen(false)} className={`absolute top-8 right-8 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                                <X size={24} />
                            </button>
                            
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold font-serif italic mb-2">Create Listing</h2>
                                <p className="text-sm opacity-50">Join our network of elite professionals.</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={`peer w-full px-5 py-4 pt-6 rounded-2xl border text-sm focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-[#c47ea8]' : 'bg-gray-50 border-[#c47ea8]/10 focus:border-[#c47ea8]'}`} placeholder=" " />
                                        <label className="absolute left-5 top-2 text-[10px] font-bold uppercase tracking-widest text-[#c47ea8]">Professional Title</label>
                                    </div>
                                    
                                    <div className="relative">
                                        <textarea required rows="3" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className={`peer w-full px-5 py-4 pt-6 rounded-2xl border text-sm focus:outline-none transition-all resize-none ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-[#c47ea8]' : 'bg-gray-50 border-[#c47ea8]/10 focus:border-[#c47ea8]'}`} placeholder=" " />
                                        <label className="absolute left-5 top-2 text-[10px] font-bold uppercase tracking-widest text-[#c47ea8]">Biography / Pitch</label>
                                    </div>

                                    <div className="relative">
                                        <input required type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className={`peer w-full px-5 py-4 pt-6 rounded-2xl border text-sm focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-[#c47ea8]' : 'bg-gray-50 border-[#c47ea8]/10 focus:border-[#c47ea8]'}`} placeholder=" " />
                                        <label className="absolute left-5 top-2 text-[10px] font-bold uppercase tracking-widest text-[#c47ea8]">Skills (Comma Separated)</label>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1 relative">
                                            <input type="number" required value={formData.hourly_rate} onChange={e => setFormData({...formData, hourly_rate: e.target.value})} className={`peer w-full px-5 py-4 pt-6 rounded-2xl border text-sm focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-[#c47ea8]' : 'bg-gray-50 border-[#c47ea8]/10 focus:border-[#c47ea8]'}`} placeholder=" " />
                                            <label className="absolute left-5 top-2 text-[10px] font-bold uppercase tracking-widest text-[#c47ea8]">Hourly (₹)</label>
                                        </div>
                                        <div className="flex-1 relative">
                                            <input type="number" required value={formData.expected_salary} onChange={e => setFormData({...formData, expected_salary: e.target.value})} className={`peer w-full px-5 py-4 pt-6 rounded-2xl border text-sm focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-[#c47ea8]' : 'bg-gray-50 border-[#c47ea8]/10 focus:border-[#c47ea8]'}`} placeholder=" " />
                                            <label className="absolute left-5 top-2 text-[10px] font-bold uppercase tracking-widest text-[#c47ea8]">Yearly (₹)</label>
                                        </div>
                                    </div>
                                </div>

                                <button disabled={isSubmitting} type="submit" className={`w-full py-5 rounded-3xl bg-[#c47ea8] text-white font-bold shadow-2xl shadow-[#c47ea8]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70' : ''}`}>
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Publish Profile</>}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

                {/* Hire Flow Modal */}
                {hireStep > 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                    >
                        <motion.div 
                            layout
                            className={`w-full max-w-md rounded-[3rem] p-10 relative shadow-2xl border ${isDarkMode ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-transparent'}`}
                        >
                            {hireStep < 4 && (
                                <button onClick={() => setHireStep(0)} className="absolute top-8 right-8 p-2 rounded-full hover:bg-black/5">
                                    <X size={24} />
                                </button>
                            )}

                            <AnimatePresence mode="wait">
                                {hireStep === 1 && (
                                    <motion.div 
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <div className="w-16 h-16 rounded-3xl bg-[#c47ea8]/10 flex items-center justify-center mb-6">
                                                <Briefcase size={32} className="text-[#c47ea8]" />
                                            </div>
                                            <h2 className="text-3xl font-bold font-serif italic">Hire Expert</h2>
                                            <p className="text-gray-500 text-sm mt-1">Hiring <span className="text-[#c47ea8] font-bold">{selectedFreelancer?.title}</span></p>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={projectAmount}
                                                    onChange={e => setProjectAmount(e.target.value)}
                                                    className={`w-full text-4xl font-bold px-4 py-8 rounded-3xl border-2 text-center focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-[#c47ea8]' : 'bg-gray-50 border-[#c47ea8]/10 focus:border-[#c47ea8]'}`}
                                                    placeholder="0.00"
                                                />
                                                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-[#c47ea8]">Enter Project Budget (₹)</div>
                                            </div>
                                            <button 
                                                onClick={proceedToCheckout}
                                                className="w-full py-5 rounded-full bg-[#c47ea8] text-white font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                                            >
                                                Proceed to Checkout <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {hireStep === 2 && (
                                    <motion.div 
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-bold">Review & Pay</h2>
                                            <p className="text-sm opacity-50">40% advance required to start.</p>
                                        </div>

                                        <div className={`p-8 rounded-[2rem] space-y-4 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                            <div className="flex justify-between items-center opacity-60">
                                                <span>Total Project Value</span>
                                                <span className="font-bold">₹{Number(projectAmount).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-lg font-bold text-[#c47ea8]">
                                                <span>Advance (40%)</span>
                                                <span>₹{(Number(projectAmount) * 0.4).toLocaleString()}</span>
                                            </div>
                                            <div className="pt-4 border-t border-dashed border-[#c47ea8]/20 flex justify-between items-center text-xs opacity-50">
                                                <span>Remaining (60%)</span>
                                                <span>₹{(Number(projectAmount) * 0.6).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <button onClick={startPayment} className="w-full py-5 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-all">
                                                <CreditCard size={20} /> Pay Advance Advance
                                            </button>
                                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase opacity-40">
                                                <ShieldCheck size={12} /> Encrypted Secure Payment
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {hireStep === 3 && (
                                    <motion.div 
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="relative">
                                            <Loader2 size={80} className="text-[#c47ea8] animate-spin" />
                                            <CreditCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold italic">Processing Advance...</h3>
                                            <p className="text-sm opacity-50 mt-1">Securing funds in escrow account.</p>
                                        </div>
                                    </motion.div>
                                )}

                                {hireStep === 4 && (
                                    <motion.div 
                                        key="step4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="py-6 space-y-8 text-center"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-2xl shadow-green-500/20 mb-6">
                                                <CheckCircle size={48} className="text-white" />
                                            </div>
                                            <h2 className="text-3xl font-bold font-serif italic text-green-500">Payment Success!</h2>
                                            <p className="text-sm opacity-60 mt-2">Expert has been notified of your hire.</p>
                                        </div>

                                        <div className={`p-8 rounded-[2rem] space-y-3 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50 border border-green-500/10'}`}>
                                            <div className="flex justify-between text-xs opacity-60">
                                                <span>Amount Paid (40%)</span>
                                                <span className="font-bold text-green-500">₹{(Number(projectAmount) * 0.4).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-xs opacity-60">
                                                <span>Remaining Due</span>
                                                <span className="font-bold">₹{(Number(projectAmount) * 0.6).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button onClick={() => setHireStep(0)} className="w-full py-5 rounded-full bg-black text-white font-bold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all">
                                            Back to Directory
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
