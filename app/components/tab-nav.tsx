import type { Lang, TabKey } from './types';
import { getTranslation } from './i18n';

type TabNavProps = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  currentLang: Lang;
};

export function TabNav({ activeTab, setActiveTab, currentLang }: TabNavProps) {
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <div className="tab-nav">
      <button type="button" className={`tab-btn ${activeTab === 'token' ? 'active' : ''}`} onClick={() => setActiveTab('token')}>
        <i className="fas fa-key" aria-hidden="true" /> <span>{t('tabToken')}</span>
      </button>
      <button type="button" className={`tab-btn ${activeTab === 'codes' ? 'active' : ''}`} onClick={() => setActiveTab('codes')}>
        <i className="fas fa-circle-question" aria-hidden="true" /> <span>{t('tabCodes')}</span>
      </button>
      <button type="button" className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
        <i className="fas fa-clock-rotate-left" aria-hidden="true" /> <span>{t('tabHistory')}</span>
      </button>
    </div>
  );
}
