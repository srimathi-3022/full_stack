import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ onSearch, searchValue }) {
  const { pathname } = useLocation();
  const onList = pathname === "/products";
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <header style={{
      background: "var(--ink)",
      borderBottom: "3px solid var(--accent)",
      position: "sticky", top: 0, zIndex: 300,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 24px",
        display: "flex", alignItems: "center",
        gap: 20,
        height: 68,
      }}>
        {/* Logo */}
        <Link to="/products" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: 26, color: "#fff", letterSpacing: 1,
          }}>
            STOCK<span style={{ color: "var(--accent2)" }}>YARD</span>
          </span>
        </Link>

        {/* Search bar — only on list page */}
        {onList && (
          <div style={{ flex: 1, maxWidth: 560, position: "relative" }}>
            {/* Search icon */}
            <svg
              style={{
                position: "absolute", left: 16, top: "50%",
                transform: "translateY(-50%)",
                color: focused ? "var(--accent2)" : "rgba(255,255,255,0.4)",
                transition: "color 0.2s",
                pointerEvents: "none",
                zIndex: 1,
              }}
              width="17" height="17" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={e => onSearch && onSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search products, brands, categories…"
              style={{
                width: "100%",
                height: 42,
                padding: "0 42px 0 46px",
                background: focused
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.08)",
                border: focused
                  ? "1.5px solid var(--accent2)"
                  : "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#fff",
                outline: "none",
                transition: "all 0.2s",
                boxShadow: focused ? "0 0 0 3px rgba(232,184,75,0.15)" : "none",
              }}
            />

            {/* Clear button */}
            {searchValue && (
              <button
                onClick={() => { onSearch && onSearch(""); inputRef.current?.focus(); }}
                style={{
                  position: "absolute", right: 10, top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)",
                  border: "none", borderRadius: "50%",
                  width: 22, height: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff", fontSize: 12,
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          {!onList && (
            <Link to="/products" style={{
              display: "flex", alignItems: "center", gap: 6,
              color: "var(--accent2)",
              fontFamily: "var(--font-mono)", fontSize: 12,
              fontWeight: 500, letterSpacing: 1,
              transition: "opacity .15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = ".7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              ← ALL PRODUCTS
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
