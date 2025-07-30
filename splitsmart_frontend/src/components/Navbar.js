import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { COLORS } from "../constants/theme";

/**
 * PUBLIC_INTERFACE
 * Main header navigation bar: logo, links to Dashboard, Groups, Trips, user menu.
 */
const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 2rem",
  height: "64px",
  background: COLORS.primary,
  color: "#fff",
  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)"
};

const logoStyle = {
  fontSize: "1.5rem",
  fontWeight: 700,
  textDecoration: "none",
  color: "#fff",
  letterSpacing: "1px"
};

const navLinksStyle = {
  display: "flex",
  gap: "2rem"
};

const navLink = active => ({
  color: "#fff",
  textDecoration: "none",
  borderBottom: active ? `3px solid ${COLORS.accent}` : "none",
  fontWeight: 500,
  padding: "0.25rem 0"
});

const userMenuStyle = {
  background: COLORS.secondary,
  borderRadius: "16px",
  padding: "0.5rem 1rem",
  marginLeft: "2rem",
  color: "#fff",
  fontWeight: 500,
  textDecoration: "none"
};

function Navbar() {
  const loc = useLocation();
  const { user, logout } = useAppContext();

  return (
    <header style={navStyle}>
      <Link to="/dashboard" style={logoStyle}>
        SplitSmart
      </Link>
      <nav style={navLinksStyle}>
        <Link to="/dashboard" style={navLink(loc.pathname.startsWith("/dashboard"))}>
          Dashboard
        </Link>
        <Link to="/group/0" style={navLink(loc.pathname.startsWith("/group"))}>
          Groups
        </Link>
        <Link to="/trip/0" style={navLink(loc.pathname.startsWith("/trip"))}>
          Trips
        </Link>
      </nav>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button
              style={{
                ...userMenuStyle,
                background: COLORS.accent,
                marginLeft: "1rem"
              }}
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" style={userMenuStyle}>
            Login&nbsp;/&nbsp;Sign Up
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
