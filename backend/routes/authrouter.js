const express = require("express");
const router = express.Router();

// ✅ Import
const {
    registerUser,
    loginUser,
    getUser
} = require("../controllers/authcontrollers");

// ✅ Middleware
const { protect } = require("../middleware/authmiddleware");
const { admin } = require("../middleware/adminmiddleware");

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth router working!"
    });
});

// ✅ Register
router.post("/register", registerUser);

// ✅ Login
router.post("/login", loginUser);

// ✅ Get Users (Admin)
router.get("/getuser", protect, admin, getUser);

module.exports = router;