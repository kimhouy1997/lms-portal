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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>{t('courses.filters')}</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap gap={1}>
          {['All', ...categories].map(cat => (
            <Chip
              key={cat}
              label={cat === 'All' ? t('courses.categories.all') : t(`courses.categories.${cat.toLowerCase()}`, { defaultValue: cat })}
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
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>{t('courses.levels.beginner')}</Typography>
        <FormGroup>
          {[
            { key: 'Beginner', label: t('courses.levels.beginner') },
            { key: 'Intermediate', label: t('courses.levels.intermediate') },
            { key: 'Advanced', label: t('courses.levels.advanced') }
          ].map(level => (
            <FormControlLabel
              key={level.key}
              control={
                <Checkbox
                  checked={selectedLevels.includes(level.key)}
                  onChange={() => onLevelToggle(level.key)}
                  size="small"
                />
              }
              label={level.label}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{t('courses.filters')}</Typography>
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
        {t('common.cancel')}
      </Button>
    </Stack>
  );
};

export default CourseFilters;
