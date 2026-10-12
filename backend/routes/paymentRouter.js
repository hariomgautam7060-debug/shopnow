const express = require("express");
// const { createOrder } = require("../controllers/ordercontrollers");
const router = express.Router();
const { createdOrder, verifypayment } = require("../controllers/paymentcontrollers");

router.post("/order",createdOrder);
router.post("/verify",verifypayment);

module.exports = router;