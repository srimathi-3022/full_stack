import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar onSearch={setSearch} searchValue={search} />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 24px 80px" }}>
        <Routes>
          <Route path="/"             element={<Navigate to="/products" replace />} />
          <Route path="/products"     element={<ProductListPage search={search} />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
