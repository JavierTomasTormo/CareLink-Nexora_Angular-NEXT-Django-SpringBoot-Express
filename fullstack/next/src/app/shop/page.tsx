import Head from 'next/head';
import ListActivities from '@/components/shop/ListActivities';
import styles from '@/styles/shop/shop.module.css';

export default function ShopPage() {
  return (
    <>
      <Head>
        <title>VitalNest - Shop</title>
        <meta name="description" content="Encuentra los mejores productos naturales y suplementos en nuestra tienda VitalNest" />
        <meta name="keywords" content="tienda natural, suplementos, productos naturales, vitaminas, minerales" />
        <meta name="author" content="VitalNest Team" />
        <meta property="og:title" content="VitalNest - Shop" />
        <meta property="og:description" content="Encuentra los mejores productos naturales y suplementos en nuestra tienda VitalNest" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitalnest.com/shop" />
        <meta property="og:image" content="https://www.vitalnest.com/images/shop-og-image.jpg" />
      </Head>
      <div className={styles.shop}>
        <h1>Tienda de VitalNest</h1>
        <ListActivities />
      </div>
    </>
  );
}