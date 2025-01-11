const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    city:{
        type:String,
    },
    state:{
        type:String,
        required:true,
    },
    postal:{
        type:String,
        required:true,
    },
    time : {
        type : Date,
        default: Date.now 
    }

});

module.exports = mongoose.model('Location',locationSchema);