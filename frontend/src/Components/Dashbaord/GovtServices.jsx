import React from 'react';
import { Landmark, ArrowRight, ShieldCheck, Banknote, BookOpen, BriefcaseBusiness, Globe, ExternalLink } from 'lucide-react';

export default function GovernmentSchemes({ isDarkMode }) {
    const schemes = [
        {
            title: "Mudra Yojana Scheme for Women",
            category: "Financial Support",
            icon: <Banknote size={24} className="text-green-500" />,
            description: "Provides financial loans to women entrepreneurs aiming to start or expand small-scale businesses, offering up to ₹10 Lakhs without heavy collateral restrictions.",
            eligibility: "Women Entrepreneurs & SME Owners",
            linkType: "Apply Now"
        },
        {
            title: "Mahila E-Haat",
            category: "Digital Business",
            icon: <Globe size={24} className="text-blue-500" />,
            description: "An online marketing platform directly connecting women entrepreneurs, self-help groups, and NGOs to buyers nationwide for direct digital commerce.",
            eligibility: "Women artisans and SHGs",
            linkType: "Portal Access"
        },
        {
            title: "Beti Bachao Beti Padhao",
            category: "Education & Welfare",
            icon: <BookOpen size={24} className="text-pink-500" />,
            description: "A flagship developmental program focused on generating awareness and improving the efficiency of welfare services intended for girls and women across India.",
            eligibility: "All female citizens",
            linkType: "Learn More"
        },
        {
            title: "Stand Up India Scheme",
            category: "Capital Finance",
            icon: <BriefcaseBusiness size={24} className="text-purple-500" />,
            description: "Facilitates bank loans between ₹10 Lakhs and ₹1 Crore for setting up greenfield enterprises in the manufacturing, services, or trading sector.",
            eligibility: "Women establishing new enterprises",
            linkType: "Verify Status"
        },
        {
            title: "Pradhan Mantri Matru Vandana Yojana",
            category: "Health & Maternity",
            icon: <ShieldCheck size={24} className="text-rose-500" />,
            description: "A maternity benefit program providing direct cash subsidies to pregnant and lactating women to compensate for wage loss and ensure proper nutrition.",
            eligibility: "First-time pregnant women",
            linkType: "Resource Form"
        },
        {
            title: "Women Entrepreneurship Platform (WEP)",
            category: "Networking & Growth",
            icon: <Landmark size={24} className="text-[#c47ea8]" />,
            description: "A unified portal run by NITI Aayog that helps women realize their entrepreneurial aspirations by providing networking, mentorship, and scaling support.",
            eligibility: "Aspiring/established women founders",
            linkType: "Connect Here"
        }
    ];

    return (
        <div className="w-full h-full relative">
            <div className={`w-full h-full rounded-2xl border p-6 flex flex-col shadow-lg transition-colors overflow-y-auto duration-500 ${isDarkMode ? 'border-[#333]/50 bg-[#0a0a0a]/50 backdrop-blur-md' : 'border-[#c47ea8]/20 bg-white/30 backdrop-blur-md'}`}>
                
                <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#c47ea8]/20' : 'bg-[#fff0f5]'}`}>
                        <Landmark size={24} className="text-[#c47ea8]" />
                    </div>
                    <div>
                        <h3 className={`text-2xl font-bold font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Government Schemes for Women</h3>
                        <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>Explore verified developmental programs, subsidies, and capital funding explicitly reserved for female empowerment.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-20">
                    {schemes.map((scheme, idx) => (
                        <div key={idx} className={`flex flex-col relative p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#1a1a1a]/80 border-[#333] hover:border-[#c47ea8]/50' : 'bg-white/80 border-gray-200 hover:border-[#c47ea8]/50'}`}>
                            
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
                                    {scheme.icon}
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                    {scheme.category}
                                </span>
                            </div>

                            <h4 className={`text-lg font-bold mb-2 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {scheme.title}
                            </h4>
                            
                            <p className={`text-sm mb-4 leading-relaxed flex-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {scheme.description}
                            </p>

                            <div className={`text-xs font-medium mb-5 px-3 py-2 rounded-lg border-l-2 ${isDarkMode ? 'bg-[#111] border-[#c47ea8] text-gray-300' : 'bg-[#fff0f5] border-[#c47ea8] text-gray-700'}`}>
                                <span className="opacity-70 mr-1">Eligibility:</span> {scheme.eligibility}
                            </div>

                            <button className={`mt-auto w-full group py-2.5 rounded-lg border text-sm font-semibold transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'border-[#333] hover:bg-[#c47ea8] hover:text-[#1a1025] hover:border-[#c47ea8] text-gray-300' : 'border-gray-200 hover:bg-[#c47ea8] hover:text-white hover:border-[#c47ea8] text-gray-600'}`}>
                                {scheme.linkType} 
                                <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
