import React from "react";

export default function Spinner() {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 80, gap: 16,
    }}>
      <div style={{
        width: 44, height: 44,
        border: "3px solid var(--border)",
        borderTop: "3px solid var(--accent)",
        borderRadius: "50%",
        animation: "spin .7s linear infinite",
      }} />
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--muted)", letterSpacing: 2,
        textTransform: "uppercase",
      }}>
        Loading…
      </span>
    </div>
  );
}
