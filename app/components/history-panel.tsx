import type { HistoryEntry, Lang } from './types';
import { getTranslation } from './i18n';

type HistoryPanelProps = {
  currentLang: Lang;
  history: HistoryEntry[];
  copiedHistoryIndex: number | null;
  onCopyHistory: (index: number) => void;
  onReuseHistory: (index: number) => void;
  onClearHistory: () => void;
};

export function HistoryPanel({ currentLang, history, copiedHistoryIndex, onCopyHistory, onReuseHistory, onClearHistory }: HistoryPanelProps) {
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <div className="history-section">
      <div className="history-header">
        <h3><i className="fas fa-clock-rotate-left" aria-hidden="true" /> {t('tokenHistory')}</h3>
        <button type="button" className="secondary-btn danger" onClick={onClearHistory}>
          <i className="fas fa-trash" aria-hidden="true" /> {t('clearAll')}
        </button>
      </div>

      <div id="historyContainer" className="history-container">
        {history.length === 0 ? (
          <p className="empty-state"><i className="fas fa-inbox" aria-hidden="true" /><br />{t('noHistory')}</p>
        ) : history.map((entry, index) => (
          <div key={index} className="history-card">
            <div className="history-card-header">
              <span className="history-date"><i className="fas fa-calendar" aria-hidden="true" /> {entry.date}</span>
              <span className="history-count">{entry.tokenCount} {t('tokens')}</span>
            </div>
            <div className="history-tokens">
              {entry.tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} className="history-token">{token}</span>
              ))}
            </div>
            <div className="history-card-actions">
              <button type="button" className="secondary-btn small" onClick={() => onCopyHistory(index)}>
                <i className="fas fa-copy" aria-hidden="true" /> {copiedHistoryIndex === index ? t('copiedAll') : t('copyAll')}
              </button>
              <button type="button" className="secondary-btn small" onClick={() => onReuseHistory(index)}>
                <i className="fas fa-redo" aria-hidden="true" /> {t('reuse')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
