import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

function Cart() {
  const { cartItems, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="quantity-box">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button className="remove" onClick={() => removeItem(item._id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="total-box">
            <h2>Total: ₹{total}</h2>
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
