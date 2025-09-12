interface UserData {
  firstName: string;
  lastName: string;
  university: string;
  faculty: string;
  grade: string;
  studentNumber: string;
}

export interface UserProfile extends UserData {
  faculty: 'Eczacılık Fakültesi' | 'Tıp Fakültesi';
  specialization?: string;
}

export interface CaseData {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetFaculty: 'medicine' | 'pharmacy' | 'both';
  aiFeatures: {
    symptomAnalysis: boolean;
    diagnosisSupport: boolean;
    drugVerification: boolean;
    interactionCheck: boolean;
  };
}

export interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  iconColor: string;
  iconName: string;
  targetFaculty: 'medicine' | 'pharmacy' | 'both';
  caseCount: number;
  aiFeatures: string[];
}

// Medicine-focused departments
export const MEDICINE_DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Kardiyoloji',
    description: 'Kalp ve damar hastalıkları tanı ve tedavi süreçleri',
    color: '#fee2e2',
    iconColor: '#ef4444',
    iconName: 'cardiology',
    targetFaculty: 'medicine',
    caseCount: 34,
    aiFeatures: ['AI Tanı Desteği', 'Semptom Analizi', 'Tedavi Önerileri']
  },
  {
    id: 'neurology',
    name: 'Nöroloji', 
    description: 'Beyin ve sinir sistemi hastalıklarında tanı süreci',
    color: '#dbeafe',
    iconColor: '#3b82f6',
    iconName: 'neurology',
    targetFaculty: 'medicine',
    caseCount: 28,
    aiFeatures: ['Nörolog AI', 'Semptom Korelasyonu', 'Görüntü Analizi']
  },
  {
    id: 'pediatrics',
    name: 'Pediatri',
    description: 'Çocuk hastalıkları ve gelişim bozuklukları',
    color: '#dcfce7',
    iconColor: '#22c55e', 
    iconName: 'pediatrics',
    targetFaculty: 'medicine',
    caseCount: 22,
    aiFeatures: ['Çocuk AI Uzmanı', 'Yaş-Semptom Analizi']
  },
  {
    id: 'emergency',
    name: 'Acil Tıp',
    description: 'Acil durum triajı ve hızlı tanı süreçleri',
    color: '#fef3c7',
    iconColor: '#f59e0b',
    iconName: 'emergency',
    targetFaculty: 'medicine', 
    caseCount: 45,
    aiFeatures: ['Hızlı AI Tanı', 'Triaj Desteği', 'Kritik Süre Yönetimi']
  }
];

// Pharmacy-focused departments  
export const PHARMACY_DEPARTMENTS: Department[] = [
  {
    id: 'clinical-pharmacy',
    name: 'Klinik Eczacılık',
    description: 'İlaç etkileşimleri ve dozaj optimizasyonu',
    color: '#e0f2fe',
    iconColor: '#0284c7',
    iconName: 'clinical',
    targetFaculty: 'pharmacy',
    caseCount: 38,
    aiFeatures: ['İlaç AI Uzmanı', 'Etkileşim Kontrolü', 'Dozaj Hesaplama']
  },
  {
    id: 'pharmacology',
    name: 'Farmakoloji',
    description: 'İlaç mekanizmaları ve farmakokinetig analizi',
    color: '#f3e8ff',
    iconColor: '#a855f7',
    iconName: 'pharmacology',
    targetFaculty: 'pharmacy',
    caseCount: 31,
    aiFeatures: ['Farmako AI', 'Metabolizma Analizi', 'Kinetik Modelleme']
  },
  {
    id: 'pharmaceutical-care',
    name: 'Eczacılık Bakımı',
    description: 'Hasta odaklı ilaç takibi ve danışmanlık',
    color: '#ecfdf5',
    iconColor: '#10b981',
    iconName: 'care',
    targetFaculty: 'pharmacy',
    caseCount: 26,
    aiFeatures: ['Hasta AI Analizi', 'Takip Sistemi', 'Danışmanlık Desteği']
  },
  {
    id: 'drug-safety',
    name: 'İlaç Güvenliği',
    description: 'Advers etki analizi ve güvenlik değerlendirmesi',
    color: '#fef2f2',
    iconColor: '#ef4444',
    iconName: 'safety',
    targetFaculty: 'pharmacy',
    caseCount: 19,
    aiFeatures: ['Güvenlik AI', 'Advers Etki Tahmini', 'Risk Analizi']
  }
];

// Collaborative departments for both faculties
export const COLLABORATIVE_DEPARTMENTS: Department[] = [
  {
    id: 'interdisciplinary',
    name: 'Disiplinler Arası',
    description: 'Tıp ve eczacılık işbirliği gerektiren vakalar',
    color: '#f0f9ff',
    iconColor: '#0ea5e9',
    iconName: 'collaboration',
    targetFaculty: 'both',
    caseCount: 15,
    aiFeatures: ['Hibrit AI', 'Çapraz Danışmanlık', 'Ekip Çalışması']
  },
  {
    id: 'precision-medicine',
    name: 'Kişiselleştirilmiş Tıp',
    description: 'Genetik tabanlı tanı ve tedavi özelleştirmesi',
    color: '#fdf4ff',
    iconColor: '#d946ef',
    iconName: 'precision',
    targetFaculty: 'both',
    caseCount: 12,
    aiFeatures: ['Genetik AI', 'Kişisel Profil', 'Özel Dozaj']
  }
];

export const getUserDepartments = (faculty: string): Department[] => {
  if (faculty === 'Tıp Fakültesi') {
    return [...MEDICINE_DEPARTMENTS, ...COLLABORATIVE_DEPARTMENTS];
  } else if (faculty === 'Eczacılık Fakültesi') {
    return [...PHARMACY_DEPARTMENTS, ...COLLABORATIVE_DEPARTMENTS];
  }
  return [...MEDICINE_DEPARTMENTS, ...PHARMACY_DEPARTMENTS, ...COLLABORATIVE_DEPARTMENTS];
};

export const getFacultyWelcomeMessage = (faculty: string): {
  title: string;
  subtitle: string;
  features: string[];
} => {
  if (faculty === 'Tıp Fakültesi') {
    return {
      title: 'Tanı Sürecinde AI Destekli Öğrenme',
      subtitle: 'Semptomlardan tanıya, AI ile desteklenen vakalar üzerinde çalış',
      features: [
        '🔍 AI destekli semptom analizi',
        '🧠 Akıllı tanı önerileri', 
        '💊 Tedavi planı geliştirme',
        '🤝 Eczacılarla işbirliği'
      ]
    };
  } else if (faculty === 'Eczacılık Fakültesi') {
    return {
      title: 'İlaç Uzmanlığında AI Desteği',
      subtitle: 'İlaç güvenliği, etkileşimler ve optimizasyonda AI ile çalış',
      features: [
        '💊 AI destekli ilaç analizi',
        '⚠️ Etkileşim kontrolü',
        '📊 Dozaj optimizasyonu',
        '🤝 Doktorlarla işbirliği'
      ]
    };
  }
  return {
    title: 'Sağlık Alanında AI Destekli Öğrenme',
    subtitle: 'Tıp ve eczacılık alanlarında AI ile desteklenen eğitim',
    features: [
      '🔍 Kapsamlı AI analizi',
      '🤝 Disiplinler arası işbirliği',
      '📚 Geniş vaka kütüphanesi',
      '🎯 Kişiselleştirilmiş öğrenme'
    ]
  };
};