import React, { useState, useEffect } from 'react';
import { Container, Paper, Box } from '@mui/material';
import PlatformLogin from './components/PlatformLogin';
import BusinessForm from './components/BusinessForm';
import KeywordTracker from './components/KeywordTracker';
import DateRangeSelector from './components/DateRangeSelector';
import AddKeyword from './components/AddKeyword';
import { SearchState } from './types';
import { googleAuth } from './services/googleAuth';
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

  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    // Handle date changes
  };

  const handleBusinessUpdate = (business: { name: string; website: string; location: string }) => {
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
          <DateRangeSelector onChange={handleDateChange} />
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
