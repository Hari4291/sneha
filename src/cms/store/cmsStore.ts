import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, set as rtdbSet, onValue } from 'firebase/database';
import { db, rtdb } from '../../firebase';
import type { CMSContentState, SectionConfig, GalleryItemData } from '../types/cmsTypes';
import { WEDDING_DATA } from '../../data/weddingData';

export type { CMSContentState };

export const INITIAL_CMS_STATE: CMSContentState = {
  sections: [
    { id: 'preloader', name: 'Preloader / Temple Entrance', visible: true, order: 1 },
    { id: 'hero', name: 'Hero Section', visible: true, order: 2 },
    { id: 'couple', name: 'The Couple', visible: true, order: 3 },
    { id: 'countdown', name: 'Countdown Timer (Sumuhurtham)', visible: true, order: 4 },
    { id: 'families', name: 'Family Blessings', visible: true, order: 5 },
    { id: 'saptapadi', name: 'Saptapadi Vows (Seven Sacred Steps)', visible: true, order: 6 },
    { id: 'celebrations', name: 'Celebrations (Haldi, Pellikuthuru, Wedding)', visible: true, order: 7 },
    { id: 'gallery', name: 'Photo Gallery', visible: true, order: 8 },
    { id: 'reels', name: 'Wedding Reels & Video Highlights', visible: true, order: 9 },
    { id: 'finalInvitation', name: 'Final Invitation & Warm Regards', visible: true, order: 10 },
    { id: 'footer', name: 'Footer & Closing', visible: true, order: 11 },
  ],
  preloader: {
    ganeshaImage: '/assets/ganesha_statue.png',
    devotionalHeading: '|| OM SHRI GANESHAYA NAMAH ||',
    subheading: 'A Sacred Celebration of Love, Tradition & Togetherness',
    brideSalutation: 'Chi. La. Sau.',
    brideName: 'SRI SAI SNEHA',
    groomSalutation: 'Chi.',
    groomName: 'SUBRAMANYESWARA SWAMI',
    weddingDate: '05 SEPTEMBER 2026',
    weddingLocation: 'ELURU DISTRICT, ANDHRA PRADESH',
    buttonText: 'ENTER OUR CELEBRATION',
    instructionText: 'Tap royal seal to open temple doors',
  },
  hero: {
    blessingsText: 'With the sacred blessings of our families',
    brideName: WEDDING_DATA.couple.bride.fullName,
    groomName: WEDDING_DATA.couple.groom.fullName,
    hashtag: '#Sneha\'sSwami',
    weddingDate: WEDDING_DATA.sumuhurtham.date,
    sumuhurthamTime: `SUMUHURTHAM ${WEDDING_DATA.sumuhurtham.time}`,
    location: 'KALAPARU, ELURU DIST',
    scrollText: 'BEGIN THE JOURNEY',
    heroPhoto: '/assets/couple_real_hero.jpg',
  },
  couple: {
    bride: { ...WEDDING_DATA.couple.bride, photo: '/assets/couple_real_hero.jpg' },
    groom: { ...WEDDING_DATA.couple.groom, photo: '/assets/couple_editorial_hero_1788197820352.jpg' },
    monogram: WEDDING_DATA.couple.monogram,
    hashtag: '#Sneha\'sSwami',
  },
  families: WEDDING_DATA.hostsAndWellWishers.map((item, index) => ({
    id: `fam-${index}`,
    name: item.name,
    role: item.role,
    family: index === 0 ? 'bride' : 'host',
    visible: true,
    order: index + 1,
  })),
  events: WEDDING_DATA.events.map((e, index) => ({
    ...e,
    visible: true,
    order: index + 1,
  })),
  celebrationsHeader: {
    title: 'CHAPTER IV • SACRED RITUALS',
    heading: 'CELEBRATIONS',
    subheading: 'Select a sacred ceremony below to view its cinematic chapter and invitation.',
  },
  celebrations: [
    {
      id: 'cel-1',
      name: 'HALDI',
      date: 'SEP 04 2026',
      day: 'FRIDAY',
      title: 'HALDI',
      subheading: 'WITH HALDI & HENNA',
      message: 'You are invited to an evening of sunshine, traditions & togetherness',
      time: '05:00 PM onwards',
      followedBy: 'Followed by High Tea & Dinner',
      venue: 'DHARMAJIGUDEM',
      dressCode: 'Pastels only: PEACH, BABY PINK, BEIGE',
      googleMapsUrl: 'https://maps.google.com/?q=Dharmajigudem',
      heroImage: '/assets/couple_sundowner_1788197884607.jpg',
      visualTheme: 'haldi',
      visible: true,
      order: 1,
    },
    {
      id: 'cel-2',
      name: 'PELLIKUTHURU',
      date: 'SEP 05 2026',
      day: 'SATURDAY',
      title: 'PELLIKUTHURU',
      subheading: 'TRADITIONAL TELUGU BLESSINGS',
      message: 'An intimate and joyful ritual of sacred scents, turmeric, and family blessings',
      time: '09:30 AM Onwards',
      followedBy: 'Followed by TIFFINS',
      venue: 'DHARMAJJIGUDEM',
      googleMapsUrl: 'https://maps.google.com/?q=Dharmajjigudem',
      heroImage: '/assets/couple_pellikuthuru_1788197942792.jpg',
      visualTheme: 'pellikuthuru',
      visible: true,
      order: 2,
    },
    {
      id: 'cel-3',
      name: 'WEDDING',
      date: 'SEP 05 2026',
      day: 'SATURDAY',
      title: 'THE WEDDING',
      subheading: 'SACRED NUPTIAL CEREMONY',
      message: 'You are invited to an auspicious day of sacred vows & eternal love',
      time: 'SUMUHURTHAM: 09:37 PM',
      venue: 'SRI SAIBABA MANDIRAM',
      address: 'Kokkirapadu Adda Road, Kalaparru (v)',
      tagline: 'A PROMISE FOR A LIFETIME',
      googleMapsUrl: 'https://maps.google.com/?q=Sri+Sai+Baba+Temple+Kalaparru',
      heroImage: '/assets/couple_real_hero.jpg',
      visualTheme: 'wedding',
      visible: true,
      order: 3,
    },
  ],
  saptapadiVows: WEDDING_DATA.saptapadiVows,
  moments: [
    {
      id: 'm1',
      title: 'Where Tradition Meets Forever',
      subtitle: 'Two souls, one sacred eternal promise',
      image: '/assets/couple_sundowner_1788197884607.jpg',
      visible: true,
      order: 1,
    },
  ],
  galleryHeader: {
    title: 'CHAPTER V • WEDDING GALLERY',
    heading: 'Moments Captured in Time',
    subheading: 'Every picture tells a story of love, laughter, and lifelong togetherness.',
  },
  gallery: WEDDING_DATA.galleryImages.map((g, index) => ({
    id: `gal-${index}`,
    url: g.url,
    caption: g.caption,
    category: index % 2 === 0 ? 'Couple' : 'Wedding',
    span: g.span,
    visible: true,
    order: index + 1,
  })),
  reelsHeader: {
    title: 'WEDDING REELS & CINEMATIC HIGHLIGHTS',
    heading: 'Sacred Memories in Motion',
    subheading: 'Moments of love, laughter, and divine togetherness captured in motion.',
    scrollSpeed: 65,
  },
  reels: [
    {
      id: 'reel-1',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-at-their-wedding-41584-large.mp4',
      posterUrl: '/assets/couple_real_hero.jpg',
      instagramUrl: 'https://www.instagram.com/',
      title: 'Sacred Garland Exchange',
      caption: 'Sri Sai Sneha & Subramanyeswara Swami — Mangalya Dharanam',
      visible: true,
      order: 1,
    },
    {
      id: 'reel-2',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-bride-and-groom-holding-each-other-41580-large.mp4',
      posterUrl: '/assets/couple_editorial_hero_1788197820352.jpg',
      instagramUrl: 'https://www.instagram.com/',
      title: 'Eternal Promises & Hand Holding',
      caption: 'Two souls united in sacred tradition and lifelong devotion',
      visible: true,
      order: 2,
    },
    {
      id: 'reel-3',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-out-of-a-church-41582-large.mp4',
      posterUrl: '/assets/couple_pellikuthuru_1788197942792.jpg',
      instagramUrl: 'https://www.instagram.com/',
      title: 'Grand Telugu Pellikuthuru & Welcoming',
      caption: 'Blossoming joy and blessings from beloved family elders',
      visible: true,
      order: 3,
    },
  ],
  finalInvitation: {
    title: 'FINAL INVITATION',
    heading: 'Your Presence Is Our Blessing',
    paragraph1: 'With hearts filled with joy, we invite you to celebrate this beautiful beginning with us.',
    paragraph2: 'As two hearts unite and families come together, your presence and blessings mean the world to us.',
    monogramText: 'SS',
    monogramImage: '/assets/logo.jpg',
    warmRegardsTitle: 'WARM REGARDS',
    hosts: [
      'DADIGI KANAKA PEDDI RAJU',
      'DADIGI KANAKA DURGA',
      'DADIGI NAGU',
    ],
  },
  countdown: {
    enabled: true,
    title: 'SUMUHURTHAM',
    targetDate: '2026-09-05T21:37:00',
    eventStartedText: 'THE SACRED CELEBRATION HAS BEGUN',
  },
  footer: {
    hashtag: '#Sneha\'sSwami',
    devotionalHeading: '|| OM SHRI GANESHAYA NAMAH ||',
    closingMessage: 'Thank you for being a part of our sacred wedding celebration.',
    revisitText: 'REVISIT OUR CELEBRATION',
  },
  music: {
    enabled: true,
    audioUrl: '/assets/wedding_music.mp3',
    title: 'Sacred Telugu Wedding Music',
    autoPlay: false,
  },
  seo: {
    pageTitle: 'Sri Sai Sneha & Subramanyeswara Swami | Royal Wedding Invitation',
    metaDescription: 'You are cordially invited to the sacred wedding ceremony of Sri Sai Sneha & Subramanyeswara Swami on 05 September 2026.',
    faviconUrl: '/assets/logo.jpg',
    ogImageUrl: '/assets/couple_real_hero.jpg',
  },
  lastUpdated: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
};

