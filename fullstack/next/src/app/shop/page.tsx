import ProductList from './ProductList';
import styles from './shop.module.css';

export default function ShopPage() {
  return (
    <div className={styles.shop}>
      <h1>Tienda de VitalNest</h1>
      <ProductList />
    </div>
  );
}
