const mongoose = require("mongoose");
const Order = require("./orders");
const Product = require("./product");
const User = require("./user");

const orderItemSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    order: {
        type:mongoose.Schema.ObjectId,
        ref:"Order",
        required:true,
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    sku:{
        type:Number,
        default:1,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    time : {
        type : Date,
        default: Date.now 
    }

});

module.exports = mongoose.model('OrderItems',orderItemSchema);