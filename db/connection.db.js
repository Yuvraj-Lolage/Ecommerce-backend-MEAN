const mong = require('mongoose');
const DATABASE_URL = "mongodb+srv://yuvraj:yuvraj@cluster0.mamoiv2.mongodb.net/Ecommerce";
const connection = mong.connect(DATABASE_URL);

module.exports ={
    connection
}