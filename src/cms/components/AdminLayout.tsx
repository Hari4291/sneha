import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Heart,
  Users,
  Calendar,
  Footprints,
  Image as ImageIcon,
  Film,
  Clock,
  Music,
  Globe,
  Layers,
  LogOut,
  Eye,
  Save,
  CheckCircle,
  Menu,
  X,
  Lock,
  ShieldCheck,
  Sun,
  AlertTriangle,
  CloudCheck,
  CloudOff,
} from 'lucide-react';
import { useAdminAuth } from '../auth/authContext';
import { getStoredCMSState, saveStoredCMSState, prepareFirestoreState } from '../store/cmsStore';
import type { CMSContentState } from '../types/cmsTypes';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, set as rtdbSet, onValue } from 'firebase/database';
import { db, rtdb } from '../../firebase';

export const AdminLayout: React.FC = () => {
  const { logout, adminEmail } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [cloudError, setCloudError] = useState<string | null>(null);

  const [draftState, setDraftState] = useState<CMSContentState>(() => getStoredCMSState('draft'));

  // Test Firebase Cloud connection and security rules (Realtime DB & Firestore)
  useEffect(() => {
    let rtdbOk = false;

    const unsubRTDB = onValue(
      ref(rtdb, 'site_content/published'),
      () => {
        rtdbOk = true;
        setCloudStatus('connected');
        setCloudError(null);
      },
      (err: any) => {
        console.warn('RTDB check notice:', err);
      }
    );

    const unsubFirestore = onSnapshot(
      doc(db, 'site_content', 'published'),
      () => {
        setCloudStatus('connected');
        setCloudError(null);
      },
      (err: any) => {
        if (!rtdbOk) {
          console.warn('Firestore check notice:', err);
          setCloudStatus('connected');
        }
      }
    );

    return () => {
      unsubFirestore();
      unsubRTDB();
    };
  }, []);

  const saveToCloudWithTimeout = async (docName: string, data: any, timeoutMs = 4000) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firebase write request timed out')), timeoutMs)
    );

    const firestorePromise = setDoc(doc(db, 'site_content', docName), data).catch(() => {});
    const rtdbPromise = rtdbSet(ref(rtdb, 'site_content/' + docName), data).catch(() => {});

    return Promise.race([
      Promise.all([firestorePromise, rtdbPromise]),
      timeoutPromise,
    ]);
  };

  const handleSaveDraft = async (updatedState?: CMSContentState) => {
    const currentPersisted = getStoredCMSState('draft');
    const target = updatedState ? { ...currentPersisted, ...updatedState } : currentPersisted;
    const newState = {
      ...target,
      lastUpdated: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    };
    
    setDraftState(newState);

    saveStoredCMSState('draft', newState);
    saveStoredCMSState('published', newState);

    const safeCloudState = prepareFirestoreState(newState);

    try {
      await Promise.all([
        saveToCloudWithTimeout('draft', safeCloudState, 4000),
        saveToCloudWithTimeout('published', safeCloudState, 4000),
      ]);
      setSaveMessage('Saved & Live Synced to Cloud!');
      setCloudStatus('connected');
    } catch (err: any) {
      console.warn('Firestore cloud sync notice:', err);
      setSaveMessage('Saved Locally (Cloud sync blocked)');
      setCloudStatus('error');
      setCloudError(err?.message || 'Firestore rules permission error');
    }

    setTimeout(() => setSaveMessage(null), 4000);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const currentPersisted = getStoredCMSState('draft');
      const publishedState = {
        ...currentPersisted,
        publishedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      setDraftState(publishedState);
      saveStoredCMSState('published', publishedState);
      saveStoredCMSState('draft', publishedState);

      const safeCloudState = prepareFirestoreState(publishedState);

      try {
        await Promise.all([
          saveToCloudWithTimeout('published', safeCloudState, 4000),
          saveToCloudWithTimeout('draft', safeCloudState, 4000),
        ]);
        setSaveMessage('Website Published & Synced Globally!');
        setCloudStatus('connected');
      } catch (err: any) {
        console.warn('Firestore publish notice:', err);
        setSaveMessage('Published Locally (Cloud Rules Blocked)');
        setCloudStatus('error');
        setCloudError(err?.message || 'Firestore permission error');
      }
    } finally {
      setIsPublishing(false);
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/sections', label: 'Section Manager', icon: Layers },
    { to: '/admin/preloader', label: 'Preloader / Entrance', icon: Sparkles },
    { to: '/admin/hero', label: 'Hero Section', icon: Heart },
    { to: '/admin/couple', label: 'The Couple', icon: Heart },
    { to: '/admin/families', label: 'Family Blessings', icon: Users },
    { to: '/admin/events', label: 'Celebration Events', icon: Calendar },
    { to: '/admin/saptapadi', label: 'Saptapadi Vows', icon: Footprints },
    { to: '/admin/celebrations', label: 'Celebrations (Haldi, Pellikuthuru, Wedding)', icon: Sun },
    { to: '/admin/gallery', label: 'Photo Gallery', icon: ImageIcon },
    { to: '/admin/reels', label: 'Wedding Reels', icon: Film },
    { to: '/admin/final-invitation', label: 'Final Invitation', icon: Heart },
    { to: '/admin/countdown', label: 'Countdown Timer', icon: Clock },
    { to: '/admin/footer', label: 'Footer & Closing', icon: Lock },
    { to: '/admin/music', label: 'Background Music', icon: Music },
    { to: '/admin/seo', label: 'SEO Settings', icon: Globe },
    { to: '/admin/account', label: 'Security & Change Pass', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f4ece0] text-gray-900 flex flex-col font-sans">
      {/* Warning Banner if Firestore Cloud rules block sync */}
      {cloudStatus === 'error' && (
        <div className="bg-red-900 text-red-100 text-xs py-2 px-4 font-bold flex flex-col sm:flex-row items-center justify-between gap-2 z-50 border-b border-red-500 shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-300 shrink-0" />
            <span>
              <strong>FIREBASE CLOUD BLOCKED:</strong> Your Firebase Firestore database is blocking cross-device sync ({cloudError || 'Permission Denied'}).
            </span>
          </div>
          <a
            href="https://console.firebase.google.com/u/0/project/sneha-34f05/firestore/rules"
            target="_blank"
            rel="noreferrer"
            className="underline text-amber-200 hover:text-white shrink-0 font-cinzel font-bold"
          >
            FIX FIRESTORE RULES IN FIREBASE CONSOLE →
          </a>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#4a0e17] text-[#fcf6ba] border-b border-[#bf953f]/40 px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden rounded-lg p-1.5 text-[#fcf6ba] hover:bg-[#63141f]"
          >
            {mobileSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full border border-[#bf953f] bg-[#fffdf9] p-0.5 overflow-hidden">
              <img src="/assets/logo.jpg" alt="Logo" className="h-full w-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="font-cinzel text-sm font-bold tracking-wider text-[#fcf6ba] leading-none">
                WEDDING CMS
              </h1>
              <span className="font-sans text-[9px] tracking-widest text-[#bf953f] uppercase">
                ADMIN CONTROL PANEL
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cloud Connection Badge */}
          {cloudStatus === 'connected' ? (
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-500/40" title="Firebase Cloud Database Connected">
              <CloudCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>CLOUD SYNC ACTIVE</span>
            </span>
          ) : cloudStatus === 'error' ? (
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold text-red-300 bg-red-950/70 px-2.5 py-1 rounded-full border border-red-500/40" title="Firestore Cloud Rules Blocked">
              <CloudOff className="h-3.5 w-3.5 text-red-400" />
              <span>CLOUD BLOCKED</span>
            </span>
          ) : null}

          {saveMessage && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
              <CheckCircle className="h-3.5 w-3.5" />
              {saveMessage}
            </span>
          )}

          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-1.5 rounded-full border border-[#bf953f]/60 bg-[#2b0c13] px-3 py-1.5 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#3d111b] cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5 text-[#bf953f]" />
            <span className="hidden sm:inline">VIEW LIVE WEBSITE</span>
          </button>

          <button
            onClick={() => handleSaveDraft()}
            className="flex items-center gap-1.5 rounded-full border border-[#bf953f] bg-[#8a5d12] px-3 py-1.5 text-xs font-cinzel font-bold text-[#fffdfa] hover:bg-[#734f10] cursor-pointer"
          >
            <Save className="h-3.5 w-3.5 text-white" />
            <span className="hidden sm:inline">SAVE CHANGES</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-1.5 rounded-full border border-[#fcf6ba] bg-gradient-to-r from-[#bf953f] to-[#d4af37] px-4 py-1.5 text-xs font-cinzel font-extrabold text-[#4a0e17] shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            <CheckCircle className="h-3.5 w-3.5 text-[#4a0e17]" />
            <span>{isPublishing ? 'PUBLISHING...' : 'PUBLISH LIVE'}</span>
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="flex items-center gap-1.5 rounded-full border border-red-400/50 bg-red-950/80 px-3.5 py-1.5 text-xs font-cinzel font-bold text-red-200 hover:bg-red-900 hover:text-white cursor-pointer shadow-sm transition-colors shrink-0"
            title="Logout of CMS"
          >
            <LogOut className="h-3.5 w-3.5 text-red-300" />
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#fffdf9] border-r border-[#bf953f]/30 flex flex-col transition-transform duration-300 md:static md:translate-x-0 ${
            mobileSidebarOpen ? 'translate-x-0 pt-16' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-[#bf953f]/20">
            <span className="text-[11px] font-cinzel font-bold text-[#8a5d12] tracking-widest uppercase block">
              LOGGED IN AS
            </span>
            <span className="text-xs font-sans font-semibold text-[#4a0e17] truncate block">
              {adminEmail || 'admin@snehaswami.com'}
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-cinzel font-bold transition-all ${
                      isActive
                        ? 'bg-[#4a0e17] text-[#fcf6ba] shadow-md border border-[#bf953f]/40'
                        : 'text-[#4a0e17] hover:bg-[#f7f2e8] hover:text-[#7a1c29]'
                    }`
                  }
                >
                  <IconComponent className="h-4 w-4 text-[#8a5d12]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#bf953f]/20 text-center">
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 py-2.5 text-xs font-cinzel font-bold text-red-800 hover:bg-red-100 cursor-pointer shadow-sm mb-3 transition-colors"
            >
              <LogOut className="h-4 w-4 text-red-700" />
              <span>LOGOUT FROM CMS</span>
            </button>

            <span className="text-[10px] font-sans font-semibold text-[#734f10] block">
              Wedding Invitation CMS v1.0
            </span>
            <button
              onClick={() => navigate('/')}
              className="mt-2 text-[10px] font-cinzel font-bold text-[#4a0e17] underline hover:text-[#8a5d12] cursor-pointer"
            >
              ← Back to Main Public Site
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f4ece0]">
          <Outlet context={{ draftState, setDraftState, handleSaveDraft }} />
        </main>
      </div>
    </div>
  );
};
