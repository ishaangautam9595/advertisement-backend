const Location = require("../models/locations");
const mongoose = require("mongoose");

module.exports = {

createLocation: async(req,res,next)=>{

    const location = Location({
        _id : new mongoose.Types.ObjectId,
        city: req.body.city,
        state: req.body.state,
        postal: req.body.postal,
    })

    await location.save().then(result =>{
        res.status(201).json({
            message:"Location added sucessfully",
            data: result,
        });
    }).catch(err =>{
        res.status(500).json({
            message:err.message
        })
    })

},

getallLocations:async(req,res,next)=>{
    try{

        await Location.find().select('_id city state postal').then(result=>{
            res.status(200).json({
                message:"Locations loaded sucessfully",
                data: result,
            })
        })
    }
         catch(err) {
            res.status(500).json({
                message:err.message
            });
        }
    },

deleteLocation:async(req,res,next)=>{
    try {
        const location_id = req.params.location_id;
    
        const location = await Location.findOne({_id:location_id});
    
        if(!location){
            return res.status(404).json({
                message:"something went wrong"
            })
        }
        location.deleteOne().then(result =>{
            res.status(200).json({
                message:"Location deleted sucessfully"
            })
        });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}



}