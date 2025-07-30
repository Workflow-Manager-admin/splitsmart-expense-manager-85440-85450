import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { COLORS } from "../constants/theme";

/**
 * PUBLIC_INTERFACE
 * Trip page: tabbed interface for overview, trip expenses, and members.
 */
const tripTabs = [
  { name: "Overview" },
  { name: "Expenses" },
  { name: "Members" }
];

export default function TripPage() {
  const { tripId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2 style={{ margin: "1.5rem 0", color: COLORS.secondary, fontWeight: 700 }}>
        Trip #{tripId}
      </h2>
      <div style={{ display: "flex", gap: "2rem" }}>
        {tripTabs.map((tab, idx) => (
          <button
            key={tab.name}
            style={{
              border: "none",
              background: tabIndex === idx ? COLORS.secondary : COLORS.cardBg,
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
        {tabIndex === 0 && <div>Overview of the trip.</div>}
        {tabIndex === 1 && <div>Trip-specific expenses.</div>}
        {tabIndex === 2 && <div>Trip members list.</div>}
      </Card>
    </div>
  );
}
