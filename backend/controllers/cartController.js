const Cart = require("../models/Cart");

const getCartItems = async (req, res, next) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, name, price, image } = req.body;

    const existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += 1;
      const updatedItem = await existingItem.save();
      return res.status(200).json(updatedItem);
    }

    const item = await Cart.create({
      productId,
      name,
      price,
      image,
      quantity: 1,
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      res.status(400);
      throw new Error("Quantity must be at least 1");
    }

    const item = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!item) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);

    if (!item) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    await Cart.deleteMany();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};