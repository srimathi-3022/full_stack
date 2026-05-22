

const BASE_URL = "http://localhost:8000";

export async function fetchAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data.product;
}

export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  const data = await res.json();
  return data.products;
}

export async function addOrUpdateProduct(product) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to save product");
  return res.json();
}

export function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-IN")}`;
}
