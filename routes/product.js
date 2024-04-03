const express = require('express');

const productRouter = express.Router();
const { handleGetProducts, handleCreateProduct, handleUpdateProduct, handleDeleteProduct, handleGetProductById, handleGetProductInCategory } = require('../controller/product');
productRouter.route('/')
    .get(handleGetProducts)

productRouter.route('/:categoryId')
    .get(handleGetProductInCategory)

productRouter.route('/getById/:productId')
    .get(handleGetProductById)

productRouter.route('/create')
    .post(handleCreateProduct)

productRouter.route('/:categoryId/updateproduct/:productId')
    .patch(handleUpdateProduct)

productRouter.route('/:categoryId/deleteproduct/:productId')
    .delete(handleDeleteProduct)





module.exports = {
    productRouter
}
