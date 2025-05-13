const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: Number,
    brand: String,
    category: String,
    totalStock: Number,
    salePrice: Number
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;