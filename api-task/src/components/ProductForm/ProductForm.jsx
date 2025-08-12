import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ProductForm.module.css';
import { productSchema } from '../../api/app';

export default function ProductForm({ onSave, editingProduct, cancelEdit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset();
    }
  }, [editingProduct, reset]);

  const onSubmit = (data) => {
    onSave({ ...data, price: Number(data.price) });
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Product Title"
        {...register('title')}
        className={styles.input}
      />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}

      <input
        type="text"
        placeholder="Product Description"
        {...register('description')}
        className={styles.input}
      />
      {errors.description && <p className={styles.error}>{errors.description.message}</p>}

      <input
        type="number"
        step="0.01"
        placeholder="Price"
        {...register('price', { valueAsNumber: true })}
        className={styles.input}
      />
      {errors.price && <p className={styles.error}>{errors.price.message}</p>}

      <input
        type="url"
        placeholder="Image URL"
        {...register('image')}
        className={styles.input}
      />
      {errors.image && <p className={styles.error}>{errors.image.message}</p>}

      <select {...register('category')} className={styles.input}>
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        <option value="clothing">Clothing</option>
      </select>
      {errors.category && <p className={styles.error}>{errors.category.message}</p>}

      <button type="submit" disabled={!isValid} className={styles.button}>
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>

      {editingProduct && (
        <button
          type="button"
          onClick={cancelEdit}
          className={`${styles.button} ${styles.cancelButton}`}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
