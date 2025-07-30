import React from "react";
import Paper from "@mui/material/Paper";

/**
 * PUBLIC_INTERFACE
 * Card: a stylized container for UI sections according to card-based design using Material UI Paper.
 */
export default function Card({ children, style, ...rest }) {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        p: { xs: 2, md: 3 },
        my: 2,
        width: "100%",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
}
