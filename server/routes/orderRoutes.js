const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  placeOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");

router.post("/", authMiddleware, placeOrder);

router.get("/", authMiddleware, getOrders);

router.get("/:id", authMiddleware, getOrderById);

module.exports = router;