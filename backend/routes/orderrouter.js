const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authmiddleware");
const { admin } = require("../middleware/adminmiddleware");

const {
    createOrder,
    getAllOrders,
    getMyOrders,
    updateOrderStatus
} = require("../controllers/ordercontrollers");


// Create order
router.post("/", protect, createOrder);

// Admin - all orders
router.get("/", protect, admin, getAllOrders);

// User - my orders
router.get("/myorders", protect, getMyOrders);

// Admin - update order status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;