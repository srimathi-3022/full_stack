import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div style={{
      background: "#fff5f5",
      border: "1.5px solid var(--accent)",
      borderRadius: "var(--r-lg)",
      padding: "32px 36px",
      textAlign: "center",
      maxWidth: 480,
      margin: "60px auto",
    }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
      <div style={{
        fontFamily: "var(--font-display)", fontSize: 20,
        color: "var(--accent)", marginBottom: 8, letterSpacing: 1,
      }}>
        SOMETHING WENT WRONG
      </div>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 12,
        color: "var(--ink2)", lineHeight: 1.6,
      }}>
        {message || "Failed to load data. Please try again."}
      </div>
    </div>
  );
}
