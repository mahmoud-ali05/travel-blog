import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the token in axios headers
      api.defaults.headers.common['x-auth-token'] = token;
      
      // Fetch user data
      const fetchUser = async () => {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
          delete api.defaults.headers.common['x-auth-token'];
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = async (token) => {
    try {
      localStorage.setItem('token', token);
      api.defaults.headers.common['x-auth-token'] = token;
      
      const res = await api.get('/auth/me');
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching user after login:', error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['x-auth-token'];
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 