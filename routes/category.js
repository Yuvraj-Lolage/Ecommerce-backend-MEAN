const express = require('express');
const categoryRouter = express.Router();

const { handleGetCategory, handleCreateCategory, handleUpdateCategory, handleDeleteCategory, handleSearchCategory, handleGetCategoryIdByName } = require('../controller/category');
categoryRouter.route('/')
    .get(handleGetCategory)
    .post(handleCreateCategory)

categoryRouter.route('/:categoryId')
    .patch(handleUpdateCategory)
    .delete(handleDeleteCategory)
    .get(handleSearchCategory)

categoryRouter.route("/getIdByName/:catName")
    .get(handleGetCategoryIdByName)

module.exports = {
    categoryRouter
};