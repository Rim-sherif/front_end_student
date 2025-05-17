import {
    AccessTime as AccessTimeIcon,
    Assignment as AssignmentIcon,
    Class as ClassIcon,
    Event as EventIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';

// Mock data for schedule
const scheduleItems = [
  {
    id: 1,
    title: 'Mathematics 101',
    type: 'class',
    time: '09:00 AM - 10:30 AM',
    location: 'Room 301',
    instructor: 'Dr. Smith',
  },
  {
    id: 2,
    title: 'Physics Lab',
    type: 'lab',
    time: '11:00 AM - 12:30 PM',
    location: 'Science Building Lab 2',
    instructor: 'Prof. Johnson',
  },
  {
    id: 3,
    title: 'Computer Science Project Deadline',
    type: 'assignment',
    time: '02:00 PM',
    location: 'Online Submission',
    instructor: 'Dr. Brown',
  },
  {
    id: 4,
    title: 'English Literature',
    type: 'class',
    time: '03:30 PM - 05:00 PM',
    location: 'Room 205',
    instructor: 'Prof. Davis',
  },
];

const Schedule: React.FC = () => {
  const theme = useTheme();
  const [selectedDate] = useState(new Date());

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <ClassIcon />;
      case 'lab':
        return <EventIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class':
        return theme.palette.primary.main;
      case 'lab':
        return theme.palette.secondary.main;
      case 'assignment':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Schedule
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your classes, labs, and upcoming deadlines
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* Calendar grid would go here */}
              <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                Calendar view coming soon...
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Upcoming Events Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Today's Schedule
            </Typography>
            <Box sx={{ mt: 2 }}>
              {scheduleItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Card
                    elevation={0}
                    sx={{
                      mb: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      '&:hover': {
                        boxShadow: theme.shadows[4],
                        transition: 'box-shadow 0.3s ease-in-out',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            backgroundColor: getEventColor(item.type),
                            color: 'white',
                            p: 1,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {getEventIcon(item.type)}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <AccessTimeIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {item.time}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {item.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Instructor: {item.instructor}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                  {index < scheduleItems.length - 1 && <Divider sx={{ my: 2 }} />}
                </React.Fragment>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Schedule;
