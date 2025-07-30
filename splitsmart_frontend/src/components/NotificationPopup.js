import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PUBLIC_INTERFACE
 * Shows floating notification popups; auto-dismiss and smooth entry/exit.
 */
export default function NotificationPopup() {
  const { notifications } = useAppContext();
  const [open, setOpen] = useState(false);
  const [snackIndex, setSnackIndex] = useState(-1);

  // Show each notification one after the other
  useEffect(() => {
    if (notifications.length > 0) {
      setSnackIndex(notifications.length - 1);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notifications.length]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!notifications.length || snackIndex < 0) return null;

  const currentNotif = notifications[snackIndex];
  return (
    <AnimatePresence>
      <Snackbar
        key={snackIndex}
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2600}
        onClose={handleClose}
        sx={{ zIndex: 1500 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.32 }}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            variant="filled"
            sx={{
              minWidth: 220,
              maxWidth: 350,
              fontWeight: 500,
              boxShadow: 2,
              borderRadius: 2,
              bgcolor: "#fff",
              color: "primary.main",
            }}
          >
            {currentNotif.message}
          </Alert>
        </motion.div>
      </Snackbar>
    </AnimatePresence>
  );
}
