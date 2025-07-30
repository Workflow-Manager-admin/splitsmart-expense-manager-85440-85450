import React from "react";
import { CARD_SHADOW, COLORS } from "../constants/theme";

/**
 * PUBLIC_INTERFACE
 * Card: a stylized container for UI sections according to card-based design.
 */
export default function Card({ children, style }) {
  return (
    <div
      style={{
        background: COLORS.cardBg,
        boxShadow: CARD_SHADOW,
        borderRadius: "1rem",
        padding: "2rem",
        margin: "0 auto 2rem auto",
        maxWidth: 750,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
