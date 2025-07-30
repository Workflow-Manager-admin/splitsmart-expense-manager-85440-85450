/**
 * API service hooks for group, trip, expense, receipt, and notification management.
 * Uses Supabase client as backend.
 */

import supabase from "./supabaseClient";

// PUBLIC_INTERFACE
export const api = {
  // AUTH
  async loginWithEmail(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
  },
  async signUpWithEmail(email, password) {
    return supabase.auth.signUp({ email, password });
  },
  async logout() {
    return supabase.auth.signOut();
  },

  // GROUPS
  async getGroups(user_id) {
    return supabase
      .from("groups")
      .select("*")
      .eq("owner_id", user_id);
  },
  async createGroup(group) {
    return supabase
      .from("groups")
      .insert([group]);
  },

  // TRIPS
  async getTrips(group_id) {
    return supabase
      .from("trips")
      .select("*")
      .eq("group_id", group_id);
  },
  async createTrip(trip) {
    return supabase
      .from("trips")
      .insert([trip]);
  },

  // EXPENSES
  async getExpenses(context_id, contextType = "group") {
    const key = contextType === "group" ? "group_id" : "trip_id";
    return supabase
      .from("expenses")
      .select("*")
      .eq(key, context_id);
  },
  async createExpense(expense) {
    return supabase
      .from("expenses")
      .insert([expense]);
  },

  // RECEIPT (upload image)
  async uploadReceipt(expenseId, file) {
    // Use Supabase Storage (configure in backend)
    const { data, error } = await supabase
      .storage
      .from("receipts")
      .upload(expenseId + "/" + file.name, file);
    return { data, error };
  },

  // NOTIFICATIONS
  async getNotifications(user_id) {
    return supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });
  }
};
