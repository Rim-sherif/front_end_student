import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import bg2 from "../../assets/Backpack.png";
import welcome from "../../assets/College Student.png";
import bg1 from "../../assets/Scholarcap scroll.png";

const Main: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gridTemplateRows: "auto",
        gap: 3,
      }}
    >
      {/* Header Section - Spans all columns */}
      <Box
        sx={{
          gridColumn: {
            xs: "1",
            sm: "1 / -1",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 4,
            background: "linear-gradient(180deg, #925FE2 0%, #7D4EDC 100%)",
            px: { xs: 3, md: 5 },
            
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Left Section: Text */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              color: "white",
              textAlign: { xs: "center", md: "left" },
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, Reem!
            </Typography>
            <Typography variant="body1">
              Access your courses, track progress, and manage everything from
              one place.
            </Typography>
          </Box>

          {/* Right Section: Image & Background Effects */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              mt: { xs: 4, md: 0 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={welcome}
              alt="Welcome"
              style={{
                width: isMobile ? "120px" : "180px",
                zIndex: 2,
                position: "relative",
              }}
            />

            {/* Background Layer 1 */}
            <Box
              sx={{
                content: '""',
                position: "absolute",
                width: { xs: 150, md: 250 },
                height: { xs: 150, md: 250 },
                backgroundImage: `url(${bg1})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                bottom: { xs: -20, md: -80 },
                right: { xs: 40, md: 100 },
                zIndex: 1,
              }}
            />

            {/* Background Layer 2 */}
            <Box
              sx={{
                content: '""',
                position: "absolute",
                width: { xs: 50, md: 100 },
                height: { xs: 50, md: 100 },
                backgroundImage: `url(${bg2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                top: 20,
                right: { xs: 5, md: -20 },
                zIndex: 0,
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* Finance Section */}
      <Box
        sx={{
          gridColumn: {
            xs: "1",
            sm: "1",
            md: "1",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 3,
              padding: "2px",
              background: "linear-gradient(45deg, #925FE2, #7B2CBF)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Finance
          </Typography>
          <Typography variant="body2">
            • $2,500 in Earnings
            <br />• 3 Pending Withdrawals
          </Typography>
        </Paper>
      </Box>

      {/* Courses Section */}
      <Box
        sx={{
          gridColumn: {
            xs: "1",
            sm: "2",
            md: "2",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 3,
              padding: "2px",
              background: "linear-gradient(45deg, #925FE2, #7B2CBF)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Courses
          </Typography>
          <Typography variant="body2">
            • 4 Active Courses
            <br />• 120 Enrolled Students
          </Typography>
        </Paper>
      </Box>

      {/* Instructors Section */}
      <Box
        sx={{
          gridColumn: {
            xs: "1",
            sm: "1",
            md: "3",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 3,
              padding: "2px",
              background: "linear-gradient(45deg, #925FE2, #7B2CBF)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Instructors
          </Typography>
          <Typography variant="body2">
            • 2 Active Instructors
            <br />• 1 New Application
          </Typography>
        </Paper>
      </Box>

      {/* Announcements Section */}
      <Box
        sx={{
          gridColumn: {
            xs: "1",
            sm: "2",
            md: "4",
          },
          gridRow: {
            xs: "auto",
            md: "2 / span 4",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 3,
            },
          }}
        >
          <Typography variant="h6" gutterBottom color="primary">
            Recent Announcements
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="New Course Material Available"
                secondary="Physics 101 - New lecture slides uploaded"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="System Maintenance"
                secondary="Scheduled for this weekend - 2 hours downtime"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="New Feature Release"
                secondary="Check out our new discussion forum"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>

      {/* Due Items Section */}
      <Box
        sx={{
          gridColumn: {
            xs: "1",
            sm: "1 / span 2",
            md: "1 / span 3",
          },
          gridRow: {
            xs: "auto",
            md: "3 / span 3",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: "100%",
            marginTop: { xs: 0, md: 6 },
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 3,
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upcoming Due Items
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Assignment Due: Advanced Mathematics"
                secondary="Due in 2 days - Chapter 5 Problem Set"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Upcoming Quiz: Computer Science"
                secondary="Scheduled for next Monday - Topics 1-4"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Group Project Deadline"
                secondary="Team presentations due next Friday"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Main;
