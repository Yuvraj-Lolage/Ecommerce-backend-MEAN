const mong = require('mongoose');
const DATABASE_URL = "mongodb+srv://yuvraj:yuvraj@cluster0.mamoiv2.mongodb.net/Ecommerce";
// const DATABASE_URL = "mongodb://127.0.0.1:27017/Ecommerce";
const connection = mong.connect(DATABASE_URL);

module.exports ={
    connection
}