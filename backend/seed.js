require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");

const seedDatabase = async () => {
	try {
		await connectDB();

		const demoEmails = ["admin@example.com", "customer@example.com"];
		const demoProductNames = [
			"Classic Cotton T-Shirt",
			"Everyday Running Shoes",
			"Minimal Leather Backpack",
			"Wireless Headphones"
		];

		const demoUsers = await User.find({ email: { $in: demoEmails } });
		const demoUserIds = demoUsers.map((user) => user._id);
		const demoProducts = await Product.find({ name: { $in: demoProductNames } });
		const demoProductIds = demoProducts.map((product) => product._id);

		await Order.deleteMany({ user: { $in: demoUserIds } });
		await User.deleteMany({ email: { $in: demoEmails } });
		await Product.deleteMany({ name: { $in: demoProductNames } });

		const password = await bcrypt.hash("Password123!", 10);
		const users = await User.insertMany([
			{
				name: "Demo Admin",
				email: "admin@example.com",
				password,
				role: "admin"
			},
			{
				name: "Demo Customer",
				email: "customer@example.com",
				password,
				role: "user"
			}
		]);

		const products = await Product.insertMany([
			{
				name: "Classic Cotton T-Shirt",
				description: "A soft, comfortable cotton t-shirt for everyday wear.",
				price: 24.99,
				category: "Clothing",
				stock: 40,
				imageurl: "https://placehold.co/600x600?text=Cotton+T-Shirt"
			},
			{
				name: "Everyday Running Shoes",
				description: "Lightweight running shoes with a supportive cushioned sole.",
				price: 79.99,
				category: "Footwear",
				stock: 18,
				imageurl: "https://placehold.co/600x600?text=Running+Shoes"
			},
			{
				name: "Minimal Leather Backpack",
				description: "A durable backpack with room for a laptop and daily essentials.",
				price: 64.5,
				category: "Accessories",
				stock: 12,
				imageurl: "https://placehold.co/600x600?text=Leather+Backpack"
			},
			{
				name: "Wireless Headphones",
				description: "Bluetooth headphones with clear audio and long battery life.",
				price: 59.0,
				category: "Electronics",
				stock: 25,
				imageurl: "https://placehold.co/600x600?text=Headphones"
			}
		]);

		const customer = users.find((user) => user.email === "customer@example.com");
		const [shoes, backpack] = products;

		await Order.insertMany([
			{
				user: customer._id,
				products: [
					{ product: shoes._id, quantity: 1, price: shoes.price },
					{ product: backpack._id, quantity: 1, price: backpack.price }
				],
				totalamount: shoes.price + backpack.price,
				status: "completed",
				address: {
					name: "Demo Customer",
					street: "12 Market Street",
					city: "New Delhi",
					postalCode: "110001",
					country: "India"
				},
				paymentid: "demo_payment_001",
				paymentstatus: "paid"
			},
			{
				user: customer._id,
				products: [{ product: products[3]._id, quantity: 2, price: products[3].price }],
				totalamount: products[3].price * 2,
				status: "pending",
				address: {
					name: "Demo Customer",
					street: "12 Market Street",
					city: "New Delhi",
					postalCode: "110001",
					country: "India"
				},
				paymentid: "demo_payment_002",
				paymentstatus: "pending"
			}
		]);

		console.log("Demo data seeded successfully.");
		console.log("Login: admin@example.com / Password123!");
		console.log("Login: customer@example.com / Password123!");
	} catch (error) {
		console.error("Unable to seed demo data:", error.message);
		process.exitCode = 1;
	} finally {
		await mongoose.connection.close();
	}
};

seedDatabase();
