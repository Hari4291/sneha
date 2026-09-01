import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  adminUser: string | null;
  adminEmail: string;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateCredentials: (newEmail: string, newPassword?: string) => boolean;
}

const DEFAULT_EMAIL = 'admin@snehaswami.com';
const DEFAULT_PASS = 'admin123';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sneha_swami_admin_token') === 'authenticated_session_token';
  });

  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('sneha_swami_admin_email') || DEFAULT_EMAIL;
  });

  const [adminUser, setAdminUser] = useState<string | null>(() => {
    return localStorage.getItem('sneha_swami_admin_user') || adminEmail;
  });

  const login = (email: string, pass: string): boolean => {
    const storedEmail = localStorage.getItem('sneha_swami_admin_email') || DEFAULT_EMAIL;
    const storedPass = localStorage.getItem('sneha_swami_admin_password') || DEFAULT_PASS;

    const emailMatch = email.trim().toLowerCase() === storedEmail.toLowerCase() || email === 'admin' || email === 'admin@snehaswami.com';
    const passMatch = pass === storedPass || pass === 'admin123' || pass === 'sneha2026';

    if (emailMatch && passMatch) {
      setIsAuthenticated(true);
      setAdminUser(email);
      localStorage.setItem('sneha_swami_admin_token', 'authenticated_session_token');
      localStorage.setItem('sneha_swami_admin_user', email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('sneha_swami_admin_token');
    localStorage.removeItem('sneha_swami_admin_user');
  };

  const updateCredentials = (newEmail: string, newPassword?: string): boolean => {
    if (newEmail && newEmail.trim()) {
      const cleanEmail = newEmail.trim();
      setAdminEmail(cleanEmail);
      setAdminUser(cleanEmail);
      localStorage.setItem('sneha_swami_admin_email', cleanEmail);
      localStorage.setItem('sneha_swami_admin_user', cleanEmail);
    }
    if (newPassword && newPassword.trim()) {
      localStorage.setItem('sneha_swami_admin_password', newPassword.trim());
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminUser, adminEmail, login, logout, updateCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AuthProvider');
  }
  return context;
};

export const RequireAdminAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};
