const app = require('express');
const router = app.Router();
const schema = require('../middelware/validator');
const joi = require('joi');
const auth = require('../middelware/auth');
const productController = require("../controllers/product");

addProductSchema = {
    name:joi.string().required(),
    // model: joi.number().required(),
    price : joi.number().required(),
    email : joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    location:joi.string().required(),
    images: [{ type: String }],
    phoneNumber: joi.number().required(),
}

ProductSchema = {
    name:joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required(),
    location:joi.string().required(),
    price:joi.number().required(),
    model: joi.number().required(),
    images: [{ type: String }]
}

router.post('/',auth.decode, productController.addProduct);
router.get('/list',productController.getProductList);
router.get('/list-all', productController.getAllProducts)
router.get('/list/:id', productController.getProductById);



module.exports = router;