const STORAGE_KEY_DRAFT = 'sneha_swami_cms_draft_v1';
const STORAGE_KEY_PUBLISHED = 'sneha_swami_cms_published_v1';

const syncChannel =
  typeof window !== 'undefined' && 'BroadcastChannel' in window
    ? new BroadcastChannel('sneha_swami_cms_sync_channel')
    : null;

function sanitizeGallery(items?: GalleryItemData[]): GalleryItemData[] {
  if (!Array.isArray(items)) return INITIAL_CMS_STATE.gallery;
  return items.filter(
    (g) =>
      !g.url.includes('couple_sundowner') &&
      !g.caption.toLowerCase().includes('sunset whispers')
  );
}

function sanitizeSections(sections?: SectionConfig[]): SectionConfig[] {
  let list = Array.isArray(sections) && sections.length > 0 ? [...sections] : [...INITIAL_CMS_STATE.sections];
  INITIAL_CMS_STATE.sections.forEach((defSec) => {
    if (!list.some((s) => s.id === defSec.id)) {
      list.push(defSec);
    }
  });

  // Ensure Countdown section is directly ABOVE Family Blessings (families)
  const familiesIdx = list.findIndex((s) => s.id === 'families');
  const countdownIdx = list.findIndex((s) => s.id === 'countdown');
  if (familiesIdx >= 0 && countdownIdx >= 0 && countdownIdx !== familiesIdx - 1) {
    const cdSec = list.splice(countdownIdx, 1)[0];
    const newFamiliesIdx = list.findIndex((s) => s.id === 'families');
    list.splice(newFamiliesIdx, 0, cdSec);
  }

  // Ensure CELEBRATIONS section is placed directly ABOVE WEDDING GALLERY (gallery)
  const galleryIdx = list.findIndex((s) => s.id === 'gallery');
  const celebrationsIdx = list.findIndex((s) => s.id === 'celebrations');
  if (galleryIdx >= 0 && celebrationsIdx >= 0 && celebrationsIdx !== galleryIdx - 1) {
    const celSec = list.splice(celebrationsIdx, 1)[0];
    const newGalleryIdx = list.findIndex((s) => s.id === 'gallery');
    list.splice(newGalleryIdx, 0, celSec);
  }

  // Ensure Reels section is directly ABOVE Final Invitation
  const reelsIdx = list.findIndex((s) => s.id === 'reels');
  const finalIdx = list.findIndex((s) => s.id === 'finalInvitation');
  if (reelsIdx >= 0 && finalIdx >= 0 && reelsIdx !== finalIdx - 1) {
    const reelSec = list.splice(reelsIdx, 1)[0];
    const newFinalIdx = list.findIndex((s) => s.id === 'finalInvitation');
    list.splice(newFinalIdx, 0, reelSec);
  }

  return list.map((sec, idx) => ({ ...sec, order: idx + 1 }));
}

