import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";

/**
 * PUBLIC_INTERFACE
 * Group page: tabbed interface for overview, expenses, and members.
 */
const groupTabs = [
  { name: "Overview" },
  { name: "Expenses" },
  { name: "Members" },
  { name: "Trips" }
];

export default function GroupPage() {
  const { groupId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2 style={{ margin: "1.5rem 0", color: COLORS.primary, fontWeight: 700 }}>
        Group #{groupId}
      </h2>
      <div style={{ display: "flex", gap: "2rem" }}>
        {groupTabs.map((tab, idx) => (
          <button
            key={tab.name}
            style={{
              border: "none",
              background: tabIndex === idx ? COLORS.primary : COLORS.cardBg,
              color: tabIndex === idx ? "#fff" : COLORS.textPrimary,
              borderRadius: 8,
              padding: "0.7rem 2.5rem",
              fontWeight: 600,
              fontSize: 16,
              boxShadow: tabIndex === idx ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
              cursor: "pointer"
            }}
            onClick={() => setTabIndex(idx)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <Card style={{ marginTop: "2rem" }}>
        {tabIndex === 0 && <div>Overview goes here.</div>}
        {tabIndex === 1 && <div>Expenses tab for this group.</div>}
        {tabIndex === 2 && <div>Members management.</div>}
        {tabIndex === 3 && <div>Trips within this group.</div>}
      </Card>
    </div>
  );
}
