import { Stack, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FilterList } from '@mui/icons-material';

interface CourseSortControlsProps {
  count: number;
  sortBy: string;
  onSortChange: (val: string) => void;
  onOpenFilter: () => void;
}

const CourseSortControls = ({ count, sortBy, onSortChange, onOpenFilter }: CourseSortControlsProps) => {
  return (
    <Stack 
      direction="row" 
      justifyContent="space-between" 
      alignItems="center" 
      sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}
    >
      <Typography variant="body1" color="text.secondary">
        Showing <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>{count}</Box> courses
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button 
          disableRipple
          startIcon={<FilterList />}
          onClick={onOpenFilter}
          sx={{ display: { xs: 'flex', md: 'none' }, borderRadius: 2 }}
        >
          Filters
        </Button>
        
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="popular">Most Popular</MenuItem>
            <MenuItem value="new">Newest</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
            <MenuItem value="priceLow">Price: Low to High</MenuItem>
            <MenuItem value="priceHigh">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default CourseSortControls;
