import type { Lang } from './types';
import { getTranslation } from './i18n';

type TipsPanelProps = {
  currentLang: Lang;
};

export function TipsPanel({ currentLang }: TipsPanelProps) {
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <div className="tips-section">
      <div className="tip-card highlight">
        <div className="tip-card-icon"><i className="fas fa-hashtag" aria-hidden="true" /></div>
        <div className="tip-card-content">
          <h3>{t('tipSeqTitle')}</h3>
          <p>{t('tipSeqBody')}</p>
        </div>
      </div>

      <div className="tip-card">
        <div className="tip-card-icon"><i className="fas fa-exclamation-circle" aria-hidden="true" /></div>
        <div className="tip-card-content">
          <h3>{t('tipRejectTitle')}</h3>
          <p>{t('tipRejectBody')}</p>
        </div>
      </div>

      <div className="tip-card">
        <div className="tip-card-icon"><i className="fas fa-rotate-left" aria-hidden="true" /></div>
        <div className="tip-card-content">
          <h3>{t('tipErrorTitle')}</h3>
          <p>{t('tipErrorBody')}</p>
        </div>
      </div>

      <div className="tip-card">
        <div className="tip-card-icon"><i className="fas fa-keyboard" aria-hidden="true" /></div>
        <div className="tip-card-content">
          <h3>{t('tipEntryTitle')}</h3>
          <p>{t('tipEntryBody')}</p>
        </div>
      </div>

      <div className="tip-card">
        <div className="tip-card-icon"><i className="fas fa-info-circle" aria-hidden="true" /></div>
        <div className="tip-card-content">
          <h3>{t('tipCodesTitle')}</h3>
          <p>{t('tipCodesBody')}</p>
        </div>
      </div>
    </div>
  );
}
