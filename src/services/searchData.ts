import { ProcessedKeywordData } from '../types';

export const fetchSearchData = async (
  startDate: string,
  endDate: string,
  website: string,
  keywords: string[]
): Promise<ProcessedKeywordData[]> => {
  // Mock data for now
  return keywords.map(keyword => {
    const dailyData = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        clicks: Math.floor(Math.random() * 100),
        impressions: Math.floor(Math.random() * 1000),
        ctr: Math.random(),
        position: Math.random() * 10
      };
    });

    const avgPosition = dailyData.reduce((acc, day) => acc + day.position, 0) / dailyData.length;
    const totalClicks = dailyData.reduce((acc, day) => acc + day.clicks, 0);
    const totalImpressions = dailyData.reduce((acc, day) => acc + day.impressions, 0);

    return {
      keyword,
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalClicks / totalImpressions,
      position: avgPosition,
      avgPosition,
      dailyData
    };
  });
};
