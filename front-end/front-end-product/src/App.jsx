import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFormPage from "./pages/ProductFormPage";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Navbar />
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 24px 80px" }}>
        <Routes>
          <Route path="/"             element={<Navigate to="/products" replace />} />
          <Route path="/products"     element={<ProductListPage />} />
          <Route path="/products/add" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
