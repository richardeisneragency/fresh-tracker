import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import BusinessIcon from '@mui/icons-material/Business';
import StoreIcon from '@mui/icons-material/Store';
import { useState } from 'react';

interface Platform {
  id: string;
  name: string;
  icon: JSX.Element;
  available: boolean;
}

const platforms: Platform[] = [
  {
    id: 'google',
    name: 'Google Search Console',
    icon: <GoogleIcon />,
    available: true
  },
  {
    id: 'business',
    name: 'Google Business Profile',
    icon: <BusinessIcon />,
    available: false
  },
  {
    id: 'yelp',
    name: 'Yelp',
    icon: <StoreIcon />,
    available: false
  }
];

interface Props {
  onCheck: (platform: 'google' | 'business' | 'yelp') => Promise<void>;
  loading: boolean;
  authenticated: {
    google: boolean;
    business?: boolean;
    yelp?: boolean;
  };
}

export default function PlatformLogin({ onCheck, loading, authenticated }: Props) {
  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={() => onCheck('google')}
      disabled={loading}
    >
      Connect to Google Search Console
    </Button>
  );
}
