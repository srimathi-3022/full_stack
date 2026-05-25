/**
 * productService.js
 * ─────────────────
 * All API calls live here — never inside components.
 * Satisfies Requirement 8.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed — ${res.status}`);
  }
  return res.json();
}

/** GET /products — returns array of all products */
export async function fetchAllProducts() {
  const data = await request("/products");
  return data.products ?? [];
}

/** GET /products/{id} — returns a single product object */
export async function fetchProductById(id) {
  const data = await request(`/products/${id}`);
  return data.product ?? data;
}

/** GET /products/category/{category} — returns array of products */
export async function fetchProductsByCategory(category) {
  const data = await request(`/products/category/${encodeURIComponent(category)}`);
  return data.products ?? [];
}
