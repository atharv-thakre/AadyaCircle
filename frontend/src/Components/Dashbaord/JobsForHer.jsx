import React, { useState, useEffect } from 'react';
import { Plus, X, Briefcase, Loader2, MapPin, IndianRupee, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function JobsForHer({ isDarkMode }) {
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ 
        title: '', description: '', job_type: 'full-time', 
        skills: '', company: '', location: '', salary: '' 
    });

    const [jobs, setJobs] = useState([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);

    const fetchJobs = async () => {
        try {
            setIsLoadingJobs(true);
            const response = await fetch("https://app.totalchaos.online/jobs/show", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Failed to fetch jobs");
            const data = await response.json();
            // Expected backend data structure may vary, fallback mapping wrapper:
            setJobs(Array.isArray(data) ? data : data.jobs || []);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        } finally {
            setIsLoadingJobs(false);
        }
    };

    useEffect(() => {
        if (token) fetchJobs();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Strictly cast arrays and integers for Python backend parser
            const payload = {
                title: formData.title,
                description: formData.description,
                job_type: formData.job_type,
                company: formData.company,
                location: formData.location,
                salary: Number(formData.salary) || 0,
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
            };

            const response = await fetch("https://app.totalchaos.online/jobs/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error("Failed to post job");
            
            setIsModalOpen(false);
            setFormData({ 
                title: '', description: '', job_type: 'full-time', 
                skills: '', company: '', location: '', salary: '' 
            });
            alert("Job posted successfully!");
            fetchJobs(); // Refresh the listing dynamically
        } catch (err) {
            console.error(err);
            alert("Error posting job: " + err.message);
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
                        <Briefcase size={24} className="text-[#c47ea8]" />
                    </div>
                    <div>
                        <h3 className={`text-2xl font-bold font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Jobs For Her</h3>
                        <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>Available freelance and full-time contracts explicitly matched for you.</p>
                    </div>
                </div>

                {isLoadingJobs ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 size={40} className="animate-spin text-[#c47ea8] mb-4" />
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Loading network opportunities...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <Briefcase size={48} className="text-[#c47ea8]/40 mb-4" />
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>No opportunities posted yet</h3>
                        <p className={isDarkMode ? 'text-gray-400 max-w-md' : 'text-gray-600 max-w-md'}>Be the first to post a new job opportunity dynamically to the network by clicking the floating icon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-20">
                        {jobs.map((job, idx) => (
                            <div key={job.ref || idx} className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#1a1a1a]/80 border-[#333] hover:border-[#c47ea8]/50' : 'bg-white/80 border-gray-200 hover:border-[#c47ea8]/50'}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h4>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${isDarkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
                                        {job.job_type}
                                    </span>
                                </div>
                                <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.description}</p>
                                
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
                                    {job.company && (
                                        <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            <Building2 size={14} className="text-[#c47ea8]" /> {job.company}
                                        </div>
                                    )}
                                    {job.location && (
                                        <div className={`flex items-center gap-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            <MapPin size={14} className="text-[#c47ea8]" /> {job.location}
                                        </div>
                                    )}
                                    {job.salary ? (
                                        <div className={`flex items-center gap-1.5 font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                            <IndianRupee size={14} /> {job.salary}
                                        </div>
                                    ) : null}
                                </div>

                                {job.skills && job.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-3 border-t border-dashed border-[#c47ea8]/20">
                                        {job.skills.map((skill, sIdx) => (
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
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] transition-all duration-300 ease-in-out font-semibold group-hover:ml-2">Post Job</span>
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
                    <div className={`w-full max-w-lg rounded-2xl p-6 relative shadow-2xl transition-colors max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-[#1a1a1a] border border-[#333]' : 'bg-white border border-gray-100'}`}>
                        <button onClick={() => setIsModalOpen(false)} className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-[#333] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                            <X size={20} />
                        </button>
                        
                        <h2 className={`text-xl font-bold mb-6 font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create Job Posting</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Title *</label>
                                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. Senior Frontend Engineer" />
                            </div>
                            
                            <div>
                                <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description *</label>
                                <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors resize-none ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="Provide project details..."></textarea>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Job Type</label>
                                    <select value={formData.job_type} onChange={e => setFormData({...formData, job_type: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`}>
                                        <option value="full-time">Full-Time</option>
                                        <option value="part-time">Part-Time</option>
                                        <option value="freelance">Freelance</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Target Salary (₹)</label>
                                    <input type="number" min="0" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. 75000" />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Company Name</label>
                                    <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. Stripe" />
                                </div>
                                <div className="flex-1">
                                    <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. New York, USA" />
                                </div>
                            </div>

                            <div>
                                <label className={`block text-xs font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Required Skills (comma separated)</label>
                                <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${isDarkMode ? 'bg-[#111] border-[#333] text-white focus:border-[#c47ea8]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-[#c47ea8]'}`} placeholder="e.g. React, Python, UI Design" />
                            </div>

                            <div className="pt-4">
                                <button disabled={isSubmitting} type="submit" className={`w-full py-3 rounded-lg bg-[#c47ea8] hover:bg-[#a9668e] text-[#1a1025] font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}>
                                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Publish Job Listing'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
