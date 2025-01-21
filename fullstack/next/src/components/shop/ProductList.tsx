import React from 'react';

const ProductList: React.FC = () => {
  return (
    <div className="product-list">
      <div className="product">
        <h2>Producto 1</h2>
        <p>Descripción del producto 1</p>
      </div>
      <div className="product">
        <h2>Producto 2</h2>
        <p>Descripción del producto 2</p>
      </div>
      <div className="product">
        <h2>Producto 3</h2>
        <p>Descripción del producto 3</p>
      </div>
    </div>
  );
};

export default ProductList;
