import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{message || "Failed to load data. Please try again."}</p>
    </div>
  );
}
