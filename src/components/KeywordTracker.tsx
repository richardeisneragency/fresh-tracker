import React from 'react';
import KeywordList from './KeywordList';
import { KeywordData, ProcessedKeywordData } from '../types';

interface Props {
  keywords: KeywordData[];
  data: ProcessedKeywordData[];
  loading: boolean;
  onDelete: (keyword: string) => void;
}

const KeywordTracker: React.FC<Props> = ({ keywords, data, loading, onDelete }) => {
  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <div role="status">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-200" />
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    if (!loading) {
      return (
        <div>
          <p style={{ textAlign: 'center', padding: '24px' }}>
            No results found for the selected keywords and date range.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <h6 style={{ marginBottom: '16px' }}>
        Search Results
      </h6>
      <KeywordList 
        keywords={keywords} 
        data={data} 
        loading={loading} 
        onDelete={onDelete}
      />
    </div>
  );
};

export default KeywordTracker;
