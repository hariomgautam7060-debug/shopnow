const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
    getproduct,
    getproductbyid,
    createproduct,
    updateproduct,
    deleteproduct
} = require("../controllers/productcontrollers");

const { protect } = require("../middleware/authmiddleware");
const { admin } = require("../middleware/adminmiddleware");

// ===============================
// MULTER CONFIGURATION - LOCAL STORAGE
// ===============================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024  // 5MB
    },
    fileFilter: fileFilter
});

// ✅ Multer error handler
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'FILE_TOO_LARGE') {
            return res.status(400).json({
                success: false,
                message: 'File too large. Max size is 5MB'
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

// ===============================
// ROUTES
// ===============================

// ✅ GET all products (Public)
router.get("/", getproduct);

// ✅ GET product by ID (Public)
router.get("/:id", getproductbyid);

// ✅ CREATE product (Admin + Token)
router.post(
    "/",
    protect,
    admin,
    upload.single("image"),
    handleMulterError,
    createproduct
);

// ✅ UPDATE product (Admin + Token)
router.put(
    "/:id",
    protect,
    admin,
    upload.single("image"),
    handleMulterError,
    updateproduct
);

// ✅ DELETE product (Admin + Token)
router.delete(
    "/:id",
    protect,
    admin,
    deleteproduct
);

module.exports = router;