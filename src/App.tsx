import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { AuthProvider, RequireAdminAuth } from './cms/auth/authContext';
import { AdminLayout } from './cms/components/AdminLayout';
import { AdminLoginPage } from './cms/pages/AdminLoginPage';
import { DashboardPage } from './cms/pages/DashboardPage';
import { SectionManagerPage } from './cms/pages/SectionManagerPage';
import { PreloaderEditorPage } from './cms/pages/PreloaderEditorPage';
import { HeroEditorPage } from './cms/pages/HeroEditorPage';
import { CoupleEditorPage } from './cms/pages/CoupleEditorPage';
import { FamiliesManagerPage } from './cms/pages/FamiliesManagerPage';
import { EventsManagerPage } from './cms/pages/EventsManagerPage';
import { CelebrationsManagerPage } from './cms/pages/CelebrationsManagerPage';
import { SaptapadiEditorPage } from './cms/pages/SaptapadiEditorPage';
import { GalleryManagerPage } from './cms/pages/GalleryManagerPage';
import { ReelsManagerPage } from './cms/pages/ReelsManagerPage';
import { FinalInvitationEditorPage } from './cms/pages/FinalInvitationEditorPage';
import { CountdownEditorPage } from './cms/pages/CountdownEditorPage';
import { FooterEditorPage } from './cms/pages/FooterEditorPage';
import { MusicEditorPage } from './cms/pages/MusicEditorPage';
import { SEOEditorPage } from './cms/pages/SEOEditorPage';
import { AccountSettingsPage } from './cms/pages/AccountSettingsPage';

import { TempleDoorIntro } from './components/TempleDoorIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { FamilyBlessings } from './components/FamilyBlessings';
import { EventChapters } from './components/EventChapters';
import { CelebrationsSection } from './components/CelebrationsSection';
import { SaptapadiSection } from './components/SaptapadiSection';
import { PhotoGallery } from './components/PhotoGallery';
import { ReelsSection } from './components/ReelsSection';
import { FinalInvitation } from './components/FinalInvitation';
import { CountdownTimer } from './components/CountdownTimer';
import { FooterClosing } from './components/FooterClosing';
import { AudioPlayer } from './components/AudioPlayer';
import { ParticleCanvas } from './components/ParticleCanvas';

import { useCMSContent } from './cms/store/cmsStore';

// Public Wedding Website Page Component
const PublicWeddingWebsite: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const cmsContent = useCMSContent(isPreview);

  const [hasEntered, setHasEntered] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    setIsAudioPlaying(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <HeroSection key="hero" onExplore={() => handleNavigate('couple')} isPreview={isPreview} />,
    couple: <CoupleSection key="couple" isPreview={isPreview} />,
    countdown: cmsContent.countdown.enabled ? <CountdownTimer key="countdown" targetDate={cmsContent.countdown.targetDate} /> : null,
    families: <FamilyBlessings key="families" isPreview={isPreview} />,
    events: <EventChapters key="events" isPreview={isPreview} />,
    saptapadi: <SaptapadiSection key="saptapadi" isPreview={isPreview} />,
    celebrations: <CelebrationsSection key="celebrations" isPreview={isPreview} />,
    gallery: <PhotoGallery key="gallery" isPreview={isPreview} />,
    reels: <ReelsSection key="reels" isPreview={isPreview} />,
    finalInvitation: <FinalInvitation key="finalInvitation" isPreview={isPreview} />,
  };

  const orderedVisibleSections = cmsContent.sections
    .filter((s) => s.visible && s.id !== 'preloader' && s.id !== 'footer')
    .sort((a, b) => a.order - b.order)
    .map((s) => sectionMap[s.id])
    .filter(Boolean);

  const isPreloaderEnabled = cmsContent.sections.find((s) => s.id === 'preloader')?.visible !== false;
  const isFooterEnabled = cmsContent.sections.find((s) => s.id === 'footer')?.visible !== false;

  return (
    <div className="relative min-h-screen bg-[#f7f2e8] text-gray-900 selection:bg-[#4a0e17] selection:text-[#fcf6ba]">
      {/* Background Floating Petals / Particles */}
      <ParticleCanvas />

      {/* Preloader / Temple Door Intro */}
      {isPreloaderEnabled && !hasEntered && (
        <TempleDoorIntro
          onEnter={handleEnter}
          isAudioPlaying={isAudioPlaying}
          toggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
          isPreview={isPreview}
        />
      )}

      {/* Main Website Header Navbar */}
      <Navbar onNavigate={handleNavigate} isPreview={isPreview} />

      {/* Dynamic Ordered Sections */}
      <main>{orderedVisibleSections}</main>

      {/* Footer Closing Section */}
      {isFooterEnabled && <FooterClosing isPreview={isPreview} />}

      {/* Background Music Player */}
      {cmsContent.music.enabled && (
        <AudioPlayer isPlaying={isAudioPlaying} onToggle={() => setIsAudioPlaying(!isAudioPlaying)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Wedding Website Route */}
          <Route path="/" element={<PublicWeddingWebsite />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin CMS Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <RequireAdminAuth>
                <AdminLayout />
              </RequireAdminAuth>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="sections" element={<SectionManagerPage />} />
            <Route path="preloader" element={<PreloaderEditorPage />} />
            <Route path="hero" element={<HeroEditorPage />} />
            <Route path="couple" element={<CoupleEditorPage />} />
            <Route path="families" element={<FamiliesManagerPage />} />
            <Route path="events" element={<EventsManagerPage />} />
            <Route path="celebrations" element={<CelebrationsManagerPage />} />
            <Route path="saptapadi" element={<SaptapadiEditorPage />} />
            <Route path="gallery" element={<GalleryManagerPage />} />
            <Route path="reels" element={<ReelsManagerPage />} />
            <Route path="final-invitation" element={<FinalInvitationEditorPage />} />
            <Route path="countdown" element={<CountdownEditorPage />} />
            <Route path="footer" element={<FooterEditorPage />} />
            <Route path="music" element={<MusicEditorPage />} />
            <Route path="seo" element={<SEOEditorPage />} />
            <Route path="account" element={<AccountSettingsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
