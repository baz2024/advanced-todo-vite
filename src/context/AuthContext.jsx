// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const navigate = useNavigate();

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.username === username);

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      setUser({ username });
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existing = users.find(u => u.username === username);
    if (existing) {
      alert('User already exists');
      return;
    }
    const hashed = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashed });
    localStorage.setItem('users', JSON.stringify(users));
    login(username, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);