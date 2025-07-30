import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { orange } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DirectionsWalkRoundedIcon from "@mui/icons-material/DirectionsWalkRounded";

/**
 * PUBLIC_INTERFACE
 * Main header navigation bar: logo, links to Dashboard, Groups, Trips, user menu.
 */
function Navbar() {
  const loc = useLocation();
  const { user, logout } = useAppContext();

  const navLinks = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <DashboardRoundedIcon sx={{ mr: 0.5 }} fontSize="small" />,
      active: loc.pathname.startsWith("/dashboard"),
    },
    {
      label: "Groups",
      path: "/group/0",
      icon: <GroupsRoundedIcon sx={{ mr: 0.5 }} fontSize="small" />,
      active: loc.pathname.startsWith("/group"),
    },
    {
      label: "Trips",
      path: "/trip/0",
      icon: <DirectionsWalkRoundedIcon sx={{ mr: 0.5 }} fontSize="small" />,
      active: loc.pathname.startsWith("/trip"),
    },
  ];

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={3}
      sx={{
        zIndex: 10,
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 68 } }}>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Avatar
            sx={{
              bgcolor: orange[600],
              width: 38,
              height: 38,
              mr: 2,
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: "0.02em",
            }}
            aria-label="SplitSmart icon"
          >
            S$
          </Avatar>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "0.5px",
              fontWeight: 700,
              pr: 3,
              fontFamily: "inherit",
            }}
          >
            SplitSmart
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.path}
                startIcon={link.icon}
                color={link.active ? "warning" : "inherit"}
                sx={{
                  fontWeight: 600,
                  borderBottom: link.active ? "3px solid #FF9500" : "none",
                  borderRadius: 0,
                  background: "none",
                  color: "inherit",
                  minWidth: 90,
                  px: 1.3,
                  ":hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Box>
        <Box>
          {user ? (
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography variant="subtitle2" sx={{ color: "info.light" }}>
                {user.email}
              </Typography>
              <Button
                onClick={logout}
                startIcon={<ExitToAppIcon />}
                sx={{
                  bgcolor: "warning.main",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 2,
                  ml: 0.5,
                  boxShadow: 1,
                  ":hover": { bgcolor: "warning.dark" },
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/auth"
              startIcon={<LoginRoundedIcon />}
              color="secondary"
              variant="contained"
              sx={{ fontWeight: 600, borderRadius: 3, px: 2 }}
            >
              Login&nbsp;/&nbsp;Sign Up
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
