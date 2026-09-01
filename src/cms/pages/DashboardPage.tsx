import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import type { CMSContentState } from '../types/cmsTypes';
import {
  Calendar,
  Image as ImageIcon,
  Layers,
  Plus,
  Heart,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
}

export const DashboardPage: React.FC = () => {
  const { draftState } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Events', count: draftState.events.length, icon: Calendar, link: '/admin/events', color: 'bg-amber-100 border-amber-300 text-amber-900' },
    { title: 'Gallery Photos', count: draftState.gallery.length, icon: ImageIcon, link: '/admin/gallery', color: 'bg-rose-100 border-rose-300 text-rose-900' },
    { title: 'Active Sections', count: draftState.sections.filter(s => s.visible).length, icon: Layers, link: '/admin/sections', color: 'bg-indigo-100 border-indigo-300 text-indigo-900' },
    { title: 'Family Members', count: draftState.families.length, icon: Heart, link: '/admin/families', color: 'bg-[#f7f2e8] border-[#bf953f] text-[#4a0e17]' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-3xl border-2 border-[#bf953f] bg-gradient-to-r from-[#4a0e17] via-[#63141f] to-[#4a0e17] p-8 text-[#fcf6ba] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#bf953f] uppercase block">
              LUXURY WEDDING CMS DASHBOARD
            </span>
            <h2 className="mt-1 font-cormorant text-3xl md:text-4xl font-bold text-[#fffdfa]">
              Sri Sai Sneha & Subramanyeswara Swami
            </h2>
            <p className="mt-2 font-cormorant text-base italic text-[#f7f2ea] font-medium">
              Manage website content, events, family details, and gallery photos in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.open('/?preview=true', '_blank')}
              className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#fffdf9] px-5 py-2.5 font-cinzel text-xs font-bold text-[#4a0e17] hover:bg-[#f7f2e8] cursor-pointer shadow-md"
            >
              <ExternalLink className="h-4 w-4 text-[#8a5d12]" />
              <span>LIVE PREVIEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(stat.link)}
              className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between ${stat.color}`}
            >
              <div>
                <span className="font-cinzel text-xs font-bold tracking-wider uppercase block opacity-80">
                  {stat.title}
                </span>
                <span className="font-cormorant text-3xl font-bold block mt-1">
                  {stat.count}
                </span>
              </div>
              <div className="rounded-full bg-white/80 p-3 shadow-inner">
                <IconComp className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & Shortcut Editors */}
      <div className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md">
        <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] tracking-wider uppercase mb-4 flex items-center gap-2 border-b border-[#bf953f]/20 pb-3">
          <Sparkles className="h-4 w-4 text-[#8a5d12]" />
          <span>QUICK EDIT SHORTCUTS</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/admin/events')}
            className="flex items-center gap-3 rounded-xl border border-[#bf953f]/40 bg-[#f7f2e8] p-4 text-left hover:border-[#4a0e17] hover:bg-[#efe6d5] transition-all cursor-pointer"
          >
            <div className="rounded-lg bg-[#4a0e17] p-2.5 text-[#fcf6ba]">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#4a0e17] block">MANAGE EVENTS</span>
              <span className="font-sans text-[11px] text-[#734f10]">Add, edit or reorder wedding events</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/gallery')}
            className="flex items-center gap-3 rounded-xl border border-[#bf953f]/40 bg-[#f7f2e8] p-4 text-left hover:border-[#4a0e17] hover:bg-[#efe6d5] transition-all cursor-pointer"
          >
            <div className="rounded-lg bg-[#4a0e17] p-2.5 text-[#fcf6ba]">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#4a0e17] block">MEDIA GALLERY</span>
              <span className="font-sans text-[11px] text-[#734f10]">Upload & manage photo library</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/couple')}
            className="flex items-center gap-3 rounded-xl border border-[#bf953f]/40 bg-[#f7f2e8] p-4 text-left hover:border-[#4a0e17] hover:bg-[#efe6d5] transition-all cursor-pointer"
          >
            <div className="rounded-lg bg-[#4a0e17] p-2.5 text-[#fcf6ba]">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#4a0e17] block">EDIT COUPLE</span>
              <span className="font-sans text-[11px] text-[#734f10]">Update names, details & photos</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/preloader')}
            className="flex items-center gap-3 rounded-xl border border-[#bf953f]/40 bg-[#f7f2e8] p-4 text-left hover:border-[#4a0e17] hover:bg-[#efe6d5] transition-all cursor-pointer"
          >
            <div className="rounded-lg bg-[#4a0e17] p-2.5 text-[#fcf6ba]">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#4a0e17] block">TEMPLE ENTRANCE</span>
              <span className="font-sans text-[11px] text-[#734f10]">Edit Ganesha statue & preloader</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/final-invitation')}
            className="flex items-center gap-3 rounded-xl border border-[#bf953f]/40 bg-[#f7f2e8] p-4 text-left hover:border-[#4a0e17] hover:bg-[#efe6d5] transition-all cursor-pointer"
          >
            <div className="rounded-lg bg-[#4a0e17] p-2.5 text-[#fcf6ba]">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#4a0e17] block">FINAL INVITATION</span>
              <span className="font-sans text-[11px] text-[#734f10]">Edit blessings & host names</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/sections')}
            className="flex items-center gap-3 rounded-xl border border-[#bf953f]/40 bg-[#f7f2e8] p-4 text-left hover:border-[#4a0e17] hover:bg-[#efe6d5] transition-all cursor-pointer"
          >
            <div className="rounded-lg bg-[#4a0e17] p-2.5 text-[#fcf6ba]">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold text-[#4a0e17] block">SECTION ORDER</span>
              <span className="font-sans text-[11px] text-[#734f10]">Reorder or hide sections</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
