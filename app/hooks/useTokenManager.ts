import { useEffect, useState } from 'react';
import type { CopyStatus, HistoryEntry, Lang } from '../components/types';

const parseSequence = (input: string) => {
  const match = input.match(/Seq:(-?\d+)=\d+|SquNo:(-?\d+)=\d+/);
  return match ? parseInt(match[1] ?? match[2] ?? '1', 10) : 1;
};

export function useTokenManager(currentLang: Lang) {
  const [inputValue, setInputValue] = useState('');
  const [warning, setWarning] = useState('');
  const [tokens, setTokens] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [doneTokens, setDoneTokens] = useState<Set<number>>(new Set());
  const [startingSequence, setStartingSequence] = useState(1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copyAllStatus, setCopyAllStatus] = useState<CopyStatus>('default');
  const [copiedHistoryIndex, setCopiedHistoryIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('tokenHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tokenHistory', JSON.stringify(history));
  }, [history]);

  const onParseTokens = (warningMessage: string) => {
    const parsed = inputValue.match(/\d{4}-\d{4}-\d{4}-\d{4}-\d{4}/g);
    if (!parsed || parsed.length === 0) {
      setWarning(warningMessage);
      return;
    }

    setWarning('');
    setTokens(parsed);
    setDoneTokens(new Set());
    setStartingSequence(parseSequence(inputValue));
    setCurrentIndex(0);
    setHistory(prev => [
      {
        date: new Date().toLocaleString(currentLang === 'bn' ? 'bn-BD' : 'en-US'),
        tokenCount: parsed.length,
        tokens: parsed,
        preview: inputValue.slice(0, 80) + (inputValue.length > 80 ? '...' : ''),
      },
      ...prev,
    ].slice(0, 20));
  };

  const onPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch {
      // ignore clipboard failures
    }
  };

  const onCopyAll = async () => {
    if (tokens.length === 0) return;

    const formatted = tokens.map((token, index) => `${index + startingSequence}. ${token}`).join('\n');
    try {
      await navigator.clipboard.writeText(formatted);
      setCopyAllStatus('copied');
      window.setTimeout(() => setCopyAllStatus('default'), 1500);
    } catch {
      // ignore clipboard failures
    }
  };

  const onCopyHistory = async (index: number) => {
    const entry = history[index];
    if (!entry) return;

    const formatted = entry.tokens.map((token, id) => `${id + 1}. ${token}`).join('\n');
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedHistoryIndex(index);
      window.setTimeout(() => setCopiedHistoryIndex(null), 1500);
    } catch {
      // ignore clipboard failures
    }
  };

  const onReuseHistory = (index: number) => {
    const entry = history[index];
    if (!entry) return;

    setInputValue(entry.tokens.join('\n'));
    setTokens([]);
    setCurrentIndex(-1);
    setDoneTokens(new Set());
    setWarning('');
  };

  const onNext = () => {
    if (currentIndex < 0 || currentIndex >= tokens.length) return;
    if (currentIndex < tokens.length - 1) {
      setDoneTokens(prev => new Set(prev).add(currentIndex));
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === tokens.length - 1 && !doneTokens.has(currentIndex)) {
      setDoneTokens(prev => new Set(prev).add(currentIndex));
    }
  };

  const onPrev = () => {
    if (currentIndex <= 0) return;
    setDoneTokens(prev => {
      const next = new Set(prev);
      next.delete(currentIndex);
      return next;
    });
    setCurrentIndex(currentIndex - 1);
  };

  const onReset = () => {
    setInputValue('');
    setTokens([]);
    setCurrentIndex(-1);
    setDoneTokens(new Set());
    setWarning('');
  };

  const clearHistory = (confirmText: string) => {
    if (confirm(confirmText)) {
      setHistory([]);
    }
  };

  return {
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
  };
}
