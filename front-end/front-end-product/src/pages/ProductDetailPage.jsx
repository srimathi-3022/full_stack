import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { fetchProductById } from "../services/productService";

function formatPrice(price) {
  return "Rs. " + Number(price).toLocaleString("en-IN");
}

function RatingBar({ rating }) {
  const score = Math.min(Math.max(Number(rating) || 0, 0), 5);
  const width = `${(score / 5) * 100}%`;

  return (
    <div className="rating-wrap" aria-label={`${score} out of 5 rating`}>
      <div className="rating-track">
        <span className="rating-fill" style={{ width }} />
      </div>
      <span>{score.toFixed(1)}/5</span>
    </div>
  );
}

function StatBox({ label, value, type = "" }) {
  return (
    <div className={`detail-stat ${type}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
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

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  const outOfStock = product.stock <= 0;

  return (
    <section className="product-detail-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </nav>

      <article className="product-detail-card">
        <div className="detail-hero">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="brand-line">
              by <strong>{product.brand}</strong>
            </p>
          </div>

          <div className="price-box">
            <span>Price</span>
            <strong>{formatPrice(product.price)}</strong>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-main">
            <span className={`stock-badge ${outOfStock ? "danger" : "success"}`}>
              {outOfStock ? "Out of Stock" : "Available"}
            </span>

            <h2>Product Overview</h2>
            <p>
              This product is listed under {product.category} from {product.brand}.
              Check the stock count, rating, and product information before
              updating the inventory.
            </p>
          </div>

          <div className="detail-stats">
            <StatBox label="Stock" value={outOfStock ? "0 units" : `${product.stock} units`} type={outOfStock ? "danger" : "success"} />
            <StatBox label="Product ID" value={`#${product.id}`} />
            <StatBox label="Rating" value={<RatingBar rating={product.rating} />} />
          </div>
        </div>

        <div className="detail-table">
          <div>
            <span>Brand</span>
            <strong>{product.brand}</strong>
          </div>
          <div>
            <span>Category</span>
            <strong>{product.category}</strong>
          </div>
          <div>
            <span>Stock Status</span>
            <strong>{outOfStock ? "Needs restock" : "Ready to sell"}</strong>
          </div>
          <div>
            <span>Inventory Count</span>
            <strong>{product.stock}</strong>
          </div>
        </div>
      </article>

      <Link className="back-link" to="/products">
        Back to all products
      </Link>
    </section>
  );
}
