import React, { useState, useEffect } from 'react';
import { Plus, X, Loader2, Sparkles, UserCircle, Briefcase, MapPin, DollarSign } from 'lucide-react';
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
            // Strictly cast arrays and integers for Python backend parser
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
            alert("Freelancer profile published successfully!");
            fetchFreelancers(); // Refresh the dynamic listing
        } catch (err) {
            console.error(err);
            alert("Error posting profile: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full h-full relative">
            {/* Main Content Board */}
            <div className={`w-full h-full rounded-2xl border p-6 flex flex-col shadow-lg transition-colors overflow-y-auto duration-500 ${isDarkMode ? 'border-[#333]/50 bg-[#0a0a0a]/50 backdrop-blur-md' : 'border-[#c47ea8]/20 bg-white/30 backdrop-blur-md'}`}>
                
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#c47ea8]/20' : 'bg-[#fff0f5]'}`}>
                        <Sparkles size={24} className="text-[#c47ea8]" />
                    </div>
                    <div>
                        <h3 className={`text-2xl font-bold font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Freelancer Directory</h3>
                        <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>Discover specialized womanlancer profiles or advertise your own services to the network.</p>
                    </div>
                </div>

                {isLoadingProfiles ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 size={40} className="animate-spin text-[#c47ea8] mb-4" />
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Loading freelancer directory...</p>
                    </div>
                ) : freelancers.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <UserCircle size={48} className="text-[#c47ea8]/40 mb-4" />
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No profiles available yet</h3>
                        <p className={isDarkMode ? 'text-gray-400 max-w-md' : 'text-gray-600 max-w-md'}>Click the + icon in the bottom left corner to create your freelancer listing and stand out in the network.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-20">
                        {freelancers.map((profile, idx) => (
                            <div key={profile.id || idx} className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#1a1a1a]/80 border-[#333] hover:border-[#c47ea8]/50' : 'bg-white/80 border-gray-200 hover:border-[#c47ea8]/50'}`}>
                                <div className="flex items-start justify-between mb-3">
                                    <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{profile.title}</h4>
                                    {profile.hourly_rate ? (
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-600'}`}>
                                            ${profile.hourly_rate} / hr
                                        </span>
                                    ) : null}
                                </div>
                                <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{profile.bio}</p>
                                
                                <div className="flex gap-4 text-sm mb-4">
                                    {profile.expected_salary ? (
                                        <div className={`flex items-center gap-1.5 font-semibold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                            <Briefcase size={14} /> Expected Salary: ${profile.expected_salary}/yr
                                        </div>
                                    ) : null}
                                </div>

                                {profile.skills && profile.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-dashed border-[#c47ea8]/20">
                                        {profile.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className={`text-xs px-2 py-1 rounded-md ${isDarkMode ? 'bg-[#333] text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Action Button (Bottom Left) */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-6 left-6 p-4 rounded-full bg-[#c47ea8] text-[#1a1025] shadow-xl hover:bg-[#a9668e] hover:scale-105 hover:-translate-y-1 transition-all flex items-center justify-center z-20 group"
            >
                <Plus size={24} />
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[155px] transition-all duration-300 ease-in-out font-semibold group-hover:ml-2">Add Freelance Profile</span>
            </button>

            {/* Modal Overlay for Freelancer Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                    <div className={`w-full max-w-lg rounded-2xl p-6 relative shadow-2xl transition-colors max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#1a1a1a] border border-[#333]' : 'bg-white border border-gray-100'}`}>
                        <button onClick={() => setIsModalOpen(false)} className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#333] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                            <X size={20} />
                        </button>
                        
                        <h2 className={`text-xl font-bold mb-6 font-serif flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <UserCircle className="text-[#c47ea8]" /> Create Freelance Profile
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Professional Title *</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. Senior Frontend Developer & UI Designer" />
                            </div>
                            
                            <div>
                                <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bio *</label>
                                <textarea required rows="4" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors resize-none ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="Summarize your professional experience, goals, and expertise..."></textarea>
                            </div>

                            <div>
                                <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Required Skills (comma separated) *</label>
                                <input required type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. React, Python, UI/UX, Backend APIs" />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hourly Rate ($)</label>
                                    <input type="number" min="0" required value={formData.hourly_rate} onChange={e => setFormData({...formData, hourly_rate: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. 45" />
                                </div>
                                <div className="flex-1">
                                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expected Salary ($)</label>
                                    <input type="number" min="0" required value={formData.expected_salary} onChange={e => setFormData({...formData, expected_salary: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. 85000" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button disabled={isSubmitting} type="submit" className={`w-full py-3 rounded-lg bg-[#c47ea8] hover:bg-[#a9668e] text-[#1a1025] font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}>
                                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Publish Freelance Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
