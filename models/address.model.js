const mongoose = require("mongoose");

const addressTypeSchema = mongoose.Schema({
    full_name: { type: String, required: true },
    full_address: { type: String, required: true },
    city: { type: String, required: true },
    pin: { type: Number, required: true },
    state: { type: String, required: true },
    mobile: { type: Number, required: true }

}, { versionKey: false })

const addressSchema = mongoose.Schema({
    userID: { type: String, required: true },
    email: { type: String, required: true },
    addressData: { type: [addressTypeSchema] }

}, {
    versionKey: false
})


const AddressModel = mongoose.model("address", addressSchema);

module.exports = { AddressModel };

