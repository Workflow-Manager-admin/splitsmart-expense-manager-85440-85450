import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CARD_SHADOW, COLORS } from "../constants/theme";

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

  if (!open) {
    // Replace with Add Expense button somewhere
    return (
      <button
        style={{
          position: "fixed",
          right: "2rem",
          bottom: "2rem",
          background: COLORS.primary,
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          height: 60,
          width: 60,
          fontSize: 36,
          boxShadow: CARD_SHADOW,
          cursor: "pointer"
        }}
        onClick={() => setOpen(true)}
        aria-label="Add Expense"
      >+
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 10000,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(40,44,52,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <form
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: CARD_SHADOW,
          padding: "2.5rem",
          width: 350,
          maxWidth: "97vw"
        }}
        onSubmit={handleSubmit}
      >
        <h3 style={{ color: COLORS.primary }}>Add Expense</h3>
        <input
          required
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: "100%", margin: "0.6rem 0", padding: "0.5rem" }}
        />
        <input
          required
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ width: "100%", margin: "0.6rem 0", padding: "0.5rem" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          style={{ width: "100%", margin: "0.6rem 0" }}
        />
        <div style={{ marginTop: "1.2rem", textAlign: "right" }}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: COLORS.secondary,
              marginRight: 12,
              fontWeight: 500
            }}
          >Cancel</button>
          <button
            type="submit"
            style={{
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              padding: "0.5rem 1.3rem",
              borderRadius: 7,
              fontWeight: 600
            }}
          >Add</button>
        </div>
      </form>
    </div>
  );
}
