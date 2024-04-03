const { CategoryModel } = require('../models/category');
const { category } = require('../models/category');

const handleGetCategory = async (req, res) => {
    await category.find({}).then((response) => {
        res.send(response);
    })
}


const handleCreateCategory = async (req, res) => {
    await CategoryModel.create({
        name: req.body.name
    }).then(() => {
        res.send(201);
    })
}

const handleUpdateCategory = async (req, res) => {
    let newCategoryName = req.body.name;
    await CategoryModel.findOneAndUpdate({ _id: req.params.categoryId },
        { $set: req.body }).then((updatedRes) => {
            res.send(updatedRes);
        });
}


const handleDeleteCategory = async (req, res) => {
    await category.findByIdAndDelete({ _id: req.params.categoryId })
        .then(() => { res.send(200) })
}

const handleSearchCategory = async (req, res) => {
    await category.findById({ _id: req.params.categoryId })
        .then((response) => { res.send(response) })
}

const handleGetCategoryIdByName = async (req, res) => {
    try {
        const categoryId = await category.find({ name: req.params.catName })
        return res.send(categoryId[0]._id);
    } catch (error) {
        return res.send(error)
    }
}
module.exports = {
    handleGetCategory,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleSearchCategory,
    handleGetCategoryIdByName
}