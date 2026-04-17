import React, { useState } from 'react';
import Stepper, { Step } from '../Generic/Stepper';
import { Activity, BrainCircuit, HeartPulse, Globe, RefreshCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const QUESTIONS_EN = [
    {
        id: 'mood',
        title: 'Current Emotional State',
        question: 'Over the last 2 weeks, how often have you been feeling down, depressed, or hopeless?',
        options: [
            { label: 'Not at all', ans_id: 1 },
            { label: 'Several days', ans_id: 2 },
            { label: 'More than half the days', ans_id: 3 },
            { label: 'Nearly every day', ans_id: 4 }
        ]
    },
    {
        id: 'stress',
        title: 'Stress Levels',
        question: 'How would you rate your current stress level when dealing with personal or professional responsibilities?',
        options: [
            { label: 'Very Low - I feel completely in control', ans_id: 1 },
            { label: 'Moderate - Sometimes overwhelmed', ans_id: 2 },
            { label: 'High - Constantly stressed', ans_id: 3 },
            { label: 'Severe - Unable to cope', ans_id: 4 }
        ]
    },
    {
        id: 'sleep',
        title: 'Physical Well-being',
        question: 'How has your sleep quality been recently?',
        options: [
            { label: 'Excellent - Waking up rested', ans_id: 1 },
            { label: 'Fair - Some trouble falling or staying asleep', ans_id: 2 },
            { label: 'Poor - Frequently waking up or insomnia', ans_id: 3 },
            { label: 'Terrible - Not sleeping at all', ans_id: 4 }
        ]
    },
    {
        id: 'support',
        title: 'Social Support',
        question: 'Do you feel you have a reliable support system you can talk to when things get tough?',
        options: [
            { label: 'Yes, fully supported', ans_id: 1 },
            { label: 'Somewhat, occasionally', ans_id: 2 },
            { label: 'Rarely', ans_id: 3 },
            { label: 'No, I feel isolated', ans_id: 4 }
        ]
    },
    {
        id: 'focus',
        title: 'Cognitive Focus',
        question: 'How much difficulty have you had recently in concentrating on tasks, such as reading, working, or making decisions?',
        options: [
            { label: 'None at all', ans_id: 1 },
            { label: 'A little difficulty', ans_id: 2 },
            { label: 'Moderate difficulty', ans_id: 3 },
            { label: 'Severe difficulty', ans_id: 4 }
        ]
    },
    {
        id: 'anxiety',
        title: 'Anxiety Levels',
        question: 'Over the last 2 weeks, how often have you felt dangerously nervous, anxious, or constantly on edge?',
        options: [
            { label: 'Not at all', ans_id: 1 },
            { label: 'Several days', ans_id: 2 },
            { label: 'More than half the days', ans_id: 3 },
            { label: 'Nearly every day', ans_id: 4 }
        ]
    }
];

const QUESTIONS_HI = [
    {
        id: 'mood',
        title: 'वर्तमान भावनात्मक स्थिति',
        question: 'पिछले 2 हफ्तों में, आप कितनी बार उदास, उदास या निराश महसूस कर रहे हैं?',
        options: [
            { label: 'बिल्कुल नहीं', ans_id: 1 },
            { label: 'कई दिन', ans_id: 2 },
            { label: 'आधे से अधिक दिन', ans_id: 3 },
            { label: 'लगभग हर दिन', ans_id: 4 }
        ]
    },
    {
        id: 'stress',
        title: 'तनाव का स्तर',
        question: 'व्यक्तिगत या व्यावसायिक जिम्मेदारियों से निपटते समय आप अपने वर्तमान तनाव स्तर को कैसे रेट करेंगे?',
        options: [
            { label: 'बहुत कम - मैं पूरी तरह से नियंत्रण में महसूस करता हूं', ans_id: 1 },
            { label: 'मध्यम - कभी-कभी अभिभूत', ans_id: 2 },
            { label: 'उच्च - लगातार तनावग्रस्त', ans_id: 3 },
            { label: 'गंभीर - सामना करने में असमर्थ', ans_id: 4 }
        ]
    },
    {
        id: 'sleep',
        title: 'शारीरिक स्वास्थ्य',
        question: 'हाल ही में आपकी नींद की गुणवत्ता कैसी रही है?',
        options: [
            { label: 'उत्कृष्ट - आराम महसूस करके जागना', ans_id: 1 },
            { label: 'ठीक - सोने में कुछ परेशानी', ans_id: 2 },
            { label: 'खराब - बार-बार जागना या अनिद्रा', ans_id: 3 },
            { label: 'भयानक - बिल्कुल नहीं सो पाना', ans_id: 4 }
        ]
    },
    {
        id: 'support',
        title: 'सामाजिक समर्थन',
        question: 'क्या आपको लगता है कि आपके पास एक विश्वसनीय समर्थन प्रणाली है जिससे आप चीजें कठिन होने पर बात कर सकते हैं?',
        options: [
            { label: 'हाँ, पूरी तरह से समर्थित', ans_id: 1 },
            { label: 'कुछ हद तक, कभी-कभी', ans_id: 2 },
            { label: 'शायद ही कभी', ans_id: 3 },
            { label: 'नहीं, मैं अकेला महसूस करता हूं', ans_id: 4 }
        ]
    },
    {
        id: 'focus',
        title: 'संज्ञानात्मक ध्यान',
        question: 'हाल ही में आपको पढ़ने, काम करने या निर्णय लेने जैसे कार्यों पर ध्यान केंद्रित करने में कितनी कठिनाई हुई है?',
        options: [
            { label: 'बिल्कुल नहीं', ans_id: 1 },
            { label: 'थोड़ी कठिनाई', ans_id: 2 },
            { label: 'मध्यम कठिनाई', ans_id: 3 },
            { label: 'गंभीर कठिनाई', ans_id: 4 }
        ]
    },
    {
        id: 'anxiety',
        title: 'चिंता का स्तर',
        question: 'पिछले 2 हफ्तों में, आप कितनी बार घबराए हुए, चिंतित या लगातार किनारे पर महसूस कर रहे हैं?',
        options: [
            { label: 'बिल्कुल नहीं', ans_id: 1 },
            { label: 'कई दिन', ans_id: 2 },
            { label: 'आधे से अधिक दिन', ans_id: 3 },
            { label: 'लगभग हर दिन', ans_id: 4 }
        ]
    }
];

export default function SentimentAnalysis({ isDarkMode = true }) {
    const [language, setLanguage] = useState('English');
    const questions = language === 'English' ? QUESTIONS_EN : QUESTIONS_HI;

    const content = {
        English: {
            title: "Sentiment Assessment",
            desc: "Take a moment to check in with yourself. The answers you provide will help our AI tailor a personalized support pathway just for you.",
            loading: "Analyzing your emotional state...",
            insights: "Your Wellness Insights",
            insights_desc: "Based on your responses from a few moments ago",
            retake: "Retake"
        },
        Hindi: {
            title: "भावना मूल्यांकन",
            desc: "अपने साथ जाँच करने के लिए एक क्षण निकालें। आपके द्वारा प्रदान किए गए उत्तर हमारे AI को सिर्फ आपके लिए एक व्यक्तिगत सहायता मार्ग तैयार करने में मदद करेंगे।",
            loading: "आपकी भावनात्मक स्थिति का विश्लेषण किया जा रहा है...",
            insights: "आपका कल्याण विवरण",
            insights_desc: "कुछ क्षण पहले आपकी प्रतिक्रियाओं के आधार पर",
            retake: "पुनः परीक्षा"
        }
    }[language];

    const { token } = useAuth();
    const [responses, setResponses] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [assessmentResult, setAssessmentResult] = useState(null);

    const handleSelectOption = (questionId, option) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);

        // Payload construction: question_1: "ans_id", question_2: "ans_id"...
        const payload = {};
        questions.forEach((q, index) => {
            payload[`question_${index + 1}`] = String(responses[q.id]?.ans_id || 1);
        });

        try {
            const response = await fetch("https://app.totalchaos.online/ai/sentiment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Assessment submission failed");

            const data = await response.json();
            setAssessmentResult(data);
            setIsCompleted(true);
        } catch (error) {
            console.error("Analysis failed:", error);
            alert("Failed to process your assessment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const MetricCard = ({ label, value, color, bgColor }) => (
        <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-[#151515] border-[#333]' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
                <span className={`text-sm font-bold ${color}`}>{value}%</span>
            </div>
            <div className={`w-full h-2.5 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} overflow-hidden`}>
                <div
                    className={`h-full rounded-full transition-all duration-1000 ${bgColor}`}
                    style={{ width: `${Math.max(value, 2)}%` }}
                />
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-full flex flex-col relative pt-2 pb-6 px-4 lg:px-8">
            <div className={`absolute inset-0 backdrop-blur-md rounded-2xl border -z-10 transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A]/60 border-[#333]/50' : 'bg-white/40 border-gray-200 shadow-sm'}`} />

            {/* Loading Overlay */}
            {isSubmitting && (
                <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
                    <div className="w-12 h-12 border-4 border-[#c47ea8]/30 border-t-[#c47ea8] rounded-full animate-spin mb-4" />
                    <p className="text-[#c47ea8] font-medium animate-pulse">{content.loading}</p>
                </div>
            )}

            {!isCompleted && (
                <div className="relative mb-6 shrink-0 mt-2">
                    <div className="absolute right-0 top-0">
                        <button 
                            onClick={() => setLanguage(l => l === 'English' ? 'Hindi' : 'English')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase transition-all shadow-sm ${
                                isDarkMode 
                                ? 'border-[#333] bg-[#1a1a1a] text-[#c47ea8] hover:border-[#c47ea8]/50 hover:bg-[#222]' 
                                : 'border-[#fce8f0] bg-[#fff0f5] text-[#c47ea8] hover:border-[#c47ea8] hover:bg-[#fdeef5]'
                            }`}
                        >
                            <Globe size={12} /> {language}
                        </button>
                    </div>

                    <div className="text-center">
                        <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 border transition-colors ${isDarkMode ? 'bg-[#c47ea8]/20 border-[#c47ea8]/40' : 'bg-[#fff0f5] border-[#f9dde8]'}`}>
                            <BrainCircuit size={20} className="text-[#c47ea8]" />
                        </div>
                        <h2 className={`text-2xl font-serif font-bold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{content.title}</h2>
                        <p className={`text-xs max-w-lg mx-auto transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {content.desc}
                        </p>
                    </div>
                </div>
            )}

            {!isCompleted ? (
                <div>
                    <Stepper
                        initialStep={1}
                        onFinalStepCompleted={handleFinalSubmit}
                        backButtonText={language === 'Hindi' ? 'पिछला' : 'Previous'}
                        nextButtonText={language === 'Hindi' ? 'अगला' : 'Next'}
                        disableStepIndicators={false}
                        isDarkMode={isDarkMode}
                        className="w-full flex-1 flex flex-col items-center relative z-10"
                        stepCircleContainerClassName={`!max-w-3xl w-full backdrop-blur-xl border relative z-20 transition-colors duration-500`}
                        stepContainerClassName="!p-4 sm:!p-5 !pb-0"
                        contentClassName="!px-4 sm:!px-8"
                        footerClassName="!px-4 sm:!px-8 !pb-6"
                    >
                        {questions.map((q) => (
                            <Step key={q.id}>
                                <div className="pt-2 pb-4 min-h-[160px] m-4">
                                    <h3 className={`text-xl font-serif font-bold mb-2 transition-colors ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{q.title}</h3>
                                    <p className={`text-sm mb-8 leading-relaxed ${isDarkMode ? 'text-[#c47ea8]/90' : 'text-[#c47ea8]'}`}>{q.question}</p>

                                    <div className="flex flex-col gap-3">
                                        {q.options.map((opt, idx) => {
                                            const isSelected = responses[q.id]?.label === opt.label;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleSelectOption(q.id, opt)}
                                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left text-sm ${isSelected
                                                        ? isDarkMode
                                                            ? 'bg-[#c47ea8]/20 border-[#c47ea8] text-white shadow-[0_0_15px_rgba(196,126,168,0.2)]'
                                                            : 'bg-[#fff0f5] border-[#c47ea8] text-[#c47ea8] font-medium shadow-sm'
                                                        : isDarkMode
                                                            ? 'bg-[#1A1A1A] border-[#333] text-gray-400 hover:bg-[#222] hover:border-[#555]'
                                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'
                                                        }`}
                                                >
                                                    <span>{opt.label}</span>
                                                    {isSelected && (
                                                        <div className="w-3 h-3 rounded-full bg-[#c47ea8] shadow-[0_0_8px_#c47ea8]" />
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Step>
                        ))}
                    </Stepper>
                </div>
            ) : (
                <div className="w-full overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Your Wellness Insights</h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Based on your responses from a few moments ago</p>
                        </div>
                        <button
                            onClick={() => { setIsCompleted(false); setResponses({}); setAssessmentResult(null); }}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${isDarkMode ? 'border-[#333] text-gray-400 hover:text-white hover:border-[#c47ea8]' : 'border-gray-200 text-gray-500 hover:text-[#c47ea8] hover:border-[#c47ea8]'}`}
                        >
                            Retake
                        </button>
                    </div>

                    {/* Numerical Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <MetricCard label="Joy" value={assessmentResult?.joy || 0} color="text-emerald-500" bgColor="bg-emerald-500" />
                        <MetricCard label="Fear" value={assessmentResult?.fear || 0} color="text-amber-500" bgColor="bg-amber-500" />
                        <MetricCard label="Sadness" value={assessmentResult?.sadness || 0} color="text-blue-500" bgColor="bg-blue-500" />
                        <MetricCard label="Anger" value={assessmentResult?.anger || 0} color="text-rose-500" bgColor="bg-rose-500" />
                        <MetricCard label="Anxiety" value={assessmentResult?.anxiety || 0} color="text-purple-500" bgColor="bg-purple-500" />
                        <MetricCard label="Frustration" value={assessmentResult?.frustration || 0} color="text-orange-500" bgColor="bg-orange-500" />
                    </div>

                    {/* Detailed Analysis Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                        {/* Recommendations */}
                        <div className={`p-6 rounded-2xl border flex flex-col items-start text-left ${isDarkMode ? 'bg-[#111111]/80 border-[#c47ea8]/30 shadow-xl' : 'bg-white border-[#fce8f0] shadow-md'}`}>
                            <div className="w-10 h-10 rounded-full bg-[#c47ea8]/20 flex items-center justify-center mb-4">
                                <Activity size={20} className="text-[#c47ea8]" />
                            </div>
                            <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Personalized Recommendations</h4>
                            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {assessmentResult?.recommendations}
                            </p>
                        </div>

                        {/* Mood & Pressure Analysis */}
                        <div className="space-y-4">
                            {[
                                { title: 'Primary Mood', val: assessmentResult?.mood, icon: BrainCircuit },
                                { title: 'Stress & Anxiety', val: assessmentResult?.['Stress & Anxiety'], icon: HeartPulse },
                                { title: 'Pressure Level', val: assessmentResult?.LevelPressure, icon: Activity },
                                { title: 'Mood History', val: assessmentResult?.['Mood History'], icon: BrainCircuit },
                                { title: 'Motivation Level', val: assessmentResult?.['Motivation Level'], icon: HeartPulse }
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-[#111111]/80 border-[#333]' : 'bg-white border-gray-100 shadow-sm'}`}>
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                        <item.icon size={20} className="text-[#c47ea8]" />
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{item.title}</p>
                                        <p className={`text-sm font-medium leading-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}