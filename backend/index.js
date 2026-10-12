const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

// Routes
const authRouter = require("./routes/authrouter");
const productRouter = require("./routes/productroutes");
const orderRouter = require("./routes/orderrouter");
const paymentRouter = require("./routes/paymentRouter");
const analyticsRouter = require("./routes/analyticsroute");

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Product images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

connectDB();

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 ShopNow Backend is running!",
    });
});

// Auth
app.use("/api/auth", authRouter);

// Products
app.use("/api/products", productRouter);

// Orders
app.use("/api/orders", orderRouter);

// Payments
app.use("/api/payments", paymentRouter);

// Analytics
app.use("/api/analytics", analyticsRouter);

app.use((req, res) => {
    console.log("❌ Route not found:", req.method, req.originalUrl);

    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
    });
});

app.use((err, req, res, next) => {
    console.error("❌ Global Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🔗 Auth Routes: http://localhost:${PORT}/api/auth`);
    console.log(`📦 Product Routes: http://localhost:${PORT}/api/products`);
});