const app = require('express');
const router = app.Router();
const schema = require('../middelware/validator');
const joi = require('joi');
const auth = require('../middelware/auth');
const locationController = require("../controllers/location");



/**
 * @swagger
 * components:
 *   schemas:
 *     location:
 *       type: object
 *       required:
 *         -city
 *         -state
 *         -country
 *         -longitude
 *         -latitude
 *       properties:
 *         city:
 *           type: string
 *           description: Enter the city
 *         state:
 *           type: string
 *           description: Enter the state
 *         country:
 *           type: string
 *           description: Enter the country
 *         longitude:
 *           type: string
 *           description: Enter the longitude
 *         latitude:
 *           type: string
 *           description: Enter the latitude
 *       example:
 *         city: Auston
 *         state: Texes
 *         country: USA
 *         longitude: 10.1029381
 *         latitude: 12.009122
 */
/**
 * @swagger
 * tags:
 *   name:  Locations Apis
 *   description: In this collection you will find api regarading location
 * /location:
 *   post:
 *     summary: /location
 *     tags: [Locations Apis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/location'
 *     responses:
 *       200:
 *         description: This is to add new location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/location'
 *       500:
 *         description: Some server error
 *
 */
const createlocationSchema = {
    city: joi.string().required(),
    state: joi.string().required(),
    postal : joi.string().required(),
}
router.post('/',schema.validator(createlocationSchema),locationController.createLocation);


/**
 * @swagger
 * tags:
 *   name:  Locations Apis
 *   description: In this collection you will find api regarading location
 * /location:
 *   get:
 *     summary: /location
 *     tags: [Locations Apis]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *   
 *     responses:
 *       200:
 *         description: This is to add new location.
 *         content:
 *           application/json:
 *             schema:
 *       500:
 *         description: Some server error
 *
 */
router.get('/',locationController.getallLocations);

/**
 * @swagger
 * components:
 *   schemas:
 *     deletelocation:
 *       type: object
 *       required:
 *       parameters:
 *         -in:path
 *         name:location_id
 *       properties:
 *         location_id:
 *           type: string
 *           description: Enter location_id
 *       example:
 *         location_id: 64eeb753e8d8c0e79e5dfe3e
 */

/**
 * @swagger
 * /location/{location_id}:
 *   delete:
 *     summary: Delete this location by id
 *     tags: [Locations Apis]
 *     parameters:
 *       - in: path
 *         name: location_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Enter the location id
 *     responses:
 *       200:
 *         description: Location deleted sucessfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/deletelocation'
 *       404:
 *         description: This location was not found
 */
router.delete('/:location_id',auth.decode,locationController.deleteLocation);
module.exports = router;