export function prepareFirestoreState(state: CMSContentState): CMSContentState {
  const cleanReels = (state.reels || []).map((reel) => {
    if (reel.videoUrl && reel.videoUrl.startsWith('data:video') && reel.videoUrl.length > 100000) {
      return {
        ...reel,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-at-their-wedding-41584-large.mp4',
      };
    }
    return reel;
  });

  const cleanGallery = (state.gallery || []).map((item) => {
    if (item.url && item.url.startsWith('data:image') && item.url.length > 100000) {
      return {
        ...item,
        url: '/assets/couple_real_hero.jpg',
      };
    }
    return item;
  });

  return {
    ...state,
    reels: cleanReels,
    gallery: cleanGallery,
  };
}

export async function syncCurrentStateToCloud(state?: CMSContentState): Promise<boolean> {
  try {
    const currentState = state || getStoredCMSState('published');
    const safeState = prepareFirestoreState(currentState);
    await Promise.all([
      setDoc(doc(db, 'site_content', 'published'), safeState).catch(() => {}),
      setDoc(doc(db, 'site_content', 'draft'), safeState).catch(() => {}),
      rtdbSet(ref(rtdb, 'site_content/published'), safeState).catch(() => {}),
      rtdbSet(ref(rtdb, 'site_content/draft'), safeState).catch(() => {}),
    ]);
    return true;
  } catch (err) {
    console.error('Failed to sync state to Firebase Cloud:', err);
    return false;
  }
}

