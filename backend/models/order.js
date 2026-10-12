const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
        products:[
            {
                product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
                quantity:{type:Number,required:true,default:1},
                price:{type:Number,required:true}
            }
        ],
        totalamount:{type:Number},
        status:{type:String,enum:["pending","completed","cancelled"],default:"pending"},
        address:{
            name:{type:String,required:true},
            street:{type:String,required:true},
            city:{type:String,required:true},
            postalCode:{type:String,required:true},
            country:{type:String,required:true}
        },
        paymentid:{type:String,required:true},
        paymentstatus:{type:String,enum:["pending","paid","failed"],default:"pending"}
    },{timestamps:true}
)

module.exports = mongoose.model("Order",orderSchema);