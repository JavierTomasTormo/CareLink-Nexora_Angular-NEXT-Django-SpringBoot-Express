import React from 'react';
import styles from '../styles/SkeletonLoader.module.css';

interface SkeletonProps {
  type: 'text' | 'image' | 'card';
  count?: number;
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ type, count = 1, width, height, className }) => {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`${styles.skeleton} ${styles[type]} ${className || ''}`}
          style={{ width, height }}
        ></div>
      ))}
    </>
  );
};

export default SkeletonLoader;
