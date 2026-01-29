import { Stack, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface CourseSortControlsProps {
  count: number;
  sortBy: string;
  onSortChange: (val: string) => void;
  onOpenFilter: () => void;
}

const CourseSortControls = ({ count, sortBy, onSortChange, onOpenFilter }: CourseSortControlsProps) => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}
    >
      <Typography variant="body1" color="text.secondary">
        {t('common.view_all')} <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>{count}</Box> {t('nav.courses')}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          disableRipple
          startIcon={<FilterList />}
          onClick={onOpenFilter}
          sx={{ display: { xs: 'flex', md: 'none' }, borderRadius: 2 }}
        >
          {t('courses.filters')}
        </Button>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>{t('courses.sort_by')}</InputLabel>
          <Select
            value={sortBy}
            label={t('courses.sort_by')}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="popular">{t('courses.sort_options.popular')}</MenuItem>
            <MenuItem value="new">{t('courses.sort_options.newest')}</MenuItem>
            <MenuItem value="rating">{t('courses.sort_options.rating')}</MenuItem>
            <MenuItem value="priceLow">{t('courses.sort_options.price_low')}</MenuItem>
            <MenuItem value="priceHigh">{t('courses.sort_options.price_high')}</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default CourseSortControls;
