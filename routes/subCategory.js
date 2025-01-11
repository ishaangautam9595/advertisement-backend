const app = require('express');
const router = app.Router();
const subcategoryController = require("../controllers/subCategory");
const joi = require('joi');
const schema = require('../middelware/validator');



/**
 * @swagger
 * tags:
 *   name:  SubCategories Apis
 *   description: In this collection you will find api regarading location
 * /category:
 *   get:
 *     summary: /subCategory
 *     tags: [Categories Apis]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *
 *     responses:
 *       200:
 *         description: This is to list all the categories.
 *         content:
 *           application/json:
 *             schema:
 *       500:
 *         description: Some server error
 *
 */
router.get("/", subcategoryController.getCategories);

/**
 * @swagger
 * components:
 *   schemas:
 *     getCategory:
 *       type: object
 *       required:
 *       parameters:
 *         -in:path
 *         name:id
 *       properties:
 *          id:
 *           type: string
 *           description: Enter category id
 *       example:
 *         id: 64eeb753e8d8c0e79e5dfe3e
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get this category by using id
 *     tags: [Categories Apis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter the category id
 *     responses:
 *       200:
 *         description: category loaded sucessfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getCategory'
 *       404:
 *         description: This category was not found
 */
router.get("/:id", subcategoryController.getCategoryById);

/**
 * @swagger
 * components:
 *   schemas:
 *     category:
 *       type: object
 *       required:
 *         -name
 *         -description
 *         -status
 *       properties:
 *         name:
 *           type: string
 *           description: Enter your name
 *         description:
 *           type: string
 *           description: Enter your description
 *         status:
 *           type: string
 *           description: Enter the status
 *         subcategories:
 *           type: array
 *           description: Enter the subcategories
 *       example:
 *         name: vehicle service
 *         description: this is about cars
 *         status: 1
 */
/**
 * @swagger
 * tags:
 *   name:  Categories Apis
 *   description: In this collection you will find api regarading Categories
 * /category:
 *   post:
 *     summary: /category
 *     tags: [Categories Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *     responses:
 *       200:
 *         description: This is to add new category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 *       500:
 *         description: Some server error
 *
 */
const addSubCategorySchema = {
    name: joi.string().required(),
    description: joi.string().required(),
    status: joi.number(),
    parentCategory: joi.string().required(),
}

router.post('/',schema.validator(addSubCategorySchema),subcategoryController.createSubcategory);


/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete the category by using id
 *     tags: [Categories Apis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter the category id
 *     responses:
 *       200:
 *         description: category deleted sucessfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getCategory'
 *       404:
 *         description: This category was not found
 */
// router.delete("/:id", subcategoryController.deleteCategory);


// const addSubCategorySchema = {
//     name: joi.string().required(),
//     description: joi.string().required(),
//     status: joi.number(),
//     parentCategory: joi.string().required(),
    
// }
// router.post('/',schema.validator(addSubCategorySchema),subcategoryController.createSubcategory);
router.get('/subcategories/:id', subcategoryController.getSubCategoryByCategoryId);


module.exports = router;
