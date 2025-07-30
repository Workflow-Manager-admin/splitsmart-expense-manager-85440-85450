import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { api } from "../services/api";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";

/**
 * PUBLIC_INTERFACE
 * Handles user login and signup.
 */
export default function AuthPage() {
  const { setUser, pushNotification } = useAppContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let resp;
    if (isSignup) {
      resp = await api.signUpWithEmail(form.email, form.password);
    } else {
      resp = await api.loginWithEmail(form.email, form.password);
    }
    if (resp.error) {
      pushNotification({ message: resp.error.message });
    } else {
      setUser(resp.data.user);
      pushNotification({ message: "Welcome!" });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <Card>
        <h3 style={{ color: COLORS.primary }}>{isSignup ? "Sign Up" : "Log In"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            required type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(form => ({ ...form, email: e.target.value }))}
            style={{ width: "100%", margin: "0.7rem 0", padding: "0.55rem" }}
          />
          <input
            required type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(form => ({ ...form, password: e.target.value }))}
            style={{ width: "100%", margin: "0.7rem 0", padding: "0.55rem" }}
          />
          <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                fontWeight: 500,
                color: COLORS.secondary,
                marginRight: 7
              }}
              onClick={() => setIsSignup(s => !s)}>
              {isSignup ? "Already have an account?" : "Create an account"}
            </button>
            <button
              type="submit"
              style={{
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                padding: "0.6rem 1.7rem",
                borderRadius: 7,
                fontWeight: 600
              }}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
