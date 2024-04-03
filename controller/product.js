const { Product } = require('../models/product');

const handleGetProducts = async (req, res) => {
    await Product.find({}).then((response) => {
        return res.send(response);
    })
}

const handleCreateProduct = async (req, res) => {
    try {
        await Product.create({
            name: req.body.name,
            _categoryId: req.body._categoryId,
            price: req.body.price
        })
            .then(() => {
                return res.status(201).send();
            })
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const handleUpdateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId, // _id of the document to update
            { $set: req.body }, // Update object
            { new: true } // Options: return the updated document
        );

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(updatedProduct); // Respond with the updated product
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const handleDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)

        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }

        await Product.findByIdAndDelete(req.params.productId)
            .then(() => res.send(200))
    } catch {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const handleGetProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)

        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }

        await Product.find({ _id: req.params.productId })
            .then((response) => {
                return res.send(response)
            })
    } catch {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const handleGetProductInCategory = async (req, res) => {
    try {
        const products = Product.find({ _categoryId: req.params.categoryId })
            .then((result) => {
                return res.send(result);
            })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = {
    handleGetProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetProductById,
    handleGetProductInCategory
}