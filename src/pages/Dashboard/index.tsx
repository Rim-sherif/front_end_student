import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import requireAuth from "../../components/requireAuth";
import SideMenu from "../../components/SideMenu";

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Header />

        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

const ProtectedDashboard = requireAuth(DashboardPage);
export default ProtectedDashboard;
