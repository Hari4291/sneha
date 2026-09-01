import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCMSContent } from '../cms/store/cmsStore';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  isPreview?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, isPreview = false }) => {
  const cmsContent = useCMSContent(isPreview);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = cmsContent.sections
    .filter((s) => s.visible && s.id !== 'preloader' && s.id !== 'footer')
    .map((s) => ({
      id: s.id,
      label: s.name.split('/')[0].toUpperCase(),
    }));

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#fffdfa]/95 backdrop-blur-md shadow-lg border-b border-[#bf953f]/30 py-3'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Monogram */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#bf953f] bg-[#4a0e17] shadow-md overflow-hidden shrink-0">
            <img src="/assets/logo.jpg" alt="Logo" className="h-full w-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] transition-colors ${
                isScrolled ? 'text-[#4a0e17]' : 'text-white drop-shadow'
              }`}
            >
              SNEHA & SWAMI
            </span>
            <span
              className={`font-sans text-[9px] tracking-widest font-semibold uppercase ${
                isScrolled ? 'text-[#8a5d12]' : 'text-[#fcf6ba] drop-shadow'
              }`}
            >
              {cmsContent.hero.hashtag} • 05.09.2026
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`font-cinzel text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer hover:text-[#bf953f] ${
                isScrolled ? 'text-[#4a0e17]' : 'text-white drop-shadow-md'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden rounded-lg p-2 transition-colors cursor-pointer ${
            isScrolled ? 'text-[#4a0e17]' : 'text-white'
          }`}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#fffdf9] border-b border-[#bf953f]/40 shadow-2xl px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="font-cinzel text-sm font-bold tracking-widest text-[#4a0e17] uppercase text-left py-2 border-b border-[#bf953f]/20 hover:text-[#8a5d12] cursor-pointer"
                >
                  {link.label}
                </button>
              ))}

              <div className="border-t border-[#bf953f]/30 pt-4 text-center">
                <p className="font-cormorant text-sm italic text-[#734f10]">
                  05 September 2026 • Kalaparu & Dharmajigudem
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
