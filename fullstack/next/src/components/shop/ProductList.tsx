'use client';

import { useState, useEffect } from 'react';
import SkeletonLoader from '@/utils/SkeletonLoader';
import styles from '@/styles/shop/productList.module.css';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: 'Producto 1', price: '$100', image: '/images/product1.jpg' },
        { id: 2, name: 'Producto 2', price: '$200', image: '/images/product2.jpg' },
        { id: 3, name: 'Producto 3', price: '$300', image: '/images/product3.jpg' },
      ];
      setTimeout(() => setProducts(data), 2000); // Simula retraso de carga
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productList}>
      {products ? (
        products.map((product) => (
          <div key={product.id} className={styles.product}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))
      ) : (
        <SkeletonLoader type="card" count={3} />
      )}
    </div>
  );
};

export default ProductList;
