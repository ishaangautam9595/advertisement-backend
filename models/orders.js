const mongoose = require("mongoose");
const User = require("./user");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:Number,
        default:0,
    },
    address:{
        type:String,
    },
    pincode:{
        type:String,
    },
    time : {
        type : Date,
        default: Date.now 
    }

});

module.exports = mongoose.model('Order',orderSchema);