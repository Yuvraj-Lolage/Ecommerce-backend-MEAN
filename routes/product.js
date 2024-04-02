const express = require('express');

const productRouter = express.Router();
const { handleGetProducts, handleCreateProduct, handleUpdateProduct, handleDeleteProduct, handleGetProductById } = require('../controller/product');
productRouter.route('/')
    .get(handleGetProducts)

productRouter.route('/:productId')
    .get(handleGetProductById)

productRouter.route('/:categoryId/createproducts')
    .post(handleCreateProduct)

productRouter.route('/:categoryId/updateproduct/:productId')
    .patch(handleUpdateProduct)

productRouter.route('/:categoryId/deleteproduct/:productId')
    .delete(handleDeleteProduct)




module.exports = {
    productRouter
}
