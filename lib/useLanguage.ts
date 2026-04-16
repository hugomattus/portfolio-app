import { useEffect, useState } from 'react';
import { Language } from './translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('pt');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.split('-')[0] as Language;
    setLanguage(saved || (browserLang === 'en' ? 'en' : 'pt'));

    const handleStorageChange = () => {
      const updated = localStorage.getItem('language') as Language;
      setLanguage(updated || 'pt');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLang = (lang: Language) => {
    if (typeof window !== 'undefined') {
      const page = document.querySelector('.page');
      if (page) {
        page.classList.add('transitioning');
        setTimeout(() => {
          setLanguage(lang);
          localStorage.setItem('language', lang);
          window.dispatchEvent(new Event('storage'));
          page.classList.remove('transitioning');
          page.classList.add('ready');
        }, 150);
      } else {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        window.dispatchEvent(new Event('storage'));
      }
    }
  };

  return { language, setLanguage: setLang, isMounted };
}