export function getStoredCMSState(type: 'draft' | 'published'): CMSContentState {
  try {
    const key = type === 'draft' ? STORAGE_KEY_DRAFT : STORAGE_KEY_PUBLISHED;
    let item = localStorage.getItem(key);

    if (!item && type === 'published') {
      item = localStorage.getItem(STORAGE_KEY_DRAFT);
    }

    if (item) {
      const parsed = JSON.parse(item) as CMSContentState;
      if (!parsed.galleryHeader) {
        parsed.galleryHeader = INITIAL_CMS_STATE.galleryHeader;
      }
      if (!parsed.reelsHeader) {
        parsed.reelsHeader = INITIAL_CMS_STATE.reelsHeader;
      }
      if (!parsed.reels) {
        parsed.reels = INITIAL_CMS_STATE.reels;
      }
      if (!parsed.celebrationsHeader) {
        parsed.celebrationsHeader = INITIAL_CMS_STATE.celebrationsHeader;
      }
      if (!parsed.celebrations || parsed.celebrations.length === 0) {
        parsed.celebrations = INITIAL_CMS_STATE.celebrations;
      }
      if (!parsed.finalInvitation) {
        parsed.finalInvitation = INITIAL_CMS_STATE.finalInvitation;
      }
      parsed.gallery = sanitizeGallery(parsed.gallery);
      parsed.sections = sanitizeSections(parsed.sections);
      return parsed;
    }
  } catch (err) {
    console.warn(`Failed to read CMS ${type} from localStorage`, err);
  }
  return INITIAL_CMS_STATE;
}

