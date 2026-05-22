import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  formatPrice,
} from "../services/productService";

const sortOptions = [
  { value: "id", label: "ID" },
  { value: "stock", label: "Stock" },
  { value: "rating", label: "Rating" },
  { value: "price", label: "Price" },
];

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [inventorySearch, setInventorySearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const refreshProducts = async (category = activeCategory) => {
    const allProducts = await fetchAllProducts();
    const data = category
      ? await fetchProductsByCategory(category)
      : allProducts;

    setProducts(data);
    setCategories(Array.from(new Set(allProducts.map((p) => p.category))).sort());
    return data;
  };

  const loadAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setActiveCategory(null);
      await refreshProducts(null);
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
      await refreshProducts(cat);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const query = inventorySearch.trim().toLowerCase();
  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (!query) return true;
        return [
          String(product.id),
          product.name,
          product.brand,
          product.category,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (sortBy === "stock") return b.stock - a.stock;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price") return b.price - a.price;
        return a.id - b.id;
      });
  }, [products, query, sortBy]);

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockCount = products.filter(
    (product) => product.stock > 0 && product.stock <= 5
  ).length;
  const outOfStockCount = products.filter((product) => product.stock === 0).length;

  if (isLoading) {
    return (
      <section className="inventory-page">
        <div className="catalog-hero skeleton-panel">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-copy" />
        </div>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="catalog-state catalog-state-error">
        <p>Error: {error}</p>
        <button onClick={loadAll}>Retry</button>
      </div>
    );
  }

  return (
    <section className="inventory-page">
      <div className="catalog-hero">
        <div>
          <span className="catalog-kicker">Inventory Management</span>
          <h1>Stockyard Dashboard</h1>
          <p>
            Search products by ID or category, select an item for its record,
            and open full product details on a dedicated page.
          </p>
        </div>

        <div className="catalog-stats" aria-label="Inventory summary">
          <div>
            <strong>{products.length}</strong>
            <span>Items</span>
          </div>
          <div>
            <strong>{totalStock}</strong>
            <span>Units</span>
          </div>
          <div>
            <strong>{lowStockCount + outOfStockCount}</strong>
            <span>Alerts</span>
          </div>
        </div>
      </div>

      <div className="inventory-grid">
        <div className="inventory-main">
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">Product List</span>
                <h2>All Inventory Items</h2>
              </div>
              <div className="panel-actions">
                <Link className="secondary-action" to="/products/add">
                  Add Stock
                </Link>
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
            </div>

            <div className="inventory-search-row">
              <input
                className="inventory-search"
                type="search"
                value={inventorySearch}
                onChange={(event) => setInventorySearch(event.target.value)}
                placeholder="Search by ID, category, product, or brand"
              />
              <span>{visibleProducts.length} results</span>
            </div>

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

            <div className="inventory-table" role="table" aria-label="Inventory products">
              <div className="inventory-table-row inventory-table-head" role="row">
                <span>ID</span>
                <span>Product</span>
                <span>Category</span>
                <span>Stock</span>
                <span>Price</span>
              </div>

              {visibleProducts.map((product) => (
                <Link
                  className="inventory-table-row"
                  key={product.id}
                  to={`/products/${product.id}`}
                  role="row"
                >
                  <span>#{product.id}</span>
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.brand}</small>
                  </span>
                  <span>{product.category}</span>
                  <span className={product.stock <= 5 ? "stock-alert" : ""}>
                    {product.stock}
                  </span>
                  <span>{formatPrice(product.price)}</span>
                </Link>
              ))}
            </div>

            {visibleProducts.length === 0 && (
              <div className="inline-empty">No inventory items match your search.</div>
            )}
          </div>
        </div>

        <aside className="inventory-side">
          <div className="detail-box">
            <span className="panel-kicker">Product Details</span>
            <p className="detail-empty">
              Click any product row to open the full inventory record.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
