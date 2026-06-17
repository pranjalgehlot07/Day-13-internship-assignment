import useCart from "../hooks/useCart";

function Checkout() {
  const { cartItems, total, clearCart } = useCart();

  const handleOrder = () => {
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="container">
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <h3>No items available for checkout</h3>
      ) : (
        <div className="checkout-box">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="summary" key={item._id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr />
          <h2>Total Amount: ₹{total}</h2>

          <button onClick={handleOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
