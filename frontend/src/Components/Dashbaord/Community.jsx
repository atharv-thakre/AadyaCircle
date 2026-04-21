import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Users,
  MessageCircle,
  Shield,
  Smile,
  Search,
  Settings,
  Plus,
  ArrowRight,
  Heart,
  MoreVertical,
  Globe,
  Star,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const COMMUNITIES = [
  {
    id: "general",
    name: "General Community",
    icon: <Globe size={20} />,
    isBackend: true,
    description: "The main hub for support and conversation.",
    color: "from-pink-400 to-purple-500",
    tags: ["Support", "General"],
    members: "1.2k",
  },
  {
    id: "wellness",
    name: "Wellness Circle",
    icon: <Heart size={20} />,
    isBackend: false,
    description: "Mindfulness, mental health, and physical well-being.",
    color: "from-green-400 to-teal-500",
    tags: ["Mental Health", "Yoga"],
    members: "850",
  },
  {
    id: "jobs",
    name: "Career Growth",
    icon: <Star size={20} />,
    isBackend: false,
    description: "Empowering women in tech and leadership.",
    color: "from-blue-400 to-indigo-500",
    tags: ["Jobs", "Mentorship"],
    members: "2.5k",
  },
  {
    id: "safety",
    name: "Safety Network",
    icon: <Shield size={20} />,
    isBackend: false,
    description: "Resources for personal safety and community support.",
    color: "from-orange-400 to-red-500",
    tags: ["Safety", "Emergency"],
    members: "600",
  },
];

const DUMMY_MESSAGES = {
  wellness: [
    {
      sender: "Anjali",
      message: "Good morning! Just finished my 10min meditation. Feeling great!",
      time: "09:30 AM",
    },
    {
      sender: "Priya",
      message: "That's wonderful! I'm planning to start mine in an hour.",
      time: "09:45 AM",
    },
    {
      sender: "Sara",
      message: "Has anyone tried the new guided session for anxiety?",
      time: "10:05 AM",
    },
  ],
  jobs: [
    {
      sender: "Maya",
      message: "I've started a new thread for interview tips, check it out!",
      time: "11:15 AM",
    },
    { sender: "Kirti", message: "Is it specific to tech roles?", time: "11:20 AM" },
    {
      sender: "Maya",
      message: "Yes, but some tips apply across all fields.",
      time: "11:22 AM",
    },
  ],
  safety: [
    {
      sender: "Neha",
      message: "Reminder: The community safety workshop is tonight at 7 PM.",
      time: "02:00 PM",
    },
  ],
};

