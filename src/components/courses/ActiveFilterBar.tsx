import { Box, Typography, Chip, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

interface ActiveFilterBarProps {
  searchQuery: string;
  onSearchClear: () => void;
  selectedCategory: string;
  onCategoryClear: () => void;
  selectedLevels: string[];
  onLevelToggle: (level: string) => void;
  onClearAll: () => void;
}

const ActiveFilterBar = ({
  searchQuery,
  onSearchClear,
  selectedCategory,
  onCategoryClear,
  selectedLevels,
  onLevelToggle,
  onClearAll
}: ActiveFilterBarProps) => {
  const hasActiveFilters = selectedCategory !== 'All' || searchQuery || selectedLevels.length > 0;

  return (
    <AnimatePresence>
      {hasActiveFilters && (
        <MotionBox 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>Active Filters:</Typography>
          {searchQuery && (
            <Chip label={`Search: ${searchQuery}`} onDelete={onSearchClear} size="small" />
          )}
          {selectedCategory !== 'All' && (
            <Chip label={selectedCategory} onDelete={onCategoryClear} size="small" />
          )}
          {selectedLevels.map(lvl => (
            <Chip key={lvl} label={lvl} onDelete={() => onLevelToggle(lvl)} size="small" />
          ))}
          <Button size="small" color="primary" onClick={onClearAll}>Clear All</Button>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default ActiveFilterBar;
