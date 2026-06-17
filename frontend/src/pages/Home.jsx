import useCart from "../hooks/useCart";

const products = [
  {
    productId: "p1",
    name: "Wireless Headphones",
    price: 1299,
    image: "https://via.placeholder.com/200"
  },
  {
    productId: "p2",
    name: "Smart Watch",
    price: 1999,
    image: "https://via.placeholder.com/200"
  },
  {
    productId: "p3",
    name: "Bluetooth Speaker",
    price: 999,
    image: "https://via.placeholder.com/200"
  }
];

function Home() {
  const { addToCart } = useCart();

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product.productId}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;