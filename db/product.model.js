const mong = require('mongoose');

const ProductSchema = mong.Schema({
    name:{
        type:String,
        required:true
    },
    _categoryId:{
        type: mong.Types.ObjectId,
        required: true
    },
    price:{
        type:Number,
        required:true
    }
});


const ProductModel = mong.model('Product', ProductSchema);

module.exports = {
    ProductModel
}