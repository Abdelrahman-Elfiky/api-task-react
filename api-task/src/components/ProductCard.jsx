import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-title">{product.title}</div>
      <div className="product-description">{product.description}</div>
      <div className="product-separator"></div>
      <div className="product-price">${product.price}</div>
    </div>
  );
}
