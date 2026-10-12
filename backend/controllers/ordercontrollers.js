const Order = require("../models/order");
const sendEmail = require("../utils/sendEmail");

// ===============================
// CREATE ORDER
// ===============================
const createOrder = async (req, res) => {
    try {
        const {
            products,
            totalamount,
            address,
            paymentid,
            paymentstatus
        } = req.body;

        if (
            !products ||
            !totalamount ||
            !address ||
            !paymentid ||
            !paymentstatus
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newOrder = new Order({
            user: req.user._id,

            products: products.map((item) => ({
                product: item._id,
                quantity: item.quantity,
                price: item.price
            })),

            totalamount,
            address,
            paymentid,
            paymentstatus
        });

        const createdOrder = await newOrder.save();

        // Email optional - error aaye to order fail na ho
        try {
            await sendEmail(
                req.user.email,
                "Order Created",
                `Your order has been created successfully. Order ID: ${createdOrder._id}`
            );
        } catch (emailError) {
            console.log("Email Error:", emailError.message);
        }

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: createdOrder
        });

    } catch (error) {
        console.log("Create Order Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};


// ===============================
// MY ORDERS
// ===============================
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order
            .find({ user: req.user._id })
            .populate("products.product");

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.log("My Orders Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to get orders",
            error: error.message
        });
    }
};


// ===============================
// GET ALL ORDERS - ADMIN
// ===============================
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order
            .find()
            .populate("user")
            .populate("products.product");

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.log("Get All Orders Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to get orders",
            error: error.message
        });
    }
};


// ===============================
// UPDATE ORDER STATUS
// ===============================
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const updatedOrder = await Order
            .findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            )
            .populate("user");

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Email optional
        try {
            await sendEmail(
                updatedOrder.user.email,
                "Order Status Updated",
                `Your order status has been updated to: ${status}`
            );
        } catch (emailError) {
            console.log("Email Error:", emailError.message);
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.log("Update Order Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};