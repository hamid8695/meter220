import type { Lang, CopyStatus } from './types';
import { getTranslation } from './i18n';
import { TokenTable } from './token-table';

type TokenPanelProps = {
  currentLang: Lang;
  tokens: string[];
  currentIndex: number;
  doneTokens: Set<number>;
  startingSequence: number;
  warning: string;
  inputValue: string;
  copyAllStatus: CopyStatus;
  onPaste: () => Promise<void>;
  onParse: () => void;
  onInputChange: (value: string) => void;
  onReset: () => void;
  onCopyAll: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectToken: (index: number) => void;
};

export function TokenPanel({
  currentLang,
  tokens,
  currentIndex,
  doneTokens,
  startingSequence,
  warning,
  inputValue,
  copyAllStatus,
  onPaste,
  onParse,
  onInputChange,
  onReset,
  onCopyAll,
  onPrev,
  onNext,
  onSelectToken,
}: TokenPanelProps) {
  const t = (key: string) => getTranslation(currentLang, key);
  const activeToken = tokens[currentIndex] ?? '';
  const tokenGroups = activeToken.split('-');
  const totalTokens = tokens.length;
  const doneCount = doneTokens.size;
  const allDone = totalTokens > 0 && doneCount === totalTokens;
  const isLastToken = currentIndex === totalTokens - 1;
  const progressWidth = totalTokens === 0 ? 0 : (doneCount / totalTokens) * 100;
  const progressText = totalTokens > 0
    ? t('tokenOf').replace('{current}', String(currentIndex + 1)).replace('{total}', String(totalTokens)) + ' • ' + t('entered').replace('{done}', String(doneCount))
    : '';

  return (
    <>
      <div className="instructions">
        <p><i className="fas fa-info-circle" aria-hidden="true" /> {t('howToUse')}</p>
        <ol>
          <li>{t('step1')}</li>
          <li>{t('step2')}</li>
          <li>{t('step3')}</li>
        </ol>
        <div className="sequence-tip">
          <p><i className="fas fa-lightbulb" aria-hidden="true" /> {t('seqTip')}</p>
        </div>
      </div>

      <div className="input-section" style={{ display: tokens.length > 0 ? 'none' : 'block' }}>
        <textarea
          id="tokenInput"
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          placeholder={t('inputPlaceholder')}
          aria-label="Token message input"
        />
        <div className="input-actions">
          <button type="button" className="secondary-btn" onClick={onPaste}>
            <i className="fas fa-paste" aria-hidden="true" /> {t('paste')}
          </button>
          <button type="button" className="primary-btn" onClick={onParse}>
            <i className="fas fa-play" aria-hidden="true" /> {t('parseTokens')}
          </button>
        </div>
      </div>

      {warning ? (
        <div id="warning" className="warning">
          <i className="fas fa-exclamation-triangle" aria-hidden="true" /> <span>{warning}</span>
        </div>
      ) : null}

      <div id="tokenDisplayArea" className="token-area" style={{ display: tokens.length > 0 ? 'block' : 'none' }}>
        <div className="token-header">
          <span id="progressText" className="progress-text">{progressText}</span>
          <div className="token-header-actions">
            <button type="button" id="copyAllBtn" className="secondary-btn" onClick={onCopyAll}>
              <i className="fas fa-copy" aria-hidden="true" /> {copyAllStatus === 'copied' ? t('copiedAll') : t('copyAll')}
            </button>
            <button type="button" id="newToken" className="secondary-btn" onClick={onReset}>
              <i className="fas fa-rotate" aria-hidden="true" /> {t('newMessage')}
            </button>
          </div>
        </div>

        <div className="progress-bar-container">
          <div id="progressBar" className="progress-bar" style={{ width: `${progressWidth}%` }} />
        </div>

        <div id="tokenDisplay" className="token-display">
          <div className="token-label"><span>{t('currentToken')}</span> <span id="tokenSeqLabel" className="token-seq-label">({t('sequence')} {currentIndex + startingSequence})</span></div>
          <div id="tokenNumberBox" className="token-number-box">
            {tokenGroups.map((group, index) => (
              <span key={index} className="token-group">
                {group}
                {index < tokenGroups.length - 1 ? <span className="token-sep">-</span> : null}
              </span>
            ))}
          </div>
        </div>

        <div className="navigation">
          <button type="button" id="prevToken" className="nav-btn" onClick={onPrev} disabled={currentIndex <= 0}>
            <i className="fas fa-chevron-left" aria-hidden="true" /> {t('previous')}
          </button>
          <span id="tokenCounter" className="token-counter">{tokens.length > 0 ? `${currentIndex + 1} / ${totalTokens}` : ''}</span>
          <button type="button" id="nextToken" className="nav-btn nav-btn-primary" onClick={onNext} disabled={tokens.length === 0 || allDone}>
            {t(allDone ? 'allDone' : isLastToken ? 'markLast' : 'nextDone')} <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>

        <TokenTable
          tokens={tokens}
          currentIndex={currentIndex}
          doneTokens={doneTokens}
          startingSequence={startingSequence}
          currentLang={currentLang}
          onSelectToken={onSelectToken}
        />
      </div>
    </>
  );
}
