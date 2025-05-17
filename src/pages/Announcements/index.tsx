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
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';

// Mock data for announcements
const announcements = [
  {
    id: 1,
    title: 'New Course Available',
    content: 'We are excited to announce the launch of our new Advanced Mathematics course. Enroll now to secure your spot!',
    date: '2024-03-20',
    category: 'Course',
    priority: 'high',
  },
  {
    id: 2,
    title: 'System Maintenance',
    content: 'The platform will be undergoing maintenance on March 25th from 2 AM to 4 AM EST. Please plan accordingly.',
    date: '2024-03-19',
    category: 'System',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Holiday Schedule',
    content: 'The school will be closed for Spring Break from April 1st to April 5th. Classes will resume on April 8th.',
    date: '2024-03-18',
    category: 'Holiday',
    priority: 'low',
  },
];

const Announcements: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Announcements
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay updated with the latest news and important information
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
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} aria-label="filter">
          <FilterIcon />
        </IconButton>
      </Paper>

      {/* Announcements List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
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
                    {announcement.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(announcement.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={announcement.category}
                    size="small"
                    sx={{ backgroundColor: theme.palette.primary.light }}
                  />
                  <Chip
                    label={announcement.priority}
                    size="small"
                    sx={{
                      backgroundColor: getPriorityColor(announcement.priority),
                      color: 'white',
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {announcement.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Announcements;
