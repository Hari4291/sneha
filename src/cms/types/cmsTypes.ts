export interface SectionConfig {
  id: string;
  name: string;
  visible: boolean;
  order: number;
}

export interface PreloaderData {
  ganeshaImage: string;
  devotionalHeading: string;
  subheading: string;
  brideSalutation: string;
  brideName: string;
  groomSalutation: string;
  groomName: string;
  weddingDate: string;
  weddingLocation: string;
  buttonText: string;
  instructionText: string;
}

export interface HeroData {
  blessingsText: string;
  brideName: string;
  groomName: string;
  hashtag: string;
  weddingDate: string;
  sumuhurthamTime: string;
  location: string;
  scrollText: string;
  heroPhoto: string;
}

export interface CoupleData {
  bride: {
    fullName: string;
    salutation: string;
    qualification: string;
    familyTitle: string;
    father: string;
    mother: string;
    grandparents: string;
    residence: string;
    business: string;
    contactPhone: string;
    photo: string;
  };
  groom: {
    fullName: string;
    salutation: string;
    qualification: string;
    familyTitle: string;
    father: string;
    mother: string;
    residence: string;
    photo: string;
  };
  monogram: string;
  hashtag: string;
}

export interface FamilyMemberData {
  id: string;
  name: string;
  role: string;
  family: 'bride' | 'groom' | 'host';
  visible: boolean;
  order: number;
}

export interface EventItemData {
  id: string;
  chapter: string;
  title: string;
  teluguTitle?: string;
  subheading?: string;
  message: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  address: string;
  district: string;
  landmark?: string;
  dressCode?: string;
  googleMapsUrl: string;
  image: string;
  colorTheme: 'gold' | 'maroon' | 'green' | 'amber';
  visible: boolean;
  order: number;
}

export interface SaptapadiVowData {
  step: number;
  sanskrit: string;
  teluguName: string;
  teluguMeaning: string;
  englishMeaning: string;
}

export interface MomentData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  visible: boolean;
  order: number;
}

export interface QuoteData {
  id: string;
  quote: string;
  author: string;
  visible: boolean;
}

export interface GalleryItemData {
  id: string;
  url: string;
  caption: string;
  category: 'Couple' | 'Pellikuthuru' | 'Sundowner' | 'Wedding' | 'Invitation';
  span: string;
  visible: boolean;
  order: number;
}

export interface GalleryHeaderData {
  title: string;
  heading: string;
  subheading: string;
}

export interface ReelItemData {
  id: string;
  mediaId?: string;
  videoUrl: string;
  posterUrl?: string;
  instagramUrl?: string;
  title: string;
  caption: string;
  visible: boolean;
  order: number;
}

export interface ReelsHeaderData {
  title: string;
  heading: string;
  subheading: string;
  scrollSpeed?: number; // Speed in seconds for full loop
}

export interface FinalInvitationData {
  title: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  monogramText: string;
  monogramImage?: string;
  warmRegardsTitle: string;
  hosts: string[];
}

export interface CountdownData {
  enabled: boolean;
  title: string;
  targetDate: string; // ISO string e.g. "2026-09-05T21:37:00"
  eventStartedText: string;
}

export interface FooterData {
  hashtag: string;
  devotionalHeading: string;
  closingMessage: string;
  revisitText: string;
}

export interface MusicData {
  enabled: boolean;
  audioUrl: string;
  title: string;
  autoPlay: boolean;
}

export interface SEOData {
  pageTitle: string;
  metaDescription: string;
  faviconUrl: string;
  ogImageUrl: string;
}

export interface CelebrationItemData {
  id: string;
  name: string; // 'HALDI' | 'PELLIKUTHURU' | 'WEDDING'
  date: string; // 'SEP 04 2026' | 'SEP 05 2026'
  day: string; // 'FRIDAY' | 'SATURDAY'
  title: string; // 'HALDI' | 'PELLIKUTHURU' | 'THE WEDDING'
  subheading?: string;
  message: string;
  time: string;
  followedBy?: string;
  venue: string;
  address?: string;
  dressCode?: string;
  tagline?: string;
  googleMapsUrl: string;
  heroImage: string;
  visualTheme: 'haldi' | 'pellikuthuru' | 'wedding';
  visible: boolean;
  order: number;
}

export interface CelebrationsHeaderData {
  title: string;
  heading: string;
  subheading: string;
}

export interface CMSContentState {
  sections: SectionConfig[];
  preloader: PreloaderData;
  hero: HeroData;
  couple: CoupleData;
  families: FamilyMemberData[];
  events: EventItemData[];
  celebrationsHeader?: CelebrationsHeaderData;
  celebrations?: CelebrationItemData[];
  saptapadiVows: SaptapadiVowData[];
  moments: MomentData[];
  galleryHeader: GalleryHeaderData;
  gallery: GalleryItemData[];
  reelsHeader: ReelsHeaderData;
  reels: ReelItemData[];
  finalInvitation: FinalInvitationData;
  countdown: CountdownData;
  footer: FooterData;
  music: MusicData;
  seo: SEOData;
  lastUpdated: string;
  publishedAt: string;
}
