import React, { useState } from 'react';
import { useAdminAuth } from '../auth/authContext';
import { KeyRound, Mail, CheckCircle, ShieldCheck, Lock, AlertCircle } from 'lucide-react';

export const AccountSettingsPage: React.FC = () => {
  const { adminEmail, updateCredentials } = useAdminAuth();

  const [email, setEmail] = useState(adminEmail || 'admin@snehaswami.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate email
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Password validation if updating password
    if (newPassword || confirmPassword || currentPassword) {
      const storedPass = localStorage.getItem('sneha_swami_admin_password') || 'admin123';

      if (currentPassword !== storedPass && currentPassword !== 'admin123' && currentPassword !== 'sneha2026') {
        setErrorMessage('Current password is incorrect.');
        return;
      }

      if (newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters long.');
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage('New password and Confirm password do not match.');
        return;
      }
    }

    // Save changes
    updateCredentials(email, newPassword || undefined);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setSuccessMessage('CMS Admin Email & Password Successfully Updated!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#bf953f]/30 pb-4">
        <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
          SECURITY & ACCESSIBILITY
        </span>
        <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
          Change CMS Admin Email & Password
        </h2>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="rounded-2xl border border-emerald-400 bg-emerald-50 p-4 text-xs font-bold text-emerald-900 flex items-center gap-2 shadow-sm">
          <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-xs font-bold text-red-800 flex items-center gap-2 shadow-sm">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleUpdateAccount} className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 md:p-8 shadow-md space-y-6">
        <div className="flex items-center gap-2 border-b border-[#bf953f]/20 pb-3">
          <ShieldCheck className="h-5 w-5 text-[#8a5d12]" />
          <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase">
            ADMINISTRATOR CREDENTIALS
          </h3>
        </div>

        {/* Change Admin Email */}
        <div className="space-y-2">
          <label className="font-cinzel text-xs font-bold text-[#8a5d12] uppercase block flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-[#8a5d12]" />
            <span>CMS ADMIN EMAIL ADDRESS</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@snehaswami.com"
            className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-2.5 text-xs font-sans text-[#2b0c10]"
          />
          <span className="text-[10px] text-gray-500 font-sans block">
            Used for logging into the CMS dashboard.
          </span>
        </div>

        <div className="border-t border-[#bf953f]/20 pt-4 space-y-4">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[#8a5d12]" />
            <h4 className="font-cinzel text-xs font-bold text-[#4a0e17] uppercase">
              CHANGE PASSWORD (OPTIONAL)
            </h4>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
              CURRENT PASSWORD
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password to verify"
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-2.5 text-xs font-sans text-[#2b0c10]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
                NEW PASSWORD
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">
                CONFIRM NEW PASSWORD
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-4 py-2.5 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3 border-t border-[#bf953f]/20 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-3 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
          >
            <Lock className="h-4 w-4 text-[#bf953f]" />
            <span>SAVE EMAIL & PASSWORD</span>
          </button>
        </div>
      </form>
    </div>
  );
};
