import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Stack,
  Chip,
  Rating,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ExpandMore,
  PlayCircleOutline,
  CheckCircle,
  AccessTime,
  SignalCellularAlt,
  Language,
  WorkspacePremium,
  Download,
  Group,
  EventNote
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  CourseCard,
  BenefitCard,
  ProjectCard,
  TestimonialCard,
  InfoCard,
  StatCard,
  InstructorCard,
  PricingCard
} from '@/components/cards';

const MotionBox = motion(Box);

const CourseDetail = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Mock data for the course
  const course = {
    title: "Advanced Full-Stack Web Development BootCamp 2026",
    tagline: "Master the modern web stack from zero to professional engineer. Learn React, Next.js, Node.js, and Cloud Deployment.",
    instructor: {
      name: "Dr. Sarah Johnson",
      role: "Senior Software Engineer & Educator",
      bio: "Sarah has over 15 years of experience in the industry, having worked at companies like Google and Meta. She specializes in distributed systems and modern front-end architectures.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      experience: "15+ Years"
    },
    level: "Intermediate",
    duration: "40 Hours",
    format: "Online / Self-paced",
    rating: 4.8,
    reviewCount: 1250,
    price: "$99.99",
    discountPrice: "$49.99",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Build 10+ real-world professional projects",
      "Master React 19 and Next.js 15 features",
      "Deep dive into TypeScript & State Management",
      "Deployment & CI/CD with Vercel & AWS",
      "Career coaching and resume review",
      "Lifetime access to course materials"
    ],
    outcomes: [
      "Architect complex front-end applications with React",
      "Design and implement scalable RESTful and GraphQL APIs",
      "Understand and implement advanced security patterns",
      "Master database design with SQL and NoSQL",
      "Optimise application performance and accessibility"
    ],
    syllabus: [
      {
        title: "Module 1: Foundations of Modern Web",
        lessons: ["Browser Internals", "HTTP/2 and HTTP/3", "Advanced CSS Grid & Flexbox", "JavaScript Engine Works"]
      },
      {
        title: "Module 2: React 19 Mastery",
        lessons: ["Concurrent Mode", "Server Components", "Advanced Hooks & Patterns", "State Management Deep Dive"]
      },
      {
        title: "Module 3: Backend & API Design",
        lessons: ["Node.js Architecture", "Express vs Fastify", "Prisma ORM", "Authentication Patterns"]
      },
      {
        title: "Module 4: Final Project & Deployment",
        lessons: ["System Design", "Testing Strategies", "Dockerizing Apps", "Vercel Deployment"]
      }
    ],
    faqs: [
      {
        question: "Do I need prior experience?",
        answer: "Basic knowledge of HTML, CSS, and JavaScript is recommended. We cover everything else from the ground up."
      },
      {
        question: "Is there a certificate?",
        answer: "Yes, you will receive a verified digital certificate upon successful completion of the final project."
      },
      {
        question: "How long is the access?",
        answer: "You get lifetime access to all course materials and future updates."
      }
    ]
  };

  return (
    <Box>
      {/* 1. Hero / Course Header */}
      <Box sx={{
        bgcolor: 'background.default',
        pt: { xs: 5, md: 10 },
        pb: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decoration */}
        <Box sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50%',
          height: '70%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(100px)',
          zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Stack direction="row" spacing={1} mb={3}>
                  <Chip label={course.level} color="primary" variant="outlined" size="small" />
                  <Chip label={course.format} variant="outlined" size="small" />
                </Stack>

                <Typography variant="h1" sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 3,
                  fontWeight: 800,
                  lineHeight: 1.2
                }}>
                  {course.title}
                </Typography>

                <Typography variant="h5" color="text.secondary" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6 }}>
                  {course.tagline}
                </Typography>

                <Stack direction="row" spacing={4} mb={5} flexWrap="wrap" useFlexGap gap={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={course.instructor.image} sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2">{course.instructor.name}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2">{course.duration}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={course.rating} readOnly size="small" precision={0.5} />
                    <Typography variant="body2">({course.reviewCount} {t('course_detail.reviews_label')})</Typography>
                  </Box>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ px: 6, py: 2, borderRadius: 2, fontWeight: 700 }}
                    startIcon={<PlayCircleOutline />}
                  >
                    {t('course_detail.enroll_now')}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ px: 4, py: 2, borderRadius: 2, fontWeight: 600 }}
                    startIcon={<Download />}
                  >
                    {t('course_detail.view_syllabus')}
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                sx={{ position: 'relative' }}
              >
                <Box
                  component="img"
                  src={course.image}
                  sx={{
                    width: '100%',
                    borderRadius: 6,
                    boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                  }}
                />
                <Paper sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' }
                }}>
                  <PlayCircleOutline sx={{ fontSize: 50 }} />
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. Key Benefits */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
          {t('course_detail.why_take')}
        </Typography>
        <Grid container spacing={4}>
          {course.benefits.map((benefit, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <BenefitCard benefit={benefit} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Course Overview */}
      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {[
              { icon: <SignalCellularAlt />, label: "Level", value: course.level },
              { icon: <AccessTime />, label: "Duration", value: course.duration },
              { icon: <Language />, label: "Language", value: "English / Khmer" },
              { icon: <WorkspacePremium />, label: "Certificate", value: "Verified Certificate" },
              { icon: <Group />, label: "Learners", value: "10k+ Enrolled" },
              { icon: <EventNote />, label: "Format", value: course.format },
            ].map((stat, index) => (
              <Grid size={{ xs: 6, md: 2 }} key={index}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Learning Outcomes */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
              {t('course_detail.achieve')}
            </Typography>
            <List>
              {course.outcomes.map((outcome, index) => (
                <ListItem key={index} disableGutters sx={{ alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    <CheckCircle color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={outcome}
                    primaryTypographyProps={{ variant: 'body1', sx: { fontWeight: 500 } }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 6,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <Typography variant="h6" gutterBottom fontWeight={800}>
                Prerequisites
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                - Basic understanding of programming concepts
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                - Familarity with HTML and CSS
              </Typography>
              <Typography variant="body1" color="text.secondary">
                - No prior React or Backend experience required!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 5. Curriculum / Syllabus */}
      <Box sx={{ bgcolor: alpha(theme.palette.background.paper, 0.4), py: 12 }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
            {t('course_detail.content')}
          </Typography>
          {course.syllabus.map((module, index) => (
            <Accordion
              key={index}
              sx={{
                bgcolor: 'transparent',
                boxShadow: 'none',
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:before': { display: 'none' }
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: 700, py: 1 }}>{module.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {module.lessons.map((lesson, lIndex) => (
                    <ListItem key={lIndex}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <PlayCircleOutline sx={{ fontSize: 18, color: 'text.secondary' }} />
                      </ListItemIcon>
                      <ListItemText primary={lesson} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button variant="text" startIcon={<Download />}>
              Download Full Syllabus PDF
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 6. Projects & Practical Work */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
          {t('course_detail.projects')}
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "E-commerce Platform",
              desc: "Build a full-featured online store with payment integration and admin dashboard.",
              image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "SaaS Dashboard",
              desc: "Create a complex data visualization dashboard with real-time updates.",
              image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&w=800&q=80"
            },
            {
              title: "Social Media API",
              desc: "Architect a scalable backend with authentication, real-time messaging, and media handling.",
              image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
            }
          ].map((project, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 7. Who This Course Is For */}
      <Box sx={{ py: 12, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
            {t('course_detail.is_right')}
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: "Aspiring Developers", desc: "If you want to start a professional career in web development and build a strong portfolio." },
              { title: "Junior Devs", desc: "If you want to level up your skills with modern frameworks and industrial best practices." },
              { title: "Computer Science Students", desc: "If you want to bridge the gap between academic theory and practical software engineering." }
            ].map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <InfoCard title={item.title} desc={item.desc} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 8. Instructor / Teaching Team */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography variant="h3" sx={{ mb: 8, fontWeight: 800, textAlign: 'center' }}>
          {t('course_detail.instructor')}
        </Typography>
        <InstructorCard
          {...course.instructor}
          students="50,000+"
        />
      </Container>

      {/* 11. Pricing & Enrollment */}
      <Box sx={{ py: 12, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Container maxWidth="sm">
          <PricingCard
            price={course.price}
            discountPrice={course.discountPrice}
          />
        </Container>
      </Box>

      {/* 12. Testimonials / Reviews */}
      <Box sx={{ py: 12, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
            {t('course_detail.reviews')}
          </Typography>
          <Grid container spacing={4}>
            {[
              { name: "John Doe", role: "Frontend Developer at Tech Co", text: "This course completely changed my career path. The projects are exactly like what I do now in my job." },
              { name: "Sok Mean", role: "CS Student", text: "Structured, deep, and very easy to follow despite the complex topics. Highly recommended!" },
              { name: "Emily Watson", role: "Self-taught Developer", text: "The instructor is amazing. I finally understood how the DOM actually works behind the scenes." }
            ].map((review, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <TestimonialCard {...review} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 13. FAQ */}
      <Container maxWidth="md" sx={{ py: 12 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
          {t('course_detail.faq')}
        </Typography>
        {course.faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, borderRadius: '16px !important', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 700 }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* 14. Related Courses */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 800 }}>
          {t('course_detail.related')}
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'UI/UX Design Masterclass',
              instructor: 'Michael Chen',
              image: 'https://images.unsplash.com/photo-1561070791-26c11d204a3d?auto=format&fit=crop&w=800&q=80',
              price: '$39.99',
              rating: 4.9,
              students: 850,
              duration: '25h 15m',
              category: 'Design'
            },
            {
              title: 'Digital Marketing Excellence',
              instructor: 'Emma Wilson',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
              price: '$29.99',
              rating: 4.7,
              students: 2100,
              duration: '15h 45m',
              category: 'Business'
            },
            {
              title: 'Mobile App Development',
              instructor: 'David Kim',
              image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
              price: '$59.99',
              rating: 4.8,
              students: 1500,
              duration: '35h 20m',
              category: 'Development'
            }
          ].map((course, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 15. Final CTA Section */}
      <Box sx={{
        py: 15,
        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        textAlign: 'center',
        color: 'white'
      }}>
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
              {t('course_detail.ready')}
            </Typography>
            <Typography variant="h5" sx={{ mb: 6, opacity: 0.9 }}>
              {t('course_detail.join_students')}
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 8,
                py: 2,
                borderRadius: 4,
                fontSize: '1.2rem',
                fontWeight: 800,
                '&:hover': { bgcolor: alpha('#fff', 0.9) }
              }}
            >
              {t('course_detail.enroll_now')}
            </Button>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
};

export default CourseDetail;