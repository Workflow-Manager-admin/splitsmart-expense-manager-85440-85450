import React from "react";
import { useAppContext } from "../context/AppContext";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";

/**
 * PUBLIC_INTERFACE
 * Dashboard page: shows user's net balance, action shortcuts, upcoming reminders, recent activity.
 */
export default function DashboardPage() {
  const { user, groups, trips, expenses } = useAppContext();

  // Stubs - replace with real fetching/calculations
  const totalOwed = 40.50; // Sum of debts
  const totalReceivable = 57.75; // Money others owe to user

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2 style={{ margin: "1.5rem 0", color: COLORS.primary, fontWeight: 700 }}>
        Hi {user ? user.email : "there"}!
      </h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <Card style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 500 }}>You Owe</div>
          <div style={{ color: COLORS.accent, fontSize: 32, fontWeight: 700 }}>
            ${totalOwed.toFixed(2)}
          </div>
        </Card>
        <Card style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontWeight: 500 }}>You Are Owed</div>
          <div style={{ color: COLORS.secondary, fontSize: 32, fontWeight: 700 }}>
            ${totalReceivable.toFixed(2)}
          </div>
        </Card>
      </div>
      <Card>
        <div style={{ fontWeight: 600, marginBottom: "1rem" }}>Recent Activity</div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {expenses.slice(0, 5).map((exp) => (
            <li key={exp.id} style={{ marginBottom: 8, textAlign: "left" }}>
              <span>{exp.description}</span>
              <span style={{ color: COLORS.accent, marginLeft: 16 }}>
                - ${exp.amount}
              </span>
            </li>
          )) || <li>No recent expenses yet</li>}
        </ul>
      </Card>
    </div>
  );
}
