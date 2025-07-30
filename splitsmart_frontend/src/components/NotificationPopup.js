import React from "react";
import { useAppContext } from "../context/AppContext";
import { COLORS, CARD_SHADOW } from "../constants/theme";

/**
 * PUBLIC_INTERFACE
 * Shows floating notification popups; auto-dismiss (production: use timer).
 */
export default function NotificationPopup() {
  const { notifications } = useAppContext();
  if (!notifications.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 32,
        zIndex: 999,
        display: "flex",
        gap: 10,
        flexDirection: "column",
        minWidth: 220,
        maxWidth: 350
      }}
    >
      {notifications.slice(-3).map((notif, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            color: COLORS.primary,
            boxShadow: CARD_SHADOW,
            borderRadius: 10,
            padding: "1rem 1.3rem",
            fontWeight: 500
          }}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
}
