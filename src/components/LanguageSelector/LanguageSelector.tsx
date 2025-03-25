import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"; // Importamos useTranslation
import './LanguageSelector.css';
import esFlag from './icons/spain-flag.svg';
import enFlag from './icons/england-flag.svg';
import frFlag from './icons/france-flag.svg';
import ruFlag from './icons/russia-flag.svg';
import geFlag from './icons/germany-flag.svg';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: "es", label: "Español", flag: esFlag },
  { code: "en", label: "English", flag: enFlag },
  { code: "fr", label: "Français", flag: frFlag },
  { code: "ru", label: "Russian", flag: ruFlag },
  { code: "ge", label: "Germany", flag: geFlag },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="lang-wrapper" ref={selectorRef}>
      <button className="lang-button" onClick={() => setIsOpen(!isOpen)}>
        <img className="flag-icon" src={selectedLanguage.flag} alt={selectedLanguage.label} />
      </button>
      {isOpen && (
        <div className="lang-options">
          {languages.map(lang => (
            <button key={lang.code} onClick={() => handleSelect(lang)} className="lang-option">
              <img src={lang.flag} alt={lang.label} className="flag-icon-lang" />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
