const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    userID: { type: String, required: true },
    email: { type: String, required: true },

    addressDetail: { type: Object, required: true },
    bankDetail: { type: Object, required: true },
    orderItem: { type: Array, required: true },
    bill: { type: Number, required: true }

}, { versionKey: false })




const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };

