import { Button } from '@mui/material';

interface Props {
  onCheckNow: () => void;
  onSavePreset: () => void;
  disabled: boolean;
  loading: boolean;
}

export default function PresetActions({ onCheckNow, onSavePreset, disabled, loading }: Props) {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={onCheckNow}
        disabled={disabled}
      >
        Check Now
      </Button>
      
      <Button
        variant="outlined"
        color="primary"
        onClick={onSavePreset}
        disabled={disabled}
      >
        Save as Preset URL
      </Button>
      
      {disabled && !loading && (
        <div>
          Enter a valid website URL to enable these actions
        </div>
      )}
    </div>
  );
}
