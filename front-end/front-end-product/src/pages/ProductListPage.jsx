import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  formatPrice,
} from "../services/productService";
import ProductCard from "../components/ProductCard";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
      setCategories(Array.from(new Set(data.map((p) => p.category))).sort());
      setActiveCategory(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategory = async (cat) => {
    setIsLoading(true);
    setError(null);
    setActiveCategory(cat);
    try {
      const data = cat ? await fetchProductsByCategory(cat) : await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>;
  if (error) return (
    <div style={{ color: "red", padding: "1rem" }}>
      <p>Error: {error}</p>
      <button onClick={loadAll}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h1>ShopView</h1>

      {/* Category filter buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => handleCategory(null)}
          style={{ fontWeight: activeCategory === null ? "bold" : "normal", marginRight: "8px" }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            style={{ fontWeight: activeCategory === cat ? "bold" : "normal", marginRight: "8px" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}