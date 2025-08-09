import React, { useEffect, useState } from "react";
import "./App.css";

import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const filtered = data.filter(
          (p) => p.title && p.description && p.image && p.price
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (title, description, price, image) => {
    const newProduct = { title, description, price, image };
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <section className="product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="label">Products</h2>
          <p className="big">Our Products</p>
          <p className="description">Have a good setup for your minimalist home</p>
        </div>
      </div>

      <div className="container">
        <ProductForm onAdd={addProduct} />
      </div>

      {loading ? (
        <div className="loading-overlay" style={{ display: "flex" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <div className="product-list">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}