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
    <section>
      <h1>Add or Update Product</h1>
      <p>
        When product name and brand match an existing item, the API adds this
        stock quantity to it.
      </p>
      <p>
        <Link to="/products">Dashboard</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Product Details</legend>

          <table cellPadding="8" cellSpacing="0">
            <tbody>
              <tr>
                <th align="left">
                  <label htmlFor="name">Product Name</label>
                </th>
                <td>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    placeholder="Product name"
                  />
                </td>
              </tr>
              <tr>
                <th align="left">
                  <label htmlFor="brand">Brand</label>
                </th>
                <td>
                  <input
                    id="brand"
                    required
                    value={form.brand}
                    onChange={(event) => updateForm("brand", event.target.value)}
                    placeholder="Brand name"
                  />
                </td>
              </tr>
              <tr>
                <th align="left">
                  <label htmlFor="category">Category</label>
                </th>
                <td>
                  <input
                    id="category"
                    required
                    value={form.category}
                    onChange={(event) => updateForm("category", event.target.value)}
                    placeholder="Electronics, grocery, books..."
                  />
                </td>
              </tr>
              <tr>
                <th align="left">
                  <label htmlFor="price">Price</label>
                </th>
                <td>
                  <input
                    id="price"
                    required
                    min="0"
                    type="number"
                    value={form.price}
                    onChange={(event) => updateForm("price", event.target.value)}
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr>
                <th align="left">
                  <label htmlFor="stock">Stock Quantity</label>
                </th>
                <td>
                  <input
                    id="stock"
                    required
                    min="0"
                    type="number"
                    value={form.stock}
                    onChange={(event) => updateForm("stock", event.target.value)}
                    placeholder="0"
                  />
                </td>
              </tr>
              <tr>
                <th align="left">
                  <label htmlFor="rating">Rating</label>
                </th>
                <td>
                  <input
                    id="rating"
                    required
                    max="5"
                    min="0"
                    type="number"
                    value={form.rating}
                    onChange={(event) => updateForm("rating", event.target.value)}
                    placeholder="0-5"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        {notice && <p>{notice}</p>}
        {error && <p role="alert">{error}</p>}

        <p>
          <button disabled={isSaving} type="submit">
            {isSaving ? "Saving..." : "Save Inventory"}
          </button>{" "}
          <button type="button" onClick={() => navigate("/products")}>
            Back to Dashboard
          </button>
        </p>
      </form>
    </section>
  );
}
