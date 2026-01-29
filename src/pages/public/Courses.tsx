import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Grid,
  Stack,
  Button,
  useTheme,
  alpha,
  IconButton,
  Drawer,
  Typography
} from '@mui/material';
import { Clear, Tune, School } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { CourseCard } from '@/components/cards';
import {
  CourseHero,
  CourseFilters,
  CourseSortControls,
  ActiveFilterBar
} from '@/components/courses';
import { CATEGORIES, MOCK_COURSES } from '@/constant/course';

const MotionBox = motion(Box);

const Courses = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync Search Query with URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchQuery) newParams.set('q', searchQuery);
      else newParams.delete('q');
      setSearchParams(newParams);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesPrice = course.rawPrice >= priceRange[0] && course.rawPrice <= priceRange[1];
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);

      return matchesSearch && matchesCategory && matchesPrice && matchesLevel;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.students - a.students;
      if (sortBy === 'new') return a.isNew ? -1 : 1;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceLow') return a.rawPrice - b.rawPrice;
      if (sortBy === 'priceHigh') return b.rawPrice - a.rawPrice;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy, priceRange, selectedLevels]);

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 100]);
    setSelectedLevels([]);
    setSearchParams({});
  };

  return (
    <Box>
      <CourseHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={CATEGORIES}
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filter (Desktop) */}
          <Grid size={{ xs: 0, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={4}>
                <Tune color="primary" />
                <Typography variant="h6" fontWeight={700}>{t('courses.filters')}</Typography>
              </Stack>
              <CourseFilters
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedLevels={selectedLevels}
                onLevelToggle={toggleLevel}
                priceRange={priceRange}
                onPriceChange={(val) => setPriceRange([0, val])}
                onClear={clearFilters}
              />
            </Box>
          </Grid>

          {/* Main Course List */}
          <Grid size={{ xs: 12, md: 9 }}>
            <CourseSortControls
              count={filteredCourses.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onOpenFilter={() => setMobileFilterOpen(true)}
            />

            <ActiveFilterBar
              searchQuery={searchQuery}
              onSearchClear={() => setSearchQuery('')}
              selectedCategory={selectedCategory}
              onCategoryClear={() => setSelectedCategory('All')}
              selectedLevels={selectedLevels}
              onLevelToggle={toggleLevel}
              onClearAll={clearFilters}
            />

            <Grid container spacing={3}>
              <AnimatePresence mode="popLayout">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={course.title}>
                      <MotionBox
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <CourseCard {...course} />
                      </MotionBox>
                    </Grid>
                  ))
                ) : (
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{
                      py: 10,
                      textAlign: 'center',
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      borderRadius: 4,
                      border: `2px dashed ${theme.palette.divider}`
                    }}>
                      <School sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h5" color="text.secondary">{t('courses.no_results')}</Typography>
                      <Typography variant="body2" color="text.disabled">{t('courses.no_results_desc')}</Typography>
                      <Button sx={{ mt: 3 }} onClick={clearFilters}>{t('courses.view_all')}</Button>
                    </Box>
                  </Grid>
                )}
              </AnimatePresence>
            </Grid>

            {filteredCourses.length > 0 && (
              <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ borderRadius: 3, px: 6, py: 1.5, fontWeight: 700 }}
                >
                  Load More Courses
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Drawer Filter */}
      <Drawer
        anchor="bottom"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{
          sx: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80vh' }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ width: 40, height: 4, bgcolor: 'divider', borderRadius: 2, mx: 'auto', mb: 3 }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6" fontWeight={800}>Filters</Typography>
            <IconButton onClick={() => setMobileFilterOpen(false)}>
              <Clear />
            </IconButton>
          </Stack>
          <CourseFilters
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLevels={selectedLevels}
            onLevelToggle={toggleLevel}
            priceRange={priceRange}
            onPriceChange={(val) => setPriceRange([0, val])}
            onClear={clearFilters}
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setMobileFilterOpen(false)}
            sx={{ mt: 4, mb: 2, py: 2, borderRadius: 3 }}
          >
            Show {filteredCourses.length} Courses
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Courses;
