import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const PROGRESSION_STORAGE_KEY = 'userProgress';

const defaultProgress = {
    sentimentCompleted: false,
    unlockedFeatures: {
        exerciseToImprove: false
    },
    sentimentSummary: null,
    exerciseProgress: {}
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
                ...(parsed.unlockedFeatures || {})
            },
            exerciseProgress: parsed.exerciseProgress || {}
        };
    } catch {
        return defaultProgress;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(() => loadStoredProgress());

    useEffect(() => {
        localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const completeSentimentAssessment = (summary = null) => {
        setProgress(prev => ({
            ...prev,
            sentimentCompleted: true,
            sentimentSummary: summary,
            unlockedFeatures: {
                ...prev.unlockedFeatures,
                exerciseToImprove: true
            }
        }));
    };

    const recordExerciseResult = (exerciseId, accuracy) => {
        setProgress(prev => {
            const prevExercise = prev.exerciseProgress[exerciseId] || {
                attempts: 0,
                bestAccuracy: 0,
                lastAccuracy: 0,
                completed: false,
                completedAt: null
            };

            return {
                ...prev,
                exerciseProgress: {
                    ...prev.exerciseProgress,
                    [exerciseId]: {
                        ...prevExercise,
                        attempts: prevExercise.attempts + 1,
                        lastAccuracy: accuracy,
                        bestAccuracy: Math.max(prevExercise.bestAccuracy, accuracy),
                        completed: true,
                        completedAt: new Date().toISOString()
                    }
                }
            };
        });
    };

    const resetProgress = () => {
        setProgress(defaultProgress);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setProgress(defaultProgress);
        localStorage.removeItem('token');
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
                recordExerciseResult,
                resetProgress
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
