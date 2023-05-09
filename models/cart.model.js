const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    email: { type: String, required: true },
    userID: { type: String, required: true },
    cartItem: { type: Array, default: [] },
    status: { type: Boolean, default: false }

}, {
    versionKey: false
})

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };