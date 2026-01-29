import { createContext, useState, useEffect } from 'react';

import { RANKS } from '../utils/Consts.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
      try {
        const stored = localStorage.getItem('geoApp_user');
        return stored ? JSON.parse(stored) : null;
      } catch { return null; }
  });

  const getUsersDB = () => {
    const db = localStorage.getItem('geoApp_users_db');
    return db ? JSON.parse(db) : [];
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('geoApp_user', JSON.stringify(user));
    const db = getUsersDB();
    const existingIndex = db.findIndex(u => u.id === user.id);
      if (existingIndex >= 0) {
        db[existingIndex] = user; 
      } else {
        db.push(user); 
      }
      localStorage.setItem('geoApp_users_db', JSON.stringify(db));
    } else {
      localStorage.removeItem('geoApp_user');
    }
  }, [user]);


  const login = (username) => {
    const db = getUsersDB();
    const existingUser = db.find(u => u.name.toLowerCase() === username.toLowerCase());
    if (existingUser) {
      setUser(existingUser); 
    } else {
      const newUser = {
        id: username.toLowerCase() + '-' + Date.now(),
        name: username,
        points: (username === 'admin') ? 10000 : 0,
        avatar: null
      };
      setUser(newUser); 
    }
  };
  const logout = () => {
    setUser(null);
    alert("Wylogowano pomyślnie!")
  };

  // Obsługa socialu

  const addReputation = (amount) => {
    if (!user) return;
    setUser(prev => ({ ...prev, points: (prev.points || 0) + amount }));
  };

  const updateAvatar = (base64Image) => {
    if (!user) return;
    setUser(prev => ({ ...prev, avatar: base64Image }));
  };

  const getCurrentRank = () => {
    if (!user) return RANKS[0];
    return RANKS.slice().reverse().find(r => (user.points || 0) >= r.threshold) || RANKS[0];
  };

  const getNextRankProgress = () => {
    if (!user) return { percent: 0, nextThreshold: 10 };
    
    const currentPoints = user.points || 0;
    const nextRankIndex = RANKS.findIndex(r => r.threshold > currentPoints);
    
    if (nextRankIndex === -1) return { percent: 100, nextThreshold: currentPoints }; // Max level
    
    const prevThreshold = RANKS[nextRankIndex - 1]?.threshold || 0;
    const nextThreshold = RANKS[nextRankIndex].threshold;
    
    const percent = ((currentPoints - prevThreshold) / (nextThreshold - prevThreshold)) * 100;
    
    return { percent, nextThreshold, nextRankName: RANKS[nextRankIndex].name };
  };

  return (
    <AuthContext value={{ 
      user, login, logout,
      isAuthenticated: !!user,
      addReputation, updateAvatar, getCurrentRank, getNextRankProgress
    }}>
      {children}
    </AuthContext>
  );
};
