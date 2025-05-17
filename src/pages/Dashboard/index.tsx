import { Message, Notifications as NotificationsIcon } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/Frame 47.png';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import requireAuth from '../../components/requireAuth';
import SideMenu from '../../components/SideMenu';

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
            flexWrap: 'wrap',
          }}
        >
          {/* Search Bar */}
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 300,
              p: '2px 8px',
              borderRadius: 3,
             
            }}
          >
            <InputBase
              placeholder="Search…"
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Paper>

          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
       
          <Badge >
              <LanguageSwitcher/>
            </Badge>
      
        <Divider orientation="vertical" flexItem />
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
            <Divider orientation="vertical" flexItem />
            <Badge color="error" variant="dot">
              <Message />
            </Badge>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ textAlign: 'right' }}>
              <Typography fontSize={14} fontWeight={600}>
                Kareem Hassan
              </Typography>
              <Typography fontSize={12} color="gray">
                kareem@example.com
              </Typography>
            </Box>
            <Avatar alt="User Avatar" src={logo} sx={{ width: 40, height: 40 }} />
          </Box>
        </Box>
        <Box sx={{ flex: 1}}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

const ProtectedDashboard = requireAuth(DashboardPage);
export default ProtectedDashboard;


