import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const PROGRESSION_STORAGE_KEY = "userProgress";

const defaultProgress = {
  sentimentCompleted: false,
  unlockedFeatures: {},
  sentimentSummary: null,
  exerciseStats: [],
};

function loadStoredProgress() {
  try {
    const raw = localStorage.getItem(PROGRESSION_STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      unlockedFeatures: {
        ...defaultProgress.unlockedFeatures,
        ...(parsed.unlockedFeatures || {}),
      },
    };
  } catch {
    return defaultProgress;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(() => loadStoredProgress());

  useEffect(() => {
    localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const completeSentimentAssessment = (summary = null) => {
    setProgress((prev) => ({
      ...prev,
      sentimentCompleted: true,
      sentimentSummary: summary,
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setProgress(defaultProgress);
    localStorage.removeItem("token");
    localStorage.removeItem(PROGRESSION_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        user,
        setUser,
        progress,
        completeSentimentAssessment,
        resetProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
