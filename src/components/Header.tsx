import Message from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import logo from "../../src/assets/Frame 47.png";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        flexWrap: "wrap",
      }}
    >
      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: 300,
          p: "2px 8px",
          borderRadius: 3,
        }}
      >
        <InputBase
          placeholder="Search…"
          sx={{ ml: 1, flex: 1 }}
          inputProps={{ "aria-label": "search" }}
        />
      </Paper>

      {/* User Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Badge>
          <LanguageSwitcher />
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
        <Box sx={{ textAlign: "right" }}>
          <Typography fontSize={14} fontWeight={600}>
            Reem Sherif
          </Typography>
          <Typography fontSize={12} color="gray">
            Reem@example.com
          </Typography>
        </Box>
        <Avatar alt="User Avatar" src={logo} sx={{ width: 40, height: 40 }} />
      </Box>
    </Box>
  );
}
