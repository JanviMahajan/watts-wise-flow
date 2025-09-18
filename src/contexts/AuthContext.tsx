import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  user_type: 'house' | 'shop';
  electricity_rate?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, userType: 'house' | 'shop') => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('greenops_token');
    const savedUser = localStorage.getItem('greenops_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, simulate successful login
      // TODO: Replace with actual backend authentication when endpoints are available
      if (email && password) {
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          user_type: 'house' as const,
          electricity_rate: 0.12
        };
        const mockToken = 'demo_token_' + Date.now();
        
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('greenops_token', mockToken);
        localStorage.setItem('greenops_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (email: string, password: string, name: string, userType: 'house' | 'shop'): Promise<boolean> => {
    try {
      // For demo purposes, simulate successful registration
      // TODO: Replace with actual backend registration when endpoints are available
      if (email && password && name) {
        const mockUser = {
          id: Date.now().toString(),
          email,
          name,
          user_type: userType,
          electricity_rate: 0.12
        };
        const mockToken = 'demo_token_' + Date.now();
        
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('greenops_token', mockToken);
        localStorage.setItem('greenops_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('greenops_token');
    localStorage.removeItem('greenops_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}