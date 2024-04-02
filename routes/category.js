const express = require('express');
const categoryRouter = express.Router();

const { handleGetCategory, handleCreateCategory, handleUpdateCategory, handleDeleteCategory, handleSearchCategory } = require('../controller/category');
categoryRouter.route('/')
    .get(handleGetCategory)
    .post(handleCreateCategory)

categoryRouter.route('/:categoryId')
    .patch(handleUpdateCategory)
    .delete(handleDeleteCategory)
    .get(handleSearchCategory)


module.exports = {
    categoryRouter
};