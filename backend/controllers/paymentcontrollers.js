require("dotenv").config();
const razerpay = require("razorpay");
const crypto = require("crypto");

const createdOrder = async (req, res) => {
    try {
        const instance = new razerpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const options = {
            amount: req.body.amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const verifypayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const digest = hmac.digest("hex");
        if (digest === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createdOrder,
    verifypayment
};
