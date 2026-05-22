import React from "react";

const CATEGORIES = [
  "Electronics", "Clothing", "Food",
  "Sports", "Books", "Home", "Beauty", "Toys",
];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap",
      gap: 8, marginBottom: 32,
    }}>
      {/* "All" button */}
      <FilterBtn
        label="All"
        active={active === ""}
        onClick={() => onChange("")}
      />
      {/* One button per category — Requirement 7 */}
      {CATEGORIES.map(cat => (
        <FilterBtn
          key={cat}
          label={cat}
          active={active === cat}
          onClick={() => onChange(cat)}
        />
      ))}
    </div>
  );
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        background: active ? "var(--ink)" : "var(--surface)",
        color: active ? "var(--accent2)" : "var(--ink2)",
        border: active ? "1.5px solid var(--ink)" : "1.5px solid var(--border)",
        borderRadius: 30,
        fontFamily: "var(--font-mono)", fontSize: 11,
        fontWeight: 500, letterSpacing: 1,
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all .15s",
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--ink)";
          e.currentTarget.style.color = "var(--ink)";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--ink2)";
        }
      }}
    >
      {label}
    </button>
  );
}
