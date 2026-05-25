import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { fetchProductById } from "../services/productService"; // Requirement 8

/** Format price as Rs. 2,999 — Extra Requirement */
function formatPrice(price) {
  return "Rs. " + Number(price).toLocaleString("en-IN");
}

function Stars({ rating }) {
  const n = Math.min(Math.max(Math.round(rating), 0), 5);
  return (
    <span style={{ fontSize: 20, letterSpacing: 2 }}>
      <span style={{ color: "var(--accent2)" }}>{"★".repeat(n)}</span>
      <span style={{ color: "var(--border)" }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}

function StatBox({ label, value, accent }) {
  return (
    <div style={{
      background: "var(--bg2)",
      border: "1.5px solid var(--border)",
      borderRadius: "var(--r)",
      padding: "18px 22px",
      textAlign: "center",
    }}>
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 9,
        letterSpacing: 2, color: "var(--muted)",
        textTransform: "uppercase", marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "var(--font-display)", fontSize: 22,
        color: accent || "var(--ink)", letterSpacing: 0.5,
      }}>
        {value}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  // Requirement 6 — read id from URL
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false); // Requirement 2
  const [error, setError]     = useState(null);  // Requirement 3

  // Requirement 6 — fetch product using id from useParams
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // Requirement 8 — fetch call is inside the service file
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Requirement 2 — spinner while loading
  if (loading) return <Spinner />;

  // Requirement 3 — error message on failure
  if (error) return <ErrorMessage message={error} />;

  if (!product) return null;

  const outOfStock = product.stock === 0;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", animation: "fadeUp .35s ease" }}>

      {/* Breadcrumb */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--muted)", letterSpacing: 1.5,
        marginBottom: 28, textTransform: "uppercase",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Link to="/products" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Products
        </Link>
        <span>›</span>
        <span>{product.category}</span>
        <span>›</span>
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </div>

      {/* Main card */}
      <div style={{
        background: "var(--surface)",
        border: "1.5px solid var(--border)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow)",
      }}>
        {/* Top accent bar */}
        <div style={{ height: 5, background: "var(--accent)" }} />

        <div style={{ padding: "36px 40px" }}>
          {/* Category + OOS badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: 2, textTransform: "uppercase",
              color: "var(--accent)", fontWeight: 500,
            }}>
              {product.category}
            </span>

            {/* Extra Requirement — Out of Stock badge */}
            {outOfStock && (
              <span style={{
                background: "var(--accent)", color: "#fff",
                fontFamily: "var(--font-mono)", fontSize: 9,
                letterSpacing: 1.5, textTransform: "uppercase",
                padding: "3px 10px", borderRadius: 20,
              }}>
                Out of Stock
              </span>
            )}
          </div>

          {/* Product name */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontSize: 40,
            color: "var(--ink)", letterSpacing: 0.5,
            lineHeight: 1.1, marginBottom: 6,
          }}>
            {product.name}
          </h1>

          {/* Brand */}
          <div style={{
            fontFamily: "var(--font-body)", fontSize: 15,
            color: "var(--muted)", marginBottom: 32,
          }}>
            by <strong style={{ color: "var(--ink2)" }}>{product.brand}</strong>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--border)", marginBottom: 32 }} />

          {/* Stats grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 14, marginBottom: 32,
          }}>
            <StatBox
              label="Price"
              value={formatPrice(product.price)}  /* Extra Requirement */
              accent="var(--accent)"
            />
            <StatBox
              label="Stock"
              value={outOfStock ? "—" : product.stock}
              accent={outOfStock ? "var(--accent)" : "var(--success)"}
            />
            <StatBox
              label="Rating"
              value={<Stars rating={product.rating} />}
            />
          </div>

          {/* Full detail row */}
          <div style={{
            background: "var(--bg2)",
            borderRadius: "var(--r)",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
          }}>
            {[
              { label: "Product ID",  value: `#${product.id}` },
              { label: "Brand",       value: product.brand },
              { label: "Category",    value: product.category },
              { label: "Stock",       value: outOfStock ? "Out of Stock" : `${product.stock} units` },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 9,
                  letterSpacing: 2, textTransform: "uppercase",
                  color: "var(--muted)", marginBottom: 4,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: 14,
                  color: "var(--ink)", fontWeight: 500,
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back link */}
      <div style={{ marginTop: 28, textAlign: "center" }}>
        <Link to="/products" style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          color: "var(--muted)", letterSpacing: 2,
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "color .15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          ← Back to all products
        </Link>
      </div>
    </div>
  );
}
