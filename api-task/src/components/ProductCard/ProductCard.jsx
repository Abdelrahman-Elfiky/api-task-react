import React from 'react';
import styles from './ProductCard.module.css';


export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.productTitle}>{product.title}</div>
      <div className={styles.productDescription}>{product.description}</div>
      <div className={styles.productSeparator}></div>
      <div className={styles.productPrice}>${product.price}</div>

      <div className={styles.cardButtons}>
        <button className={styles.editBtn} onClick={onEdit} type="button">Edit</button>
        <button className={styles.deleteBtn} onClick={onDelete} type="button">Delete</button>
      </div>
    </div>
  );
}
