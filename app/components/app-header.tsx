import type { Lang } from './types';
import { getTranslation } from './i18n';

type AppHeaderProps = {
  currentLang: Lang;
  setLang: (lang: Lang) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export function AppHeader({ currentLang, setLang, darkMode, toggleDarkMode }: AppHeaderProps) {
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <i className="fas fa-bolt header-icon" aria-hidden="true" />
          <div>
            <h1>{t('appTitle')}</h1>
            <p className="header-subtitle">{t('appSubtitle')}</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            title={currentLang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
            onClick={() => setLang(currentLang === 'bn' ? 'en' : 'bn')}
          >
            <span className="lang-label">{t('langSwitch')}</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            title={t('darkModeTitle')}
            onClick={toggleDarkMode}
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
