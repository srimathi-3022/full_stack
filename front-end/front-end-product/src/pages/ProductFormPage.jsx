import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addOrUpdateProduct } from "../services/productService";

const emptyForm = {
  name: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
  rating: "",
};

export default function ProductFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setNotice("");

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      brand: form.brand.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
    };

    try {
      const result = await addOrUpdateProduct(payload);
      setNotice(result.message || "Inventory saved");
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="inventory-page">
      <div className="form-hero">
        <div>
          <span className="catalog-kicker">Stock Operation</span>
          <h1>Add or Update Product</h1>
          <p>
            Use any category your inventory needs. When product name and brand
            match an existing item, the API adds this stock quantity to it.
          </p>
        </div>
        <Link className="secondary-action secondary-action-dark" to="/products">
          Dashboard
        </Link>
      </div>

      <form className="dashboard-panel stock-form stock-form-page" onSubmit={handleSubmit}>
        <div className="panel-header">
          <div>
            <span className="panel-kicker">Inventory Record</span>
            <h2>Product Details</h2>
          </div>
        </div>

        <div className="form-grid">
          <label>
            Product Name
            <input
              required
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Product name"
            />
          </label>

          <label>
            Brand
            <input
              required
              value={form.brand}
              onChange={(event) => updateForm("brand", event.target.value)}
              placeholder="Brand name"
            />
          </label>

          <label>
            Category
            <input
              required
              value={form.category}
              onChange={(event) => updateForm("category", event.target.value)}
              placeholder="Electronics, grocery, books..."
            />
          </label>

          <label>
            Price
            <input
              required
              min="0"
              type="number"
              value={form.price}
              onChange={(event) => updateForm("price", event.target.value)}
              placeholder="0"
            />
          </label>

          <label>
            Stock Quantity
            <input
              required
              min="0"
              type="number"
              value={form.stock}
              onChange={(event) => updateForm("stock", event.target.value)}
              placeholder="0"
            />
          </label>

          <label>
            Rating
            <input
              required
              max="5"
              min="0"
              type="number"
              value={form.rating}
              onChange={(event) => updateForm("rating", event.target.value)}
              placeholder="0-5"
            />
          </label>
        </div>

        {notice && <p className="form-notice">{notice}</p>}
        {error && <p className="form-error">{error}</p>}

        <div className="form-footer">
          <button className="primary-action" disabled={isSaving} type="submit">
            {isSaving ? "Saving..." : "Save Inventory"}
          </button>
          <button
            className="ghost-action"
            type="button"
            onClick={() => navigate("/products")}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </section>
  );
}
