const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Porfavor ingrese el nombre del producto."],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;