import React from "react";
import { Link } from "react-router-dom";

/** Format price as Rs. 2,999 */
function formatPrice(price) {
  return "Rs. " + Number(price).toLocaleString("en-IN");
}

/** Star rating display */
function Stars({ rating }) {
  const n = Math.min(Math.max(Math.round(rating), 0), 5);
  return (
    <span style={{ fontSize: 13, letterSpacing: 1 }}>
      <span style={{ color: "var(--accent2)" }}>{"★".repeat(n)}</span>
      <span style={{ color: "var(--border)" }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}

/** Highlight matching query substring */
function Highlight({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{
        background: "rgba(232,184,75,0.35)",
        color: "inherit",
        borderRadius: 2,
        padding: "0 1px",
      }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function ProductCard({ product, searchQuery = "" }) {
  const outOfStock = product.stock === 0;

  return (
    <Link
      to={`/products/${product.id}`}
      style={{ display: "block", textDecoration: "none" }}
    >
      <article
        style={{
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--r-lg)",
          padding: 24,
          cursor: "pointer",
          transition: "transform .2s, box-shadow .2s, border-color .2s",
          animation: "fadeUp .35s ease both",
          position: "relative",
          height: "100%",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "var(--shadow-hover)";
          e.currentTarget.style.borderColor = "var(--accent)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "var(--shadow)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        {/* Out of Stock badge */}
        {outOfStock && (
          <span style={{
            position: "absolute", top: 16, right: 16,
            background: "var(--accent)", color: "#fff",
            fontFamily: "var(--font-mono)", fontSize: 9,
            fontWeight: 500, letterSpacing: 1.5,
            textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 20,
          }}>
            Out of Stock
          </span>
        )}

        {/* Category label */}
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 9,
          letterSpacing: 2, textTransform: "uppercase",
          color: "var(--accent)", marginBottom: 10, fontWeight: 500,
        }}>
          <Highlight text={product.category} query={searchQuery} />
        </div>

        {/* Product name */}
        <div style={{
          fontFamily: "var(--font-display)", fontSize: 20,
          color: "var(--ink)", lineHeight: 1.2,
          marginBottom: 4, letterSpacing: 0.5,
        }}>
          <Highlight text={product.name} query={searchQuery} />
        </div>

        {/* Brand */}
        <div style={{
          fontFamily: "var(--font-body)", fontSize: 13,
          color: "var(--muted)", marginBottom: 18,
        }}>
          <Highlight text={product.brand} query={searchQuery} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 16 }} />

        {/* Price + Rating row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 22,
            color: "var(--ink)", letterSpacing: 0.5,
          }}>
            {formatPrice(product.price)}
          </span>
          <Stars rating={product.rating} />
        </div>
      </article>
    </Link>
  );
}
