import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="app-header">
      <div className="brand">
        <Link to="/products">Stockyard</Link>
        <span>Inventory Management</span>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/products">Dashboard</Link>
        <Link to="/products/add">Add Stock</Link>
      </nav>
    </header>
  );
}
