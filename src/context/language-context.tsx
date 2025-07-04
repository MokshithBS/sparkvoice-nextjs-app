'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { translations, type Language, type TranslationKey, languageNames } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, replacements?: Record<string, string>) => string;
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string>): string => {
    let translation = (translations[language] && translations[language][key]) || translations['en'][key] || key;
    
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            const regex = new RegExp(`{{${rKey}}}`, 'g');
            translation = translation.replace(regex, replacements[rKey]);
        });
    }

    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
