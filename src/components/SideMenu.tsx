import {
  Announcement as AnnouncementIcon,
  Book as BookIcon,
  CalendarMonth as CalendarIcon,
  Dashboard as DashboardIcon,
  Grade as GradebookIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Quiz as QuizIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Frame 47.png";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Quizzes", icon: <QuizIcon />, path: "/dashboard/quizzes" },
  { text: "Announcements", icon: <AnnouncementIcon />, path: "/dashboard/announcements" },
  { text: "Courses", icon: <BookIcon />, path: "/dashboard/courses" },
  { text: "Schedule", icon: <CalendarIcon />, path: "/dashboard/schedule" },
  { text: "Gradebook", icon: <GradebookIcon />, path: "/dashboard/gradebook" },
  { text: "Profile", icon: <PersonIcon />, path: "/dashboard/profile" },
  { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
];

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        p: 2,
        m: 2,
        borderRadius: 3,
        background: "linear-gradient(180deg, #925FE2 0%, #925FE2 100%)",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #ddd",
          px: 2,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ maxHeight: "100px", maxWidth: "100%" }}
        />
      </Box>

      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={isSelected}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: "0 20px 20px 0",
                  mx: 1,
                  my: 0.5,
                  color: isSelected ? "#fff" : "#ccc",
                  fontSize: "1rem",
                  fontWeight: 500,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                    color: "#fff",
                    "& .MuiListItemIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isSelected ? "#fff" : "#ccc",
                    minWidth: 32,
                    "& svg": {
                      fontSize: "1.4rem",
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* AppBar for mobile menu toggle */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Menu
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer for desktop & mobile */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="menu"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "transparent",
              border: "none"
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "transparent",
              border: "none"
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
};

export default SideMenu;
