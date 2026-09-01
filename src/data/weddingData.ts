export interface EventItem {
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
  dressCode?: string;
  googleMapsUrl: string;
  image: string;
  colorTheme: 'gold' | 'maroon' | 'green' | 'amber';
}

export interface SaptapadiVow {
  step: number;
  sanskrit: string;
  teluguName: string;
  teluguMeaning: string;
  englishMeaning: string;
}

export interface FamilyMember {
  name: string;
  relation: string;
  family: 'bride' | 'groom' | 'host';
}

export const WEDDING_DATA = {
  couple: {
    bride: {
      fullName: 'Sri Sai Sneha',
      salutation: 'Chi. La. Sau.',
      qualification: 'MCA',
      familyTitle: 'Dadigi Family',
      father: 'Sri Dadigi Kanaka Peddiraju',
      mother: 'Smt. Kanakadurga',
      grandparents: 'Sri Dadigi Ranga Raju & Smt. Seetharamamma (Late)',
      residence: 'Dharmajigudem, Lingapalem Mandal, Eluru District',
      business: 'Sri Venkata Sai Traders',
      contactPhone: '94949 11417, 99661 01455',
    },
    groom: {
      fullName: 'Subramanyeswara Swami',
      salutation: 'Chi.',
      qualification: 'B.Tech',
      familyTitle: 'Madugula Family',
      father: 'Sri Madugula Venkataratna Rao (Late)',
      mother: 'Smt. Savitri Venkataramana',
      residence: 'Kalaparu Village, Pedapadu Mandal, Eluru District',
    },
    monogram: 'S & S',
  },
  
  sumuhurtham: {
    date: '5th September 2026',
    day: 'Saturday (స్థిరవారం)',
    time: '9:37 PM',
    teluguDateStr: 'స్వస్తిశ్రీ శోభకృత్ / క్రోధన నామ సంవత్సరం భాద్రపద బహుళ దశమి',
    astrologicalDetail: 'మృగశిర నక్షత్రయుక్త మేషలగ్న పుష్కర అంశమందు (Mrigasira Nakshatra, Mesha Lagna, Pushkara Amsha)',
    tagline: 'A PROMISE FOR A LIFETIME',
  },

  invitationText: {
    heading: '|| OM SHRI GANESHAYA NAMAH ||',
    teluguInvocation: 'శ్రీ జానకీ కమలమనోహర ప్రాణ నాయకాయః శ్రీరామచంద్ర పరిపాలిత మంగళాయః',
    teluguCardTitle: 'దడిగి వారి వివాహ మహోత్సవ ఆహ్వాన శుభపత్రిక',
    subheading: 'A Sacred Celebration of Love, Tradition & Togetherness',
    introText: 'With the divine blessings of our beloved ancestors and elders, the Dadigi & Madugula families cordially solicit your gracious presence and blessings on the auspicious occasion of the wedding ceremony of our beloved children.',
  },

  hostsAndWellWishers: [
    { name: 'Dadigi Kanaka Peddiraju & Smt. Kanakadurga', role: 'Inviters (ఆహ్వానించువారు)' },
    { name: 'Mekala Siva Sankar & Smt. Vijayalaxmi', role: 'Well Wishers (అభిలాషులు)' },
    { name: 'Smt. Krishna Veni', role: 'Well Wishers (అభిలాషులు)' },
    { name: 'Bhavideveela Family', role: 'Well Wishers (అభిలాషులు)' },
    { name: 'Sri Murali Krishna (Contact: 9866 371113)', role: 'Co-ordinator' },
  ],

  events: [
    {
      id: 'vindhu',
      chapter: '01',
      title: 'Pre-Wedding Vindhu & Reception',
      teluguTitle: 'విందు (Feast & Welcoming)',
      subheading: 'A Morning of Sunshine, Joy & Traditions',
      message: 'You are invited to join us for a grand festive feast and family welcoming as we begin our wedding celebrations.',
      date: '05 SEPTEMBER 2026',
      day: 'SATURDAY',
      time: '11:00 AM ONWARDS',
      venue: 'Dadigi Residence (స్వగృహము)',
      address: 'Dharmajigudem Village, Lingapalem Mandal',
      district: 'Eluru District, Andhra Pradesh',
      dressCode: 'Traditional / Festive Pastels',
      googleMapsUrl: 'https://maps.google.com/?q=Dharmajigudem+Lingapalem+Eluru',
      image: '/assets/couple_sundowner_1788197884607.jpg',
      colorTheme: 'amber',
    },
    {
      id: 'wedding',
      chapter: '02',
      title: 'The Sacred Wedding (Sumuhurtham)',
      teluguTitle: 'కళ్యాణ మహోత్సవ సుముహూర్తము',
      subheading: 'A Sacred Journey of Vows & Eternal Union',
      message: 'We request the honour of your presence at our divine wedding ceremony as we tie the sacred knot under the auspices of the divine.',
      date: '05 SEPTEMBER 2026',
      day: 'SATURDAY NIGHT',
      time: '9:37 PM (SUMUHURTHAM)',
      venue: 'Sri Sai Baba Temple Hall (కళ్యాణవేదిక)',
      address: 'Sri Sai Baba Temple Premises, Kalaparu Village',
      district: 'Pedapadu Mandal, Eluru District',
      landmark: 'Near Main Temple Hall, Pedapadu Mandal, Eluru Dist.',
      dressCode: 'Traditional Silk Attire (Kanchipuram & Kurta)',
      googleMapsUrl: 'https://maps.google.com/?q=Kalaparu+Pedapadu+Eluru',
      image: '/assets/couple_editorial_hero_1788197820352.jpg',
      colorTheme: 'maroon',
    },
  ] as EventItem[],

  saptapadiVows: [
    {
      step: 1,
      sanskrit: 'Om Ekapadi Bhava',
      teluguName: 'ఏకపది - అన్నం కొరకు',
      teluguMeaning: 'మొదటి అడుగు: దంపతులిద్దరూ పరస్పరం ఆహారము, శారీరక క్షేమం కాపాడుకొనుటకు.',
      englishMeaning: 'First Step: For nourishment, health, and mutual well-being throughout life.',
    },
    {
      step: 2,
      sanskrit: 'Om Dveepadi Bhava',
      teluguName: 'ద్వీపది - శారీరక, మానసిక శక్తుల కొరకు',
      teluguMeaning: 'రెండవ అడుగు: మానసిక, శారీరక, ఆత్మ బలం పొందుటకు.',
      englishMeaning: 'Second Step: For physical strength, emotional harmony, and mental resilience.',
    },
    {
      step: 3,
      sanskrit: 'Om Thripadi Bhava',
      teluguName: 'త్రిపది - ధనం కొరకు',
      teluguMeaning: 'మూడవ అడుగు: సన్మార్గంలో ధనార్జన మరియు కుటుంబ ఆర్థిక భద్రత కొరకు.',
      englishMeaning: 'Third Step: For prosperity, righteous wealth, and financial security.',
    },
    {
      step: 4,
      sanskrit: 'Om Chatushpadi Bhava',
      teluguName: 'చతుష్పది - సుఖము కొరకు',
      teluguMeaning: 'నాలుగవ అడుగు: ఇరు కుటుంబాల ఆనందం, గృహ శాంతి మరియు సుఖము కొరకు.',
      englishMeaning: 'Fourth Step: For eternal happiness, domestic peace, and family togetherness.',
    },
    {
      step: 5,
      sanskrit: 'Om Panchapadi Bhava',
      teluguName: 'పంచపది - పశు వృద్ధి కొరకు',
      teluguMeaning: 'ఐదవ అడుగు: వంశాభివృద్ధి, సంతాన భాగ్యం మరియు జీవ కోటి శ్రేయస్సు కొరకు.',
      englishMeaning: 'Fifth Step: For righteous lineage, noble children, and cosmic harmony.',
    },
    {
      step: 6,
      sanskrit: 'Om Shatpadi Bhava',
      teluguName: 'షట్పది - సకల రుతువుల కొరకు',
      teluguMeaning: 'ఆరవ అడుగు: జీవితంలో వచ్చే అన్ని రుతువులను, సుఖదుఃఖాలను సమానంగా స్వీకరించుటకు.',
      englishMeaning: 'Sixth Step: For joy and togetherness through all six seasons and stages of life.',
    },
    {
      step: 7,
      sanskrit: 'Om Saptapadi Bhava',
      teluguName: 'సప్తపది - స్నేహం కొరకు',
      teluguMeaning: 'ఏడవ అడుగు: నిత్య సత్యమైన జీవితకాల దివ్య బంధం మరియు పవిత్ర స్నేహం కొరకు.',
      englishMeaning: 'Seventh Step: For an unbroken bond of lifelong friendship, trust, and devotion.',
    },
  ] as SaptapadiVow[],

  galleryImages: [
    {
      url: '/assets/couple_real_hero.jpg',
      caption: 'Sri Sai Sneha & Subramanyeswara Swami — Floral Ceremony',
      span: 'col-span-12 md:col-span-8 row-span-2',
    },
    {
      url: '/assets/couple_pellikuthuru_1788197942792.jpg',
      caption: 'Pellikuthuru Ceremony — Traditional Telugu Rituals',
      span: 'col-span-12 md:col-span-4 row-span-1',
    },
    {
      url: '/assets/card_cover_1788197621947.jpg',
      caption: 'The Official Invitation Scroll — Dadigi Vari Pendli Pilupu',
      span: 'col-span-12 md:col-span-6 row-span-1',
    },
    {
      url: '/assets/card_inside_1788197621979.jpg',
      caption: 'Traditional Sacred Telugu Shubhapatrika',
      span: 'col-span-12 md:col-span-6 row-span-1',
    },
  ],
};
