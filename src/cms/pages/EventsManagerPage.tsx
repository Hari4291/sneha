import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { CMSContentState, EventItemData } from '../types/cmsTypes';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { Plus, Trash2, Edit2, ArrowUp, ArrowDown, Eye, EyeOff, Save, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface OutletContextType {
  draftState: CMSContentState;
  handleSaveDraft: (state?: CMSContentState) => void;
}

export const EventsManagerPage: React.FC = () => {
  const { draftState, handleSaveDraft } = useOutletContext<OutletContextType>();
  const [editingEvent, setEditingEvent] = useState<EventItemData | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const triggerSave = () => {
    handleSaveDraft();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCreateNew = () => {
    const newEvt: EventItemData = {
      id: `evt-${Date.now()}`,
      chapter: `0${draftState.events.length + 1}`,
      title: 'New Celebration Event',
      subheading: 'A Festive Gathering',
      message: 'You are cordially invited to join our celebrations.',
      date: '05 SEPTEMBER 2026',
      day: 'SATURDAY',
      time: '06:00 PM ONWARDS',
      venue: 'Wedding Hall Venue',
      address: 'Kalaparu Village, Pedapadu Mandal',
      district: 'Eluru District, Andhra Pradesh',
      googleMapsUrl: 'https://maps.google.com',
      image: '/assets/couple_sundowner_1788197884607.jpg',
      colorTheme: 'gold',
      visible: true,
      order: draftState.events.length + 1,
    };
    setEditingEvent(newEvt);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    const existingIdx = draftState.events.findIndex((evt) => evt.id === editingEvent.id);
    let updatedEvents = [...draftState.events];

    if (existingIdx >= 0) {
      updatedEvents[existingIdx] = editingEvent;
    } else {
      updatedEvents.push(editingEvent);
    }

    handleSaveDraft({ ...draftState, events: updatedEvents });
    setEditingEvent(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteEvent = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    const filtered = draftState.events.filter((evt) => evt.id !== id);
    handleSaveDraft({ ...draftState, events: filtered });
  };

  const toggleEventVisibility = (id: string) => {
    const updated = draftState.events.map((evt) =>
      evt.id === id ? { ...evt, visible: !evt.visible } : evt
    );
    handleSaveDraft({ ...draftState, events: updated });
  };

  const moveEvent = (index: number, direction: 'up' | 'down') => {
    const list = [...draftState.events];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1, chapter: `0${idx + 1}` }));
    handleSaveDraft({ ...draftState, events: reordered });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#bf953f]/30 pb-4">
        <div>
          <span className="font-cinzel text-xs font-bold tracking-[0.3em] text-[#8a5d12] uppercase block">
            DYNAMIC CELEBRATION EVENTS CMS
          </span>
          <h2 className="font-cormorant text-3xl font-bold text-[#4a0e17]">
            Manage Wedding Events & Itinerary
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={triggerSave}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-5 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-md"
          >
            {saveSuccess ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4 text-[#bf953f]" />}
            <span>{saveSuccess ? 'SAVED!' : 'SAVE CHANGES'}</span>
          </button>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#8a5d12] px-4 py-2.5 font-cinzel text-xs font-bold text-[#fffdfa] hover:bg-[#734f10] cursor-pointer shadow-md"
          >
            <Plus className="h-4 w-4 text-white" />
            <span>ADD EVENT</span>
          </button>
        </div>
      </div>

      {/* Events List View */}
      {!editingEvent && (
        <div className="space-y-4">
          {draftState.events.map((evt, idx) => (
            <div
              key={evt.id}
              className={`rounded-2xl border p-5 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                evt.visible ? 'border-[#bf953f]/40 bg-[#fffdf9]' : 'border-gray-300 bg-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-xl border border-[#bf953f]/30 overflow-hidden shrink-0 bg-gray-200">
                  <img src={evt.image} alt={evt.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-[10px] font-bold text-[#8a5d12] uppercase bg-[#f7f2e8] px-2 py-0.5 rounded border border-[#bf953f]/30">
                      CHAPTER {evt.chapter}
                    </span>
                    <h3 className="font-cinzel text-sm font-bold text-[#4a0e17]">{evt.title}</h3>
                  </div>
                  <p className="font-sans text-xs text-[#734f10] mt-1 font-semibold">
                    {evt.date} • {evt.time}
                  </p>
                  <p className="font-sans text-[11px] text-gray-600 italic">
                    Venue: {evt.venue}, {evt.district}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveEvent(idx, 'up')}
                  disabled={idx === 0}
                  className="p-2 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-[#f7f2e8] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveEvent(idx, 'down')}
                  disabled={idx === draftState.events.length - 1}
                  className="p-2 rounded-lg border border-[#bf953f]/40 text-[#4a0e17] hover:bg-[#f7f2e8] disabled:opacity-30 cursor-pointer"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleEventVisibility(evt.id)}
                  className={`p-2 rounded-lg border cursor-pointer ${
                    evt.visible ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-gray-400 bg-gray-200 text-gray-600'
                  }`}
                  title={evt.visible ? 'Hide Event' : 'Show Event'}
                >
                  {evt.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setEditingEvent(evt)}
                  className="p-2 rounded-lg border border-[#bf953f] bg-[#4a0e17] text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
                  title="Edit Event"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(evt.id)}
                  className="p-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                  title="Delete Event"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Form */}
      {editingEvent && (
        <form onSubmit={handleSaveEvent} className="rounded-2xl border border-[#bf953f]/30 bg-[#fffdf9] p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-[#bf953f]/20 pb-4">
            <h3 className="font-cinzel text-sm font-bold text-[#4a0e17] uppercase">
              {editingEvent.id ? 'EDIT EVENT DETAILS' : 'CREATE NEW EVENT'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="text-xs font-cinzel font-bold text-gray-500 hover:text-black underline cursor-pointer"
            >
              CANCEL
            </button>
          </div>

          {/* Image Picker */}
          <div className="space-y-2">
            <label className="font-cinzel text-xs font-bold tracking-wider text-[#8a5d12] uppercase block">
              EVENT COVER PHOTOGRAPH
            </label>
            <div className="flex items-center gap-4">
              <div className="h-28 w-28 rounded-xl border border-[#bf953f]/40 overflow-hidden bg-gray-100">
                <img src={editingEvent.image} alt={editingEvent.title} className="h-full w-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-[#bf953f] bg-[#4a0e17] px-4 py-2 text-xs font-cinzel font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 text-[#bf953f]" />
                <span>SELECT COVER IMAGE</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">EVENT TITLE</label>
              <input
                type="text"
                required
                value={editingEvent.title}
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">SUBHEADING</label>
              <input
                type="text"
                value={editingEvent.subheading || ''}
                onChange={(e) => setEditingEvent({ ...editingEvent, subheading: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">EVENT DESCRIPTION / MESSAGE</label>
            <textarea
              rows={2}
              value={editingEvent.message}
              onChange={(e) => setEditingEvent({ ...editingEvent, message: e.target.value })}
              className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">DATE STR</label>
              <input
                type="text"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">DAY STR</label>
              <input
                type="text"
                value={editingEvent.day}
                onChange={(e) => setEditingEvent({ ...editingEvent, day: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">TIME STR</label>
              <input
                type="text"
                value={editingEvent.time}
                onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">VENUE NAME</label>
              <input
                type="text"
                value={editingEvent.venue}
                onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">ADDRESS & DISTRICT</label>
              <input
                type="text"
                value={editingEvent.address}
                onChange={(e) => setEditingEvent({ ...editingEvent, address: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">DRESS CODE</label>
              <input
                type="text"
                value={editingEvent.dressCode || ''}
                onChange={(e) => setEditingEvent({ ...editingEvent, dressCode: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[11px] font-bold text-[#8a5d12] uppercase block">GOOGLE MAPS URL</label>
              <input
                type="url"
                value={editingEvent.googleMapsUrl}
                onChange={(e) => setEditingEvent({ ...editingEvent, googleMapsUrl: e.target.value })}
                className="w-full rounded-xl border border-[#bf953f]/50 bg-[#f7f2e8] px-3 py-2 text-xs font-sans text-[#2b0c10]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="rounded-full border border-gray-300 px-5 py-2.5 font-cinzel text-xs font-bold text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full border border-[#bf953f] bg-[#4a0e17] px-6 py-2.5 font-cinzel text-xs font-bold text-[#fcf6ba] hover:bg-[#7a1c29] cursor-pointer shadow-lg"
            >
              <Save className="h-4 w-4 text-[#bf953f]" />
              <span>SAVE EVENT</span>
            </button>
          </div>

          <MediaPickerModal
            isOpen={isMediaPickerOpen}
            onClose={() => setIsMediaPickerOpen(false)}
            onSelect={(url) => setEditingEvent({ ...editingEvent, image: url })}
            currentValue={editingEvent.image}
          />
        </form>
      )}
    </div>
  );
};
