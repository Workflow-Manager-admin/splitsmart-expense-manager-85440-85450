// Main application entrypoint – sets up routes, context, navigation, and theme
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import GroupPage from "./pages/GroupPage";
import TripPage from "./pages/TripPage";
import AuthPage from "./pages/AuthPage";
import NotificationPopup from "./components/NotificationPopup";
import ExpenseModal from "./components/ExpenseModal";

import { CssBaseline, Box, ThemeProvider, createTheme, Container } from "@mui/material";

// Setup MUI theme to match the existing accent color palette and keep a light, friendly tone
const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007AFF",
    },
    secondary: {
      main: "#34C759",
    },
    warning: {
      main: "#FF9500",
    },
    background: {
      default: "#f8f9fa",
      paper: "#fff",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'Inter','Roboto','Helvetica Neue',Arial,sans-serif",
    fontWeightBold: 600,
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      borderRadius: 8,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
  },
});

function App() {
  // Only for theme toggling; app is always light
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <AppProvider>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <Box className="App" sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
            <Navbar />
            <Box component="main" sx={{
              py: { xs: 2, md: 4 },
              minHeight: "88vh",
              bgcolor: "background.default"
            }}>
              <Container maxWidth="md">
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/group/:groupId/*" element={<GroupPage />} />
                  <Route path="/trip/:tripId/*" element={<TripPage />} />
                  <Route path="/auth/*" element={<AuthPage />} />
                  <Route path="/" element={<Navigate replace to="/dashboard" />} />
                </Routes>
              </Container>
            </Box>
            <NotificationPopup />
            <ExpenseModal />
          </Box>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
