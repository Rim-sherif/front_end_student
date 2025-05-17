import {
  AccessTime as AccessTimeIcon,
  FilterList as FilterListIcon,
  People as PeopleIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';


// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Dr. Sarah Johnson',
    students: 120,
    duration: '8 weeks',
    image: 'https://source.unsplash.com/random/300x200?web-development',
    category: 'Programming',
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    instructor: 'Prof. Michael Brown',
    students: 85,
    duration: '12 weeks',
    image: 'https://source.unsplash.com/random/300x200?mathematics',
    category: 'Mathematics',
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    instructor: 'Dr. Emily Chen',
    students: 150,
    duration: '10 weeks',
    image: 'https://source.unsplash.com/random/300x200?data-science',
    category: 'Data Science',
  },
  {
    id: 4,
    title: 'Business Ethics',
    instructor: 'Prof. James Wilson',
    students: 95,
    duration: '6 weeks',
    image: 'https://source.unsplash.com/random/300x200?business',
    category: 'Business',
  },
];

const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Courses
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access and manage your enrolled courses
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' }, display: 'flex', justifyContent: 'flex-end' }}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
              >
                Filter
              </Button>
              <Button variant="contained" color="primary">
                Add New Course
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Course Grid */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: 3
      }}>
        {mockCourses.map((course) => (
          <Card
            key={course.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              },
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={course.image}
              alt={course.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Chip
                label={course.category}
                size="small"
                sx={{ mb: 1 }}
                color="primary"
              />
              <Typography gutterBottom variant="h6" component="h2">
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Instructor: {course.instructor}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{course.students}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{course.duration}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};


export default Courses;