export default function Community({ isDarkMode }) {
  const { token, user } = useAuth();
  const [activeComm, setActiveComm] = useState(COMMUNITIES[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [participantCount, setParticipantCount] = useState(0);
  const [wsStatus, setWsStatus] = useState("disconnected");
  
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeComm.isBackend && token) {
      setWsStatus("connecting");
      const wsUrl = `wss://app.totalchaos.online/ws/debate?token=${token}`;
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        setWsStatus("online");
        setMessages([]);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "users") {
          setParticipantCount(data.count);
        } else if (data.type === "typing") {
          if (!typingUsers.includes(data.user)) {
            setTypingUsers((prev) => [...prev, data.user]);
            setTimeout(() => {
              setTypingUsers((prev) => prev.filter((u) => u !== data.user));
            }, 3000);
          }
        } else if (data.message) {
          setMessages((prev) => [
            ...prev,
            {
              sender: data.sender,
              message: data.message,
              time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSystem: data.sender === "system",
            },
          ]);
        }
      };

      socket.onclose = () => setWsStatus("offline");
      return () => socket.close();
    } else {
      setMessages(DUMMY_MESSAGES[activeComm.id] || []);
      setParticipantCount(Math.floor(Math.random() * 50) + 10);
      setWsStatus("static");
    }
  }, [activeComm, token]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (activeComm.isBackend && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "message", text: inputText.trim() }));
    } else {
      const newMessage = {
        sender: user?.name || "You",
        message: inputText.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
    setInputText("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex h-full w-full overflow-hidden transition-all duration-700 ${
      isDarkMode ? "text-white" : "text-[#1a1025]"
    }`}>
      
      {/* LEFT SIDEBAR: COMMUNITY CARDS */}
      <div className={`w-80 flex flex-col p-6 space-y-6 border-r ${
        isDarkMode ? "border-white/10 bg-[#0a0a0a]/40" : "border-[#c47ea8]/10 bg-white/40"
      } backdrop-blur-xl`}>
        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold italic">Societies</h2>
          <button className={`p-2 rounded-full ${
            isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-[#c47ea8]/5 hover:bg-[#c47ea8]/10"
          }`}>
            <Plus size={20} className="text-[#c47ea8]" />
          </button>
        </div>

        <div className={`flex items-center px-4 py-2 rounded-2xl border transition-all shadow-sm ${
          isDarkMode ? "bg-black/20 border-white/5 focus-within:border-[#c47ea8]/50" : "bg-white/60 border-[#c47ea8]/10 focus-within:border-[#c47ea8]/50"
        }`}>
          <Search size={18} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search circles..." 
            className="bg-transparent border-none outline-none text-sm w-full py-1"
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar pr-1">
          {COMMUNITIES.map((comm) => (
            <motion.div
              key={comm.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveComm(comm)}
              className={`p-4 rounded-[2rem] cursor-pointer transition-all duration-500 border relative overflow-hidden group ${
                activeComm.id === comm.id
                  ? isDarkMode ? "bg-white/10 border-[#c47ea8]/40 shadow-lg" : "bg-white border-[#c47ea8]/30 shadow-xl shadow-[#c47ea8]/5"
                  : isDarkMode ? "bg-white/5 border-transparent hover:border-white/20" : "bg-white/30 border-transparent hover:border-[#c47ea8]/20"
              }`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${comm.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${comm.color} text-white shadow-lg`}>
                  {comm.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{comm.name}</h3>
                  <p className="text-[10px] opacity-60 font-medium">{comm.members} members</p>
                </div>
              </div>
              
              <div className="mt-3 flex gap-2">
                {comm.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2.5 py-1 rounded-full bg-black/5 group-hover:bg-[#c47ea8]/20 transition-colors font-bold uppercase tracking-tighter opacity-60">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA: CONVERSATION */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
        
        {/* HEADER */}
        <header className={`h-24 flex items-center justify-between px-10 border-b ${
          isDarkMode ? "border-white/10 bg-[#0a0a0a]/20" : "border-[#c47ea8]/10 bg-white/20"
        } backdrop-blur-sm`}>
          <div className="flex items-center gap-6">
            <motion.div 
              key={activeComm.id}
              initial={{ rotate: -20, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${activeComm.color} text-white shadow-xl`}>
              {activeComm.icon}
            </motion.div>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                {activeComm.name}
                <span className={`w-2 h-2 rounded-full ${
                  wsStatus === "online" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : wsStatus === "connecting" ? "bg-yellow-500 animate-pulse" : "bg-gray-400"
                }`} />
              </h1>
              <p className="text-xs opacity-60 mt-0.5">{activeComm.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex -space-x-3`}>
              {[1,2,3].map(i => (
                <div key={i} className={`w-9 h-9 rounded-full border-2 ${isDarkMode ? "border-[#111]" : "border-white"} bg-[#c47ea8]/20 flex items-center justify-center text-[10px] font-bold shadow-sm`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className={`w-9 h-9 rounded-full border-2 ${isDarkMode ? "border-[#111]" : "border-white"} bg-[#c47ea8] flex items-center justify-center text-[10px] font-bold text-white shadow-lg`}>
                +{participantCount}
              </div>
            </div>
            <button className="p-2 rounded-2xl hover:bg-black/5 transition-all">
              <MoreVertical size={20} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
          <AnimatePresence mode="popLayout">
            {messages.length > 0 ? messages.map((msg, idx) => {
              const isMe = msg.sender === (user?.name || "You");
              const isSystem = msg.isSystem;

              if (isSystem) {
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className="flex justify-center"
                  >
                    <span className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full bg-black/5 opacity-50 border border-[#c47ea8]/10">
                      {msg.message}
                    </span>
                  </motion.div>
                );
              }

              return (
                <motion.div 
                  initial={{ opacity: 0, x: isMe ? 20 : -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  key={idx} 
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-4 max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                    {!isMe && (
                      <div className="w-10 h-10 rounded-2xl bg-[#c47ea8]/10 flex items-center justify-center flex-shrink-0 border border-[#c47ea8]/20 shadow-sm">
                        <span className="text-xs font-bold text-[#c47ea8]">{msg.sender?.[0]}</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      {!isMe && <span className="text-[11px] font-bold ml-1 mb-1.5 opacity-60 text-[#c47ea8] uppercase tracking-tighter">{msg.sender}</span>}
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className={`px-6 py-4 rounded-[2.5rem] shadow-sm relative group transition-all duration-300 ${
                        isMe 
                          ? "bg-gradient-to-br from-[#c47ea8] to-purple-500 text-white rounded-tr-none shadow-xl shadow-[#c47ea8]/20 hover:shadow-[#c47ea8]/30" 
                          : isDarkMode 
                            ? "bg-[#161616] border border-white/10 text-gray-200 rounded-tl-none hover:bg-[#1a1a1a]" 
                            : "bg-white border border-[#c47ea8]/10 text-gray-800 rounded-tl-none hover:border-[#c47ea8]/30 shadow-sm"
                      }`}>
                        <p className="text-[15px] leading-relaxed font-medium">{msg.message}</p>
                        <span className={`text-[9px] mt-2 block opacity-40 font-bold ${isMe ? "text-right" : "text-left"}`}>
                          {msg.time}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 mt-20">
                <MessageCircle size={80} className="mb-4 text-[#c47ea8]" />
                <p className="text-xl font-serif font-bold italic">Start a meaningful conversation...</p>
              </div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BOX */}
        <div className="p-8 px-10">
          {typingUsers.length > 0 && (
            <div className="absolute -top-6 left-12 text-[10px] font-bold text-[#c47ea8] animate-pulse italic">
              {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} sharing a thought...
            </div>
          )}
          
          <form 
            onSubmit={handleSendMessage}
            className={`flex items-center gap-4 px-6 py-4 rounded-[2.5rem] transition-all shadow-2xl border ${
              isDarkMode 
              ? "bg-[#111] border-white/10 focus-within:border-[#c47ea8]/40" 
              : "bg-white border-[#c47ea8]/10 focus-within:border-[#c47ea8]/40 shadow-[#c47ea8]/10"
            }`}
          >
            <button type="button" className="p-2 rounded-full hover:bg-black/5 transition-colors">
              <Smile size={22} className="text-gray-400 hover:text-[#c47ea8]" />
            </button>
            
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Share your thoughts with ${activeComm.name}...`}
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
            
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 scale-100 active:scale-90 ${
                inputText.trim() 
                  ? "bg-gradient-to-br from-[#c47ea8] to-purple-600 text-white shadow-xl shadow-[#c47ea8]/40 hover:rotate-12" 
                  : "bg-gray-200 text-gray-400 scale-90"
              }`}
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>

      {/* RIGHT SIDEBAR: COMMUNITY INFO / ACTION (Modern Floating Apperance) */}
      <div className={`w-72 flex flex-col p-8 space-y-8 border-l transition-all hidden xl:flex ${
        isDarkMode ? "border-white/10 bg-[#0a0a0a]/20" : "border-[#c47ea8]/10 bg-white/20"
      } backdrop-blur-xl`}>
        
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-40">Active Contributors</h3>
          <div className="space-y-4">
            {["Alice", "Sarah", "Grace"].map(name => (
              <div key={name} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c47ea8]/20 to-purple-500/10 flex items-center justify-center border border-[#c47ea8]/20 group-hover:scale-110 transition-transform">
                  <span className="text-xs font-bold text-[#c47ea8]">{name[0]}</span>
                </div>
                <div>
                  <p className="text-xs font-bold">{name}</p>
                  <p className="text-[9px] text-green-500 font-bold uppercase tracking-tighter">Active Now</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-[2rem] space-y-4 relative overflow-hidden transition-all hover:shadow-2xl ${
          isDarkMode ? "bg-white/5" : "bg-[#c47ea8]/5"
        }`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Heart size={40} className="text-[#c47ea8]" />
          </div>
          <h4 className="text-sm font-bold">Community Goal</h4>
          <p className="text-xs opacity-60 leading-relaxed">Let's help each other grow. Our current goal is to reach 5,000 supportive messages!</p>
          <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#c47ea8] to-purple-600 w-3/4 rounded-full" />
          </div>
          <p className="text-[10px] font-bold text-right text-[#c47ea8]">75% Complete</p>
        </div>

        <button className={`mt-auto w-full py-4 rounded-3xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
        }`}>
          Join Call
          <ArrowRight size={16} />
        </button>
      </div>

    </motion.div>
  );
}
