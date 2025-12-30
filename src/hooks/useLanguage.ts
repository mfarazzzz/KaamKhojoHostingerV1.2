import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

const translations: Translations = {
  'nav.home': {
    en: 'Home',
    hi: 'होम',
    ta: 'முகப்பு',
    te: 'హోమ్',
    bn: 'হোম'
  },
  'nav.findJobs': {
    en: 'Find Jobs',
    hi: 'नौकरी खोजें',
    ta: 'வேலை தேடுங்கள்',
    te: 'ఉద్యోగాలు కనుగొనండి',
    bn: 'চাকরি খুঁজুন'
  },
  'nav.postJob': {
    en: 'Post Job',
    hi: 'नौकरी पोस्ट करें',
    ta: 'வேலை இடுங்கள்',
    te: 'ఉద్యోగం పోస్ట్ చేయండి',
    bn: 'চাকরি পোস্ট করুন'
  },
  'nav.news': {
    en: 'Employment News',
    hi: 'रोजगार समाचार',
    ta: 'வேலைவாய்ப்பு செய்திகள்',
    te: 'ఉపాధి వార్తలు',
    bn: 'কর্মসংস্থান সংবাদ'
  },
  'hero.title': {
    en: "India's Premier Job Portal",
    hi: 'भारत का प्रमुख जॉब पोर्टल',
    ta: 'இந்தியாவின் முன்னணி வேலை போர்ட்டல்',
    te: 'భారతదేశపు ప్రముఖ ఉద్యోగ పోర్టల్',
    bn: 'ভারতের প্রধান চাকরির পোর্টাল'
  },
  'hero.subtitle': {
    en: 'Connect with opportunities across all sectors - from high-skilled professional roles to essential blue-collar jobs.',
    hi: 'सभी क्षेत्रों में अवसरों से जुड़ें - उच्च कुशल पेशेवर भूमिकाओं से लेकर आवश्यक ब्लू-कॉलर नौकरियों तक।',
    ta: 'அனைத்து துறைகளிலும் வாய்ப்புகளுடன் இணைக்கவும் - உயர் திறமையான தொழில்முறை பாத்திரங்கள் முதல் அத்தியாவசிய நீல காலர் வேலைகள் வரை।',
    te: 'అన్ని రంగాలలో అవకాశాలతో కనెక్ట్ అవ్వండి - అధిక నైపుణ్యం కలిగిన వృత్తిపరమైన పాత్రల నుండి అవసరమైన బ్లూ-కాలర్ ఉద్యోగాల వరకు।',
    bn: 'সমস্ত সেক্টরে সুযোগের সাথে সংযুক্ত হন - উচ্চ দক্ষ পেশাদার ভূমিকা থেকে প্রয়োজনীয় নীল-কলার চাকরি পর্যন্ত।'
  },
  'search.placeholder': {
    en: 'Job title, skills, or company',
    hi: 'नौकरी का शीर्षक, कौशल, या कंपनी',
    ta: 'வேலை தலைப்பு, திறமைகள் அல்லது நிறுவனம்',
    te: 'ఉద్యోగ శీర్షిక, నైపుణ్యాలు లేదా కంపెనీ',
    bn: 'চাকরির শিরোনাম, দক্ষতা বা কোম্পানি'
  },
  'location.placeholder': {
    en: 'Location',
    hi: 'स्थान',
    ta: 'இடம்',
    te: 'స్థానం',
    bn: 'অবস্থান'
  },
  'button.search': {
    en: 'Search Jobs',
    hi: 'नौकरी खोजें',
    ta: 'வேலை தேடுங்கள்',
    te: 'ఉద్యోగాలు వెతకండి',
    bn: 'চাকরি খুঁজুন'
  },
  'category.professional': {
    en: 'Professional Jobs',
    hi: 'पेशेवर नौकरियां',
    ta: 'தொழில்முறை வேலைகள்',
    te: 'వృత్తిపరమైన ఉద్యోగాలు',
    bn: 'পেশাদার চাকরি'
  },
  'category.skilled': {
    en: 'Skilled Labor',
    hi: 'कुशल श्रमिक',
    ta: 'திறமையான தொழிலாளர்',
    te: 'నైపుణ్యం కలిగిన కార్మికులు',
    bn: 'দক্ষ শ্রমিক'
  }
};

export const useLanguage = () => {
  const { user, setLanguage } = useAuthStore();
  const [currentLanguage, setCurrentLanguage] = useState(user?.preferences?.language || 'en');

  useEffect(() => {
    if (user?.preferences?.language) {
      setCurrentLanguage(user.preferences.language);
    }
  }, [user]);

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || translations[key]?.['en'] || key;
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang as any);
    setLanguage(lang);
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
    ]
  };
};