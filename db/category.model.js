const mong = require('mongoose');

const CategorySchema = mong.Schema({
    name:{
        type:String,
        required:true
    },
});


const CategoryModel = mong.model('Category', CategorySchema);

module.exports = {
    CategoryModel
}