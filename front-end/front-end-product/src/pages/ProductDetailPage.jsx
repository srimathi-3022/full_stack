import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById, formatPrice } from "../services/productService";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) loadProduct(id);
  }, [id]);

  const loadProduct = async (productId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="inventory-page">
        <div className="detail-page-shell skeleton-panel">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-copy" />
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <div className="catalog-state catalog-state-error">
        <p>Error: {error || "Product not found"}</p>
        <Link className="ghost-action" to="/products">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <section className="inventory-page">
      <div className="detail-page-shell">
        <div className="detail-page-header">
          <Link className="ghost-action" to="/products">
            Back to Dashboard
          </Link>
          <span className="detail-status">
            {product.stock === 0 ? "Out of Stock" : "In Stock"}
          </span>
        </div>

        <div className="detail-record">
          <div className="detail-record-main">
            <span className="panel-kicker">Product #{product.id}</span>
            <h1>{product.name}</h1>
            <p>{product.brand}</p>
          </div>

          <div className="detail-square-card">
            <div className="detail-top">
              <span>Inventory</span>
              <strong>{product.rating} / 5</strong>
            </div>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <div className="detail-grid">
              <div>
                <span>Brand</span>
                <strong>{product.brand}</strong>
              </div>
              <div>
                <span>Price</span>
                <strong>{formatPrice(product.price)}</strong>
              </div>
              <div>
                <span>Stock</span>
                <strong>{product.stock} units</strong>
              </div>
              <div>
                <span>Product ID</span>
                <strong>#{product.id}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
