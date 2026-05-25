import React from "react";
import { Link } from "react-router-dom";

function formatPrice(price) {
  return "Rs. " + Number(price).toLocaleString("en-IN");
}

function Stars({ rating }) {
  const n = Math.min(Math.max(Math.round(rating), 0), 5);
  return <span aria-label={`${n} out of 5 stars`}>Rating: {n}/5</span>;
}

function Highlight({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function ProductCard({ product, searchQuery = "" }) {
  return (
    <article>
      <h2>
        <Link to={`/products/${product.id}`}>
          <Highlight text={product.name} query={searchQuery} />
        </Link>
      </h2>
      <p>
        <strong>Brand:</strong> <Highlight text={product.brand} query={searchQuery} />
      </p>
      <p>
        <strong>Category:</strong>{" "}
        <Highlight text={product.category} query={searchQuery} />
      </p>
      <p>
        <strong>Price:</strong> {formatPrice(product.price)}
      </p>
      <p>
        <strong>Stock:</strong>{" "}
        {product.stock === 0 ? "Out of Stock" : product.stock}
      </p>
      <p>
        <Stars rating={product.rating} />
      </p>
    </article>
  );
}
