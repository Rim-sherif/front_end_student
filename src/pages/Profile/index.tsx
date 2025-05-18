import {
    Edit as EditIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    School as SchoolIcon,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import logo from '../../assets/Frame 47.png';

// Mock user data
const userData = {
  name: 'Reem Sherif',
  email: 'Reem@example.com',
  role: 'Student',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  education: 'Bachelor of Computer Science',
  bio: 'Passionate about technology and education. Currently pursuing a degree in Computer Science with a focus on artificial intelligence and machine learning.',
  stats: {
    courses: 4,
    completed: 12,
    certificates: 3,
  },
};

const Profile: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      {/* Profile Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(180deg, #925FE2 50%, #925FE2 100%)',
          color: 'white',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={logo}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid white',
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {userData.name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {userData.role}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" color="primary" gutterBottom>
                {userData.stats.courses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Courses
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" color="primary" gutterBottom>
                {userData.stats.completed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed Courses
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h4" color="primary" gutterBottom>
                {userData.stats.certificates}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Certificates
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Tabs and Content */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="About" />
            <Tab label="Settings" />
            <Tab label="Activity" />
          </Tabs>
        </Box>

        {/* About Tab */}
        {activeTab === 0 && (
          <Box sx={{ mt: 3 }}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bio
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {userData.bio}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <EmailIcon color="action" />
                      <Typography variant="body1">{userData.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <PhoneIcon color="action" />
                      <Typography variant="body1">{userData.phone}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <LocationIcon color="action" />
                      <Typography variant="body1">{userData.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <SchoolIcon color="action" />
                      <Typography variant="body1">{userData.education}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Settings Tab */}
        {activeTab === 1 && (
          <Box sx={{ mt: 3 }}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue={userData.name}
                      disabled={!isEditing}
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      defaultValue={userData.email}
                      disabled={!isEditing}
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      defaultValue={userData.phone}
                      disabled={!isEditing}
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                    <TextField
                      fullWidth
                      label="Location"
                      defaultValue={userData.location}
                      disabled={!isEditing}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Activity Tab */}
        {activeTab === 2 && (
          <Box sx={{ mt: 3 }}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  No recent activity to display.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
