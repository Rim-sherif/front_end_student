import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  FilterList as FilterIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,

  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

// Mock data for quizzes
const quizzes = [
  {
    id: 1,
    title: 'Introduction to Mathematics',
    subject: 'Mathematics',
    duration: 45,
    questions: 20,
    status: 'completed',
    score: 85,
    dueDate: '2024-03-25',
  },
  {
    id: 2,
    title: 'Basic Physics Concepts',
    subject: 'Physics',
    duration: 60,
    questions: 25,
    status: 'pending',
    dueDate: '2024-03-28',
  },
  {
    id: 3,
    title: 'Computer Science Fundamentals',
    subject: 'Computer Science',
    duration: 90,
    questions: 30,
    status: 'upcoming',
    dueDate: '2024-04-01',
  },
  {
    id: 4,
    title: 'English Literature Quiz',
    subject: 'English',
    duration: 30,
    questions: 15,
    status: 'pending',
    dueDate: '2024-03-30',
  },
];

const Quizzes: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'pending':
        return theme.palette.warning.main;
      case 'upcoming':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon />;
      case 'pending':
        return <ScheduleIcon />;
      case 'upcoming':
        return <AssignmentIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  return (
    <div>

      <div className='flex'>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Quizzes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Test your knowledge and track your progress
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
          placeholder="Search quizzes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} aria-label="filter">
          <FilterIcon />
        </IconButton>
      </Paper>
      </div>
      
     

      {/* Quiz Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
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
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quiz.subject}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    icon={getStatusIcon(quiz.status)}
                    label={quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(quiz.status),
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                  {quiz.status === 'completed' && (
                    <Typography variant="h6" color="text.secondary">
                      {quiz.score}%
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TimerIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {quiz.duration} minutes
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssignmentIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {quiz.questions} questions
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Due: {new Date(quiz.dueDate).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={quiz.status === 'completed'}
                    sx={{ borderRadius: 2 }}
                  >
                    {quiz.status === 'completed' ? 'View Results' : 'Start Quiz'}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Quizzes;
