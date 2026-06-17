import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/cart";

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const res = await axios.get(API);
    setCartItems(res.data);
  };

  const addToCart = async (product) => {
    await axios.post(`${API}/add`, product);
    fetchCart();
  };

  const updateQuantity = async (id, quantity) => {
    await axios.put(`${API}/update/${id}`, { quantity });
    fetchCart();
  };

  const removeItem = async (id) => {
    await axios.delete(`${API}/remove/${id}`);
    fetchCart();
  };

  const clearCart = async () => {
    await axios.delete(`${API}/clear`);
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total
  };
}