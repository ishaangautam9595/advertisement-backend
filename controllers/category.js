const mongoose = require('mongoose');
const Category = require('../models/category');
const subCategory = require('../models/subCategory');

module.exports = {
    getCategories :(req,res,next)=>{
        const populateQuery = [{ path: "subcategories", select: "_id name descrption status" }];
        Category.find().select("name description status").populate(populateQuery).then(result=>{
            res.status(200).json({
                message:"categories loaded sucessfully",
                data:result,
            })
        }).catch(err =>{
            res.status(500).json({
                message:err.message,
            })
        })
    },

    getCategoryById:(req,res,next)=>{
        const id = req.params.id;

        Category.find({_id:id}).select("name description status")
            .then(result =>{
                res.status(200).json({
                    message:"selected category loaded sucessfully",
                    data:result
                })
            }).catch(err=>{
                res.status(500).json({
                    message:err.message,
                })
            })


    },
    addNewCategory:async(req,res,next)=>{
        const category = Category({
            _id : new mongoose.Types.ObjectId,
            name: req.body.name,
            description: req.body.description,
            status  : req.body.status,
            subcategories : ((req.body.subcategories) !== '') ? req.body.subcategories : [],
        })

        await category.save().then(result => {
            res.status(201).json({
                message:"Category added sucessfully",
                data:result,
            })
        }).catch(err=>{
            res.status(500).json({
                message:err.message,
            })
        })
    },

    deleteCategory:(req,res,next)=>{
        const id = req.params.id;

        Category.deleteOne({_id:id}).then(result=>{
            res.status(200).json({
                message:"selected category deleted sucessfully"
            })
        }).catch(err=>{
            res.status(500).json({
                message:err.message
            })
        })
    }

}