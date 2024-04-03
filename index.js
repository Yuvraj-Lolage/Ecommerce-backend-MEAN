require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const { connection } = require('./db/connection.db');
const bodyParser = require('body-parser');

const { categoryRouter } = require('./routes/category');
const { productRouter } = require('./routes/product');

//MIDDLEWAREs 
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log("PORT = " + process.env.PORT);
    console.log("DATABASE URL = " + process.env.DATABASE_URL);
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//routes  
app.use('/category', categoryRouter);
app.use('/products', productRouter);


//Database connectivity
if (connection) {
    console.log("Database Connection Successfull!");
}


app.listen(port, () => {
    console.log(`E-commerce Application listening on http://localhost:${port}`);
});
