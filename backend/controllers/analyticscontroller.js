const Order = require("../models/order");
const User = require("../models/user");
const product=require("../models/product");

const getadminstates = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({role: 'user'});
        const totalUsers = await User.countDocuments({});
        const totalProducts = await product.countDocuments({});
       
        const orders = await Order.find({role: 'user'});
        const totalRevenuedata = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue:totalRevenuedata
        });
    }
    catch (error){
        res.status(500).json({message:'error feaching data', error});
    }
}
module.exports={getadminstates};