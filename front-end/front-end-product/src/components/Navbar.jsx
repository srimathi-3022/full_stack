import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <table width="100%" cellPadding="10" cellSpacing="0">
        <tbody>
          <tr>
            <td>
              <h1>
                <Link to="/products">Stockyard</Link>
              </h1>
            </td>
            <td align="right">
              <nav aria-label="Main navigation">
                <Link to="/products">Dashboard</Link>{" | "}
                <Link to="/products/add">Add Stock</Link>
              </nav>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </header>
  );
}
