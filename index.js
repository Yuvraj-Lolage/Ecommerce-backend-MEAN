const express = require('express');

const app = express();
const port = 3000;
const { connection } = require('./db/connection.db'); 
const { CategoryModel } =  require('./db/category.model');
const { ProductModel } = require('./db/product.model');
const bodyParser = require('body-parser');

//MIDDLEWAREs 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header( "Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
  });
//Database connectivity
if(connection){
    console.log("Database Connection Successfull!");
}


app.listen(port, () => {
    console.log(`E-commerce Application listening on ${ port }`);
});


/**
 * Routes and methods
 * Categories
 */

/**
 * GET Categories
 */
app.get('/category', (req, res) => {
    CategoryModel.find({}).maxTimeMS(30000).then((responce) => {
        res.send(responce);
    });
});

/**
 * POST Categories
 */
app.post('/category', (req, res) => {
    let name = req.body.name;
    new CategoryModel({
        name: name
    }).save().then((result)=>{
        res.send(result);
    })
});

/**
 * PATCH Categories
 */
app.patch('/category/:categoryId', (req, res) => {
    let newCategoryName = req.body.name;
    CategoryModel.findOneAndUpdate({ _id: req.params.categoryId },
    { $set:req.body }).then((updatedRes) => {
        res.send(updatedRes);
    });
});

/**
 * DELETE Categories
 */
app.delete('/category/:categoryId', (req, res) => {
    CategoryModel.findOneAndRemove({ _id: req.params.categoryId }).then((deletedRes) => {
        res.send(deletedRes);
    });
});


/**
 * Search Categories
 */
app.get('/category/:name', (req, res)=>{
    CategoryModel.find({
        name: req.params.name
    }).then((searchedCategory) => {
        res.send(searchedCategory);
    })
});
/**
 * Routes and methods
 * Products
 */

/**
 * GET Products from Particular Category
 */
app.get('/category/:categoryId/products', (req, res) => {
    ProductModel.find({
        _categoryId: req.params.categoryId
    }).then((responce) => {
        res.send(responce);
    });
});

/**
 * GET ALL Products 
 */
app.get('/category/products/all', (req, res) => {
    ProductModel.find({}).then((responce) => {
        res.send(responce);
    });
});

/**
 * GET product using perticular ID
 */
app.get('/product/:id', (req, res) => {
    ProductModel.find({
        _id: req.params.id
    }).then((response) => {
        res.send(response);
    })
});
/**
 * POST Products
 */
app.post('/category/add-product', (req, res) => {
    newName = req.body.name;
    categoryId = req.body._categoryId; 
    newPrice = req.body.price;
    new ProductModel({
        name: newName,
        _categoryId: categoryId,
        price: newPrice
    }).save().then((newProduct) => {
        res.send(newProduct);
    });
});

/**
 * PATCH Products
 */
app.patch('/category/:categoryId/products/:productId', (req, res) => {
    ProductModel.findOneAndUpdate({ 
        _id: req.params.productId
         },
    { $set:req.body }).then((updatedRes) => {
        res.send(updatedRes);
    });
});

/**
 * DELETE Products
 */
app.delete('/category/:categoryId/products/:productId', (req, res) => {
    ProductModel.findOneAndRemove({ 
        _id: req.params.productId,
        _categoryId: req.params.categoryId
    }).then(() => {
        res.send("Deleted Success!");
    });
});
