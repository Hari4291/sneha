import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../auth/authContext';
import { Lock, Mail, Key, ShieldCheck } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Default: admin / admin123');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1a080c] p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-sm"
        style={{ backgroundImage: `url('/assets/real_temple_doors.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090506] via-[#1a080c]/80 to-[#090506]" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border-2 border-[#bf953f] bg-[#fffdf9] p-8 md:p-10 shadow-2xl backdrop-blur-md">
        {/* Header Monogram Logo */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#bf953f] bg-[#4a0e17] shadow-xl overflow-hidden">
          <img src="/assets/logo.jpg" alt="Official Logo" className="h-full w-full object-cover rounded-full" />
        </div>

        <div className="text-center mb-8">
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            SACRED WEDDING PORTAL
          </span>
          <h1 className="mt-1 font-cormorant text-3xl font-bold text-[#4a0e17]">
            ADMINISTRATOR LOGIN
          </h1>
          <p className="mt-1 font-cormorant text-sm italic text-[#734f10]">
            Sign in to manage the Sri Sai Sneha & Subramanyeswara Swami Wedding CMS.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-3.5 text-center text-xs font-semibold text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / Username Field */}
          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              EMAIL OR USERNAME
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#8a5d12]" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@snehaswami.com"
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] pl-10 pr-4 py-3 font-sans text-sm text-[#2b0c10] focus:border-[#4a0e17] focus:outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              PASSWORD
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-[#8a5d12]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] pl-10 pr-4 py-3 font-sans text-sm text-[#2b0c10] focus:border-[#4a0e17] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full border border-[#bf953f] bg-gradient-to-r from-[#4a0e17] via-[#7a1c29] to-[#4a0e17] py-3.5 font-cinzel text-xs font-bold tracking-[0.25em] text-[#fcf6ba] shadow-xl hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
          >
            <Lock className="h-4 w-4 text-[#fcf6ba]" />
            <span>LOGIN TO CMS PANEL</span>
          </button>
        </form>

        <div className="mt-8 border-t border-[#bf953f]/30 pt-4 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-cinzel font-semibold text-[#8a5d12]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#8a5d12]" />
            <span>PROTECTED AUTHORIZED ACCESS ONLY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
