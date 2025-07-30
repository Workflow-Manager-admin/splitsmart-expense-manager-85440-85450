import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { api } from "../services/api";
import Card from "../components/Card";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Fade,
  Divider,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * PUBLIC_INTERFACE
 * Handles user login and signup.
 */
export default function AuthPage() {
  const { setUser, pushNotification } = useAppContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp;
    if (isSignup) {
      resp = await api.signUpWithEmail(form.email, form.password);
    } else {
      resp = await api.loginWithEmail(form.email, form.password);
    }
    if (resp.error) {
      setError(resp.error.message || "Authentication error");
      pushNotification({ message: resp.error.message });
    } else {
      setUser(resp.data.user);
      setError("");
      pushNotification({ message: "Welcome!" });
    }
  };

  return (
    <Box maxWidth={380} mx="auto" mt={5}>
      <Card>
        <Box pb={2}>
          <Typography
            variant="h4"
            sx={({ palette }) => ({
              color: isSignup ? palette.secondary.main : palette.primary.main,
              fontWeight: 700,
              mb: 1,
            })}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 15 }}>
            {isSignup ? "Let’s create your SplitSmart account." : "Welcome back! Please log in to continue."}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack spacing={2}>
            <TextField
              required
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="user@email.com"
              value={form.email}
              onChange={e => setForm(form => ({ ...form, email: e.target.value }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              label="Password"
              type={showPass ? "text" : "password"}
              autoComplete={isSignup ? "new-password" : "current-password"}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm(form => ({ ...form, password: e.target.value }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isSignup ? <LockPersonOutlinedIcon /> : <LockOpenIcon />}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(v => !v)}
                      edge="end"
                      size="small"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Fade in={!!error}>
              <Alert severity="error" variant="filled" sx={{ mt: -1 }}>
                {error}
              </Alert>
            </Fade>

            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2} pt={0.5}>
              <Button
                type="button"
                color="secondary"
                variant="text"
                onClick={() => {
                  setIsSignup(s => !s);
                  setError("");
                }}
                sx={{ fontWeight: 500, fontSize: 15, mr: "auto" }}
              >
                {isSignup ? "Already have an account?" : "Create an account"}
              </Button>
              <Button
                variant="contained"
                color={isSignup ? "secondary" : "primary"}
                sx={{ fontWeight: 700, borderRadius: 2, px: 2.5 }}
                type="submit"
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
