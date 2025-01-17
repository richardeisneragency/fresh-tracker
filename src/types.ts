export interface Business {
  name: string;
  website: string;
  location: string;
}

export interface KeywordData {
  keyword: string;
  isActive: boolean;
}

export interface DailyData {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface ProcessedKeywordData {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  avgPosition: number;
  dailyData: DailyData[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
}

export interface DailyDataValue {
  date: string;
  value: number;
}

export interface SearchData {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  results: number;
  trend: DailyDataValue[];
}

export interface SearchState {
  business: Business;
  keywords: KeywordData[];
  data: {
    keywordData: ProcessedKeywordData[];
  } | null;
  isAuthenticated: boolean;
}
