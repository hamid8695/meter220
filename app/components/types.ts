export type Lang = 'bn' | 'en';
export type HistoryEntry = {
  date: string;
  tokenCount: number;
  tokens: string[];
  preview: string;
};
export type TabKey = 'token' | 'codes' | 'history';
export type CopyStatus = 'default' | 'copied';
