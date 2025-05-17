import {
    FilterList as FilterIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';

// Mock data for courses and grades
const courses = [
  {
    id: 1,
    name: 'Advanced Mathematics',
    code: 'MATH101',
    credits: 4,
    grade: 'A',
    percentage: 95,
    assignments: [
      { name: 'Midterm Exam', grade: 92, weight: 30 },
      { name: 'Final Exam', grade: 98, weight: 40 },
      { name: 'Assignments', grade: 94, weight: 30 },
    ],
  },
  {
    id: 2,
    name: 'Computer Science',
    code: 'CS201',
    credits: 3,
    grade: 'B+',
    percentage: 88,
    assignments: [
      { name: 'Project', grade: 85, weight: 40 },
      { name: 'Final Exam', grade: 90, weight: 40 },
      { name: 'Quizzes', grade: 89, weight: 20 },
    ],
  },
  {
    id: 3,
    name: 'Physics',
    code: 'PHY101',
    credits: 4,
    grade: 'A-',
    percentage: 91,
    assignments: [
      { name: 'Lab Reports', grade: 93, weight: 30 },
      { name: 'Final Exam', grade: 89, weight: 40 },
      { name: 'Homework', grade: 92, weight: 30 },
    ],
  },
];

const Gradebook: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
      case 'A+':
        return theme.palette.success.main;
      case 'B':
      case 'B+':
        return theme.palette.info.main;
      case 'C':
      case 'C+':
        return theme.palette.warning.main;
      default:
        return theme.palette.error.main;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Gradebook
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your academic progress and course performance
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Paper
        elevation={0}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} aria-label="filter">
          <FilterIcon />
        </IconButton>
      </Paper>

      {/* Course Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {courses.map((course) => (
          <Card
            key={course.id}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              '&:hover': {
                boxShadow: theme.shadows[4],
                transition: 'box-shadow 0.3s ease-in-out',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.code} • {course.credits} Credits
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    label={course.grade}
                    size="small"
                    sx={{
                      backgroundColor: getGradeColor(course.grade),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    {course.percentage}%
                  </Typography>
                </Box>
              </Box>

              {/* Assignments Table */}
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Assignment</TableCell>
                      <TableCell align="right">Weight</TableCell>
                      <TableCell align="right">Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {course.assignments.map((assignment) => (
                      <TableRow key={assignment.name}>
                        <TableCell>{assignment.name}</TableCell>
                        <TableCell align="right">{assignment.weight}%</TableCell>
                        <TableCell align="right">{assignment.grade}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Gradebook;
