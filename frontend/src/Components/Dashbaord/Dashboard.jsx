import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Settings,
  ChevronDown,
  HeartPulse,
  MessageSquare,
  Users,
  Briefcase,
  Menu,
  LogOut,
  TerminalSquare,
  Sun,
  Moon,
  Landmark,
  Activity,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PixelSnow from "../Generic/Snowfall";
import AITherapists from "./AITherapists";
import SentimentAnalysis from "./SentimentAnalysis";
import Freelance from "./Freelance";
import JobsForHer from "./JobsForHer";
import GovernmentSchemes from "./GovtServices";
import Exercise from "./Exercise";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { token, user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("AI Therapist");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const hasFetchedUserRef = useRef(false);

  useEffect(() => {
    if (token && !user && !hasFetchedUserRef.current) {
      hasFetchedUserRef.current = true;
      fetch("https://app.totalchaos.online/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user");
          return res.json();
        })
        .then((data) => {
          const apiUser = data.user || data;
          setUser({
            name: apiUser.name,
            username: apiUser.handle || apiUser.username,
            email: apiUser.email || apiUser.identifier,
            avatar: apiUser.avatar,
            role: apiUser.role,
          });
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setFetchError(err.message || String(err));
          hasFetchedUserRef.current = false;
        });
    }
  }, [token, user, setUser]);

  useEffect(() => {
    // Enforce active tab validation based on securely fetched role.
    if (user && user.role?.toLowerCase()?.trim() !== "womanlancer") {
      if (activeTab === "AI Therapist" || activeTab === "Government Schemes") {
        const timeoutId = setTimeout(
          () => setActiveTab("Sentiment Analysis"),
          0,
        );
        return () => clearTimeout(timeoutId);
      }
    }
  }, [user, activeTab]);

  const sidebarTabs = [
    {
      name: "AI Therapist",
      icon: <HeartPulse size={18} />,
      requiresWomanlancer: true,
    },
    { name: "Sentiment Analysis", icon: <MessageSquare size={18} /> },
    {
      name: "Government Schemes",
      icon: <Landmark size={18} />,
      requiresWomanlancer: true,
    },
    { name: "Jobs For Her", icon: <Briefcase size={18} /> },
    { name: "Freelance", icon: <Briefcase size={18} /> },
    { name: "Exercises", icon: <Activity size={18} /> },
  ].filter(
    (tab) =>
      !tab.requiresWomanlancer ||
      user?.role?.toLowerCase()?.trim() === "womanlancer",
  );

  return (
    <div
      className={`flex h-screen ${isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#fff0f5] text-[#1a1025]"} font-sans relative overflow-hidden transition-colors duration-500`}
    >
      {/* SNOWFALL BACKGROUND (Spans entirety of dashboard) */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isDarkMode ? "opacity-100" : "opacity-60"}`}
      >
        <PixelSnow
          color="#c47ea8"
          flakeSize={0.015}
          minFlakeSize={isDarkMode ? 1.25 : 1.5}
          pixelResolution={4000}
          speed={1.25}
          density={isDarkMode ? 0.3 : 0.4}
          direction={125}
          brightness={isDarkMode ? 1.5 : 0.6}
          depthFade={isDarkMode ? 8 : 4}
          farPlane={20}
          gamma={0.4545}
          variant="round"
        />
      </div>

      {/* SIDEBAR (Frosted Glass) */}
      <aside
        className={`w-64 border-r ${isDarkMode ? "border-[#262626]/50 bg-[#0a0a0a]/60" : "border-gray-200 bg-white/60"} backdrop-blur-xl flex flex-col justify-between hidden md:flex relative z-10 shadow-2xl transition-colors duration-500`}
      >
        <div>
          {/* Brand */}
          <div
            className={`h-16 flex items-center gap-2 px-6 border-b ${isDarkMode ? "border-[#262626]/50" : "border-gray-200"}`}
          >
            <TerminalSquare size={20} className="text-[#c47ea8]" />
            <span className="font-serif text-xl font-bold italic tracking-tight">
              aadya
              <span className="font-sans font-normal not-italic">Circle</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-1.5 mt-6">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? isDarkMode
                      ? "bg-[#c47ea8]/20 text-white shadow-sm border border-[#c47ea8]/30"
                      : "bg-[#c47ea8]/10 text-[#c47ea8] shadow-sm border border-[#c47ea8]/20"
                    : isDarkMode
                      ? "text-gray-400 hover:bg-[#1a1a1a]/80 hover:text-gray-200"
                      : "text-gray-500 hover:bg-gray-100/80 hover:text-gray-800"
                }`}
              >
                <span
                  className={`${activeTab === tab.name ? "text-[#c47ea8]" : "text-gray-500"}`}
                >
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Profile Preview */}
        <div
          className={`p-4 border-t ${isDarkMode ? "border-[#262626]/50" : "border-gray-200"}`}
        >
          <div
            className={`flex items-center justify-between p-2 -mx-2 rounded-md ${isDarkMode ? "hover:bg-[#1a1a1a]/80" : "hover:bg-gray-100/80"} cursor-pointer transition-colors group`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#fce8f0] border border-[#c47ea8]/30 flex items-center justify-center overflow-hidden shadow-md">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[#c47ea8] font-bold text-sm">
                    {user
                      ? user.name
                        ? user.name[0].toUpperCase()
                        : "U"
                      : "M"}
                  </span>
                )}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#111] rounded-full"></div>
              </div>
              <div className="flex flex-col text-left justify-center">
                <span
                  className={`text-sm font-semibold leading-tight transition-colors ${isDarkMode ? "text-gray-200 group-hover:text-white" : "text-gray-800 group-hover:text-black"}`}
                >
                  {fetchError
                    ? `Err: ${fetchError}`
                    : user
                      ? user.name || "User"
                      : "Loading Profile..."}
                </span>
                <span
                  className={`text-[11px] font-medium mt-0.5 ${isDarkMode ? "text-[#c47ea8]/80" : "text-[#c47ea8]"}`}
                >
                  {user ? `@${user.username || "user"}` : ""}
                </span>
                <span
                  className={`text-xs mt-0.5 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                >
                  {user ? user.email || "" : "Connecting..."}
                </span>
              </div>
            </div>
            <LogOut
              size={16}
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className={`${isDarkMode ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-gray-800"} transition-colors cursor-pointer hover:text-red-500`}
            />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-transparent">
        {/* NAVBAR (Frosted Glass) */}
        <header
          className={`h-16 flex items-center justify-between px-6 border-b ${isDarkMode ? "border-[#262626]/50 bg-[#0a0a0a]/60" : "border-gray-200 bg-white/60"} backdrop-blur-xl shadow-sm transition-colors duration-500`}
        >
          <div className="flex items-center gap-6">
            <Menu
              size={20}
              className="md:hidden text-gray-400 cursor-pointer"
            />

            {/* Navbar Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className={`text-sm font-semibold px-3 py-1.5 rounded-md transition-colors border ${isDarkMode ? "bg-[#222]/80 backdrop-blur-sm text-white border-gray-700/50" : "bg-white text-[#1a1025] border-gray-200 shadow-sm"}`}
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-900"}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-900"}`}
              >
                About Us
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#1a1025]"} cursor-pointer transition-colors border-none bg-transparent p-0`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Settings
              size={18}
              className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#1a1025]"} cursor-pointer transition-colors`}
            />

            <div className="relative cursor-pointer">
              <Bell
                size={18}
                className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#1a1025]"} transition-colors`}
              />
              <div
                className={`absolute -top-1.5 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-[2px] ${isDarkMode ? "bg-red-500 border-[#111]" : "bg-red-500 border-white"}`}
              >
                <span className="text-[9px] font-bold text-white leading-none">
                  2
                </span>
              </div>
            </div>

            {/* My Profile Navbar Button */}
            <div
              className={`flex items-center gap-2 pl-5 border-l ${isDarkMode ? "border-[#333]/50" : "border-gray-300"} cursor-pointer hover:opacity-80 transition-opacity`}
            >
              <span
                className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                My Profile
              </span>
              <ChevronDown
                size={14}
                className={isDarkMode ? "text-gray-400" : "text-gray-500"}
              />
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT SPACE */}
        <div className="flex-1 overflow-auto p-8 border-l border-[#262626]/50 bg-transparent">
          {/* Render active content */}
          {activeTab === "AI Therapist" ? (
            <AITherapists isDarkMode={isDarkMode} />
          ) : activeTab === "Sentiment Analysis" ? (
            <SentimentAnalysis isDarkMode={isDarkMode} />
          ) : activeTab === "Government Schemes" ? (
            <GovernmentSchemes isDarkMode={isDarkMode} />
          ) : activeTab === "Jobs For Her" ? (
            <JobsForHer isDarkMode={isDarkMode} />
          ) : activeTab === "Freelance" ? (
            <Freelance isDarkMode={isDarkMode} />
          ) : activeTab === "Exercises" ? (
            <Exercise isDarkMode={isDarkMode} />
          ) : (
            <div
              className={`w-full h-full rounded-2xl border border-dashed flex flex-col items-center justify-center text-center shadow-lg transition-colors duration-500 ${isDarkMode ? "border-[#c47ea8]/30 bg-[#0f0f0f]/40 backdrop-blur-md hover:bg-[#0f0f0f]/60" : "border-[#c47ea8]/20 bg-white/50 backdrop-blur-md hover:bg-white/80"}`}
            >
              <TerminalSquare size={48} className="text-[#c47ea8]/60 mb-4" />
              <h3
                className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {activeTab}
              </h3>
              <p
                className={
                  isDarkMode
                    ? "text-gray-400 max-w-md"
                    : "text-gray-600 max-w-md"
                }
              >
                The content for this module is currently empty. The snow behind
                is dynamically simulated.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
