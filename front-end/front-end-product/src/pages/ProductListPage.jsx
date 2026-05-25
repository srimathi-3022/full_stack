import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProducts,
  fetchProductsByCategory,
  formatPrice,
} from "../services/productService";
import CategoryFilter from "../components/CategoryFilter";

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
      <section>
        <h1>Stockyard Dashboard</h1>
        <p>Loading inventory...</p>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadAll}>Retry</button>
      </section>
    );
  }

  return (
    <section>
      <h1>Stockyard Dashboard</h1>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <caption>Inventory Summary</caption>
        <thead>
          <tr>
            <th>Items</th>
            <th>Units</th>
            <th>Alerts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{products.length}</td>
            <td>{totalStock}</td>
            <td>{lowStockCount + outOfStockCount}</td>
          </tr>
        </tbody>
      </table>

      <p>
        <Link to="/products/add">Add Stock</Link>
      </p>

      <hr />

      <section>
        <h2>All Inventory Items</h2>

        <fieldset>
          <legend>Search and Sort</legend>
          <p>
            <label>
              Search{" "}
              <input
                type="search"
                value={inventorySearch}
                onChange={(event) => setInventorySearch(event.target.value)}
                placeholder="Search by ID, category, product, or brand"
              />
            </label>
          </p>

          <p>
            <label>
              Sort{" "}
              <select
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
          </p>
        </fieldset>

        <p>{visibleProducts.length} results</p>

        <CategoryFilter
          active={activeCategory}
          allValue={null}
          categories={categories}
          onChange={handleCategory}
        />

        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
          <caption>Products</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr key={product.id}>
                <td>#{product.id}</td>
                <td>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.stock <= 5 ? `${product.stock} alert` : product.stock}</td>
                <td>{formatPrice(product.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleProducts.length === 0 && (
          <p>No inventory items match your search.</p>
        )}
      </section>
    </section>
  );
}
