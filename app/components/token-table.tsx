import type { Lang } from './types';
import { getTranslation } from './i18n';

type TokenTableProps = {
  tokens: string[];
  currentIndex: number;
  doneTokens: Set<number>;
  startingSequence: number;
  currentLang: Lang;
  onSelectToken: (index: number) => void;
};

export function TokenTable({ tokens, currentIndex, doneTokens, startingSequence, currentLang, onSelectToken }: TokenTableProps) {
  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <div className="token-table-container">
      {tokens.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>{t('sequence')}</th>
              <th>{t('tokenList')}</th>
              <th>{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => {
              const isDone = doneTokens.has(index);
              const isCurrent = index === currentIndex;
              const rowClass = `token-row ${isCurrent ? 'current-token' : ''} ${isDone ? 'done-token' : ''}`;
              const badgeClass = `status-badge ${isDone ? 'done' : isCurrent ? 'current' : 'pending'}`;
              const statusText = isDone ? t('done') : isCurrent ? t('current') : t('pending');
              return (
                <tr key={index} className={rowClass} onClick={() => onSelectToken(index)}>
                  <td>{index + startingSequence}</td>
                  <td className="token-cell">{token}</td>
                  <td className="status-cell"><span className={badgeClass}>{statusText}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
