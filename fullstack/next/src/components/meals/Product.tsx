interface ProductProps {
  bottle: {
    name: string;
    price: string;
    description: string;
    image: string;
    bgImage: string;
  };
}

const Product = ({ bottle }: ProductProps) => {
  return (
    <div className="product">
      <h1>{bottle.name}</h1>
      <h2>{bottle.price}</h2>
      <p>{bottle.description}</p>
      <div className="product-images">
        <img src={bottle.bgImage} alt={bottle.name} />
        <img src={bottle.image} alt={bottle.name} />
      </div>
    </div>
  );
};

export default Product;
