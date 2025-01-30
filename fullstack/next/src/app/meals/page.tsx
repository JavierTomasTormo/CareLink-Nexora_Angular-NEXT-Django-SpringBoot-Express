import React from 'react';
import Head from 'next/head';
import Header from '@/components/meals/Header';
import Slide from '@/components/meals/Slide';
import './style.css';

const bottles = [
  {
    name: 'Beach',
    price: '€ 39.90',
    description: 'In 20 years, there could be more plastic in our oceans than fish.',
    image: 'https://www.designforfinland.com/product-images/Closca_Bottle_Wave_Antarctica_450ml_Close.png/2083089000004207012/1100x1100',
    bgImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2902&auto=format&fit=crop',
  },
  {
    name: 'Savanna',
    price: '€ 35.90',
    description: 'Plastic pollution injures more than 100,000 marine animals every year.',
    image: 'https://fnac.sa/cdn/shop/files/Closca_Bottle_Wave_Sahara_600ml_Close.png?v=1703675684',
    bgImage: 'https://images.unsplash.com/photo-1613109526778-27605f1f27d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    name: 'Glacier',
    price: '€ 29.90',
    description: 'A sustainable bottle for your everyday adventures.',
    image: 'https://gomagcdn.ro/domains/alty.ro/files/product/original/sticla-reutilizabila-apa-closca-glacier-copie-848-7049.png',
    bgImage: 'https://media.istockphoto.com/id/930588118/es/foto/glaciar-de-glacier-bay-alaska.jpg?s=612x612&w=0&k=20&c=NwFSOk29EmOZ6R2xOdky-a6ZfTPOccCJTt1Gi-ALuBw=',
  },
  {
    name: 'Closca Bottle',
    price: '€ 34.90',
    description: 'Help reduce the impact of single-use plastics.',
    image: 'https://fnac.sa/cdn/shop/files/Closca_Bottle_Wave_Arizona_600ml_Close.png?v=1703675684&width=1946',
    bgImage: 'https://images.unsplash.com/photo-1546500840-ae38253aba9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3260&q=80',
  },
];

export default function MealsPage() {
  return (
    <>
      <Head>
        <title>Meals Page - VitalNest</title>
        <meta name="description" content="Explore our sustainable bottle collection at VitalNest." />
        <meta name="keywords" content="VitalNest, sustainable bottles, eco-friendly, reusable bottles" />
        <meta name="author" content="VitalNest Team" />
        <meta property="og:title" content="Meals Page - VitalNest" />
        <meta property="og:description" content="Explore our sustainable bottle collection at VitalNest." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitalnest.com/meals" />
        <meta property="og:image" content="https://www.vitalnest.com/images/og-image.jpg" />
      </Head>
      <div className="container">
        <div className="header-fixed">
          <Header />
        </div>
        <div className="content-scroll">
          <Slide bottles={bottles} />
        </div>
      </div>
    </>
  );
}