const Product = require("../models/product");

// ===============================
// GET ALL PRODUCTS
// ===============================
const getproduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ===============================
// GET PRODUCT BY ID
// ===============================
const getproductbyid = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ===============================
// CREATE PRODUCT
// ===============================
const createproduct = async (req, res) => {
    try {
        console.log("📦 Request Body:", req.body);
        console.log("📸 Request File:", req.file);

        const { name, description, price, category, stock } = req.body;

        // ✅ Validation
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: name, description, price, category, stock"
            });
        }

        // ✅ Check if product already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product with this name already exists"
            });
        }

        let imageurl = "";

        // ✅ Save image locally
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            imageurl = `${baseUrl}/uploads/${req.file.filename}`;
            console.log("✅ Image saved:", imageurl);
        } else {
            return res.status(400).json({
                success: false,
                message: "Product image is required"
            });
        }

        // ✅ Create product
        const newproduct = new Product({
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            category: category.trim(),
            stock: Number(stock),
            imageurl: imageurl
        });

        const savedproduct = await newproduct.save();
        console.log("✅ Product created:", savedproduct._id);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: savedproduct
        });

    } catch (error) {
        console.log("❌ CREATE PRODUCT ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};

// ===============================
// UPDATE PRODUCT
// ===============================
const updateproduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const existingProduct = await Product.findById(req.params.id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // ✅ Update fields
        if (name) existingProduct.name = name.trim();
        if (description) existingProduct.description = description.trim();
        if (price) existingProduct.price = Number(price);
        if (category) existingProduct.category = category.trim();
        if (stock !== undefined && stock !== null) existingProduct.stock = Number(stock);

        // ✅ Update image if new image provided
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            existingProduct.imageurl = `${baseUrl}/uploads/${req.file.filename}`;
            console.log("✅ Image updated:", existingProduct.imageurl);
        }

        const updatedproduct = await existingProduct.save();
        console.log("✅ Product updated:", updatedproduct._id);

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedproduct
        });

    } catch (error) {
        console.log("❌ UPDATE PRODUCT ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        });
    }
};

// ===============================
// DELETE PRODUCT
// ===============================
const deleteproduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log("❌ DELETE PRODUCT ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        });
    }
};

// ===============================
// EXPORT
// ===============================
module.exports = {
    getproduct,
    getproductbyid,
    createproduct,
    updateproduct,
    deleteproduct
};