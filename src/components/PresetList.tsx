import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Preset {
  id: number;
  business: Business;
  keywords: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

interface Business {
  name: string;
  website: string;
}

interface Props {
  onLoad: (preset: Preset) => void;
}

const PresetList: React.FC<Props> = ({ onLoad }) => {
  const presets = JSON.parse(localStorage.getItem('presets') || '[]');

  const handleDelete = (id: number) => {
    const updatedPresets = presets.filter((preset: Preset) => preset.id !== id);
    localStorage.setItem('presets', JSON.stringify(updatedPresets));
    // Force re-render
    window.dispatchEvent(new Event('storage'));
  };

  if (presets.length === 0) {
    return null;
  }

  return (
    <List>
      {presets.map((preset: Preset) => (
        <ListItem
          key={preset.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => handleDelete(preset.id)}>
              <DeleteIcon />
            </IconButton>
          }
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            mb: 1
          }}
        >
          <ListItemText
            primary={preset.business.name || preset.business.website}
            secondary={`${preset.keywords.length} keywords`}
            onClick={() => onLoad(preset)}
            sx={{ cursor: 'pointer' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PresetList;
