import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

interface Props {
  onLoginSuccess: (token: string) => void;
}

const PlatformLogin: React.FC<Props> = ({ onLoginSuccess }) => {
  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={() => onLoginSuccess('dummy-token')}
      fullWidth
    >
      Sign in with Google
    </Button>
  );
};

export default PlatformLogin;
