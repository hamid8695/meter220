'use client';

import { useEffect, useState } from 'react';
import { AppHeader } from './components/app-header';
import { TabNav } from './components/tab-nav';
import { TokenPanel } from './components/token-panel';
import { TipsPanel } from './components/tips-panel';
import { HistoryPanel } from './components/history-panel';
import { getTranslation } from './components/i18n';
import { useTokenManager } from './hooks/useTokenManager';
import type { Lang, TabKey } from './components/types';

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Lang>('bn');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('token');

  const {
    inputValue,
    warning,
    tokens,
    currentIndex,
    doneTokens,
    startingSequence,
    history,
    copyAllStatus,
    copiedHistoryIndex,
    setInputValue,
    setCurrentIndex,
    onParseTokens,
    onPaste,
    onCopyAll,
    onCopyHistory,
    onReuseHistory,
    onNext,
    onPrev,
    onReset,
    clearHistory,
  } = useTokenManager(currentLang);

  const t = (key: string) => getTranslation(currentLang, key);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Lang | null;
    const savedDark = localStorage.getItem('darkMode');
    if (savedLang === 'en' || savedLang === 'bn') {
      setCurrentLang(savedLang);
    }
    setDarkMode(savedDark === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLang === 'bn' ? 'bn' : 'en';
    localStorage.setItem('lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleParseTokens = () => onParseTokens(t('warningNoToken'));
  const handleReuseHistory = (index: number) => {
    setActiveTab('token');
    onReuseHistory(index);
  };
  const handleClearHistory = () => clearHistory(t('clearConfirm'));

  return (
    <main className="app-shell">
      <AppHeader
        currentLang={currentLang}
        setLang={setCurrentLang}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)}
      />

      <div className="container">
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} currentLang={currentLang} />

        <section className={`tab-content ${activeTab === 'token' ? 'active' : ''}`}>
          <TokenPanel
            currentLang={currentLang}
            tokens={tokens}
            currentIndex={currentIndex}
            doneTokens={doneTokens}
            startingSequence={startingSequence}
            warning={warning}
            inputValue={inputValue}
            copyAllStatus={copyAllStatus}
            onPaste={onPaste}
            onParse={handleParseTokens}
            onInputChange={setInputValue}
            onReset={onReset}
            onCopyAll={onCopyAll}
            onPrev={onPrev}
            onNext={onNext}
            onSelectToken={setCurrentIndex}
          />
        </section>

        <section className={`tab-content ${activeTab === 'codes' ? 'active' : ''}`}>
          <TipsPanel currentLang={currentLang} />
        </section>

        <section className={`tab-content ${activeTab === 'history' ? 'active' : ''}`}>
          <HistoryPanel
            currentLang={currentLang}
            history={history}
            copiedHistoryIndex={copiedHistoryIndex}
            onCopyHistory={onCopyHistory}
            onReuseHistory={handleReuseHistory}
            onClearHistory={handleClearHistory}
          />
        </section>
      </div>
    </main>
  );
}