export function saveStoredCMSState(type: 'draft' | 'published', state: CMSContentState) {
  const key = type === 'draft' ? STORAGE_KEY_DRAFT : STORAGE_KEY_PUBLISHED;
  const cleanState = { ...state, gallery: sanitizeGallery(state.gallery) };

  try {
    localStorage.setItem(key, JSON.stringify(cleanState));
  } catch (err) {
    console.warn(`LocalStorage quota limit reached for ${type}. Pruning oversized base64 assets...`, err);
    try {
      const prunedReels = (cleanState.reels || []).map((r) => {
        if (r.videoUrl && r.videoUrl.startsWith('data:video') && r.videoUrl.length > 500000) {
          return {
            ...r,
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-at-their-wedding-41584-large.mp4',
          };
        }
        return r;
      });
      const safeState = { ...cleanState, reels: prunedReels };
      localStorage.setItem(key, JSON.stringify(safeState));
    } catch (fallbackErr) {
      console.warn('LocalStorage save failed:', fallbackErr);
    }
  }

  // Emit in-process CustomEvent for same-tab instant sync
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('cms_state_synced', { detail: { type, state: cleanState } })
    );
  }

  // Broadcast across windows / tabs
  try {
    syncChannel?.postMessage({ type: 'CMS_STATE_UPDATE', payloadType: type, state: cleanState });
  } catch {
    // Broadcast fallback
  }
}

export function useCMSContent(isPreviewMode = false) {
  const targetType = isPreviewMode ? 'draft' : 'published';
  const [content, setContent] = useState<CMSContentState>(() => getStoredCMSState(targetType));

  useEffect(() => {
    const handleStateChange = (event: Event) => {
      const customEvt = event as CustomEvent<{ type: string; state: CMSContentState }>;
      if (customEvt.detail && customEvt.detail.state) {
        setContent({ ...customEvt.detail.state });
      } else {
        setContent(getStoredCMSState(targetType));
      }
    };

    window.addEventListener('cms_state_synced', handleStateChange);
    window.addEventListener('storage', handleStateChange);

    const handleBroadcast = (event: MessageEvent) => {
      if (event.data && event.data.type === 'CMS_STATE_UPDATE') {
        if (event.data.state) {
          setContent({ ...event.data.state });
        } else {
          setContent(getStoredCMSState(targetType));
        }
      }
    };

    if (syncChannel) {
      syncChannel.addEventListener('message', handleBroadcast);
    }

    const docName = targetType === 'published' ? 'published' : 'draft';
    const unsubFirestore = onSnapshot(
      doc(db, 'site_content', docName),
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data() as CMSContentState;
          if (remoteData) {
            saveStoredCMSState(targetType, remoteData);
            setContent({ ...remoteData });
          }
        } else {
          // Document does not exist in Firestore on new domain yet, seed it automatically
          const localState = getStoredCMSState(targetType);
          const safeState = prepareFirestoreState(localState);
          setDoc(doc(db, 'site_content', docName), safeState).catch((err) => {
            console.warn('Auto-seed Firestore error on new domain:', err);
          });
        }
      },
      (err) => {
        console.warn('Firestore snapshot notice on new domain:', err);
      }
    );

    const rtdbRef = ref(rtdb, 'site_content/' + docName);
    const unsubRTDB = onValue(
      rtdbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val() as CMSContentState;
          if (val) {
            saveStoredCMSState(targetType, val);
            setContent({ ...val });
          }
        }
      },
      () => {}
    );

    return () => {
      window.removeEventListener('cms_state_synced', handleStateChange);
      window.removeEventListener('storage', handleStateChange);
      if (syncChannel) {
        syncChannel.removeEventListener('message', handleBroadcast);
      }
      unsubFirestore();
      unsubRTDB();
    };
  }, [targetType]);

  return content;
}
