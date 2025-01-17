import React, { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import PlatformLogin from './components/PlatformLogin';
import BusinessForm from './components/BusinessForm';
import KeywordTracker from './components/KeywordTracker';
import DateRangeSelector from './components/DateRangeSelector';
import AddKeyword from './components/AddKeyword';
import { Business, SearchState } from './types';
import { fetchSearchData } from './services/searchData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchState, setSearchState] = useState<SearchState>({
    business: {
      name: '',
      website: '',
      location: ''
    },
    keywords: [],
    data: null,
    isAuthenticated: false
  });

  const handleLoginSuccess = async (token: string) => {
    setIsAuthenticated(true);
    setSearchState(prev => ({ ...prev, isAuthenticated: true }));
  };

  const handleAddKeyword = (keyword: string) => {
    setSearchState(prev => ({
      ...prev,
      keywords: [...prev.keywords, { keyword, isActive: true }]
    }));
  };

  const handleDeleteKeyword = (keyword: string) => {
    setSearchState(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k.keyword !== keyword)
    }));
  };

  const handleDateChange = async (start: string, end: string) => {
    setLoading(true);
    try {
      const data = await fetchSearchData(
        start,
        end,
        searchState.business.website,
        searchState.keywords.map(k => k.keyword)
      );
      setSearchState(prev => ({
        ...prev,
        data: { keywordData: data }
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessUpdate = (business: Business) => {
    setSearchState(prev => ({
      ...prev,
      business
    }));
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <PlatformLogin onLoginSuccess={handleLoginSuccess} />
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <BusinessForm 
            business={searchState.business}
            onUpdate={handleBusinessUpdate}
          />
          <AddKeyword onAdd={handleAddKeyword} />
          <DateRangeSelector onDateChange={handleDateChange} />
          <KeywordTracker 
            keywords={searchState.keywords}
            data={searchState.data?.keywordData || []}
            loading={loading}
            onDelete={handleDeleteKeyword}
          />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
