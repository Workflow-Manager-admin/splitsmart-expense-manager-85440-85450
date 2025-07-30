import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Tooltip,
  Slide,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

/**
 * PUBLIC_INTERFACE
 * Modal for entering new expenses + uploading receipts (stub UI only, wire with state/backend).
 */
export default function ExpenseModal() {
  // Would come from context: isModalOpen, setIsModalOpen, etc.
  const [open, setOpen] = useState(false); // should be managed from context in production
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const { pushNotification } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual create expense logic
    pushNotification({ message: `Added expense: ${description}` });
    setOpen(false);
    setDescription("");
    setAmount("");
    setFile(null);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.27 }}
            style={{ position: "fixed", right: 36, bottom: 36, zIndex: 1201 }}
          >
            <Tooltip title="Add Expense" placement="left">
              <IconButton
                color="primary"
                aria-label="Add Expense"
                size="large"
                sx={{
                  background: "linear-gradient(135deg,#007AFF 75%,#FF9500 130%)",
                  color: "#fff",
                  borderRadius: "50%",
                  boxShadow: 6,
                  height: 62,
                  width: 62,
                  fontSize: 38,
                  "&:hover": {
                    background: "linear-gradient(135deg,#005ce0 70%,#e87a41 130%)",
                  },
                }}
                onClick={() => setOpen(true)}
              >
                <AddIcon sx={{ fontSize: 38 }} />
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          component: motion.div,
          initial: { opacity: 0, y: 40, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 24, scale: 0.98 },
          transition: { duration: 0.25 },
          sx: { borderRadius: 4, p: 0 },
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        keepMounted
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ color: "primary.main", pb: 0.5, fontWeight: 700, fontSize: 22 }}>
            Add Expense
          </DialogTitle>
          <DialogContent sx={{ pt: 1.2, pb: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              fullWidth
              autoFocus
              variant="outlined"
              margin="dense"
            />
            <TextField
              label="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              type="number"
              inputProps={{ min: 0.01, step: 0.01 }}
              fullWidth
              variant="outlined"
              margin="dense"
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                component="label"
                startIcon={<AttachFileOutlinedIcon />}
                variant="outlined"
                color={file ? "success" : "primary"}
                sx={{ borderRadius: 2, minWidth: 0, fontWeight: 500 }}
              >
                {file ? file.name : "Attach Receipt"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={e => setFile(e.target.files[0])}
                />
              </Button>
              {file && (
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  onClick={() => setFile(null)}
                  sx={{ fontSize: 13 }}
                >
                  Remove
                </Button>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="text" color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
