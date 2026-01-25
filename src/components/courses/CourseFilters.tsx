import { 
  Stack, 
  Typography, 
  Box, 
  Chip, 
  Divider, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Slider, 
  Button 
} from '@mui/material';
import { Clear } from '@mui/icons-material';

interface CourseFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedLevels: string[];
  onLevelToggle: (level: string) => void;
  priceRange: number[];
  onPriceChange: (val: number) => void;
  onClear: () => void;
}

const CourseFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedLevels,
  onLevelToggle,
  priceRange,
  onPriceChange,
  onClear
}: CourseFiltersProps) => {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Categories</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap gap={1}>
          {categories.map(cat => (
            <Chip 
              key={cat} 
              label={cat} 
              onClick={() => onCategoryChange(cat)}
              color={selectedCategory === cat ? "primary" : "default"}
              variant={selectedCategory === cat ? "filled" : "outlined"}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Level</Typography>
        <FormGroup>
          {['Beginner', 'Intermediate', 'Advanced'].map(level => (
            <FormControlLabel 
              key={level}
              control={
                <Checkbox 
                  checked={selectedLevels.includes(level)} 
                  onChange={() => onLevelToggle(level)} 
                  size="small"
                />
              } 
              label={level} 
            />
          ))}
        </FormGroup>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Price Range</Typography>
        <Typography variant="caption" color="text.secondary">Up to ${priceRange[1]}</Typography>
        <Slider
          value={priceRange[1]}
          onChange={(_, val) => onPriceChange(val as number)}
          min={0}
          max={100}
          sx={{ mt: 2 }}
        />
      </Box>

      <Divider />

      <Button 
        variant="outlined" 
        fullWidth 
        onClick={onClear}
        startIcon={<Clear />}
        sx={{ borderRadius: 2 }}
      >
        Clear All Filters
      </Button>
    </Stack>
  );
};

export default CourseFilters;
