// backend/routes/cartRoutes.js
const express = require("express");

const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCartItems);
router.post("/add", addToCart);
router.put("/update/:id", updateCartItem);
router.delete("/remove/:id", removeCartItem);
router.delete("/clear", clearCart);

module.exports = router;