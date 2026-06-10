const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

router.post("/", placeOrder);

router.get("/", getAllOrders);

router.get("/:user_id", getUserOrders);

router.put("/:id", updateOrderStatus);

module.exports = router;