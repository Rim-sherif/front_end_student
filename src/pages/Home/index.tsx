import {
  Announcement as AnnouncementIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import img from "../../assets/10586.jpg";
import { useAuth } from "../../hooks/useAuth";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const features = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    titleKey: "common.interactiveLearning",
    descriptionKey: "common.description.interactiveLearning",
  },
  {
    icon: <QuizIcon sx={{ fontSize: 40 }} />,
    titleKey: "common.regularAssessments",
    descriptionKey: "common.description.regularAssessments",
  },
  {
    icon: <AnnouncementIcon sx={{ fontSize: 40 }} />,
    titleKey: "common.stayUpdated",
    descriptionKey: "common.description.stayUpdated",
  },
];

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      login();
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <LanguageSwitcher />
        </Box>
      <Box
        sx={{
          color: "blue",
        }}
      >
        <Container sx={{ maxWidth: "lg" }} component="div">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <Typography variant="h2" component="h1" gutterBottom>
                {t('common.welcome')}
              </Typography>
              <Typography variant="h5" paragraph>
                {t('common.description.interactiveLearning')}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleGetStarted}
                startIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
                sx={{ mt: 2 }}
              >
                {isAuthenticated ? t('common.goToDashboard') : t('common.getStarted')}
              </Button>
            </Box>
            <Box
              sx={{
                flex: "1 1 300px",
                minWidth: 0,
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                component="img"
                src={img}
                alt="Student Portal"
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          {t('common.features')}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mt: 2 }}>
          {features.map((feature, index) => (
            <Box key={index} sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ color: "primary.main", mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {t(feature.titleKey)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t(feature.descriptionKey)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
