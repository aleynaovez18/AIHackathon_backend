export const LOGIN_CONSTANTS = {
  TITLE: 'VakaÇöz',
  SUBTITLE: 'Eczacılık ve Tıp Öğrencileri için Ortak Vaka Platformu',
  PLACEHOLDERS: {
    USERNAME: 'Kullanıcı Adı',
    PASSWORD: 'Şifre',
  },
  BUTTONS: {
    LOGIN: 'Giriş Yap',
    GOOGLE_LOGIN: 'Google ile Giriş Yap',
    SIGN_UP: 'Hesabın yok mu? Kayıt Ol',
  },
  VALIDATION_MESSAGES: {
    REQUIRED_FIELDS: 'Lütfen tüm alanları doldurun',
    LOGIN_SUCCESS: 'Giriş yapılıyor...',
    GOOGLE_LOGIN_PROCESS: 'Google ile giriş yapılıyor...',
    SIGN_UP_REDIRECT: 'Kayıt sayfasına yönlendiriliyor...',
  },
  COLORS: {
    PRIMARY: '#1193d4',
    BACKGROUND: '#f8fafc',
    TEXT_PRIMARY: '#0d171b',
    TEXT_SECONDARY: '#64748b',
    TEXT_PLACEHOLDER: '#94a3b8',
    BORDER: '#cbd5e1',
    WHITE: '#ffffff',
    OVERLAY: 'rgba(0, 0, 0, 0.3)',
  },
  IMAGES: {
    HEADER_URL: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1oIrAejDmRSTYCtAc8TiVg1Z-9L3voUKFW0CEMql4EWiebsgogXw2xFvr9zawijkdHjwSvmI2sbodXoGXK0UCyp6nf1x4LzVZax28uaF4-VEmgSBiilQhGIGcL7-mcvdz7_-FweRAH9R8OVFsXtLuM8qcHybehUTe1MYlD8qJp22LDsP6QIe-4p-s30_7isGfD9AxrGl42RH5EAfR5CejT2FExencpYczhjp_bYKduk9igI8asL19SnXG-pKzodaNEn7h565G8lda'
  },
  DIMENSIONS: {
    HEADER_HEIGHT: 320,
    PADDING_HORIZONTAL: 24,
    PADDING_VERTICAL: 32,
    BORDER_RADIUS: 8,
    INPUT_PADDING: 16,
    BUTTON_PADDING_VERTICAL: 16,
  },
} as const;

export type LoginConstants = typeof LOGIN_CONSTANTS;