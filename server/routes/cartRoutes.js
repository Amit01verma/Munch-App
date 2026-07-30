const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

// Add item to cart
router.post("/", authMiddleware, addToCart);

// Get logged-in user's cart
router.get("/", authMiddleware, getCart);

// Update quantity of a cart item
router.put("/:id", authMiddleware, updateCartItem);

// Remove a single cart item
router.delete("/:id", authMiddleware, removeCartItem);

// Clear entire cart
router.delete("/", authMiddleware, clearCart);

module.exports = router;