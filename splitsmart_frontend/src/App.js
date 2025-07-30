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

function App() {
  // Only for theme toggling; app is always light
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          {/* Most pages have card-based layout */}
          <div style={{ padding: "2rem 0", minHeight: "88vh", background: "var(--bg-secondary)" }}>
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/group/:groupId/*" element={<GroupPage />} />
              <Route path="/trip/:tripId/*" element={<TripPage />} />
              <Route path="/auth/*" element={<AuthPage />} />
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
            </Routes>
          </div>
          <NotificationPopup />
          <ExpenseModal />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
