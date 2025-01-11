const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var cors = require('cors');


app.use(cors());


const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUi    = require('swagger-ui-express');

const options = {
    swaggerDefinition:{
        openapi:'3.0.0',
        info :{
            title:"Dhhundo REST apis ",
            version:"3.0.0"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers:[
            {
               url: 'http://localhost:8000',
            }
        ]
    },
    apis:['./routes/*js'],
}

const swaggerSpec = swaggerJsDocs(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

/** Routes import */
var roleRoute = require('./routes/role');
var authRoute = require('./routes/auth');
var userRoute = require('./routes/user');
const locationRoute = require('./routes/location');
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/** connecting the database */
const connection = mongoose.connect(process.env.DB_CONNECTION);

/** request handler */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','Put','Post','Patch','Delete');
        return res.status(200).json({});
    }
    next();
})

/** checking server */
app.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"server is running",
    })
});

/** Routes */
app.use('/role',roleRoute);

/** auth route */
app.use('/auth',authRoute);

/**User route */
app.use('/user',userRoute);

/**location routes */
app.use('/location',locationRoute);

/**product routes */
app.use('/product',productRoute);

/**category Route */
app.use('/category',categoryRoute);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



/** Handling 404 errors */
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Not Found"
    })
});

module.exports = app;