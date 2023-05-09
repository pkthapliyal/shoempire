const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    style: { type: String, required: true },
    material: { type: String, required: true },
    rating: { type: Number, required: true },
    rating_count: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },

    available: { type: Boolean, default: true },
    item_left: { type: Number, required: true },

    description: { type: String, required: true },
    arival: { type: Date, require: true }
}, {
    versionKey: false
})

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };


