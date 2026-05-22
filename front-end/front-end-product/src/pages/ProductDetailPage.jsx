import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

  if (isLoading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
  if (error || !product) return (
    <div style={{ color: "red", padding: "1rem" }}>
      <p>Error: {error || "Product not found"}</p>
      <Link to="/products">Back to Products</Link>
    </div>
  );

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <Link to="/products">← Back to Products</Link>

      <h1>{product.name}</h1>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> {formatPrice(product.price)}</p>
      <p>
        <strong>Stock:</strong>{" "}
        {product.stock === 0 ? (
          <span style={{ background: "red", color: "white", padding: "2px 8px", borderRadius: "4px" }}>
            Out of Stock
          </span>
        ) : (
          `${product.stock} in stock`
        )}
      </p>
      <p><strong>Rating:</strong> {product.rating} / 5</p>
    </div>
  );
}