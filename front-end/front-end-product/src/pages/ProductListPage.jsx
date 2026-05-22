import { useState, useEffect } from "react";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../services/productService";
import ProductCard from "../components/ProductCard";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "stock", label: "Most Stock" },
];

export default function ProductListPage({ search = "" }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
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
      const data = cat
        ? await fetchProductsByCategory(cat)
        : await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const query = search.trim().toLowerCase();
  const visibleProducts = products
    .filter((product) => {
      if (!query) return true;
      return [product.name, product.brand, product.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "stock") return b.stock - a.stock;
      return a.id - b.id;
    });

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const outOfStockCount = products.filter((product) => product.stock === 0).length;

  if (isLoading) {
    return (
      <section className="catalog-page">
        <div className="catalog-hero skeleton-panel">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-copy" />
        </div>
        <div className="product-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="product-card-skeleton" key={index}>
              <div className="skeleton-line skeleton-chip" />
              <div className="skeleton-line skeleton-name" />
              <div className="skeleton-line skeleton-brand" />
              <div className="skeleton-line skeleton-price" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) return (
    <div className="catalog-state catalog-state-error">
      <p>Error: {error}</p>
      <button onClick={loadAll}>Retry</button>
    </div>
  );

  return (
    <section className="catalog-page">
      <div className="catalog-hero">
        <div>
          <span className="catalog-kicker">Live Inventory</span>
          <h1>Stockyard Catalog</h1>
          <p>
            Browse products by category, spot stock levels quickly, and open any
            item for the full product record.
          </p>
        </div>

        <div className="catalog-stats" aria-label="Catalog summary">
          <div>
            <strong>{products.length}</strong>
            <span>Products</span>
          </div>
          <div>
            <strong>{totalStock}</strong>
            <span>Units</span>
          </div>
          <div>
            <strong>{outOfStockCount}</strong>
            <span>Sold Out</span>
          </div>
        </div>
      </div>

      <div className="catalog-toolbar">
        <div className="category-strip" aria-label="Product categories">
          <button
            className={`category-chip ${activeCategory === null ? "is-active" : ""}`}
            onClick={() => handleCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              className={`category-chip ${activeCategory === cat ? "is-active" : ""}`}
              key={cat}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <label className="sort-control">
          <span>Sort</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="catalog-meta">
        <span>
          Showing {visibleProducts.length} of {products.length}
          {activeCategory ? ` in ${activeCategory}` : ""}
        </span>
        {query && <span>Search: "{search.trim()}"</span>}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              searchQuery={search}
            />
          ))}
        </div>
      ) : (
        <div className="catalog-state">
          <p>No products match your search.</p>
          <button onClick={() => handleCategory(null)}>View All Products</button>
        </div>
      )}
    </section>
  );
}
