import { googleAuth } from './googleAuth';
import { ENDPOINTS } from '../config';
import { ProcessedKeywordData, DailyData } from '../types';

const formatDate = (date: string) => {
  return new Date(date).toISOString().split('T')[0];
};

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('google_access_token');
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      errorText
    });
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function getSearchConsoleData(
  startDate: string,
  endDate: string,
  website: string,
  keywords: string[]
): Promise<ProcessedKeywordData[]> {
  try {
    // Ensure website URL is properly formatted
    const siteUrl = website.startsWith('http') ? website : `https://${website}`;
    const encodedSiteUrl = encodeURIComponent(siteUrl);

    console.log('Fetching data with params:', {
      startDate,
      endDate,
      siteUrl,
      keywords
    });

    // First get the summary data
    const summaryData = await fetchWithAuth(
      `https://www.googleapis.com/webmasters/v3/sites/${encodedSiteUrl}/searchAnalytics/query`,
      {
        method: 'POST',
        body: JSON.stringify({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['query'],
          dimensionFilterGroups: [{
            filters: [{
              dimension: 'query',
              operator: 'includingRegex',
              expression: keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
            }]
          }],
          rowLimit: 100
        })
      }
    );

    if (!summaryData.rows) {
      console.log('No data returned from API');
      return [];
    }

    // Then get daily data for each keyword
    const dailyDataPromises = summaryData.rows.map(async (row: any) => {
      const dailyResponse = await fetchWithAuth(
        `https://www.googleapis.com/webmasters/v3/sites/${encodedSiteUrl}/searchAnalytics/query`,
        {
          method: 'POST',
          body: JSON.stringify({
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            dimensions: ['query', 'date'],
            dimensionFilterGroups: [{
              filters: [{
                dimension: 'query',
                operator: 'equals',
                expression: row.keys[0]
              }]
            }],
            rowLimit: 100
          })
        }
      );

      return {
        keyword: row.keys[0],
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        avgPosition: row.position || 0,
        dailyData: dailyResponse.rows?.map((dailyRow: any) => ({
          date: dailyRow.keys[1],
          clicks: dailyRow.clicks || 0,
          impressions: dailyRow.impressions || 0,
          position: dailyRow.position || 0
        })) || []
      };
    });

    return await Promise.all(dailyDataPromises);
  } catch (error) {
    console.error('Error fetching search console data:', error);
    throw error;
  }
}

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

function normalizeUrl(url: string): string {
  // Remove protocol
  let normalized = url.replace(/^https?:\/\//, '');
  // Remove trailing slash
  normalized = normalized.replace(/\/$/, '');
  // Remove www
  normalized = normalized.replace(/^www\./, '');
  return normalized;
}
