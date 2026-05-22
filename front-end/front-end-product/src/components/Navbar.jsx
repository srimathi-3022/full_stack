import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header
      style={{
        background: "var(--ink)",
        borderBottom: "3px solid var(--accent)",
        position: "sticky",
        top: 0,
        zIndex: 300,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          minHeight: 68,
        }}
      >
        <Link
          to="/products"
          style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              color: "#fff",
              letterSpacing: 1,
            }}
          >
            STOCK<span style={{ color: "var(--accent2)" }}>YARD</span>
          </span>
        </Link>

        <nav className="nav-actions" aria-label="Main navigation">
          <Link
            className={`nav-link ${pathname === "/products" ? "is-active" : ""}`}
            to="/products"
          >
            Dashboard
          </Link>
          <Link
            className={`nav-link ${pathname === "/products/add" ? "is-active" : ""}`}
            to="/products/add"
          >
            Add Stock
          </Link>
        </nav>
      </div>
    </header>
  );
}
