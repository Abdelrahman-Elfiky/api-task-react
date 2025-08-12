import React, { useEffect, useState, useCallback } from 'react';
import styles from './Products.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductForm from '../../components/ProductForm/ProductForm';
import { fetchProducts } from '../../schema/productsService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(res => {
        const filtered = res.data.filter(p => p.title && p.description && p.image && p.price);
        setProducts(filtered);
      })
      .catch(() => toast.error('Failed to fetch products'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = useCallback((data) => {
  if (editingProduct) {
    setProducts(prev =>
      prev.map(p => (p.id === editingProduct.id ? { ...p, ...data } : p))
    );
    toast.success('Product updated successfully');
    setEditingProduct(null);
  } else {
    const newProduct = { ...data, id: uuidv4() };
    setProducts(prev => [newProduct, ...prev]);
    toast.success('Product added successfully');
  }
}, [editingProduct]);

  const handleDelete = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.info('Product deleted');
  }, []);

  
  const handleEdit = useCallback(
    (id) => () => {
      const product = products.find(p => p.id === id);
      if (product) setEditingProduct(product);
    },
    [products]
  );

  const handleDeleteClick = useCallback(
    (id) => () => {
      handleDelete(id);
    },
    [handleDelete]
  );

  return (
    <section className={styles.container}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.label}>Products</h2>
        <h3 className={styles.sectionTitle}>Our Products</h3>
        <p className={styles.description}>Have a good setup for your minimalist home</p>
      </div>

      <ProductForm
        onSave={handleSave}
        editingProduct={editingProduct}
        cancelEdit={() => setEditingProduct(null)}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.productList}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit(product.id)}        
              onDelete={handleDeleteClick(product.id)}
            />
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
}
