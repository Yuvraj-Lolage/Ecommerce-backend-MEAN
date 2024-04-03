const { category } = require('../models/category');

const handleGetCategory = async (req, res) => {
    await category.find({}).then((response) => {
        res.send(response);
    })
}


const handleCreateCategory = async (req, res) => {
    try {
        await category.create({
            name: req.body.category_name
        });
        res.status(201).send("Category created successfully");
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).send("Internal Server Error");
    }
}


const handleUpdateCategory = async (req, res) => {
    let newCategoryName = req.body.name;
    await category.findOneAndUpdate({ _id: req.params.categoryId },
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