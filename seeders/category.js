const mongoose = require('mongoose');
const Catrgory = require('../models/category');
const dotenv = require("dotenv").config();

try {
       
    const seedCategory =[
        {
            _id: new mongoose.Types.ObjectId,
            name:"clothing",
            description:"this category is associated with only clothing brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Car",
            description:"this category is associated with only car brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"House",
            description:"this category is associated with only house brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Food",
            description:"this category is associated with only Food brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Electronics",
            description:"this category is associated with only Electronics brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Book",
            description:"this category is associated with only book brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Video game",
            description:"this category is associated with only video game brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Health",
            description:"this category is associated with only Health brand",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Mobile phone",
            description:"this category is associated with only Mobile phone",
            location:"64eee35099299f5aac244faa"
        },
        {
            _id: new mongoose.Types.ObjectId,
            name:"Music",
            description:"this category is associated with only Music",
            location:"64eee35099299f5aac244faa"
        }
    ]
    
    for(categories of seedCategory){
        const category = Catrgory(categories);

        category.save().then(result =>{
            console.log(result);
        }).catch(err=>{
            console.log(err.message);
        })
    }
} catch (error) {
    console.log(error.message);
}

