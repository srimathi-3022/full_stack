import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById, formatPrice } from "../services/productService";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) loadProduct(id);
  }, [id]);

  const loadProduct = async (productId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (error || !product) {
    return (
      <section>
        <h2>Error</h2>
        <p>{error || "Product not found"}</p>
        <Link to="/products">Back to Dashboard</Link>
      </section>
    );
  }

  return (
    <section>
      <p>
        <Link to="/products">Back to Dashboard</Link>
      </p>

      <h1>{product.name}</h1>
      <p>{product.stock === 0 ? "Out of Stock" : "In Stock"}</p>

      <table border="1" cellPadding="10" cellSpacing="0">
        <caption>Product Details</caption>
        <tbody>
          <tr>
            <th scope="row">Product ID</th>
            <td>#{product.id}</td>
          </tr>
          <tr>
            <th scope="row">Brand</th>
            <td>{product.brand}</td>
          </tr>
          <tr>
            <th scope="row">Category</th>
            <td>{product.category}</td>
          </tr>
          <tr>
            <th scope="row">Price</th>
            <td>{formatPrice(product.price)}</td>
          </tr>
          <tr>
            <th scope="row">Stock</th>
            <td>{product.stock} units</td>
          </tr>
          <tr>
            <th scope="row">Rating</th>
            <td>{product.rating} / 5</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
