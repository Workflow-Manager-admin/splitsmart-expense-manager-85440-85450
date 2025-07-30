import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../services/supabaseClient";

// PUBLIC_INTERFACE
/**
 * Holds global SplitSmart application data and methods: user, groups, expenses, notifications.
 * Updates state on login, logout, group/trip add/remove, new expense, etc.
 */
const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  // User auth
  const [user, setUser] = useState(null);

  // Core data
  const [groups, setGroups] = useState([]);
  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: fetch user, groups, trips etc on mount
  useEffect(() => {
    async function fetchInitial() {
      setLoading(true);
      // Replace with real implementation as necessary
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      // TODO: fetch groups, trips, expenses for the user
      setLoading(false);
    }
    fetchInitial();
  }, []);

  // Auth functions
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Group/Trip CRUD
  const addGroup = (group) => setGroups(gs => [...gs, group]);
  const addTrip = (trip) => setTrips(ts => [...ts, trip]);
  // ...more group/trip/expense operations...

  // Push notification
  const pushNotification = (notif) => setNotifications(n => [...n, notif]);

  const value = {
    user, setUser, logout,
    groups, setGroups, addGroup,
    trips, setTrips, addTrip,
    expenses, setExpenses,
    notifications, pushNotification,
    loading
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
